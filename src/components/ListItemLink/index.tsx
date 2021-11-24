import React from "react";
import { ListItem, ListItemText, SvgIcon, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Link, LinkProps, useLocation } from "react-router-dom";
import { useStyles } from './style';

export interface ListItemLinkProps {
  icon?: OverridableComponent<SvgIconTypeMap<{},"svg">>;
  label: string;
  to: string;
}

function ListItemLink (props: ListItemLinkProps) {
  const { icon, label, to } = props;

  const classes = useStyles();
  const location = useLocation();

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
      {icon && <SvgIcon component={icon} />}
      <ListItemText
        disableTypography
        className={classes.listItemText}
        primary={label}
      />
    </ListItem>
  );
}

export default ListItemLink;