const express = require('express')
const Userconfig = require('../Controller/Userconfig')

const nodemailer = require("nodemailer");
require("dotenv").config();

const Router = express.Router()

Router.post('/saveUser', Userconfig.saveUser)
Router.post('/loginuser', Userconfig.loginUSer)



Router.post("/send-result", async (req, res) => {
  try {
    const { email, name, score, total, percentage, isPass } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

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
     console.log("📩 Sending email to:", email);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Aptitude Test Result",
      html: resultMessage,
    });
console.log("📧 Trying to send email to:", email);
console.log("✅ Using user:", process.env.EMAIL_USER);

    res.json({ message: "Result email sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});



module.exports = Router