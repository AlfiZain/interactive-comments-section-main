import AppProvider from './providers/AppProvider';
import AppContent from './components/AppContent';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-Grey-50">
      <AppProvider>
        <AppContent />
      </AppProvider>
    </div>
  );
}
