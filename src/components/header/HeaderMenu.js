import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '10px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 30,
        margin: '8px 0',
        color: theme.palette.text.secondary,
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => { setAnchorEl(e.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const handleClickChat = () => { props.getMode("CHAT"); };
  const handleClickSchedule = () => { props.getMode("SCHEDULE"); };
  const handleClickMessanger = () => { props.getMode("MESSANGER"); };
  const handleClickSetting = () => { props.getMode("SETTING"); };
  const handleClickLogout = () => { 
    props.toggleLoading(true);
    axios.get("./logout")
    .then().catch(err => console.log(err));
    props.getLogin(false); 
    props.getMode('MAIN');
    props.toggleLoading(false);
  };

  return (
    <>
      {/* ?????? ????????? */}
      <Tooltip title="??????" placement="bottom" arrow>
        <IconButton
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          variant="contained"
          color="inherit"
          disableElevation
          onClick={handleClick}
        >
          <MoreVertIcon sx={{ fontSize: 30 }}/>
        </IconButton>
      </Tooltip>

      {/* ??????, ????????? */}
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Tooltip title="??????" placement="left" arrow>
          <MenuItem onClick={handleClickChat} disableRipple><ChatIcon /></MenuItem>
        </Tooltip>

        <Tooltip title="?????????" placement="left" arrow>
          <MenuItem onClick={handleClickSchedule} disableRipple>
            <CalendarTodayIcon />
          </MenuItem>
        </Tooltip>

        <Tooltip title="????????? / ?????????" placement="left" arrow>
          <MenuItem onClick={handleClickMessanger} disableRipple>
            <PeopleAltIcon />
          </MenuItem>
        </Tooltip>  

        <Tooltip title="??????" placement="left" arrow>
          <MenuItem onClick={handleClickSetting} disableRipple>
            <SettingsIcon />
          </MenuItem>
        </Tooltip>

        <Tooltip title="????????????" placement="left" arrow>
          <MenuItem onClick={handleClickLogout}>
            <LogoutIcon />
          </MenuItem>
        </Tooltip>

        <Tooltip title="?????? ??????" placement="left" arrow>
          <MenuItem onClick={handleClose} disableRipple>
            <CloseIcon />
          </MenuItem>
        </Tooltip>  
      </StyledMenu>
    </>
  );
}
