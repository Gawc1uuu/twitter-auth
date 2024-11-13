import express from "express"

const app = express();


app.get("/",(req,res)=>{
    res.send("hello world!")
})

app.get("/hello",(req,res)=>{
    res.send("jadziem na pilke zaraz")
})


app.listen(4000,()=>{
    console.log("listening on port 4000")
})