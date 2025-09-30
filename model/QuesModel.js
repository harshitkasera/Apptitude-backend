const mongoose = require("mongoose")
// Schema
const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number, // index of correct option (0,1,2,3)
  subject: String, // e.g. "Aptitude", "Reasoning"
  difficulty: String, // easy, medium, hard
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question
