const express = require('express')
const cors = require('cors')
const app = express();
app.use(express.urlencoded({ extended: true }))
const use = (cors())
app.use(express.json())
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