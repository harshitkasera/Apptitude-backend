const Question = require("./model/QuesModel.js")
const questions = require("./Api.js")

const data = async()=>{
    await Question.deleteMany({})
    await Question.insertMany(questions)
}
module.exports = data