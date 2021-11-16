import { BaseService } from "./baseService";
import { UserModel } from "models/userModel";

class UserService extends BaseService<UserModel> {
  controllerName = "user";
}

export const userService = new UserService();
