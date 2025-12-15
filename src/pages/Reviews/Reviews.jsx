import React, { useState } from 'react';
import { Star } from 'lucide-react';
import './Reviews.css';

const Reviews = ({ consultantsData, reviews, setReviews }) => {
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    consultant: '',
    rating: 5,
    text: ''
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([review, ...reviews]);
    setNewReview({ author: '', consultant: '', rating: 5, text: '' });
    setShowForm(false);
  };

  return (
    <>
      <header className="reviews__header">
        <h1 className="reviews__title">Отзывы клиентов</h1>
        <button
          className="reviews__add-button"
          onClick={() => setShowForm(!showForm)}
          aria-expanded={showForm}
          aria-controls="review-form"
        >
          {showForm ? 'Отменить' : 'Оставить отзыв'}
        </button>
      </header>
      {showForm && (
        <form
          id="review-form"
          className="review-form"
          onSubmit={handleSubmitReview}
        >
          <h2 className="review-form__title">Новый отзыв</h2>

          <div className="review-form__field">
            <label htmlFor="review-author" className="review-form__label">
              Ваше имя *
            </label>
            <input
              id="review-author"
              className="review-form__input"
              type="text"
              required
              value={newReview.author}
              onChange={(e) =>
                setNewReview({ ...newReview, author: e.target.value })
              }
            />
          </div>

          <div className="review-form__field">
            <label htmlFor="review-consultant" className="review-form__label">
              Консультант *
            </label>
            <select
              id="review-consultant"
              className="review-form__select"
              required
              value={newReview.consultant}
              onChange={(e) =>
                setNewReview({ ...newReview, consultant: e.target.value })
              }
            >
              <option value="">Выберите консультанта</option>
              {consultantsData.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="review-form__field">
            <span className="review-form__label">Оценка *</span>
            <div className="review-form__rating" role="radiogroup" aria-label="Оценка консультанта">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="review-form__star"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  aria-label={`Оценка ${star} звезд`}
                  aria-pressed={newReview.rating === star}
                >
                  <Star
                    size={32}
                    fill={star <= newReview.rating ? '#ffc107' : 'none'}
                    color={star <= newReview.rating ? '#ffc107' : '#ccc'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="review-form__field">
            <label htmlFor="review-text" className="review-form__label">
              Ваш отзыв *
            </label>
            <textarea
              id="review-text"
              className="review-form__textarea"
              required
              value={newReview.text}
              onChange={(e) =>
                setNewReview({ ...newReview, text: e.target.value })
              }
              placeholder="Поделитесь своим опытом работы с консультантом"
            ></textarea>
          </div>

          <div className="review-form__actions">
            <button className="review-form__submit" type="submit">
              Опубликовать
            </button>
            <button
              className="review-form__cancel"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Отмена
            </button>
          </div>
        </form>
      )}

      <ul className="reviews__list">
        {reviews.map((review) => (
          <li key={review.id} className="review-card">
            <div className="review-card__header">
              <div>
                <div className="review-card__author">{review.author}</div>
                <div className="review-card__consultant">
                  Консультант: {review.consultant}
                </div>
              </div>
              <div className="review-card__rating" aria-label={`Рейтинг ${review.rating} из 5`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < review.rating ? '#ffc107' : 'none'}
                    color={i < review.rating ? '#ffc107' : '#ccc'}
                  />
                ))}
              </div>
            </div>
            <p className="review-card__text">{review.text}</p>
            <time className="review-card__date" dateTime={review.date}>
              {review.date}
            </time>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Reviews;
