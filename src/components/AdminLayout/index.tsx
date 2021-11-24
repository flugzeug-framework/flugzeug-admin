import React from 'react';
import { Box } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import AdminIcon from '@mui/icons-material/AdminPanelSettings';
import { SideMenu, SideMenuLabels } from 'components/SideMenu/SideMenu';
import { admin, home, profile, users } from "routes/Roots";
import styles from './style.module.css';

interface CustomLayoutProps {
  children: React.ReactNode
}

const MenuLabels: SideMenuLabels[] = [
  { label: "HOME", path: home(), icon: HomeIcon },
  { label: "USERS", path: users(), icon: PeopleIcon},
  { label: "PROFILE", path: profile(), icon: PersonIcon },
  { label: "ADMIN", path: admin(), icon: AdminIcon },
]

const CustomLayout: React.FC<CustomLayoutProps> = ({children}) => {
  return (
    <div className={styles.adminLayout}>
      <SideMenu sideMenuLabels={MenuLabels} />
      <Box className={styles.adminLayoutContent}>
        {children}
      </Box>
    </div>
  )
}

export default CustomLayout;
