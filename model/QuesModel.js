const mongoose = require("mongoose")
// Schema
const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  optionA: [String], // ["opt1", "opt2", "opt3", "opt4"]
  optionB: [String], // ["opt1", "opt2", "opt3", "opt4"]
  optionC: [String], // ["opt1", "opt2", "opt3", "opt4"]
  optionD: [String], // ["opt1", "opt2", "opt3", "opt4"]
 
  correctAnswer: Number, // index of correct option (0,1,2,3)
  subject: String, // e.g. "Aptitude", "Reasoning"
  difficulty: String, // easy, medium, hard
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question
