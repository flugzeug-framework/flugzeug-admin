import { Check, Delete, Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { isBoolean } from "lodash";
import { EntityModel, SchemaModel } from "models/entityModel";
import { MainTableCell, MainTableColumn, MainTableRow } from "utils/tableUtils";

export const getMainHeaders = (schema?: SchemaModel): MainTableColumn[] => {
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

export const getAttributes = (schema?: SchemaModel): string[] => {
  if (!schema) return [];

  const headers: string[] = [];

  const entries = Object.entries(schema);
  entries.sort();

  for (const [, value] of entries) {
    headers.push(value.fieldName);
  }

  return headers;
};

const mapEntityToTableCells = (entity: EntityModel, schema: SchemaModel) => {
  const updatedEntity: EntityModel = {};
  const entries = Object.entries(schema);
  entries.sort();

  for (const [, value] of entries) {
    updatedEntity[value.fieldName] = "";
  }
  const mergedEntity: EntityModel = { ...updatedEntity, ...entity };

  const entityValues: MainTableCell[] = [];
  for (const [, value] of Object.entries(mergedEntity)) {
    entityValues.push({
      value: value || isBoolean(value) ? value.toString() : "- -",
    });
  }
  return entityValues;
};

export const getMainRows = (
  entities: EntityModel[],
  schema: SchemaModel,
  onClickEdit: (id: string) => () => void,
  onClickDelete: (id: string) => () => void
): MainTableRow[] => {
  return entities.map((entity: EntityModel) => {
    const entityValues = mapEntityToTableCells(entity, schema);
    const action: MainTableCell = {
      value: (
        <Box
          alignItems="center"
          display="flex"
          width="100%"
          marginLeft="-8px"
          maxWidth="120px"
        >
          <IconButton aria-label="Edit" onClick={onClickEdit(entity.id)}>
            <Edit color="primary" />
          </IconButton>
          <IconButton aria-label="Edit" onClick={onClickDelete(entity.id)}>
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
};

export const getModalRows = (
  entities: EntityModel[],
  schema: SchemaModel,
  onClickCheck: (id: string) => () => void
): MainTableRow[] => {
  return entities.map((entity: EntityModel) => {
    const entityValues = mapEntityToTableCells(entity, schema);
    const action: MainTableCell = {
      value: (
        <Box
          alignItems="center"
          display="flex"
          width="100%"
          marginLeft="-8px"
          maxWidth="120px"
        >
          <IconButton aria-label="Edit" onClick={onClickCheck(entity.id)}>
            <Check color="primary" />
          </IconButton>
        </Box>
      ),
    };

    const innerCells = [action, ...entityValues];

    return {
      innerCells,
    };
  });
};

export const getAtributes = (currentSchema: SchemaModel) => {
  const entries = Object.entries(currentSchema);
  entries.sort();
  return entries;
};
