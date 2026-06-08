// Dev playground — not included in the library build
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from './components/Button';
import { Text } from './components/Text';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text as="h1" size="3xl" weight="bold">Design System</Text>
      <Text muted>A starter kit for your component library.</Text>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  </StrictMode>,
);
