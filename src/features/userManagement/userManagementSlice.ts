import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoleModel } from "models/roleModel";
import { UserModel } from "models/userModel";

interface UserManagementState {
  isLoadingUsers: boolean;
  users: UserModel[];
  searchText: string;
  count: number;
  itemsPerPage: number;
  page: number;
  sort: [string, "ASC" | "DESC"][];
  roles: RoleModel[];
  selectedUser: UserModel | null;
}

const initialState: UserManagementState = {
  isLoadingUsers: false,
  users: [],
  searchText: "",
  count: 0,
  itemsPerPage: 10,
  page: 1,
  sort: [],
  roles: [],
  selectedUser: null,
};

export const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    setIsLoadingUsers: (state, action: PayloadAction<boolean>) => {
      state.isLoadingUsers = action.payload;
    },
    setUsers: (state, action: PayloadAction<UserModel[]>) => {
      state.users = action.payload;
    },
    setUsersSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
      state.page = 1;
    },
    setUsersCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setUsersPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setUsersPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setUsersSort: (
      state,
      action: PayloadAction<[string, "ASC" | "DESC"][]>
    ) => {
      state.sort = action.payload;
    },
    setRoles: (state, action: PayloadAction<RoleModel[]>) => {
      state.roles = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<UserModel | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const {
  setIsLoadingUsers,
  setUsers,
  setUsersSearchText,
  setUsersCount,
  setUsersPerPage,
  setUsersPage,
  setUsersSort,
  setRoles,
  setSelectedUser,
} = userManagementSlice.actions;

export const userManagementReducer = userManagementSlice.reducer;
