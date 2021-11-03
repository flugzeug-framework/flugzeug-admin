import React from "react";
import SortIcon from "@mui/icons-material/Sort";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { cloneDeep } from "lodash";
import { MainTableColumn, mainTableStyles } from "utils/tableUtils";
import {
  Box,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface TableHeaderProps {
  columns: MainTableColumn[];
  sortingOptions?: [string, "ASC" | "DESC"][];
  onClickSort: (sortingValues: [string, "ASC" | "DESC"][]) => void;
}

export function TableHeaderCustom({
  columns,
  sortingOptions,
  onClickSort,
}: TableHeaderProps) {
  const classes = mainTableStyles();

  const handleClickSort = (field: string) => () => {
    if (!sortingOptions || sortingOptions.length === 0) {
      onClickSort([[field, "ASC"]]);
      return;
    }

    const sortingIndex = sortingOptions.findIndex(
      ([currentField]) => currentField === field
    );

    const sortingOptionsUpdated = cloneDeep(sortingOptions);
    if (sortingIndex >= 0 && sortingOptions[sortingIndex][1] === "ASC") {
      sortingOptionsUpdated[sortingIndex][1] = "DESC";
      onClickSort(sortingOptionsUpdated);
      return;
    }

    sortingOptionsUpdated.splice(sortingIndex, 1);
    onClickSort(sortingOptionsUpdated);
  };

  const getSortIcon = (field: string) => {
    if (sortingOptions) {
      const sortValue = sortingOptions.find(
        ([currentField]) => currentField === field
      );
      if (sortValue && sortValue[1] === "DESC") {
        return <ArrowDropDownIcon fontSize="small" />;
      }

      if (sortValue && sortValue[1] === "ASC") {
        return <ArrowDropUpIcon fontSize="small" />;
      }
    }
    return <SortIcon fontSize="small" />;
  };

  return (
    <TableHead>
      <TableRow className={classes.header}>
        {columns.map((column) => (
          <TableCell key={column.field}>
            {!column.hasSorting && (
              <Typography variant="subtitle2" className={classes.title}>
                {column.headerName}
              </Typography>
            )}
            {column.hasSorting && (
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle2" className={classes.title}>
                  {column.headerName}
                </Typography>
                <IconButton
                  className={classes.iconButton}
                  onClick={handleClickSort(column.field)}
                >
                  {getSortIcon(column.field)}
                </IconButton>
              </Box>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
