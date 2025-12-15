import './Booking.css'

import ConsultationForm from '../../components/ConsultationForm';

const Booking = () => (
  <div className="booking">
    <h1 className="booking__title">Забронировать консультацию</h1>
    <ConsultationForm />
  </div>
);

export default Booking