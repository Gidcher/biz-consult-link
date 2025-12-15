import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // текущий путь

  const navItems = [
    { path: '/biz-consult-link/', label: 'Главная' },
    { path: '/consultants', label: 'Консультанты' },
    { path: '/booking', label: 'Бронирование' },
    { path: '/reviews', label: 'Отзывы' },
    { path: '/contacts', label: 'Контакты' },
  ];

  return (
    <header className="header">
      <div className="header__container">
        <Link
          to="/"
          className="header__logo"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="header__logo-text">BizConsult</span>
        </Link>

        <div className="header__nav-wrapper">
          <button
            className="header__burger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`header__nav-item ${location.pathname === item.path ? 'header__nav-item--active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
