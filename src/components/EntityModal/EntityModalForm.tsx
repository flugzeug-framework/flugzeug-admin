import { Box, Button, Grid, Typography } from "@mui/material";
import { EntityFormFields } from "components/EntityFormFields/indext";
import { selectModalSchema } from "features/entity/entitySelectors";
import { setIsLoadingEntities } from "features/entity/entitySlice";
import { setToast } from "features/toast/toastSlice";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { entityService } from "services/entityService";
import { getAtributes } from "utils/entityUtils";
import { describeApiError } from "utils/errorUtils";

interface EntityModalFormProps {
  module: string;
  onCreate: (id: string) => void;
}

export function EntityModalForm({ module, onCreate }: EntityModalFormProps) {
  const dispatch = useDispatch();
  const schema = useSelector(selectModalSchema);
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (schema) {
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
  }, [schema]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(setIsLoadingEntities(true));
    try {
      const { data } = await entityService(module).create(formValues);
      onCreate(data.id);
      dispatch(
        setToast({
          message: `${module} created successfully`,
          isActive: true,
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        setToast({
          message: describeApiError(error),
          isActive: true,
          type: "error",
        })
      );
      console.error(error);
    } finally {
      dispatch(setIsLoadingEntities(false));
    }
  };

  const handleChangeForm = (updatedState: { [key: string]: any }) =>
    setFormValues(updatedState);

  return (
    <Box padding="24px" width="750px">
      <Box paddingLeft="12px" paddingBottom="32px">
        <Typography variant="h4">Create</Typography>
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
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
