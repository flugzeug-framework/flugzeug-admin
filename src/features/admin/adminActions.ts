import { AppThunk } from "app/store";
import { setToast } from "features/toast/toastSlice";
import { ServiceOptions } from "services/baseService";
import { modelService } from "services/modelService";
import { describeApiError } from "utils/errorUtils";
import {
  selectModelsPage,
  selectModelsPerPage,
  selectModelsSearchText,
  selectModelsSort,
} from "./adminSelectors";
import { setIsLoadingModels, setModels, setModelsCount } from "./adminSlice";

export const getAllModels = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const searchText = selectModelsSearchText(state);
  const limit = selectModelsPerPage(state);
  const page = selectModelsPage(state);
  const offset = (page - 1) * limit;
  const order = selectModelsSort(state);
  const opts: ServiceOptions = {
    limit,
    offset,
    order,
  };

  if (searchText.length) {
    opts.where = {
      name: { $like: `%${searchText}%` },
    };
  }

  dispatch(setIsLoadingModels(true));
  try {
    const { data, count } = await modelService.getAll(opts);

    dispatch(setModels(data));
    dispatch(setModelsCount(count));
  } catch (error) {
    dispatch(
      setToast({
        message: describeApiError(error),
        isActive: true,
        type: "error",
      })
    );
    console.error(error);
  } finally {
    dispatch(setIsLoadingModels(false));
  }
};
