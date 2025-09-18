const mongoose = require('mongoose')
const  Db = "mongodb://harshitkasera201:353@ac-n83ex1s-shard-00-00.65oa1gn.mongodb.net:27017,ac-n83ex1s-shard-00-01.65oa1gn.mongodb.net:27017,ac-n83ex1s-shard-00-02.65oa1gn.mongodb.net:27017/?ssl=true&replicaSet=atlas-14emxg-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(Db).then(()=>{console.log("mongodb Connected succesfully")}).catch((error)=>{
    console.log(error)
})