import express, {Express} from "express"
import cors from "cors"

class App{
    private server : Express;
    constructor(){
        this.server = express();
        this.server.use(cors(),express.json());
    }
    public run(){
        this.server.listen(3000,()=>{
            console.log("Server is listening...");
        })
    }
}
export default App;