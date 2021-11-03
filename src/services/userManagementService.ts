import { BaseService } from "./baseService";
import { UserModel } from "models/userModel";

class UserManagementService extends BaseService<UserModel> {
  controllerName = "usermanagement";
}

export const userManagementService = new UserManagementService();
