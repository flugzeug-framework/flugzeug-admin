import { SchemaModel } from "models/entityModel";
import { BaseService, ResponseData } from "./baseService";

class EntityService extends BaseService<any> {
  constructor(controllerName: string) {
    super();
    this.controllerName = controllerName;
    this.api.defaults.baseURL = process.env.REACT_APP_API_ADMIN_BASE_URL;
  }

  async getSchema(): Promise<ResponseData<SchemaModel>> {
    this.api.defaults.headers = this.getDefaultHeaders();
    const { data } = await this.api.get<ResponseData<SchemaModel>>(
      `/${this.controllerName}/schema`
    );
    return data;
  }
}

export const entityService = (controllerName: string) =>
  new EntityService(controllerName);
