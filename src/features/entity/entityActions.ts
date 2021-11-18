import { AppThunk } from "app/store";
import { setToast } from "features/toast/toastSlice";
import { ServiceOptions } from "services/baseService";
import { describeApiError } from "utils/errorUtils";
import {
  setIsLoadingEntities,
  setEntityList,
  setEntityCount,
  setSchema,
  setSelectedEntity,
  setIsLoadingSchema,
  setIsLoadingModalSchema,
  setModalSchema,
} from "./entitySlice";
import {
  selectEntitySearchText,
  selectEntitiesPerPage,
  selectEntitiesPage,
  selectModulesSort,
  selectEntitySearchOption,
} from "./entitySelectors";
import { entityService } from "services/entityService";
import { EntityModel } from "models/entityModel";

export const getAllEntityList = (controllerName: string): AppThunk => async (
  dispatch,
  getState
) => {
  const state = getState();
  const searchText = selectEntitySearchText(state);
  const searchOption = selectEntitySearchOption(state);
  const limit = selectEntitiesPerPage(state);
  const page = selectEntitiesPage(state);
  const offset = (page - 1) * limit;
  const order = selectModulesSort(state);
  const opts: ServiceOptions = {
    limit,
    offset,
    order,
  };

  if (searchText.length && searchOption.length) {
    opts.where = {
      [searchOption]: { $like: `%${searchText}%` },
    };
  }

  dispatch(setIsLoadingEntities(true));
  try {
    const { data, count } = await entityService(controllerName).getAll(opts);

    dispatch(setEntityList(data));
    dispatch(setEntityCount(count));
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
    dispatch(setIsLoadingEntities(false));
  }
};

export const getEntityById = (
  controllerName: string,
  id: number
): AppThunk => async (dispatch) => {
  dispatch(setIsLoadingEntities(true));
  try {
    const { data } = await entityService(controllerName).getById(id);

    dispatch(setSelectedEntity(data));
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
    dispatch(setIsLoadingEntities(false));
  }
};

export const createEntity = (
  controllerName: string,
  entity: EntityModel
): AppThunk => async (dispatch) => {
  dispatch(setIsLoadingEntities(true));
  let success = false;
  try {
    await entityService(controllerName).create(entity);
    dispatch(
      setToast({
        message: `${controllerName} created successfully`,
        isActive: true,
        type: "success",
      })
    );
    success = true;
  } catch (error) {
    dispatch(
      setToast({
        message: describeApiError(error),
        isActive: true,
        type: "error",
      })
    );
    console.error(error);
    success = false;
  } finally {
    dispatch(setIsLoadingEntities(false));
    return success;
  }
};

export const updateEntity = (
  controllerName: string,
  id: number,
  entity: EntityModel
): AppThunk => async (dispatch) => {
  dispatch(setIsLoadingEntities(true));

  let success = false;
  try {
    await entityService(controllerName).update(id, entity);
    dispatch(
      setToast({
        message: `${controllerName} updated successfully`,
        isActive: true,
        type: "success",
      })
    );
    success = true;
  } catch (error) {
    dispatch(
      setToast({
        message: describeApiError(error),
        isActive: true,
        type: "error",
      })
    );
    console.error(error);
    success = false;
  } finally {
    dispatch(setIsLoadingEntities(false));
    return success;
  }
};

export const deleteEntity = (
  controllerName: string,
  id: number
): AppThunk => async (dispatch) => {
  dispatch(setIsLoadingEntities(true));
  try {
    await entityService(controllerName).delete(id);
    dispatch(getAllEntityList(controllerName));
    dispatch(
      setToast({
        message: `${controllerName} deleted successfully`,
        isActive: true,
        type: "success",
      })
    );
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
    dispatch(setIsLoadingEntities(false));
  }
};

export const getSchema = (
  controllerName: string,
  isModalSchema = false
): AppThunk => async (dispatch) => {
  dispatch(
    isModalSchema ? setIsLoadingModalSchema(true) : setIsLoadingSchema(true)
  );
  try {
    const { data } = await entityService(controllerName).getSchema();

    dispatch(isModalSchema ? setModalSchema(data) : setSchema(data));
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
    dispatch(
      isModalSchema ? setIsLoadingModalSchema(false) : setIsLoadingSchema(false)
    );
  }
};
