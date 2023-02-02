import { AppRouter } from './AppRouter';
import { ContextProvider } from './context/ContextProvider';

export const App = () => {
  return (
    <ContextProvider>
      <AppRouter />
    </ContextProvider>
  );
};
