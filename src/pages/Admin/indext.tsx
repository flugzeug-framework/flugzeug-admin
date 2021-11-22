import { Visibility } from "@mui/icons-material";
import { Box, IconButton, TablePagination, Typography } from "@mui/material";
import { TableCustom } from "components/table/TableCustom";
import { getAllModels } from "features/admin/adminActions";
import {
  selectModels,
  selectModelsCount,
  selectModelsPage,
  selectModelsPerPage,
} from "features/admin/adminSelectors";
import {
  setModelSearchText,
  setModelsPage,
  setModelsPerPage,
} from "features/admin/adminSlice";
import { capitalize, noop } from "lodash";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { moduleList } from "routes/Roots";
import { MainTableCell, MainTableColumn, MainTableRow } from "utils/tableUtils";

export const mainTableHeaderColumns: MainTableColumn[] = [
  {
    field: "name",
    headerName: "name",
  },
  { field: "action", headerName: "Action" },
];

export function Admin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const modelList = useSelector(selectModels);
  const entityCount = useSelector(selectModelsCount);
  const entityPerPage = useSelector(selectModelsPerPage);
  const page = useSelector(selectModelsPage);

  useEffect(() => {
    dispatch(setModelsPerPage(10));
    dispatch(setModelsPage(0));
    dispatch(setModelSearchText(""));
    dispatch(getAllModels());
  }, [dispatch]);

  const handleClickEdit = (id: string) => () => {
    history.push(moduleList(id));
  };

  const getRows = (models: string[]): MainTableRow[] =>
    models.map((model: string) => {
      const name: MainTableCell = { value: capitalize(model) ?? "" };
      const action: MainTableCell = {
        value: (
          <Box
            alignItems="center"
            display="flex"
            width="100%"
            marginLeft="-8px"
            maxWidth="120px"
          >
            <IconButton aria-label="Edit" onClick={handleClickEdit(model)}>
              <Visibility color="primary" />
            </IconButton>
          </Box>
        ),
      };

      const innerCells = [name, action];

      return {
        innerCells,
      };
    });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(setModelsPage(newPage + 1));
    dispatch(getAllModels());
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setModelsPerPage(parseInt(event.target.value, 10)));
    dispatch(setModelsPage(1));
    dispatch(getAllModels());
  };

  return (
    <Fragment>
      <Box
        padding="32px 24px 24px 24px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">Admin</Typography>
      </Box>
      <TableCustom
        columns={mainTableHeaderColumns}
        noRowsMessage="Models not found"
        rows={getRows(modelList)}
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
