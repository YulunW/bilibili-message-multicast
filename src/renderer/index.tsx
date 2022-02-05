import { render } from 'react-dom';
import { initStates } from 'helpers/permanentStorage';

import App from './App';

// Import the font files required by Material-UI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

initStates();
render(<App />, document.getElementById('root'));
