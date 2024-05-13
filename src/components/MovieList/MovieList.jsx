import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ items }) {
  const location = useLocation();

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <Link to={`/movies/${item.id}`} state={location}>
            {item.original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
