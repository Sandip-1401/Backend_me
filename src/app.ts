import express from "express";
import authRoute from "./modules/auth/auth.route";
import roleRoute from "./modules/role/role.route";
import userRoleRoute from "./modules/user-role/user-role.route";
const app = express();

app.use(express.json());
app.use("/api/auth", authRoute)
app.use("/api/role", roleRoute);
app.use("/api/user-roles", userRoleRoute);

app.get("/", (req, res) => {
   res.status(200).json({
      message: "Backend is running on 5152...!!"
   })
})


export default app;