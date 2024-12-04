const mongoose = require("mongoose");
const postData = require("../models/userProfileSchema.js");
const initData = require("./data.js")

const MONGO_URL = 'mongodb://127.0.0.1:27017/socialMediaApp';

main().then((res)=>{
    console.log("connection succesfully created");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
  await postData.deleteMany({});
  await postData.insertMany(initData.demoUsersData);
  console.log("Data was initialized succesfully");
}

initDB();