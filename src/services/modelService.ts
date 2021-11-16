import { BaseService } from "./baseService";

class ModelService extends BaseService<string> {
  constructor() {
    super();
    this.controllerName = "model";
    this.api.defaults.baseURL = process.env.REACT_APP_API_ADMIN_BASE_URL;
  }
}

export const modelService = new ModelService();
