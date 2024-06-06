import express from "express";
import useRouter from "./routes/user.js"
import authRouter from "./routes/auth.js"
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/api/users", useRouter)
app.use("/api/auth", authRouter)

const server = app.listen(8001, () => {
  if (server) {
    console.log(`Servidor está rodando em 8001`);
  } else {
    console.error(`Error ⚠️`);
  } 
});