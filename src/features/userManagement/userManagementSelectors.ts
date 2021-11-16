import { RootState } from "app/store";

export const selectIsLoadingUsers = (state: RootState) =>
  state.userManagement.isLoadingUsers;

export const selectUsers = (state: RootState) => state.userManagement.users;
export const selectUsersSearchText = (state: RootState) =>
  state.userManagement.searchText;
export const selectUsersCount = (state: RootState) =>
  state.userManagement.count;
export const selectUsersPerPage = (state: RootState) =>
  state.userManagement.itemsPerPage;
export const selectUsersPage = (state: RootState) => state.userManagement.page;
export const selectUsersSort = (state: RootState) => state.userManagement.sort;
export const selectRoles = (state: RootState) => state.userManagement.roles;
export const selectSelectedUser = (state: RootState) =>
  state.userManagement.selectedUser;
