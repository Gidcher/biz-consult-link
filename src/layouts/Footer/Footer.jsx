import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__info">
        <h3 className="footer__title">BizConsult</h3>
        <p className="footer__text">Консультации для бизнеса и стартапов. Помогаем развивать компанию, оптимизировать процессы и увеличивать прибыль.</p>
      </div>

      <div className="footer__contacts">
        <h4 className="footer__subtitle">Контакты</h4>
        <div className="footer__contact">
          <Mail size={16} />
          <a href="mailto:info@bizconsult.com">info@bizconsult.ru</a>
        </div>
        <div className="footer__contact">
          <Phone size={16} />
          <a href="tel:+74951234567">+7 (495) 123-45-67</a>
        </div>
        <div className="footer__contact">
          <MapPin size={16} />
          Москва, ул. Пример, д. 123
        </div>
      </div>

      <div className="footer__socials">
        <h4 className="footer__subtitle">Мы в соцсетях</h4>
        <div className="footer__social-icons">
          <a href="https://www.facebook.com/" target="_blank"><Facebook size={20} /></a>
          <a href="https://www.instagram.com/" target="_blank"><Instagram size={20} /></a>
          <a href="https://www.linkedin.com/" target="_blank"><Linkedin size={20} /></a>
        </div>
      </div>
    </div>
    <div className="footer__copyright">
      &copy; {new Date().getFullYear()} BizConsult, Рустамов Рустам. Все права защищены.
    </div>
  </footer>
);

export default Footer;
