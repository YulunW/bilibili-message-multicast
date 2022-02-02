import React from 'react';
import { useAppDispatch, useAppSelector } from 'state/hooks';

import QRCode from 'react-qr-code';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { retrieveQRCode } from '../state/loginInfoSlice';
import { QRCODE_CONFIRM_SITE } from '../helpers/constants';

import { LoginStatus } from '../types/loginStatus';

interface LoginProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function LoginModal(props: LoginProps) {
  const { isOpen, setOpen } = props;
  const loginInfo = useAppSelector((state) => state.loginInfo);
  const dispatch = useAppDispatch();

  if (!isOpen) return <div />;
  if (loginInfo.status === LoginStatus.LOGGED_IN) setOpen(false);
  else if (
    loginInfo.expireTime < new Date().getTime() &&
    loginInfo.status !== LoginStatus.LOADING
  ) {
    dispatch(retrieveQRCode);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setOpen(false)}
      aria-labelledby="login-modal"
      aria-describedby="login-using-qr-code"
    >
      <DialogTitle id="login-using-qr-code" sx={{ textAlign: 'center' }}>
        扫码登录
      </DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {loginInfo.expireTime >= new Date().getTime() ? (
          <QRCode
            value={`${QRCODE_CONFIRM_SITE}?oauthKey=${loginInfo.oauthKey}`}
          />
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
