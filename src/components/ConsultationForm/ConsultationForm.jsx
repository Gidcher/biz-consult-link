import React, { useState } from 'react';
import { Check } from 'lucide-react';
import './ConsultationForm.css'

import { consultantsData } from '../../data/index'

const ConsultationForm = ({ initialConsultant = null }) => {

  const additionalServices = {
    recording: { label: 'Запись консультации', price: 1000 },
    report: { label: 'Итоговый отчет', price: 2000 },
    kpiReport: { label: 'Отчёт по KPI', price: 1500 }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultant: initialConsultant ? initialConsultant.id : '',
    date: '',
    time: '',
    sessions: 1,
    duration: 1,
    additionalServices: Object.keys(additionalServices).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {}
    ),
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const consultant = consultantsData.find(c => c.id === Number(formData.consultant));

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];


  const calculateTotal = () => {
    if (!consultant) return { basePrice: 0, servicesPrice: 0, discount: 0, discountAmount: 0, total: 0 };

    const basePrice = consultant.hourlyRate * formData.duration * (formData.sessions || 1);

    const servicesPrice = Object.entries(formData.additionalServices).reduce(
      (sum, [key, isSelected]) =>
        isSelected ? sum + additionalServices[key].price : sum,
      0
    );

    let discount = 0;
    const sessions = formData.sessions;
    if (sessions >= 6) discount = 0.20;
    else if (sessions >= 4) discount = 0.15;
    else if (sessions >= 2) discount = 0.10;

    const totalBeforeDiscount = basePrice + servicesPrice;
    const discountAmount = basePrice * discount;
    const total = totalBeforeDiscount - discountAmount;

    return { basePrice, servicesPrice, discount, discountAmount, total };
  };

  const { basePrice, servicesPrice, discount, discountAmount, total } = calculateTotal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <form className="consultation__form" onSubmit={handleSubmit}>
      <div className="consultation__field">
        <label className="consultation__label" htmlFor="name">Ваше имя *</label>
        <input
          id="name"
          className="consultation__input"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div className="consultation__field">
        <label className="consultation__label" htmlFor="email">Email *</label>
        <input
          id="email"
          className="consultation__input"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div className="consultation__field">
        <label className="consultation__label" htmlFor="phone">Телефон *</label>
        <input
          id="phone"
          className="consultation__input"
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
      </div>

      <div className="consultation__field">
        <label className="consultation__label" htmlFor="consultant">Выберите консультанта *</label>
        <select
          id="consultant"
          className="consultation__select"
          required
          value={formData.consultant}
          onChange={(e) => setFormData({...formData, consultant: e.target.value})}
        >
          <option value="">Выберите консультанта</option>
          {Object.entries(
            consultantsData.reduce((groups, c) => {
              if (!groups[c.category]) groups[c.category] = [];
              groups[c.category].push(c);
              return groups;
            }, {})
          ).map(([category, consultants]) => (
            <optgroup key={category} label={category}>
              {consultants.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.hourlyRate} ₽/час
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="consultation__field">
        <label className="consultation__label" htmlFor="date">Дата *</label>
        <input
          id="date"
          className="consultation__input"
          type="date"
          required
          min={minDate}
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
        />
      </div>

      <div className="consultation__field">
        <label className="consultation__label" htmlFor="time">Время *</label>
        <select
          id="time"
          className="consultation__select"
          required
          value={formData.time}
          onChange={(e) => setFormData({...formData, time: e.target.value})}
        >
          {Array.from({ length: 13 }, (_, i) => 8 + i).map(hour => {
            const h = hour.toString().padStart(2, '0');
            return <option key={hour} value={`${h}:00`}>{h}:00</option>
          })}
        </select>
      </div>

      <div className="consultation__field">
        <label className="consultation__label" htmlFor="duration">Продолжительность (часов)</label>
        <select
          id="duration"
          className="consultation__select"
          value={formData.duration}
          onChange={(e) => setFormData({...formData, duration: Number(e.target.value)})}
        >
          {[1,2,3].map(n => (
            <option key={n} value={n}>{n} {n===1?'час':'часа'}</option>
          ))}
        </select>
      </div>

      <div className="consultation__field">
        <label className="consultation__label" htmlFor="sessions">Количество консультаций</label>
        <select
          id="sessions"
          className="consultation__select"
          value={formData.sessions}
          onChange={(e) => setFormData({...formData, sessions: Number(e.target.value)})}
        >
          {[1,2,3,4,5,6,7,8,9,10].map(n => (
            <option key={n} value={n}>{n} {n === 1 ? 'консультация' : n < 5 ? 'консультации' : 'консультаций'}</option>
          ))}
        </select>
      </div>


      <div className="consultation__field">
        <label className="consultation__label">Дополнительные услуги</label>
        {Object.entries(additionalServices).map(([key, { label, price }]) => (
          <div key={key} className={`consultation__option ${formData.additionalServices[key] ? 'consultation__option--selected' : ''}`}>
            <input
              className="consultation__checkbox"
              type="checkbox"
              id={key}
              checked={formData.additionalServices[key]}
              onChange={() => setFormData({
                ...formData,
                additionalServices: {...formData.additionalServices, [key]: !formData.additionalServices[key]}
              })}
            />
            <label className="consultation__option-name" htmlFor={key}>
              {label} <span className="consultation__option-price">(+{price}₽)</span>
            </label>
          </div>
        ))}
      </div>

      <div className="consultation__field">
        <label className="consultation__label" htmlFor="message">Дополнительная информация</label>
        <textarea
          id="message"
          className="consultation__textarea"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          placeholder="Опишите цель консультации и вопросы"
        />
      </div>

      {consultant && (
        <div className="consultation__summary">
          <p className="consultation__summary-title">Консультация: {basePrice.toLocaleString()} ₽</p>
          {servicesPrice > 0 &&
            <p className="consultation__summary-item">
              Доп. услуги: {servicesPrice.toLocaleString()} ₽
            </p>
          }
          {discount > 0 &&
            <p className="consultation__discount">
              Скидка: -{discountAmount.toLocaleString()} ₽
            </p>
          }
          <p className="consultation__summary-total">
            <strong>Итого: {total.toLocaleString()} ₽</strong>
          </p>
        </div>
      )}

      <button className="consultation__book" type="submit">Забронировать</button>
      {submitted && (
        <div className="consultation__success">
          <Check size={20} /> Ваша заявка успешно отправлена!
        </div>
      )}
    </form>
  );
};

export default ConsultationForm;
