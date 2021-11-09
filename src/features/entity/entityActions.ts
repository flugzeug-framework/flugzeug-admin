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
} from "./entitySlice";
import {
  selectEntitySearchText,
  selectEntitiesPerPage,
  selectEntitiesPage,
  selectModulesSort,
} from "./entitySelectors";
import { entityService } from "services/entityService";
import { EntityModel } from "models/entityModel";

export const getAllEntityList = (controllerName: string): AppThunk => async (
  dispatch,
  getState
) => {
  const state = getState();
  const searchText = selectEntitySearchText(state);
  const limit = selectEntitiesPerPage(state);
  const page = selectEntitiesPage(state);
  const offset = (page - 1) * limit;
  const order = selectModulesSort(state);
  const opts: ServiceOptions = {
    limit,
    offset,
    order,
  };

  if (searchText.length) {
    opts.where = {
      name: { $iLike: `%${searchText}%` },
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

// TODO: change service methods for real ones
export const getAllEntity = (controllerName: string): AppThunk => async (
  dispatch
) => {
  dispatch(setIsLoadingEntities(true));
  try {
    const data = await entityService(controllerName).getAllFakeData(
      controllerName
    );

    dispatch(setEntityList(data));
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
    const data = await entityService(controllerName).getFakeDataById(
      controllerName,
      id
    );

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
  try {
    const data = await entityService(controllerName).create(entity);
    console.log(data);
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

export const updateEntity = (
  controllerName: string,
  id: number,
  entity: EntityModel
): AppThunk => async (dispatch) => {
  dispatch(setIsLoadingEntities(true));
  try {
    const data = await entityService(controllerName).update(id, entity);
    console.log(data);
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

export const deleteEntity = (
  controllerName: string,
  id: number
): AppThunk => async (dispatch) => {
  dispatch(setIsLoadingEntities(true));
  try {
    await entityService(controllerName).delete(id);
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

export const getSchema = (controllerName: string): AppThunk => async (
  dispatch
) => {
  dispatch(setIsLoadingSchema(true));
  try {
    const data = await entityService(controllerName).getFakeSchema(
      controllerName
    );

    dispatch(setSchema(data));
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
    dispatch(setIsLoadingSchema(false));
  }
};
