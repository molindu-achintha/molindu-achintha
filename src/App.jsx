import ChatInterface from './components/ChatInterface';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="w-full h-full">
      <ErrorBoundary>
        <ChatInterface />
      </ErrorBoundary>
    </div>
  );
}

export default App;
