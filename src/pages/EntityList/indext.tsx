import { Box, Button, TablePagination, Typography } from "@mui/material";
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
  selectIsLoadingEntities,
  selectIsLoadingSchema,
  selectSchema,
} from "features/entity/entitySelectors";
import { setEntityPage, setEntityPerPage } from "features/entity/entitySlice";
import { capitalize, noop } from "lodash";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { moduleForm } from "routes/Roots";
import { getMainHeaders, getMainRows } from "utils/entityUtils";

export function EntityList() {
  let { moduleName } = useParams<{ moduleName: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const schema = useSelector(selectSchema);
  const entityList = useSelector(selectEntityList);
  const entityCount = useSelector(selectEntityCount);
  const entityPerPage = useSelector(selectEntitiesPerPage);
  const page = useSelector(selectEntitiesPage);
  const isLoadingSchema = useSelector(selectIsLoadingSchema);
  const isLoadingEntities = useSelector(selectIsLoadingEntities);

  useEffect(() => {
    dispatch(getAllEntityList(moduleName));
    dispatch(getSchema(moduleName));
  }, [moduleName, dispatch]);

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

  if (isLoadingSchema || isLoadingEntities) {
    return <Fragment>Loading</Fragment>;
  }

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
