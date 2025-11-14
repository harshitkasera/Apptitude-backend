const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'harshitkasera01@gmail.com',       // 👈 apna Gmail
        pass: 'sdwc ayar vkix gytt',          // 👈 Gmail ka App Password (normal password nahi chalega)
      },
    });
 
    const mailOptions = {
      from: 'Aptitude tracker harshitkasera01@gmail.com',
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully");
  } catch (error) {
    console.error("❌ Email not sent:", error.message);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;