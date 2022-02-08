import { Avatar, Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { setTrack } from 'state/loginInfoSlice';
import LoginModal from './login_modal';

export default function UserAvatar() {
  const [isOpen, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const userBasicInfo = useAppSelector((state) => state.userInfo.userBasicInfo);
  return (
    <div>
      <LoginModal isOpen={isOpen} setOpen={setOpen} />
      <Button
        variant="text"
        color="inherit"
        onClick={() => {
          dispatch(setTrack(true));
          setOpen(true);
        }}
        sx={{
          display: 'flex',
          p: 1,
          width: '100%',
          justifyContent: 'flex-start',
        }}
      >
        <Avatar
          alt={userBasicInfo !== undefined ? userBasicInfo.uname : 'Remy Sharp'}
          src={userBasicInfo !== undefined ? userBasicInfo.face : ''}
        />
        <Box sx={{ pl: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1">
            {userBasicInfo !== undefined ? userBasicInfo.uname : '点击登录'}
          </Typography>
        </Box>
      </Button>
    </div>
  );
}
