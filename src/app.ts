import express, { Application, Response ,Request} from "express";
import cors from 'cors';

const app:Application = express();
app.use(cors())

app.get("/",(req:Request,res:Response)=>{
    res.send({
        message:"PH health care server.."
    })
})

export default app;