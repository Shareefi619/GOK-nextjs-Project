import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { create } from "domain";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // creating hash token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyExpires: Date.now() + 3600000,
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpires: Date.now() + 3600000,
      });
    }
    const trasporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f3cf04b2d4072c",
        pass: "********8ed4",
      },
    });

    const mailOptions = {
      from: "irfan@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<h1>Reset Password</h1>
        <a href="${process.env.domain}/verifyemail?token=${hashedToken}">Reset Password</a>`,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
