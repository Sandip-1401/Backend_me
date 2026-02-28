import { Role } from "../../entities/roles.entities";
import RoleRepository from "./role.repository";

export class RoleService{
   private roleRepository = new RoleRepository();

   async createRole(data: Partial<Role>){
      const existingRole = await this.roleRepository.findByName(data.role_name!);
      if(existingRole){
         throw new Error("Role already exists");
      }
      return this.roleRepository.createRole(data);
   }

   async getAllRole(){
      return this.roleRepository.findAllRoles();
   }
}

export default RoleService;