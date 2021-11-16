import { RootState } from "app/store";

export const selectIsLoadingModels = (state: RootState) =>
  state.admin.isLoadingModels;

export const selectModels = (state: RootState) => state.admin.models;
export const selectModelsSearchText = (state: RootState) =>
  state.admin.searchText;
export const selectModelsCount = (state: RootState) => state.admin.count;
export const selectModelsPerPage = (state: RootState) =>
  state.admin.itemsPerPage;
export const selectModelsPage = (state: RootState) => state.admin.page;
export const selectModelsSort = (state: RootState) => state.admin.sort;
export const selectSelectedModel = (state: RootState) =>
  state.admin.selectedModel;
