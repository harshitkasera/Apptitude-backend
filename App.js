const express = require('express')
const cors = require('cors')
const app = express();
app.use(express.urlencoded({ extended: true }))
const use = (cors())
app.use(express.json())
const data = require('./Default')
data()
const Question=   require("./model/QuesModel")
require('./Database/Connection')
app.use(cors()); 

app.get('/',(req,res)=>{
    res.send("server in running")
})
app.use('/api/user', require('./Route/UserRouter'))

const port = 1100
app.listen(port,()=>{
    console.log("Server start",port);
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

// ✅ Submit Answer Check
app.post("/api/submit/:id", async (req, res) => {
  const { answer } = req.body; // user answer index
  const question = await Question.findById(req.params.id);

  if (!question) return res.status(404).json({ error: "Question not found" });

  const isCorrect = question.correctAnswer === answer;
  res.json({ correct: isCorrect });
});