import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { normalize } from './content';
import './styles.css';

const root = document.getElementById('root')!;
const app = <App path={normalize(location.pathname)} />;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
