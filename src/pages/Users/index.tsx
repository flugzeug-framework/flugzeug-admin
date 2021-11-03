import { Box, Button, TablePagination, Typography } from "@mui/material";
import { ActionIcons } from "components/ActionIcons/ActionIcons";
import SearchInput from "components/SearchInput/SearchInput";
import { TableCustom } from "components/table/TableCustom";
import {
  deleteUser,
  getAllUsers,
} from "features/userManagement/userManagementActions";
import {
  selectIsLoadingUsers,
  selectUsers,
  selectUsersCount,
  selectUsersPage,
  selectUsersPerPage,
  selectUsersSearchText,
} from "features/userManagement/userManagementSelectors";
import {
  setSelectedUser,
  setUsersPage,
  setUsersPerPage,
  setUsersSearchText,
  setUsersSort,
} from "features/userManagement/userManagementSlice";
import { UserModel } from "models/userModel";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { user } from "routes/Roots";
import { MainTableCell, MainTableColumn, MainTableRow } from "utils/tableUtils";

export const mainTableHeaderColumns: MainTableColumn[] = [
  {
    field: "firstName",
    headerName: "name",
    hasSorting: true,
  },
  {
    field: "lastName",
    headerName: "last name",
    hasSorting: true,
  },
  {
    field: "email",
    headerName: "email",
  },
  {
    field: "role",
    headerName: "role",
  },
  { field: "action", headerName: "Action" },
];

export function Users() {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectIsLoadingUsers);
  const usersCount = useSelector(selectUsersCount);
  const userPerPage = useSelector(selectUsersPerPage);
  const page = useSelector(selectUsersPage);
  const searchText = useSelector(selectUsersSearchText);

  const [sortingOptions, setSortingOptions] = useState<
    [string, "ASC" | "DESC"][]
  >([]);

  useEffect(() => {
    dispatch(setUsersSort([]));
    dispatch(setUsersPerPage(10));
    dispatch(setUsersPage(1));
    dispatch(setUsersSearchText(""));
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleClickSorting = (sortingValues: [string, "ASC" | "DESC"][]) => {
    setSortingOptions(sortingValues);
    dispatch(setUsersSort(sortingValues));
    dispatch(getAllUsers());
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(setUsersPage(newPage + 1));
    dispatch(getAllUsers());
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setUsersPerPage(parseInt(event.target.value, 10)));
    dispatch(setUsersPage(1));
    dispatch(getAllUsers());
  };

  const handleChangeSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsersSearchText(value));
    dispatch(getAllUsers());
  };

  const handleClickDelete = (id: string) => {
    dispatch(deleteUser(Number(id)));
  };
  const handleClickEdit = (id: string) => {
    const foundUser = users.find((user) => user.id?.toString() === id);
    if (foundUser) {
      dispatch(setSelectedUser(foundUser));
      history.push(user(id));
    }
  };

  const handleClickCreate = () => {
    history.push(user());
  };

  const getRows = (
    expenses: UserModel[],
    onClickDelete: (id: string) => void,
    onClickEdit: (id: string) => void
  ): MainTableRow[] =>
    expenses.map((user: UserModel) => {
      const firstName: MainTableCell = { value: user.firstName ?? "" };
      const lastName: MainTableCell = { value: user.lastName ?? "" };
      const email: MainTableCell = { value: user.email };
      const role: MainTableCell = { value: user.roles[0].name };
      const action: MainTableCell = {
        value: (
          <ActionIcons
            itemId={(user.id as number).toString()}
            onClickDelete={onClickDelete}
            onClickEdit={onClickEdit}
          />
        ),
      };

      const innerCells = [firstName, lastName, email, role, action];

      return {
        innerCells,
      };
    });

  return (
    <Fragment>
      <Box
        padding="32px 24px 24px 24px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" onClick={handleClickCreate}>
          Create
        </Button>
      </Box>
      <Box
        padding="24px"
        paddingTop={0}
        display="flex"
        justifyContent="flex-end"
      >
        <SearchInput value={searchText} onChange={handleChangeSearch} />
      </Box>
      <TableCustom
        columns={mainTableHeaderColumns}
        isLoading={isLoading}
        noRowsMessage="Users not found"
        rows={getRows(users, handleClickDelete, handleClickEdit)}
        sortingOptions={sortingOptions}
        onClickSort={handleClickSorting}
      />
      <TablePagination
        component="div"
        count={usersCount}
        page={page - 1}
        rowsPerPageOptions={[1, 5, 10, 15, 20]}
        onPageChange={handleChangePage}
        rowsPerPage={userPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Fragment>
  );
}
