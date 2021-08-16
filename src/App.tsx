import { LayoutWithSuspense } from './components/Layout';
import PasswordManager from './views/PasswordManager';

function App() {
  return (
    <LayoutWithSuspense
      meta={{
        title: 'app.title',
      }}
    >
      <PasswordManager />
    </LayoutWithSuspense>
  );
}

export default App;
