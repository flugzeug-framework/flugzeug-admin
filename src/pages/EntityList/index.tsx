import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TablePagination,
  Typography,
} from "@mui/material";
import SearchInput from "components/SearchInput/SearchInput";
import { TableCustom } from "components/table/TableCustom";
import {
  getAllEntityList,
  getSchema,
  deleteEntity,
} from "features/entity/entityActions";
import {
  selectEntitiesPage,
  selectEntitiesPerPage,
  selectEntityCount,
  selectEntityList,
  selectEntitySearchOption,
  selectEntitySearchText,
  selectIsLoadingEntities,
  selectIsLoadingSchema,
  selectSchema,
} from "features/entity/entitySelectors";
import {
  setEntityPage,
  setEntityPerPage,
  setEntitySearchOption,
  setEntitySearchText,
} from "features/entity/entitySlice";
import { capitalize, noop } from "lodash";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { moduleForm } from "routes/Roots";
import { getAttributes, getMainHeaders, getMainRows } from "utils/entityUtils";

export function EntityList() {
  let { moduleName } = useParams<{ moduleName: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const schema = useSelector(selectSchema);
  const entityList = useSelector(selectEntityList);
  const entityCount = useSelector(selectEntityCount);
  const entityPerPage = useSelector(selectEntitiesPerPage);
  const page = useSelector(selectEntitiesPage);
  const searchText = useSelector(selectEntitySearchText);
  const searchOption = useSelector(selectEntitySearchOption);
  const isLoadingSchema = useSelector(selectIsLoadingSchema);
  const isLoadingEntities = useSelector(selectIsLoadingEntities);

  useEffect(() => {
    dispatch(getAllEntityList(moduleName));
    dispatch(getSchema(moduleName));
  }, [moduleName, dispatch]);

  const handleChangeSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEntitySearchText(value));
    dispatch(getAllEntityList(moduleName));
  };

  const handleChangeSelect = (e: SelectChangeEvent) => {
    dispatch(setEntitySearchOption(e.target.value));
    dispatch(setEntitySearchText(""));
    dispatch(getAllEntityList(moduleName));
  };

  const handleClickEdit = (id: string) => () => {
    history.push(moduleForm(moduleName, id));
  };

  const handleClickDelete = (id: string) => () => {
    dispatch(deleteEntity(moduleName, Number(id)));
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(setEntityPage(newPage + 1));
    dispatch(getAllEntityList(moduleName));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setEntityPerPage(parseInt(event.target.value, 10)));
    dispatch(setEntityPage(1));
    dispatch(getAllEntityList(moduleName));
  };

  const handleClickCreate = () => {
    history.push(moduleForm(moduleName));
  };

  return (
    <Fragment>
      <Box
        padding="32px 24px 24px 24px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">{`${capitalize(moduleName)} List`}</Typography>
        <Button variant="contained" onClick={handleClickCreate}>
          Create
        </Button>
      </Box>
      <Box
        padding="24px"
        paddingTop={0}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Box width="200px" marginRight="24px">
          <FormControl>
            <InputLabel id={`search-select`}>Search by</InputLabel>
            <Select
              labelId={`search-select`}
              id="search-select"
              name="search"
              value={searchOption}
              label="Search by"
              onChange={handleChangeSelect}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {getAttributes(schema).map((value) => (
                <MenuItem value={value}>{capitalize(value)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <SearchInput value={searchText} onChange={handleChangeSearch} />
      </Box>
      <TableCustom
        isLoading={isLoadingEntities || isLoadingSchema}
        columns={getMainHeaders(schema)}
        noRowsMessage="Models not found"
        rows={getMainRows(
          entityList,
          schema ?? {},
          handleClickEdit,
          handleClickDelete
        )}
        onClickSort={noop}
      />
      <TablePagination
        component="div"
        count={entityCount}
        page={page - 1}
        rowsPerPageOptions={[1, 5, 10, 15, 20]}
        onPageChange={handleChangePage}
        rowsPerPage={entityPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Fragment>
  );
}
