import express, {Express} from "express"
import cors from "cors"
import router from "./routes/route";

class App{
    private server : Express;
    constructor(){
        this.server = express();
        this.server.use(express.json());
        this.server.use("/api",router);
    }
    public run(){
        this.server.listen(8000,()=>{
            console.log("Server is listening...");
        })
    }
}
export default App;