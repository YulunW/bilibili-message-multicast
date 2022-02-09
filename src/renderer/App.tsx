import { Cookie } from 'electron';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { Route, Routes, MemoryRouter, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import ContactList from 'components/contact_list';
import { store } from '../state/store';

import SideBar from '../components/sidebar';

function Content() {
  const location = useLocation();
  return (
    <>
      <Typography variant="body2" sx={{ pb: 2 }} color="text.secondary">
        Current route: {location.pathname}
      </Typography>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel. Risus at ultrices mi
        tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
        tellus. Convallis convallis tellus id interdum velit laoreet id donec
        ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
        suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
        quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
        proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
        tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
        varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
        Lorem donec massa sapien faucibus et molestie ac.
      </Typography>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
        integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
        lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
        Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
        accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
        Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
        senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
        Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
        maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
        aliquam ultrices sagittis orci a.
      </Typography>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <SideBar drawerWidth={240} />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<ContactList />} />
              <Route path="/index.html" element={<ContactList />} />
              <Route path="/inbox" element={<ContactList />} />
              <Route path="/drafts" element={<Content />} />
              <Route path="*" element={<Content />} />
            </Routes>
          </Box>
        </Box>
      </MemoryRouter>
    </Provider>
  );
}

declare global {
  interface Window {
    electron: {
      cookies: {
        get: () => Cookie[];
      };
      store: {
        get: (key: string) => unknown;
        set: (key: string, val: unknown) => void;
        delete: (key: string) => void;
        // any other methods you've defined...
      };
    };
  }
}
