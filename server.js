import http from "http";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { PORT } from "./common/constants.js";
import { connectDB } from "./config/db.js";
import router from "./routes/index.js";
import OS from "os";
import fs from "fs";

const app = express();

let httpServer = http.createServer(app);

connectDB();
// initSocket(io);

let _path;
(() => {
  try {
    const userName = OS.userInfo().username;
    if (userName == "root") _path = "/" + userName + "/uploads";
    else {
      if (OS.platform() == "win32") _path = "C:/Users/" + userName + "/uploads";
      else _path = "/home/" + userName + "/uploads";
    }
    global.uploadURL = _path;

    if (!fs.existsSync(_path)) {
      fs.mkdirSync(_path);
    }
  } catch (error) {
    console.log("error ", error);
  }
})();
app.use(express.static(_path));


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.text({ limit: "10mb" }));

app.use(cors());
app.use(cors({
  origin: 'http://localhost:4200',  // Angular's default URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Enable credentials like cookies (if needed)
}));
app.use(helmet());
app.set("trust proxy", 1);

console.log("call")

app.use("/api/v1", router);

httpServer.listen({ port: PORT }, () => {
  console.log(`Server running at PORT : ${PORT}`);
});

