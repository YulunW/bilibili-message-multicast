import { Cookie } from 'electron';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ContactList from 'components/contact_list';
import TemplateInput from 'components/template_input';
import { store } from '../state/store';

import SideBar from '../components/sidebar';

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
              <Route path="/drafts" element={<TemplateInput />} />
              <Route path="*" element={<ContactList />} />
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
