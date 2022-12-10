const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.USER_EMAIL_HOST,
    port: process.env.USER_EMAIL_PORT,
    auth: {
      user: process.env.USER_EMAIL_USERNAME,
      pass: process.env.USER_EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: 'John Doe <johndoe@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
