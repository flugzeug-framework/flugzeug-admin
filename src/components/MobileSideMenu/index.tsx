import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Box, List, ListItem, SvgIcon } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { selectNavbarState } from "features/admin/adminSelectors";
import { changeNavbarState } from "features/admin/adminSlice";
import ListItemLink from "components/ListItemLink";
import { SideMenuProps } from 'components/SideMenu/SideMenu';
import styles from './style.module.css';

const MobileSideMenu = (props: SideMenuProps) => {
  const {
    sideMenuLabels
  } = props;

  const dispatch = useDispatch();
  const open = useSelector(selectNavbarState);
  const labels = [...sideMenuLabels];

  const switchOpen = () => dispatch(changeNavbarState());

  return (
    <Box className={`${styles.smallContent} ${!open && styles.hidden}`}>
      <Box className={`${styles.smallContainer} ${open && styles.slideInDisplay}`} width="232px">
        <List className={styles.list}>
          <div className={styles.logoContainer}>
            <img className={styles.logo} alt="logo" src="/logo.svg" />
          </div>
          <ListItem className={styles.centerItem} onClick={switchOpen}>
            <SvgIcon component={CloseIcon} />
          </ListItem>
          {labels.map(({label, path, icon}) => (
            <ListItemLink to={path} key={label} label={label} icon={icon} />
          ))}
        </List>
      </Box>
      <Box 
        className={`${styles.backContainer} ${open && styles.fadeDisplay}`}
        onClick={switchOpen}
      ></Box>
    </Box>
  )
}

export default MobileSideMenu;
