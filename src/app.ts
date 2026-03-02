import express from "express";
import authRoute from "./modules/auth/auth.route";
import roleRoute from "./modules/role/role.route";
import userRoleRoute from "./modules/user-role/user-role.route";
import doctorRoute from "./modules/doctor/doctor.route";
import patientRoute from "./modules/patient/patient.route";
import appointmentRoute from "./modules/appointment/appointment.route";
const app = express();

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/role", roleRoute);
app.use("/api/user-roles", userRoleRoute);
app.use("/api/doctors", doctorRoute);
app.use("/api/patients", patientRoute);
app.use("/api/appointments", appointmentRoute)

app.get("/", (req, res) => {
   res.status(200).json({
      message: "Backend is running on 5152...!!"
   })
})


export default app;