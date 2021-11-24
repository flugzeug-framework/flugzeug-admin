import React from 'react';
import { useDispatch } from "react-redux";
import { Box } from '@mui/system';
import { SvgIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { changeNavbarState } from "features/admin/adminSlice";
import styles from './style.module.css';

export enum ColorPageWrapper {
  DEFAULT = "Default",
  DARK = "Dark"
} 

interface PageWrapperProps {
  children: React.ReactNode;
  color?: ColorPageWrapper
}

function PageWrapper (props: PageWrapperProps) {
  const {
    children,
    color = ColorPageWrapper.DEFAULT
  } = props;

  const dispatch = useDispatch();

  return (
    <Box className={styles[`pageWrapper${color}`]}>
      <Box className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={()=>dispatch(changeNavbarState())}
        >
          <SvgIcon component={MenuIcon}/>
        </button>
      </Box>
      {children}
    </Box>
  )
}

export default PageWrapper;
