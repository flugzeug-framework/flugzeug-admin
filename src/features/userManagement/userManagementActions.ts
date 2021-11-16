import { AppThunk } from "app/store";
import { setToast } from "features/toast/toastSlice";
import { AuthType } from "models/userModel";
import { ServiceOptions } from "services/baseService";
import { roleService } from "services/roleService";
import { userManagementService } from "services/userManagementService";
import { describeApiError } from "utils/errorUtils";
import {
  selectUsersPage,
  selectUsersPerPage,
  selectUsersSearchText,
  selectUsersSort,
} from "./userManagementSelectors";
import {
  setIsLoadingUsers,
  setRoles,
  setSelectedUser,
  setUsers,
  setUsersCount,
} from "./userManagementSlice";

export const getAllUsers = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const searchText = selectUsersSearchText(state);
  const limit = selectUsersPerPage(state);
  const page = selectUsersPage(state);
  const offset = (page - 1) * limit;
  const order = selectUsersSort(state);
  const opts: ServiceOptions = {
    include: ["roles"],
    limit,
    offset,
    order,
  };

  if (searchText.length) {
    opts.where = {
      $or: {
        name: { $iLike: `%${searchText}%` },
        email: { $iLike: `%${searchText}%` },
      },
    };
  }

  dispatch(setIsLoadingUsers(true));
  try {
    const { data, count } = await userManagementService.getAll(opts);

    dispatch(setUsers(data));
    dispatch(setUsersCount(count));
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
    dispatch(setIsLoadingUsers(false));
  }
};

export const getUser = (userId: number): AppThunk => async (dispatch) => {
  const opts: ServiceOptions = {
    include: ["roles"],
  };
  dispatch(setIsLoadingUsers(true));
  try {
    const { data } = await userManagementService.getById(userId, opts);
    dispatch(setSelectedUser(data));
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
    dispatch(setIsLoadingUsers(false));
  }
};

export const deleteUser = (userId: number): AppThunk => async (dispatch) => {
  dispatch(setIsLoadingUsers(true));
  try {
    await userManagementService.delete(userId);
    dispatch(
      setToast({
        message: "User deleted successfully",
        isActive: true,
        type: "success",
      })
    );
    dispatch(getAllUsers());
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
    dispatch(setIsLoadingUsers(false));
  }
};

export const getAllRoles = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoadingUsers(true));
  try {
    const { data } = await roleService.getAll();
    dispatch(setRoles(data));
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
    dispatch(setIsLoadingUsers(false));
  }
};

interface CreateUserProps {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  roleId: number;
  authType: AuthType;
}

export const createUser = (userData: CreateUserProps): AppThunk => async (
  dispatch
) => {
  dispatch(setIsLoadingUsers(true));
  let success = false;
  try {
    await userManagementService.create(userData as any);
    dispatch(
      setToast({
        message: "User created successfully",
        isActive: true,
        type: "success",
      })
    );
    dispatch(getAllUsers());
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
    dispatch(setIsLoadingUsers(false));
  }
  return success;
};

export const updateUser = (
  userId: number,
  userData: CreateUserProps
): AppThunk => async (dispatch) => {
  dispatch(setIsLoadingUsers(true));
  let success = false;
  try {
    await userManagementService.update(userId, userData as any);
    dispatch(
      setToast({
        message: "User updated successfully",
        isActive: true,
        type: "success",
      })
    );
    success = true;
    dispatch(getAllUsers());
  } catch (error) {
    dispatch(
      setToast({
        message: describeApiError(error),
        isActive: true,
        type: "error",
      })
    );
    success = false;
    console.error(error);
  } finally {
    dispatch(setIsLoadingUsers(false));
    return success;
  }
};
