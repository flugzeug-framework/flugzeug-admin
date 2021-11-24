import React from "react";
import { Box, List, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ListItemLink from "components/ListItemLink";
import { useStyles } from './style';

export interface SideMenuLabels {
  label: string;
  path: string;
  icon: OverridableComponent<SvgIconTypeMap<{},"svg">>
};

export interface SideMenuProps {
  sideMenuLabels: SideMenuLabels[]
}

export function SideMenu(props: SideMenuProps) {
  const {
    sideMenuLabels
  } = props;

  // const currentUser = useSelector(selectCurrentUser);
  const classes = useStyles();
  const labels = [...sideMenuLabels];

  return (
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
  );
}
