import { Loader } from './components/icons/Loader';
import { OpeningHours } from './components/opening-hours/OpeningHours';
import { useOpeningHours } from './hooks/useOpeningHours';
import { ErrorMessage } from './components/ui/ErrorMessage';
import { EmptyState } from './components/ui/EmptyState';

export function App() {
  const { hours, error, loading } = useOpeningHours('exceptional');

  if (loading)
    return (
      <main>
        <Loader />
      </main>
    );
  if (error)
    return (
      <main>
        <ErrorMessage message={error} />
      </main>
    );
  if (!hours || Object.keys(hours).length === 0) {
    return (
      <main>
        <EmptyState message="No opening hours available" />
      </main>
    );
  }

  return (
    <main>
      <OpeningHours hours={hours} animated />
    </main>
  );
}

export default App;
