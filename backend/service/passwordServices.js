import nodemailer from 'nodemailer';
import Users from '../models/users.js';
import PassResetTokens from '../models/password-rest-tokens.js';

export const restPassword = async (email) => {
  try {
    // Find the user by email
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    // Create a password reset token
    const data = {
      user_id: user.id,
      due_date: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
      created_at: new Date(),
      status: 0,
      updated_at: new Date(),
    };

    const result = await PassResetTokens.create(data);
    const { id, user_id } = result;
    const resetToken = `${id}#${user_id}`;

    // Construct the reset URL
    const resetUrl = `https://your-frontend-url.com/reset-password/${resetToken}`;

    // Send the email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
      tls: {
        rejectUnauthorized: false, // Disable certificate validation (use cautiously)
      },
    });

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset Request',
      text: `You have requested a password reset. Click the link below to reset your password:\n\n${resetUrl}`,
    });

    return { message: 'Password reset email sent successfully' };
  } catch (error) {
    throw new Error('Error in restPassword: ' + error.message);
  }
};
