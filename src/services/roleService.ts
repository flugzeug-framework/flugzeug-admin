import { BaseService } from "./baseService";
import { RoleModel } from "models/roleModel";

class RoleService extends BaseService<RoleModel> {
  controllerName = "role";
}

export const roleService = new RoleService();
