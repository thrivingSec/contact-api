import express from "express";
import mongoose from "mongoose";
import bodyParser from "express";
import { config } from "dotenv";

import userRouter from './Routes/user.js';
import contactRouter from './Routes/contact.js';

const app = express();

// json parser middleware
app.use(bodyParser.json());

// home route
app.get('/', (req, res) => {
  res.status(200).json({message:"create and mange contacts", success:true});
});

// user route
app.use('/api/user', userRouter);

// contact route
app.use('/api/contact', contactRouter)

config({ path: ".env" });

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "contact_api_v2",
    })
    .then(() =>
      console.log(
        `Database Connected...\n Server is running on http://localhost:${process.env.PORT}`
      )
    )
    .catch((err) => console.log("Error in connecting databse: ", err));
});
