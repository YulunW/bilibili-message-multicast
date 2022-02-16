import React from 'react';
import { useAppDispatch, useAppSelector } from 'state/hooks';

import QRCode from 'react-qr-code';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { retrieveQRCode, setTrack } from '../state/loginInfoSlice';
import { bilibiliAPI } from '../helpers/constants';

import { LoginStatus } from '../types/loginStatus';

interface LoginProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function LoginModal(props: LoginProps) {
  const { isOpen, setOpen } = props;
  const status = useAppSelector((state) => state.loginInfo.status);
  const expireTime = useAppSelector((state) => state.loginInfo.expireTime);
  const oauthKey = useAppSelector((state) => state.loginInfo.oauthKey);
  const dispatch = useAppDispatch();

  const { QRCODE_CONFIRM_SITE } = bilibiliAPI;

  if (!isOpen) return <div />;
  if (status === LoginStatus.LOGGED_IN) {
    dispatch(setTrack(false));
    setOpen(false);
  } else if (
    expireTime < new Date().getTime() &&
    status !== LoginStatus.LOADING
  ) {
    dispatch(retrieveQRCode);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        dispatch(setTrack(false));
        setOpen(false);
      }}
      aria-labelledby="login-modal"
      aria-describedby="login-using-qr-code"
    >
      <DialogTitle id="login-using-qr-code" sx={{ textAlign: 'center' }}>
        扫码登录
      </DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {expireTime >= new Date().getTime() ? (
          <QRCode value={`${QRCODE_CONFIRM_SITE}?oauthKey=${oauthKey}`} />
        ) : (
          <div />
        )}
        <DialogContentText sx={{ pt: 2 }} id="alert-dialog-description">
          请用Bilibili手机App扫描上面的二维码以登录
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
