import express from 'express';
import authRoute from './modules/auth/auth.route';
import roleRoute from './modules/role/role.route';
import userRoleRoute from './modules/user-role/user-role.route';
import doctorRoute from './modules/doctor/doctor.route';
import patientRoute from './modules/patient/patient.route';
import appointmentRoute from './modules/appointment/appointment.route';
import { AppError } from './common/errors/AppError';
import medicalRecordRoute from './modules/medical-record/medical_record.routes';
import prescriptionRoute from './modules/prescription/prescription.routes';
import scheduleRoute from './modules/doctor-scheduling/doctorScheduling.routes';
import { errorMiddleware } from './middlewares/error.middleware';
import adminRoute from './modules/admin/admin.routes';
import billingRoute from './modules/billing/billing.route';
import paymentRoute from './modules/payment/payment.routes';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/role', roleRoute);
app.use('/api/user-roles', userRoleRoute);
app.use('/api/doctors', doctorRoute);
app.use('/api/patients', patientRoute);
app.use('/api/appointments', appointmentRoute);
app.use('/api/medical-records', medicalRecordRoute);
app.use('/api/prescriptions', prescriptionRoute);
app.use('/api/schedule', scheduleRoute);
app.use('/api/admin', adminRoute);
app.use('/api/billing', billingRoute);
app.use('/api/payment', paymentRoute)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Backend is running on 5152...!!',
  });
});

app.use(errorMiddleware);

export default app;
