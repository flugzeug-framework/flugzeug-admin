import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, List, ListItem, SvgIcon, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import CloseIcon from '@mui/icons-material/Close';
import { selectNavbarState } from "features/admin/adminSelectors";
import { changeNavbarState } from "features/admin/adminSlice";
import ListItemLink from "components/ListItemLink";
import { useStyles } from './style';

export interface SideMenuLabels {
  label: string;
  path: string;
  icon: OverridableComponent<SvgIconTypeMap<{},"svg">>
};

interface SideMenuProps {
  sideMenuLabels: SideMenuLabels[]
}

export function SideMenu(menuProps: SideMenuProps) {
  const {
    sideMenuLabels
  } = menuProps;

  // const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const open = useSelector(selectNavbarState);
  const classes = useStyles();
  const labels = [...sideMenuLabels];

  const switchOpen = () => dispatch(changeNavbarState());

  return (
    <Fragment>
      <Box className={classes.container} width="232px">
        <List className={classes.list}>
          <div className={classes.logoContainer}>
            <img className={classes.logo} alt="logo" src="/logo.svg" />
          </div>
          {labels.map(({label, path, icon}) => (
            <ListItemLink to={path} key={label} label={label} icon={icon} />
          ))}
        </List>
      </Box>
      <Box className={`${classes.smallContent} ${!open && classes.hidden}`}>
        <Box className={`${classes.smallContainer} ${open && classes.slideInDisplay}`} width="232px">
          <List className={classes.list}>
            <div className={classes.logoContainer}>
              <img className={classes.logo} alt="logo" src="/logo.svg" />
            </div>
            <ListItem className={classes.centerItem} onClick={switchOpen}>
              <SvgIcon component={CloseIcon} />
            </ListItem>
            {labels.map(({label, path, icon}) => (
              <ListItemLink to={path} key={label} label={label} icon={icon} />
            ))}
          </List>
        </Box>
        <Box 
          className={`${classes.backContainer} ${open && classes.fadeDisplay}`}
          onClick={switchOpen}
        ></Box>
      </Box>
    </Fragment>
  );
}
