import { BaseService } from "./baseService";
import { UserModel } from "models/userModel";

class UserManagementService extends BaseService<UserModel> {
  controllerName = "user";
}

export const userManagementService = new UserManagementService();
