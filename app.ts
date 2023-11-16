import express, { Express } from "express";
import cors from "cors";
import router from "./routes/route";

class App {
  private server: Express;
  constructor() {
    const allowedOrigins = process.env.VALID_ORIGIN?.split(",");
    const corsOptions = {
      credentials: true,
      origin: (
        origin: string | undefined,
        callback: (error: null | Error, allow?: boolean) => void
      ) => {
        if (!origin || allowedOrigins?.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    };
    this.server = express();
    this.server.use(cors(corsOptions));
    this.server.use(express.json());
    this.server.use("/api", router);
    this.server.use(express.static('public'));
  }
  public run() {
    this.server.listen(8000, () => {
      console.log("Server is listening...");
    });
  }
}
export default App;
