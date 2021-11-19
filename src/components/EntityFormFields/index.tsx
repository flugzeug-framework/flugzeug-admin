import { ManageSearch } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { 
  MobileDateTimePicker,
  LocalizationProvider
} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { EntityModal } from "components/EntityModal";
import { capitalize, cloneDeep } from "lodash";
import { SchemaModel } from "models/entityModel";
import React, { Fragment, useState } from "react";
import { getAtributes } from "utils/entityUtils";

interface EntityFormFieldsProps {
  formValues: { [key: string]: any };
  schema?: SchemaModel;
  onChangeForm: (state: { [key: string]: any }) => void;
}

export function EntityFormFields({
  formValues,
  schema,
  onChangeForm,
}: EntityFormFieldsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clonedFormValues = cloneDeep(formValues);
    clonedFormValues[e.target.name] = e.target.value;
    onChangeForm(clonedFormValues);
  };

  const handleChangeSelect = (e: SelectChangeEvent) => {
    const clonedFormValues = cloneDeep(formValues);
    clonedFormValues[e.target.name] = e.target.value;
    onChangeForm(clonedFormValues);
  };

  const handleChangeModal = (field: string) => (id: string) => {
    const clonedFormValues = cloneDeep(formValues);
    clonedFormValues[field] = id;
    onChangeForm(clonedFormValues);
    setIsModalOpen(false);
  };

  const handleChangeDate = (value: Date | null, field: string) => {
    //const clonedFormValues = cloneDeep(formValues);
    console.log(typeof value)
  }

  const handleClickAddIcon = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Fragment>
      {schema ? (
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
                <Grid
                  item
                  display="flex"
                  alignItems="center"
                  width={field.references ? "calc(25% + 34px)" : "25%"}
                  key={key}
                >
                  <TextField
                    size="small"
                    label={capitalize(field.fieldName)}
                    type="number"
                    name={field.fieldName}
                    value={formValues[key]}
                    onChange={handleChangeField}
                  />
                  {field.references && (
                    <Fragment>
                      <IconButton
                        size="small"
                        aria-label="add"
                        onClick={handleClickAddIcon}
                      >
                        <ManageSearch color="primary" />
                      </IconButton>
                      <EntityModal
                        isOpen={isModalOpen}
                        modelName={field.references.model}
                        onClose={handleCloseModal}
                        onSelectOption={handleChangeModal(field.fieldName)}
                      />
                    </Fragment>
                  )}
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
                        <MenuItem key={`${field.fieldName}-${value}`} value={value}>{capitalize(value)}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              );
            case "boolean":
              return (
                <Grid item width="25%" key={key}>
                  <FormControl>
                    <FormControlLabel
                      control={
                        <Switch value={formValues[key]} />
                      }
                      label={capitalize(field.fieldName)}
                    />
                  </FormControl>
                </Grid>
              );
            case "date":
              return (
                <Grid item width="25%" key={key}>
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <MobileDateTimePicker
                      label={capitalize(field.fieldName)}
                      value={formValues[key]}
                      onChange={(value: Date | null) => handleChangeDate(value, field.fieldName)}
                      renderInput={(params:any) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              );
            case "float":
              return (
                <Grid
                  item
                  display="flex"
                  alignItems="center"
                  width={field.references ? "calc(25% + 34px)" : "25%"}
                  key={key}
                >
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
            default:
              return null;
          }
        })
      ) : (
        <Typography>No schema</Typography>
      )}
    </Fragment>
  );
}