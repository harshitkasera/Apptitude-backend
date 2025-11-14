const express = require('express')

const Userconfig = require('../Controller/Userconfig')
const nodemailer = require("nodemailer");
require("dotenv").config();

const Router = express.Router()

Router.post('/saveUser', Userconfig.saveUser)
Router.post('/loginuser', Userconfig.loginUSer)


Router.post("/send-result", async (req, res) => {
  console.log("📨 Request body:", req.body);

  try {
    const { email, name, score, total, percentage, isPass } = req.body;
    console.log("✅ Mail route loaded successfully");


    if (!email) {
      console.log("❌ No email found in request body");
      return res.status(400).json({ error: "Email is required" });
    }

    console.log("📩 Received request to send email to:", email);
    console.log("✅ Using Email User:", process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // // verify SMTP connection before sending
    // await transporter.verify();
    // console.log("✅ SMTP connection verified successfully");

    const resultMessage = `
      <h2>Hi ${name || "Student"},</h2>
      <p>Here is your test result summary:</p>
      <ul>
        <li><b>Score:</b> ${score}/${total}</li>
        <li><b>Percentage:</b> ${percentage}%</li>
        <li><b>Status:</b> ${isPass ? "✅ Pass" : "❌ Fail"}</li>
      </ul>
      <p>Keep practicing and improving!</p>
      <br><p>– Aptitude Team</p>
    `;

//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Your Aptitude Test Result",
//       html: resultMessage,
//     });

//     console.log("✅ Mail sent! Message ID:", info.messageId);
//     res.json({ message: "Result email sent successfully!" });
//   } catch (err) {
//     console.error("❌ Error sending email:", err.message);
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });
  const mailOptions = {
     from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Aptitude Test Result",
      html: resultMessage,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully");
  } catch (error) {
    console.error("❌ Email not sent:", error.message);
    throw new Error("Email sending failed");
  }
});


module.exports = Router