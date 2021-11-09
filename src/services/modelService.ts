import { BaseService } from "./baseService";
import { fakeModels, ModelModel } from "models/modelModel";

class ModelService extends BaseService<ModelModel> {
  constructor() {
    super();
    this.controllerName = "model";
    this.api.defaults.baseURL = process.env.REACT_APP_API_ADMIN_BASE_URL;
  }

  // TODO: remove when back end ready
  async getAllFakeModels(): Promise<ModelModel[]> {
    const data = fakeModels;

    return data;
  }
}

export const modelService = new ModelService();
