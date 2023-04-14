import app from "./serwer.js"
//import dbconnect from './db/mongoose.js';
const PORT = process.env.PORT || 80;
//dbconnect();
await import('./db/mongoose.js');
app.listen(PORT, () => {
  console.log(`serwer słucha na porcie ${PORT}`)
})