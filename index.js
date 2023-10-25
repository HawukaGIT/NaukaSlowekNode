import app from "./serwer.js";
import dbconnect from "./db/mongoose.js";
import dotenv from "dotenv";
import https from "https";

dotenv.config();

const PORT = process.env.PORT || 80;
await dbconnect;
//await import('./db/mongoose.js');

//https server
https.createServer(app).listen(PORT, () => {
  console.log(`server is runing at port ${PORT}`);
});

//http server
// app.listen(PORT, () => {
//   console.log(`serwer słucha na porcie ${PORT}`);
// });
