import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/ladder.css';
import { LadderPage } from './pages/LadderPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LadderPage />
  </StrictMode>,
);
