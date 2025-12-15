import React, { useState } from 'react';
import { Clock, Mail, Phone, MapPin, Check } from 'lucide-react';
import './Contacts.css'

const Contacts= () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    setSubmitted(true);

    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <div className="contacts">
        <div className="contacts__inner">
          <section className="contacts__info">
            <h1 className="contacts__title">Контактная информация</h1>
            <ul className="contacts__list">
              <li className="contacts__item">
                <Phone className="contacts__icon" size={24} aria-hidden="true" />
                <span>+7 (495) 123-45-67</span>
              </li>
              <li className="contacts__item">
                <Mail className="contacts__icon" size={24} aria-hidden="true" />
                <span>info@bizconsult.ru</span>
              </li>
              <li className="contacts__item">
                <MapPin className="contacts__icon" size={24} aria-hidden="true" />
                <span>Москва, ул. Пример, д. 123</span>
              </li>
              <li className="contacts__item">
                <Clock className="contacts__icon" size={24} aria-hidden="true" />
                <span>Пн-Пт: 9:00 - 18:00</span>
              </li>
            </ul>
          </section>

          <section className="contacts__write-us">
            <h2 className="contacts__title">Напишите нам</h2>
            <form className="contacts__form" onSubmit={handleSubmit} noValidate>
              <div className="contacts__field">
                <label htmlFor="contact-name" className="contacts__label">Имя *</label>
                <input
                  id="contact-name"
                  className="contacts__input"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="contacts__field">
                <label htmlFor="contact-email" className="contacts__label">Email *</label>
                <input
                  id="contact-email"
                  className="contacts__input"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="contacts__field">
                <label htmlFor="contact-message" className="contacts__label">Сообщение *</label>
                <textarea
                  id="contact-message"
                  className="contacts__textarea"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Напишите ваше сообщение"
                ></textarea>
              </div>

              <button className="contacts__submit" type="submit">Отправить</button>

              {submitted && (
                <div className="contacts__success" role="status">
                  <Check size={20} aria-hidden="true" />
                  Ваша заявка успешно отправлена!
                </div>
              )}
            </form>
          </section>
        </div>

        <section className="contacts__map">
          <iframe
            className="contacts__map-frame"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A2b6d5f0e5c6d5f4c7f0d8c0b2e5a9c4a1d9f8e7b6a5c4d3e2f1&source=constructor"
            title="Карта расположения офиса"
            loading="lazy"
          />
        </section>
      </div>
    </>
  );
};

export default Contacts