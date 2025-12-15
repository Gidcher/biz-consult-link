import { Star} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ reviews }) => {

  const lastReviews = [...reviews]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <>
      <section className="hero">
        <h1 className="hero__title">
          Профессиональные консультации по бизнес-стратегиям
        </h1>
        <p className="hero__description">
          Получите экспертную помощь от ведущих специалистов в области бизнес-стратегии, маркетинга и финансов
        </p>
        <Link to="/consultants" className="hero__button">
          Выбрать консультанта
        </Link>
      </section>

      <section className="features">
        <header>
          <h2 className="features__title">Наши преимущества</h2>
        </header>
        <div className="features__list">
          <article className="feature">
            <div className="feature__icon">🎯</div>
            <h3 className="feature__title">Опытные эксперты</h3>
            <p className="feature__description">
              Работаем с консультантами, имеющими более 10 лет опыта в различных отраслях бизнеса
            </p>
          </article>
          <article className="feature">
            <div className="feature__icon">⚡</div>
            <h3 className="feature__title">Быстрое бронирование</h3>
            <p className="feature__description">
              Забронируйте консультацию в удобное для вас время за несколько кликов
            </p>
          </article>
          <article className="feature">
            <div className="feature__icon">💰</div>
            <h3 className="feature__title">Выгодные условия</h3>
            <p className="feature__description">
              Получите скидку до 20% при бронировании пакета из нескольких консультаций
            </p>
          </article>
        </div>
      </section>

      <section className="home-reviews">
        <header className="home-reviews__header">
          <h2 className="home-reviews__title">Отзывы наших клиентов</h2>
          <Link to="/reviews" className="home-reviews__button">
            Все отзывы
          </Link>
        </header>
        <div className="home-reviews__list">
          {lastReviews.map(review => (
            <article key={review.id} className="home-review__card">
              <div className="home-review__card-author">{review.author}</div>
              <div className="home-review__card-consultant">Консультант: {review.consultant}</div>
              <div className="home-review__card-rating">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < review.rating ? '#ffc107' : 'none'}
                    color={i < review.rating ? '#ffc107' : '#ccc'}
                  />
                ))}
              </div>
              <p className="home-review__card-text">{review.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
