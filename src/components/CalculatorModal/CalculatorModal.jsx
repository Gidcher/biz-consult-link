import { X } from 'lucide-react';
import './CalculatorModal.css'

import ConsultationForm from '../ConsultationForm';

const CalculatorModal = ({ consultant, onClose }) => (
  <div className="modal" onClick={onClose}>
    <div className="modal__content" onClick={e => e.stopPropagation()}>
      <div className="modal__header">
        <h2 className="modal__title">Расчет стоимости консультации</h2>
        <button className="modal__close" onClick={onClose}><X size={24} /></button>
      </div>
      <ConsultationForm initialConsultant={consultant} />
    </div>
  </div>
);


export default CalculatorModal