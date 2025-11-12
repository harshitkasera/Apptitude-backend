const express = require('express')
const cors = require('cors')

require("dotenv").config();






const app = express();
app.use(express.json())
app.use(cors())

require('./Database/Connection')

app.get('/', (req, res) => {
  res.send("server in running")
})

const data = require('./Default')
data()

const Question = require("./model/QuesModel")

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
