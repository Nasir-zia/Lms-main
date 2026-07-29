import { Queue } from 'bullmq';
import { isRedisConnected } from '../config/redis.js';
import transporter from '../utils/sendemail.js';

let emailQueue = null;

export const initEmailQueue = () => {
  const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
  
  let connectionOpts = {};
  try {
    const parsed = new URL(redisUrl);
    connectionOpts = {
      host: parsed.hostname || '127.0.0.1',
      port: parsed.port ? parseInt(parsed.port, 10) : 6379,
    };
    // URL.password automatically decodes URI components, but we want the raw password.
    if (parsed.username) connectionOpts.username = decodeURIComponent(parsed.username);
    if (parsed.password) connectionOpts.password = decodeURIComponent(parsed.password);
  } catch (err) {
    console.error('Failed to parse REDIS_URL, using default localhost connection:', err.message);
    connectionOpts = { host: '127.0.0.1', port: 6379 };
  }

  emailQueue = new Queue('emailQueue', {
    connection: connectionOpts
  });

  emailQueue.on('error', (err) => {
    console.error('BullMQ Email Queue Error:', err.message);
  });
};

export const addEmailJob = async (emailData) => {
  if (isRedisConnected && emailQueue) {
    try {
      await emailQueue.add('sendEmail', emailData, {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      });
      console.log(`Email job queued for ${emailData.to} via BullMQ`);
      return true;
    } catch (err) {
      console.error('Failed to queue email with BullMQ, falling back to direct sending:', err.message);
    }
  }

  // Fallback if Redis is offline or queueing fails
  try {
    console.log(`Sending email directly to ${emailData.to} (fallback)`);
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    });
    return true;
  } catch (err) {
    console.error('Direct email sending fallback failed:', err.message);
    throw err;
  }
};
