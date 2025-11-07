const express = require('express')
const cors = require('cors')
const app = express();
const nodemailer = require("nodemailer");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }))
const use = (cors())
app.use(express.json())
const data = require('./Default')
data()
const Question = require("./model/QuesModel")
require('./Database/Connection')
app.use(cors());

app.get('/', (req, res) => {
  res.send("server in running")
})
app.use('/api/user', require('./Route/UserRouter'))

const port = 1100
app.listen(port, () => {
  console.log("Server start", port);
}) 


// ✅ Add Question
app.post("/api/question", async (req, res) => {
  try {
    const newQ = new Question(req.body);
    await newQ.save();
    res.status(201).json(newQ);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get All Questions
app.get("/api/question", async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

// ✅ Get Single Question (by ID)
app.get('/api/question/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    res.json(question);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// ✅ Submit Answer Check & Send Email
app.post("/api/submit/:id", async (req, res) => {
  const { answer, email } = req.body; // frontend se user answer + email aayega
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });

    const isCorrect = question.correctAnswer === answer;

    // ✅ Step 1: Send mail setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Step 2: Email content
    const mailOptions = {
      from: `"Aptitude Tracker" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Aptitude Test Result 🎯",
      html: `
        <h2>Hi there 👋</h2>
        <p>Thank you for attempting the test question.</p>
        <h3>Question:</h3>
        <p>${question.question}</p>
        <h3>Your Answer:</h3>
        <p>${answer}</p>
        <h3>Result:</h3>
        <p style="color:${isCorrect ? "green" : "red"};">
          ${isCorrect ? "✅ Correct Answer!" : "❌ Incorrect Answer!"}
        </p>
        <br/>
        <p>Keep practicing to improve your score 🚀</p>
      `,
    };

    // ✅ Step 3: Send mail
    await transporter.sendMail(mailOptions);

    res.json({ correct: isCorrect, message: "Result sent to email!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error submitting answer or sending mail" });
  }
});











// const express = require("express");
// const cors = require("cors");
// const nodemailer = require("nodemailer");
// require("dotenv").config();
// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(express.json());

// // ✅ Local imports
// const data = require("./Default");
// const Question = require("./model/QuesModel");
// require("./Database/Connection");

// data(); // Call default data setup

// // ====================== BASIC ROUTES ======================
// app.get("/", (req, res) => {
//   res.send("✅ Server is running");
// });

// app.use("/api/user", require("./Route/UserRouter"));

// // ====================== QUESTION ROUTES ======================

// // ✅ Add Question
// app.post("/api/question", async (req, res) => {
//   try {
//     const newQ = new Question(req.body);
//     await newQ.save();
//     res.status(201).json(newQ);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // ✅ Get All Questions
// app.get("/api/question", async (req, res) => {
//   const questions = await Question.find();
//   res.json(questions);
// });

// // ✅ Get Single Question (by ID)
// app.get("/api/question/:id", async (req, res) => {
//   try {
//     const question = await Question.findById(req.params.id);
//     res.json(question);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // ✅ Submit Answer Check
// app.post("/api/submit/:id", async (req, res) => {
//   const { answer } = req.body; // user answer index
//   const question = await Question.findById(req.params.id);

//   if (!question) return res.status(404).json({ error: "Question not found" });

//   const isCorrect = question.correctAnswer === answer;
//   res.json({ correct: isCorrect });
// });

// // ✅ Delete Question
// app.delete("/api/question/:id", async (req, res) => {
//   try {
//     await Question.findByIdAndDelete(req.params.id);
//     res.json({ message: "Question deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Error deleting question" });
//   }
// });

// // ====================== EMAIL RESULT ROUTE ======================

// app.post("/api/send-result", async (req, res) => {
//   const { email, score, total, percentage, isPass } = req.body;

//   if (!email) return res.status(400).json({ error: "Email is required" });

//   // ✅ Setup mail transporter
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: 'harshitkasera01@gmail.com', // Gmail ID from .env
//       pass: 'sdwc ayar vkix gyt', // App password
//     },
//   });

//   const mailOptions = {
//     from: `"Aptitude Tracker" <${process.env.MAIL_USER}>`,
//     to: email,
//     subject: "Your Aptitude Test Result 📊",
//     html: `
//       <h2>🧠 Aptitude Test Result</h2>
//       <p><strong>Score:</strong> ${score}/${total}</p>
//       <p><strong>Percentage:</strong> ${percentage}%</p>
//       <p><strong>Status:</strong> ${isPass ? "✅ Passed" : "❌ Failed"}</p>
//       <br/>
//       <p>Thank you for taking the test! Visit again to improve your score 🚀</p>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.json({ success: true, message: "Email sent successfully!" });
//   } catch (error) {
//     console.error("Email error:", error);
//     res.status(500).json({ error: "Error sending email" });
//   }
// });

// // ====================== START SERVER ======================

// const port = process.env.PORT || 1100;
// app.listen(port, () => {
//   console.log("✅ Server started on port:", port);
// });
