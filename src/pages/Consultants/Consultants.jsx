import { useState } from 'react';
import { Star, User, Briefcase } from 'lucide-react';
import './Consultants.css';

const Consultants = ({ consultantsData, openCalculator }) => {
  const categories = ['Все', ...new Set(consultantsData.map(c => c.category))];
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredConsultants =
    selectedCategory === 'Все'
      ? consultantsData
      : consultantsData.filter(c => c.category === selectedCategory);

  return (
    <>
      <h1 className="hero__title">Наши консультанты</h1>
      <nav className="consultants-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={`consultants-filter__button${selectedCategory === cat ? ' consultants-filter__button--active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>
      <div className="consultants-filter-mobile">
        <select
          className="consultants-filter__select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="consultants">
        {filteredConsultants.map(consultant => (
          <article key={consultant.id} className="consultants-card">
            <header className="consultants-card__header">
              <img
                className="consultants-card__avatar"
                src={consultant.avatar}
                alt={consultant.name}
                loading="lazy"
              />
              <div className="consultants-card__info">
                <h2>{consultant.name}</h2>
                <p className="consultants-card__specialization">{consultant.specialization}</p>
              </div>
            </header>

            <ul className="consultants-card__stats">
              <li>
                <Star size={16} fill="#ffc107" color="#ffc107" /> {consultant.rating}
              </li>
              <li>
                <Briefcase size={16} /> {consultant.experience} лет
              </li>
              <li>
                <User size={16} /> {consultant.reviewsCount} отзывов
              </li>
            </ul>

            <p className="consultants-card__description">{consultant.description}</p>

            <footer className="consultants-card__footer">
              <div className="consultants-card__rate">{consultant.hourlyRate} ₽/час</div>
              <button
                className="consultants-card__button"
                type="button"
                onClick={() => openCalculator(consultant)}
              >
                Рассчитать стоимость
              </button>
            </footer>
          </article>
        ))}
      </div>
    </>
  );
};

export default Consultants;
