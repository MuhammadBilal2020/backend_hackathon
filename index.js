import express from "express"
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import userRoutes from "./src/routes/users.route.js"

dotenv.config(); 

const app = express()
app.use(express.json());

app.use("/api/v1", userRoutes);


app.get('/', (req, res) => {
    res.send('Hackathon!')
  })



  connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });

