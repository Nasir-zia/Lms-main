import { Worker } from 'bullmq';
import transporter from '../utils/sendemail.js';

let emailWorker = null;

export const startEmailWorker = () => {
  const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
  
  let connectionOpts = {};
  try {
    const parsed = new URL(redisUrl);
    connectionOpts = {
      host: parsed.hostname || '127.0.0.1',
      port: parsed.port ? parseInt(parsed.port, 10) : 6379,
    };
    if (parsed.username) connectionOpts.username = decodeURIComponent(parsed.username);
    if (parsed.password) connectionOpts.password = decodeURIComponent(parsed.password);
  } catch (err) {
    console.error('Failed to parse REDIS_URL for worker, using default localhost:', err.message);
    connectionOpts = { host: '127.0.0.1', port: 6379 };
  }

  console.log(`Starting BullMQ Email Worker connected to Redis at ${connectionOpts.host}:${connectionOpts.port}...`);

  emailWorker = new Worker(
    'emailQueue',
    async (job) => {
      console.log(`[Worker] Processing job ${job.id} of type ${job.name} for ${job.data.to}`);
      if (job.name === 'sendEmail') {
        const { to, subject, text, html } = job.data;
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to,
          subject,
          text,
          html,
        });
        console.log(`[Worker] Email successfully sent to ${to}`);
      }
    },
    {
      connection: connectionOpts,
      concurrency: 2,
    }
  );

  emailWorker.on('completed', (job) => {
    console.log(`[Worker] Job ${job.id} completed successfully`);
  });

  emailWorker.on('failed', (job, err) => {
    console.error(`[Worker] Job ${job.id} failed with error:`, err.message);
  });

  emailWorker.on('error', (err) => {
    console.error('[Worker] Connection/execution error:', err.message);
  });
};
