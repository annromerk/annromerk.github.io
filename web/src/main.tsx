import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { HomePage } from './pages/HomePage';

history.scrollRestoration = 'manual';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <HomePage />
      </MotionConfig>
    </LazyMotion>
  </StrictMode>,
);
