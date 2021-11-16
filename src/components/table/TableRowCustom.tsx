// import { Radio, TableCell, TableRow } from "@material-ui/core";
// import { CheckboxCustom } from "components/CheckboxCustom";
// import { DeleteIconButton } from "components/DeleteIconButton";
import { TableRow } from "@mui/material";
import React from "react";
import { MainTableRow, mainTableStyles } from "utils/tableUtils";
// import { MainTableRow, mainTableStyles } from "utils/tableUtils";
import { TableCellCustom } from "./TableCellCustom";

interface TableRowCustomProps {
  isFooter?: boolean;
  rowData: MainTableRow;
}

export function TableRowCustom({ isFooter, rowData }: TableRowCustomProps) {
  const {
    // idRow,
    innerCells,
    // isCheckedRow = false,
    // onClickCheckbox,
    // onClickDelete,
    // onChangeRadio,
  } = rowData;
  const classes = mainTableStyles();

  // const handleClickCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (onClickCheckbox && idRow) {
  //     onClickCheckbox(idRow, e.target.checked);
  //   }
  // };

  // const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (onChangeRadio && idRow) {
  //     onChangeRadio(idRow, e.target.value === idRow);
  //   }
  // };

  return (
    <TableRow className={isFooter ? classes.footerRow : classes.row}>
      {/* TODO: refactor Radio to use JSX.Element as cell value */}
      {/* {onChangeRadio && idRow && (
        <TableCell>
          <Radio
            classes={{ root: classes.radio, checked: classes.checked }}
            checked={isCheckedRow}
            value={idRow}
            onChange={handleChangeRadio}
          />
        </TableCell>
      )}
      {onClickCheckbox && idRow && (
        <TableCell>
          <CheckboxCustom
            isChecked={isCheckedRow}
            onClickCheckbox={handleClickCheckbox}
          />
        </TableCell>
      )} */}
      {innerCells.map((cell, index) => (
        <TableCellCustom key={`${cell.value}-${index}`} cellData={cell} />
      ))}
      {/* {onClickDelete && idRow && (
        <TableCell>
          <DeleteIconButton idToDelete={idRow} onClickDelete={onClickDelete} />
        </TableCell>
      )} */}
    </TableRow>
  );
}
