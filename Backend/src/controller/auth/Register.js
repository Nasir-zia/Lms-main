import User from "../../model/user.schema.js";
import bcrypt from "bcrypt";
import transporter from "../../utils/sendemail.js";

const register_user = async (req, res) => {
  try {
    const { username, lastname, email, password , otp , role } = req.body;

    if (!username || !lastname || !email || !password || !otp || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user_exists = await User.findOne({ email });
    if (user_exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000);

    const newUser = new User({
      username,
      lastname,
      email,
      password: hashedPassword,
      role: "user",
      otp: otpCode,
    });

    await newUser.save();

    // Send OTP via SMTP transporter directly
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Welcome to the lms please verify your account",
      text: `Hello ${username}, your OTP is ${otpCode}`,
      html: `<h3>Hello ${username}</h3><p>Your OTP is <b>${otpCode}</b></p>`,
    });

    res.status(201).json({ message: "User registered successfully. OTP sent to email." });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while registering user" });
  }
};

export default register_user;
