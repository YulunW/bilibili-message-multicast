import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Button, Typography } from '@mui/material';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import LoginModal from './login_modal';

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(
        function Link(itemProps, ref) {
          return (
            // For a custom route component props spreading is necessary
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />
          );
        }
      ),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.defaultProps = {
  icon: null,
};

interface SideBarProps {
  drawerWidth: number;
}

export default function SideBar(props: SideBarProps) {
  const { drawerWidth } = props;
  const [isOpen, setOpen] = React.useState(false);
  return (
    <Box
      component="nav"
      sx={{ width: drawerWidth, flexShrink: 0 }}
      aria-label="mailbox folders"
    >
      <LoginModal isOpen={isOpen} setOpen={setOpen} />
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        <div>
          <Button
            variant="text"
            color="inherit"
            onClick={() => setOpen(true)}
            sx={{
              display: 'flex',
              p: 1,
              width: '100%',
              justifyContent: 'flex-start',
            }}
          >
            <Avatar alt="Remy Sharp" src="" />
            <Box sx={{ pl: 1, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1">点击登录</Typography>
            </Box>
          </Button>
          <Divider />
          <List>
            <ListItemLink to="/inbox" primary="Inbox" icon={<InboxIcon />} />
            <ListItemLink to="/drafts" primary="Drafts" icon={<DraftsIcon />} />
          </List>
          <Divider />
          <List>
            <ListItemLink to="/trash" primary="Trash" />
            <ListItemLink to="/spam" primary="Spam" />
          </List>
        </div>
      </Drawer>
    </Box>
  );
}
