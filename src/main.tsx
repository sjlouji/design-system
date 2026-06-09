// Dev playground — not included in the library build
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from './components/Button';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Design System</h1>
      <p style={{ color: 'var(--color-muted-foreground)' }}>A starter kit for your component library.</p>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Button variant="default">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  </StrictMode>,
);
