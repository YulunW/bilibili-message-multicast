import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface LoginProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function LoginModal(props: LoginProps) {
  const { isOpen, setOpen } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={() => setOpen(false)}
      aria-labelledby="login-modal"
      aria-describedby="login-using-qr-code"
    >
      <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
        扫码登录
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          请用Bilibili手机App扫描上面的二维码以登录
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
