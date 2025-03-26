import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className='w-full py-4'>
      <ul className='flex space-x-4'>
        <li>
          <Link to='/' className='underline hover:text-gray-300'>
            Home
          </Link>
        </li>
        <li>
          <Link to='/games' className='underline hover:text-gray-300'>
            Games
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
