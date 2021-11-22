import {
  BaseService,
  ListResponseData,
  prepareParams,
  ServiceOptions,
} from "./baseService";

class ModelService extends BaseService<string> {
  constructor() {
    super();
    this.controllerName = "model";
    this.api.defaults.baseURL = process.env.REACT_APP_API_ADMIN_BASE_URL;
  }

  async getAllModels(
    options?: ServiceOptions
  ): Promise<ListResponseData<string>> {
    const params = prepareParams(options);
    console.log(params.order);
    const order = params.order
      ? params.order === `"ASC"`
        ? "&order=ASC"
        : "&order=DESC"
      : "";

    const offset = params.offset ? `&offset=${params.offset}` : "";

    this.api.defaults.headers = this.getDefaultHeaders();
    const { data } = await this.api.get<ListResponseData<string>>(
      `/${this.controllerName}?limit=${params.limit}${offset}${order}`
    );
    return data;
  }
}

export const modelService = new ModelService();
