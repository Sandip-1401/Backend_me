import express from "express";
import authRoute from "./modules/auth/auth.route";
const app = express();

app.use(express.json());
app.use("/api/auth", authRoute)

app.get("/", (req, res) => {
   res.status(200).json({
      message: "Backend is running on 5152...!!"
   })
})


export default app;