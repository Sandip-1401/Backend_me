import { successResponse } from '../../common/utils/successResponse';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { AdminService } from './admin.service';
import { Response } from 'express';

export class AdminController {
  private adminService = new AdminService();

  getPendingDoctors = async (req: AuthRequest, res: Response) => {
    const doctors = await this.adminService.getPendingDoctors(req.query);
    return successResponse(res, 'Pending Doctors fetched...!', doctors);
  };

  activedoctorById = async (req: AuthRequest, res: Response) => {
    const activeDoctor = await this.adminService.activeDoctorById(String(req.params.id));
    return successResponse(res, 'Doctor is now active...!', activeDoctor);
  };

  unverifiedUser = async (req: AuthRequest, res: Response) => {
    const users = await this.adminService.getUnverifiedUser(req.query);
    return successResponse(res, 'Unverified User', users);
  };

  verifyUserById = async (req: AuthRequest, res: Response) => {
    const verifyUser = await this.adminService.verifiedUserById(String(req.params.id));
    return successResponse(res, 'User is now verified...!', verifyUser);
  };

  allUsers = async (req: AuthRequest, res: Response) => {
    const allUsers = await this.adminService.allUsers(req.query);
    return successResponse(res, 'All Users...', allUsers)
  }
}
