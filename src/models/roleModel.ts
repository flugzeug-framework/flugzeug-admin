import { BaseModel } from "./baseModel";

export interface RoleModel extends BaseModel {
  id: number;
  name: string;
  description: string;
  isDefault: boolean;
  tenantId: number;
}
