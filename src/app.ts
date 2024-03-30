import express, { Application, Response ,Request} from "express";
import cors from 'cors';
import { userRoutes } from "./app/modules/User/user.routes";
import { Adminroutes } from "./app/modules/admin/admin.route";

const app:Application = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req:Request,res:Response)=>{
    res.send({
        message:"PH health care server.."
    })
})

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/admin',Adminroutes);

export default app;