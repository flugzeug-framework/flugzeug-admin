import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { TableCustom } from "components/table/TableCustom";
import {
  getAllEntityList,
  getAllEntity,
  getSchema,
  deleteEntity,
} from "features/entity/entityActions";
import {
  selectEntityList,
  selectSchema,
} from "features/entity/entitySelectors";
import { capitalize, noop } from "lodash";
import { EntityModel, SchemaModel } from "models/entityModel";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { moduleForm } from "routes/Roots";
import { MainTableCell, MainTableColumn, MainTableRow } from "utils/tableUtils";

export function EntityList() {
  let { moduleName } = useParams<{ moduleName: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const schema = useSelector(selectSchema);
  const entityList = useSelector(selectEntityList);

  useEffect(() => {
    dispatch(getAllEntityList(moduleName));
    dispatch(getAllEntity(moduleName));
    dispatch(getSchema(moduleName));
  }, [moduleName, dispatch]);

  const handleClickEdit = (id: string) => () => {
    history.push(moduleForm(moduleName, id));
  };

  const handleClickDelete = (id: string) => () => {
    // history.push(moduleForm(moduleName, id));
    dispatch(deleteEntity(moduleName, Number(id)));
  };

  const getHeaders = (schema?: SchemaModel): MainTableColumn[] => {
    if (!schema) return [];

    const headers: MainTableColumn[] = [];

    const entries = Object.entries(schema);
    entries.sort();

    for (const [, value] of entries) {
      headers.push({
        field: value.fieldName,
        headerName: value.fieldName,
      });
    }

    return [{ field: "actions", headerName: "actions" }, ...headers];
  };

  const getRows = (entities: EntityModel[]): MainTableRow[] =>
    entities.map((entity: EntityModel) => {
      const entityValues: MainTableCell[] = [];
      for (const [, value] of Object.entries(entity)) {
        entityValues.push({ value: value.toString() });
      }
      const action: MainTableCell = {
        value: (
          <Box
            alignItems="center"
            display="flex"
            width="100%"
            marginLeft="-8px"
            maxWidth="120px"
          >
            <IconButton aria-label="Edit" onClick={handleClickEdit(entity.id)}>
              <Edit color="primary" />
            </IconButton>
            <IconButton
              aria-label="Edit"
              onClick={handleClickDelete(entity.id)}
            >
              <Delete color="primary" />
            </IconButton>
          </Box>
        ),
      };

      const innerCells = [action, ...entityValues];

      return {
        innerCells,
      };
    });

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
      <TableCustom
        columns={getHeaders(schema)}
        noRowsMessage="Models not found"
        rows={getRows(entityList)}
        onClickSort={noop}
      />
    </Fragment>
  );
}
