import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  isLoadingModels: boolean;
  models: string[];
  searchText: string;
  count: number;
  itemsPerPage: number;
  page: number;
  sort: [string, "ASC" | "DESC"][];
  selectedModel: string | null;
  openNavbar: boolean;
}

const initialState: AdminState = {
  isLoadingModels: false,
  models: [],
  searchText: "",
  count: 0,
  itemsPerPage: 10,
  page: 1,
  sort: [],
  selectedModel: null,
  openNavbar: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setIsLoadingModels: (state, action: PayloadAction<boolean>) => {
      state.isLoadingModels = action.payload;
    },
    setModels: (state, action: PayloadAction<string[]>) => {
      state.models = action.payload;
    },
    setModelSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
      state.page = 1;
    },
    setModelsCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setModelsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setModelsPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setModelsSort: (
      state,
      action: PayloadAction<[string, "ASC" | "DESC"][]>
    ) => {
      state.sort = action.payload;
    },
    setSelectedModel: (state, action: PayloadAction<string | null>) => {
      state.selectedModel = action.payload;
    },
    changeNavbarState: (state) => {
      state.openNavbar = !state.openNavbar
    }
  },
});

export const {
  setIsLoadingModels,
  setModels,
  setModelSearchText,
  setModelsCount,
  setModelsPerPage,
  setModelsPage,
  setModelsSort,
  setSelectedModel,
  changeNavbarState,
} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
