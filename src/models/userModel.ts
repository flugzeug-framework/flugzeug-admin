import { BaseModel } from "./baseModel";
import { RoleModel } from "./roleModel";

export enum AuthType {
  Email = "email",
  Microsoft = "microsoft",
  Google = "google",
}

export interface UserModel extends BaseModel {
  email: string;
  isActive?: boolean;
  isEmailConfirmed?: boolean;
  password?: string;
  name: string;
  firstName?: string;
  lastName?: string;
  tenantId?: number;
  authType?: AuthType.Email | AuthType.Microsoft | AuthType.Google;
  roles: RoleModel[];
}
