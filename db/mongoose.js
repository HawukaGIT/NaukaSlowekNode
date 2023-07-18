import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MdbUser = process.env.MGUSER;
const MdbPass = process.env.MGPASS;
const URL = process.env.URL;
const uri = `mongodb+srv://${MdbUser}:${MdbPass}@${URL}`;
//retryWrites=true&w=majority
//slowka.qprfm5a.mongodb.net/slowka ac-hqxnswg-shard-00-00.qprfm5a.mongodb.net/
const options = {
  //authMechanism: "SCRAM-SHA-256",
  //useUnifiedTopology: true,
  retryWrites: true,
  w: "majority",
  maxPoolSize: 5,
  useNewUrlParser: true,
  //dbName: 'test',
  serverSelectionTimeoutMS: 5000,
  //replicaSet: 'ac-hqxnswg-shard-00-01.qprfm5a.mongodb.net:27017'
};

async function dbconnect() {
  try {
    await mongoose.connect(uri, options);
    console.log("polaczono z baza danych");
  } catch (error) {
    console.log(error);
    mongoose.disconnect().then(console.log("disconected"));
    // handleError(error);
    process.exit(1);
  }
}

export default dbconnect();
