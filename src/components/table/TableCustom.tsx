// import {
//   Box,
//   Table,
//   TableBody,
//   TableContainer,
//   Typography,
// } from "@material-ui/core";
// import { LoadingSpinner } from "components/LoadingSpinner";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { LoadingSpinner } from "components/LoadingSpinner/LoadingSpinner";
import { TableHeaderCustom } from "components/table/TableHeaderCustom";
import React from "react";
import { MainTableColumn, MainTableRow } from "utils/tableUtils";
// import { MainTableColumn, MainTableRow } from "utils/tableUtils";
import { TableRowCustom } from "./TableRowCustom";

interface TableCustomProps {
  columns: MainTableColumn[];
  isLoading?: boolean;
  noRowsMessage?: string;
  rows: MainTableRow[];
  sortingOptions?: [string, "ASC" | "DESC"][];
  footerRow?: MainTableRow;
  onClickSort: (sortingValues: [string, "ASC" | "DESC"][]) => void;
}

export function TableCustom({
  columns,
  isLoading = false,
  noRowsMessage = "We couldn't find any result that matched your criteria. Please try again.",
  rows,
  sortingOptions,
  footerRow,
  onClickSort,
}: TableCustomProps) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (rows.length <= 0) {
    return (
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        padding="64px"
        textAlign="center"
      >
        <Typography variant="h6">{noRowsMessage}</Typography>
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHeaderCustom
          columns={columns}
          sortingOptions={sortingOptions}
          onClickSort={onClickSort}
        />
        <TableBody>
          {rows.map((row, index) => (
            <TableRowCustom key={`row-${index}`} rowData={row} />
          ))}
          {footerRow && <TableRowCustom isFooter rowData={footerRow} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
