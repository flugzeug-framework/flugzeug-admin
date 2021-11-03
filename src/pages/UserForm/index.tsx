import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { LoadingSpinner } from "components/LoadingSpinner/LoadingSpinner";
import {
  createUser,
  getAllRoles,
  getUser,
  updateUser,
} from "features/userManagement/userManagementActions";
import {
  selectIsLoadingUsers,
  selectRoles,
  selectSelectedUser,
} from "features/userManagement/userManagementSelectors";
import { setSelectedUser } from "features/userManagement/userManagementSlice";
import { AuthType } from "models/userModel";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { users } from "routes/Roots";

export function UserForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const roles = useSelector(selectRoles);
  const isLoading = useSelector(selectIsLoadingUsers);
  const user = useSelector(selectSelectedUser);
  const { id } = useParams<{ id: string | undefined }>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [authType, setAuthType] = useState("email");

  const isEditMode = () => id !== "new";

  const handleCreateUser = async () => {
    const userData = {
      firstName,
      lastName,
      email,
      password,
      roleId: parseInt(roleId),
      authType: authType as AuthType,
    };
    const success = await dispatch(createUser(userData));
    if (success as any) {
      history.replace(users());
    }
  };

  const handleUpdateUser = async () => {
    const userData = {
      firstName,
      lastName,
      email,
      roleId: parseInt(roleId),
      authType: authType as AuthType,
    };
    const success = await dispatch(
      updateUser(parseInt(id as string), userData)
    );
    if (success as any) {
      history.replace(users());
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEditMode()) {
      handleUpdateUser();
    } else {
      handleCreateUser();
    }
  };

  useEffect(() => {
    dispatch(getAllRoles());
    if (isEditMode()) {
      // Load user details
      dispatch(getUser(parseInt(id as string)));
    } else {
      dispatch(setSelectedUser(null));
    }
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (!roles.length) return;

    if (user != null) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email);
      setRoleId(user.roles?.length ? String(user.roles[0].id) : "");
      setAuthType(user.authType || "email");
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setAuthType("email");
      // Set defaul role for new users
      setRoleId(roles[0].id.toString());
    }
    // eslint-disable-next-line
  }, [user, roles]);

  const handleFirstNameChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setFirstName(value);
  const handleLastNameChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setLastName(value);
  const handleEmailChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setEmail(value);
  const handlePasswordChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setPassword(value);

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
              <Grid item width="25%">
                <TextField
                  size="small"
                  label="Name"
                  placeholder="John"
                  type="text"
                  name="name"
                  required
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </Grid>
              <Grid item width="25%">
                <TextField
                  size="small"
                  label="Last Name"
                  placeholder="Doe"
                  type="text"
                  name="lastName"
                  required
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </Grid>
              {!isEditMode() && authType === AuthType.Email && (
                <Grid item width="25%">
                  <TextField
                    size="small"
                    label="Password"
                    type="text"
                    name="password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Grid>
              )}
              <Grid item width="25%">
                <TextField
                  size="small"
                  label="Email"
                  placeholder="john.doe@example.com"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained">
                  {isEditMode() ? "Save details" : "Create a User"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Card>
    </Box>
  );
}
