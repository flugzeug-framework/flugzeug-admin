import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import {
  createEntity,
  getEntityById,
  getSchema,
  updateEntity,
} from "features/entity/entityActions";
import {
  selectSchema,
  selectSelectedEntity,
} from "features/entity/entitySelectors";
import { setSchema, setSelectedEntity } from "features/entity/entitySlice";
import { capitalize, cloneDeep } from "lodash";
import { SchemaModel } from "models/entityModel";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { entityService } from "services/entityService";

export function EntityForm() {
  let { moduleName, id } = useParams<{
    moduleName: string;
    id: string | undefined;
  }>();
  const isEditMode = () => id !== "new";
  const dispatch = useDispatch();
  const schema = useSelector(selectSchema);
  const currentEntity = useSelector(selectSelectedEntity);
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    dispatch(getSchema(moduleName));

    return () => {
      dispatch(setSchema(undefined));
      dispatch(setSelectedEntity(null));
    };
  }, [moduleName, dispatch]);

  useEffect(() => {
    if (id) entityService(moduleName).getById(id);

    if (id) dispatch(getEntityById(moduleName, Number(id)));
  }, [moduleName, id, dispatch]);

  useEffect(() => {
    if (schema && !isEditMode()) {
      const arrAttributes = getAtributes(schema).map(([string, attr]) => {
        let defaultValue: string | boolean = "";

        switch (attr.type) {
          case "boolean":
            defaultValue = false;
            break;

          default:
            defaultValue = "";
            break;
        }

        return [string, defaultValue];
      });
      const objAttr = Object.fromEntries(arrAttributes);

      setFormValues(objAttr);
      setIsLoading(false);
    }

    if (isEditMode() && schema && currentEntity) {
      const arrAttributes = getAtributes(schema).map(([string]) => {
        return [string, currentEntity[string]];
      });
      const objAttr = Object.fromEntries(arrAttributes);

      setFormValues(objAttr);
      setIsLoading(false);
    }
  }, [schema, currentEntity]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEditMode()) {
      dispatch(updateEntity(moduleName, Number(id), formValues));
    } else {
      dispatch(createEntity(moduleName, formValues));
    }
  };

  const getAtributes = (currentSchema: SchemaModel) => {
    const entries = Object.entries(currentSchema);
    entries.sort();
    return entries;
  };

  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clonedFormValues = cloneDeep(formValues);
    clonedFormValues[e.target.name] = e.target.value;
    console.log(clonedFormValues);

    setFormValues(clonedFormValues);
  };

  const handleChangeSelect = (e: SelectChangeEvent) => {
    const clonedFormValues = cloneDeep(formValues);
    clonedFormValues[e.target.name] = e.target.value;
    console.log(clonedFormValues);
    setFormValues(clonedFormValues);
  };

  return (
    <Box padding="24px">
      <Card>
        <Box padding="24px">
          <Box paddingLeft="12px" paddingBottom="32px">
            <Typography variant="h4">
              {isEditMode() ? "Edit" : "Create"}
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container rowSpacing={2} direction="column">
              {!isLoading && schema ? (
                getAtributes(schema).map(([key, field]) => {
                  switch (field.type) {
                    case "string":
                      return (
                        <Grid item width="25%" key={key}>
                          <TextField
                            size="small"
                            label={capitalize(field.fieldName)}
                            type="text"
                            name={field.fieldName}
                            value={formValues[key]}
                            onChange={handleChangeField}
                          />
                        </Grid>
                      );
                    case "integer":
                      return (
                        <Grid item width="25%" key={key}>
                          <TextField
                            size="small"
                            label={capitalize(field.fieldName)}
                            type="number"
                            name={field.fieldName}
                            value={formValues[key]}
                            onChange={handleChangeField}
                          />
                        </Grid>
                      );
                    case "enum":
                      return (
                        <Grid item width="25%" key={key}>
                          <FormControl>
                            <InputLabel id={`${field.fieldName}-select`}>
                              {capitalize(field.fieldName)}
                            </InputLabel>
                            <Select
                              labelId={`${field.fieldName}-select`}
                              id={field.fieldName}
                              name={field.fieldName}
                              value={formValues[key]}
                              label={capitalize(field.fieldName)}
                              onChange={handleChangeSelect}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {field.values?.map((value) => (
                                <MenuItem value={value}>
                                  {capitalize(value)}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      );

                    default:
                      return null;
                  }
                })
              ) : (
                <Typography>No schema</Typography>
              )}
              <Grid item>
                <Button type="submit" variant="contained">
                  {isEditMode() ? "Save" : "Create"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Card>
    </Box>
  );
}
