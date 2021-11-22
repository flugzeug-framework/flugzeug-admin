import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { BackButton } from "components/BackButton";
import { EntityFormFields } from "components/EntityFormFields/indext";
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
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { moduleList } from "routes/Roots";
import { getAtributes } from "utils/entityUtils";

export function EntityForm() {
  let { moduleName, id } = useParams<{
    moduleName: string;
    id: string | undefined;
  }>();
  const isEditMode = () => id !== "new";
  const dispatch = useDispatch();
  const history = useHistory();
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
    if (id !== "new") dispatch(getEntityById(moduleName, Number(id)));
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
    // eslint-disable-next-line
  }, [schema, currentEntity]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let success;
    if (isEditMode()) {
      success = await dispatch(
        updateEntity(moduleName, Number(id), formValues)
      );
    } else {
      success = await dispatch(createEntity(moduleName, formValues));
    }
    if (success as any) {
      history.push(moduleList(moduleName));
    }
  };

  const handleChangeForm = (updatedState: { [key: string]: any }) =>
    setFormValues(updatedState);

  const handleClickBack = () => history.push(moduleList(moduleName));

  return (
    <Box padding="24px">
      <BackButton onClick={handleClickBack} />
      <Card>
        <Box padding="24px">
          <Box paddingLeft="12px" paddingBottom="32px">
            <Typography variant="h4">
              {isEditMode() ? "Edit" : "Create"}
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container rowSpacing={2} direction="column">
              {!isLoading ? (
                <EntityFormFields
                  formValues={formValues}
                  schema={schema}
                  onChangeForm={handleChangeForm}
                />
              ) : (
                <Typography>Loading...</Typography>
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
