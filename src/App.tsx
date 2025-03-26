import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Games from './pages/Games';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const headerTitle = location.pathname === '/' ? 'EZ Disc' : 'Games';

  return (
    <div className='min-h-screen p-4 bg-blue-100 dark:bg-gray-900 transition-colors'>
      <div className='p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-lg'>
        <Header title={headerTitle} />

        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/games' element={<Games />} />
            <Route path='*' element={<Home />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
