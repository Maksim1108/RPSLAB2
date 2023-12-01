import "dotenv/config"
import express from "express"

const app = express()
app.get('/', (req, res)=>{
    res.send("Hello World!")
})
app.listen(process.env.PORT || 3001, () => {
    try {
        console.log(`Server listen on ${process.env.PORT} port`)
    } catch (err) {
        console.log(err)
    }
})
