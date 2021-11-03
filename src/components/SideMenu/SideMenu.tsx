import { Box, List, ListItem, ListItemText, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { Fragment } from "react";
import { Link, LinkProps, useLocation } from "react-router-dom";
import { home, profile, users } from "routes/Roots";

enum SideMenuLabels {
  HOME = "Home",
  USERS = "Users",
  PROFILE = "Profile",
}

interface ListItemLinkProps {
  icon?: React.ReactElement;
  label: string;
  to: string;
}

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "&.Mui-selected": {
        backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main} 100%, ${theme.palette.secondary.main} 0%)`,
        color: "white",
      },
    },
    list: {
      height: "100vh",
    },
    listItem: {
      height: "64px",
      color: theme.palette.primary.dark,
    },
    listItemText: {
      paddingLeft: "42px",
      fontWeight: "bold",
      fontFamily: theme.typography.fontFamily,
      lineHeight: "1.43",
      letterSpacing: "0.01071em",
      fontSize: "1rem",
      wordWrap: "break-word",
    },
    logoContainer: {
      margin: "0 auto",
      paddingTop: "24px",
      width: "111px",
    },
    logo: {
      maxWidth: "100%",
      height: "auto",
    },
    container: {
      backgroundColor: "#FFFFFF",
      bottom: "0",
      boxShadow: "1px 1px 8px #0000001A",
      left: "0",
      position: "fixed",
      top: "0",
      zIndex: 10,
      [theme.breakpoints.down("sm")]: {
        boxShadow: "none",
      },
      height: "100%",
    },
  })
);

export function SideMenu({ children }: any) {
  const location = useLocation();
  // const currentUser = useSelector(selectCurrentUser);
  const classes = useStyles();
  const labels = [...Object.values(SideMenuLabels)];

  const getPath = (label: string) => {
    switch (label) {
      case SideMenuLabels.HOME:
        return home();
      case SideMenuLabels.USERS:
        return users();
      case SideMenuLabels.PROFILE:
        return profile();
      default:
        return home();
    }
  };

  const ListItemLink = (props: ListItemLinkProps) => {
    const { label, to } = props;
    const isSelected = location.pathname.split("/")[1] === to.split("/")[1];

    const renderLink = React.useMemo(
      () =>
        React.forwardRef<any, Omit<LinkProps, "to">>((itemProps, ref) => (
          <Link to={to} ref={ref} {...itemProps} />
        )),
      [to]
    );

    return (
      <ListItem
        className={classes.listItem}
        classes={{ selected: classes.root }}
        button
        component={renderLink}
        selected={isSelected}
      >
        <ListItemText
          disableTypography
          className={classes.listItemText}
          primary={label}
        />
      </ListItem>
    );
  };

  return (
    <Fragment>
      <Box className={classes.container} width="232px">
        <List className={classes.list}>
          <div className={classes.logoContainer}>
            <img className={classes.logo} alt="logo" src="/logo.svg" />
          </div>
          {labels.map((label) => (
            <ListItemLink to={getPath(label)} key={label} label={label} />
          ))}
        </List>
      </Box>
      <Box
        className={classes.content}
        minHeight={`calc(100vh - 64px})`}
        paddingLeft="232px"
        width="100%"
      >
        {children}
      </Box>
    </Fragment>
  );
}
