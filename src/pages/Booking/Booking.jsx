import './Booking.css'

import ConsultationForm from '../../components/ConsultationForm';

const Booking = () => (
  <div className="booking">
    <div className="visually-hidden">
      Онлайн-бронирование бизнес-консультаций в BizConsult.
      Запись на консультацию к профессиональному бизнес-консультанту.
      Удобный выбор специалиста, даты и формата консультации.
      Быстрое и безопасное бронирование услуг.
    </div>
    <h1 className="booking__title">Забронировать консультацию</h1>
    <ConsultationForm />
  </div>
);

export default Booking