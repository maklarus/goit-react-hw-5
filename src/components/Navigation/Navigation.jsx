import { clsx } from 'clsx';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <div className={css.navigate}>
      <nav>
        <NavLink to="/" className={getNavLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={getNavLinkClass}>
          Movies
        </NavLink>
      </nav>
    </div>
  );
}
