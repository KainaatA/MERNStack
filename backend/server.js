import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
// import https require 'https';

dotenv.config({ path: "./config.env" });

app.use(cors());

// const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
const DB =
  "DB Link";
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((con) => {
    // console.log(con.connections);
    console.log("DB connection successful");
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is ready ${port}`);
});
app.get('/', (req, res) => { res.send('Hello from Express!') });
// https.createServer({
//   key: fs.readFileSync('../key.pem'),
//   cert: fs.readFileSync('../cert.pem')
// }, app).listen(PORT, ()=> {
//   console.log(`Listening on port ${PORT}`);
// })
