import { AppDataSource } from "../../config/datasource";
import { Role } from "../../entities/roles.entities";

export class RoleRepository{
   private roleRepository = AppDataSource.getRepository(Role);

   async createRole(data: Partial<Role>){
      const role = this.roleRepository.create(data);
      return this.roleRepository.save(role);
   }

   async findByName(role_name: string){
      return this.roleRepository.findOne({
         where: {role_name},
      });
   }

   async findAllRoles(){
      return this.roleRepository.find({
         where: {is_active: true},
         order: {created_at: "ASC"},
      });
   }
}

export default RoleRepository;