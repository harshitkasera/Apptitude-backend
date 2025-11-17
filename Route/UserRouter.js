// const express = require('express')

// const Userconfig = require('../Controller/Userconfig')
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const Router = express.Router()

// Router.post('/saveUser', Userconfig.saveUser)
// Router.post('/loginuser', Userconfig.loginUSer)


// Router.post("/send-result", async (req, res) => {
//   console.log("📨 Request body:", req.body);

//   try {
//     const { email, name, score, total, percentage, isPass } = req.body;
//     console.log("SMTP USER:", process.env.BREVO_SMTP_USER);
// console.log("SMTP PASS:", process.env.BREVO_SMTP_PASS ? "Loaded" : "NOT LOADED");

//     console.log("✅ Mail route loaded successfully");


//     if (!email) {
//       console.log("❌ No email found in request body");
//       return res.status(400).json({ error: "Email is required" });
//     }


 
//     console.log("📩 Incoming Email Payload:", req.body);
// console.log("📧 Using SMTP User:", process.env.BREVO_SMTP_USER);
// console.log("🔑 Using SMTP PASS:", process.env.BREVO_SMTP_PASS ? "Loaded" : "MISSING");

//    const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   auth: {
//     user: process.env.BREVO_SMTP_USER,  
//     pass: process.env.BREVO_SMTP_PASS,    
//   }
// });

//     const resultMessage = `
//       <h2>Hi ${name || "Student"},</h2>
//       <p>Here is your test result summary:</p>
//       <ul>
//         <li><b>Score:</b> ${score}/${total}</li>
//         <li><b>Percentage:</b> ${percentage}%</li>
//         <li><b>Status:</b> ${isPass ? "✅ Pass" : "❌ Fail"}</li>
//       </ul>
//       <p>Keep practicing and improving!</p>
//       <br><p>– Aptitude Team</p>
//     `;
//   const mailOptions = {
//     from: "Aptitude Tracker <harshitkasera01@gmail.com>",
//       to: email,
//       subject: "Your Aptitude Test Result",
//       html: resultMessage,
//     };

//     await transporter.sendMail(mailOptions);
// console.log("📧 Email sent successfully");

// return res.json({
//   success: true,
//   message: "Email sent successfully"
// });

//  } catch (error) {
//   console.error("❌ Email not sent:", error);
//   return res.status(500).json({
//     success: false,
//     message: "Email sending failed",
//     error: error.message,
//   });
// }

// });


// module.exports = Router

const express = require("express");
const axios = require("axios");
const Userconfig = require("../Controller/Userconfig");
require("dotenv").config();

const Router = express.Router();

Router.post("/saveUser", Userconfig.saveUser);
Router.post("/loginuser", Userconfig.loginUSer);

// ---------------- EMAIL ROUTE (BREVO API) ----------------
Router.post("/send-result", async (req, res) => {
  try {
    const { email, name, score, total, percentage, isPass } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    console.log("📨 Email Payload Received:", req.body);
    console.log("🔑 BREVO API KEY Loaded?", process.env.BREVO_API_KEY ? "YES" : "NO");

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

    // Send email using BREVO API (100% Render-compatible)
    const brevoResponse = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Aptitude Tracker",
          email: "harshitkasera01@gmail.com",
        },
        to: [{ email }],
        subject: "Your Aptitude Test Result",
        htmlContent: resultMessage,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📧 Email sent successfully:", brevoResponse.data);
    return res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Email sending failed:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

// ----------------------------------------------------------

module.exports = Router;
