import nodemailer from 'nodemailer';
import Users from '../models/users.js';
import PassResetTokens from '../models/password-rest-tokens.js';

export const restPassword = async (email) => {
    try {

        const user = await Users.findOne({ where: { email } });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const data = {
            user_id: user.id,
            due_date:new Date(Date.now() + 10 * 60 * 1000),
            created_at: new Date(), 
            status: 0,
            updated_at: new Date(), 
        }

        const result =  await PassResetTokens.create(data)
        const  {id,user_id} = result;
        const restToken = `${id}#${user_id}`;

        const restUrl = `Frontends eke page eke haddna me url ekt/pwt/${restToken}`;
        //e ui eka hdala keynna me wag ekek hadala tynne ko

        // const transporter = nodemailer.createTransport({
        //     service: 'gmail', // Use your email service
        //     auth: {
        //       user: process.env.EMAIL, // Your email
        //       pass: process.env.EMAIL_PASSWORD, // Your email password or app password
        //     },
        //     tls: {
        //         rejectUnauthorized: false, // This disables certificate validation (not recommended for production)
        //       },
        //   });

        //   await transporter.sendMail({
        //     to: email,
        //     subject: 'Password Reset Request',
        //     text: 'test message',
        //   });
    } catch (error) {
        throw new Error('Error fetching tasks: ' + error.message);
    }
}