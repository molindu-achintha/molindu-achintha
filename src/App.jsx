import ChatInterface from './components/ChatInterface';
import ErrorBoundary from './components/ErrorBoundary';
import BackgroundAnimation from './components/BackgroundAnimation';

function App() {
  return (
    <div className="w-full h-full relative">
      <BackgroundAnimation />
      <ErrorBoundary>
        <ChatInterface />
      </ErrorBoundary>
    </div>
  );
}

export default App;
