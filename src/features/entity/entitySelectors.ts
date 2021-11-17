import { RootState } from "app/store";

export const selectIsLoadingEntities = (state: RootState) =>
  state.entity.isLoadingEntities;
export const selectIsLoadingSchema = (state: RootState) =>
  state.entity.isLoadingSchema;
export const selectIsLoadingModalSchema = (state: RootState) =>
  state.entity.isLoadingModalSchema;

export const selectEntityList = (state: RootState) => state.entity.entityList;
export const selectEntitySearchText = (state: RootState) =>
  state.entity.searchText;
export const selectEntitySearchOption = (state: RootState) =>
  state.entity.searchOption;
export const selectEntityCount = (state: RootState) => state.entity.count;
export const selectEntitiesPerPage = (state: RootState) =>
  state.entity.itemsPerPage;
export const selectEntitiesPage = (state: RootState) => state.entity.page;
export const selectModulesSort = (state: RootState) => state.entity.sort;
export const selectSelectedEntity = (state: RootState) =>
  state.entity.selectedEntity;
export const selectSchema = (state: RootState) => state.entity.schema;
export const selectModalSchema = (state: RootState) => state.entity.modalSchema;
