import { Box, Button, TablePagination, Typography } from "@mui/material";
import { TableCustom } from "components/table/TableCustom";
import { getAllEntityList, getSchema } from "features/entity/entityActions";
import {
  selectEntitiesPage,
  selectEntitiesPerPage,
  selectEntityCount,
  selectEntityList,
  selectIsLoadingEntities,
  selectIsLoadingModalSchema,
  selectModalSchema,
} from "features/entity/entitySelectors";
import { setEntityPage, setEntityPerPage } from "features/entity/entitySlice";
import { capitalize, noop } from "lodash";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainHeaders, getModalRows } from "utils/entityUtils";

interface EntityModalTableProps {
  moduleName: string;
  onClickCreate: VoidFunction;
  onClicKOption: (id: string) => void;
}

export function EntityModalTable({
  moduleName,
  onClickCreate,
  onClicKOption,
}: EntityModalTableProps) {
  const dispatch = useDispatch();
  const schema = useSelector(selectModalSchema);
  const entityList = useSelector(selectEntityList);
  const entityCount = useSelector(selectEntityCount);
  const entityPerPage = useSelector(selectEntitiesPerPage);
  const page = useSelector(selectEntitiesPage);
  const isLoadingSchema = useSelector(selectIsLoadingModalSchema);
  const isLoadingEntities = useSelector(selectIsLoadingEntities);

  useEffect(() => {
    dispatch(getAllEntityList(moduleName));
    dispatch(getSchema(moduleName, true));
  }, [moduleName, dispatch]);

  const handleClickCheck = (id: string) => () => {
    onClicKOption(id);
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
    onClickCreate();
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
      <TableCustom
        isLoading={isLoadingEntities || isLoadingSchema}
        columns={getMainHeaders(schema)}
        noRowsMessage="Models not found"
        rows={getModalRows(entityList, schema ?? {}, handleClickCheck)}
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
