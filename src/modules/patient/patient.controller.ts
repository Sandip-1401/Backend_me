import { successResponse } from '../../common/utils/successResponse';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { CreatePatientDto } from './dto/createPatientDto';
import { UpdatePatientDto } from './dto/updatePatientDto';
import { PatientService } from './patient.service';
import { Response } from 'express';

export class PatientCntroller {
  private patientService = new PatientService();

  createPatient = async (req: AuthRequest, res: Response) => {
    const data = req.body as CreatePatientDto;

    const patient = await this.patientService.createPatient(data);

    return res.status(201).json({
      success: true,
      message: 'Patient created Successfully',
      data: patient,
    });
  };

  getAll = async (req: AuthRequest, res: Response) => {
    const patients = await this.patientService.findAllPatient(req.query);

    return res.status(200).json({
      success: true,
      data: patients,
    });
  };

  getById = async (req: AuthRequest, res: Response) => {
    const patient_id = String(req.params.id);
    const patient = await this.patientService.findPatientById(patient_id);

    return res.status(200).json({
      success: true,
      data: patient,
    });
  };

  getMyProfile = async (req: AuthRequest, res: Response) => {
    const user_id = String(req.user?.user_id);
    const myprofile = await this.patientService.findPatientByUserId(user_id);

    return res.status(200).json({
      success: true,
      data: myprofile,
    });
  };

  cancleAppointment = async (req: AuthRequest, res: Response) => {
    const userId = String(req.user?.user_id);
    const appointmentId = String(req.params.id);

    const appointment = await this.patientService.cancleAppointment(userId, appointmentId);

    return successResponse(res, 'Appointment calcled by your side.', appointment);
  };

  updatePatient = async (req: AuthRequest, res: Response) => {
    const patient_id = String(req.params.id);
    const data = req.body as UpdatePatientDto;

    await this.patientService.updatePatient(patient_id, data);

    return res.status(200).json({
      success: true,
      message: 'Patient updated Successfully',
    });
  };

  deletePatient = async (req: AuthRequest, res: Response) => {
    const patient_id = String(req.params.id);

    await this.patientService.deletePatient(patient_id);
    return res.status(200).json({
      success: true,
      message: 'Patient deleted Successfully',
    });
  };
}
