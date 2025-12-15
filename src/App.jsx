import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css'

import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';

import Home from './pages/Home';
import Consultants from './pages/Consultants';
import Booking from './pages/Booking';
import Reviews from './pages/Reviews';
import Contacts from './pages/Contacts';

import ScrollToTop from './components/ScrollToTop';
import CalculatorModal from './components/CalculatorModal';

import { consultantsData, reviewsData } from './data';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [reviews, setReviews] = useState(reviewsData);

  const location = useLocation();

  useEffect(() => {
    const routeTitles = {
      '/biz-consult-link/': 'Главная',
      '/consultants': 'Консультанты',
      '/booking': 'Бронирование',
      '/reviews': 'Отзывы',
      '/contacts': 'Контакты'
    };
    document.title = `BizConsult | ${routeTitles[location.pathname] || ''}`;
  }, [location.pathname]);

  const openCalculator = (consultant) => {
    setSelectedConsultant(consultant);
    setIsModalOpen(true);
  };

  return (
    <div className="app">
      <Header />
      <ScrollToTop />
      <Main>
        <Routes>
          <Route path="/biz-consult-link/" element={<Home reviews={reviews} />} />
          <Route path="/consultants" element={<Consultants consultantsData={consultantsData} openCalculator={openCalculator} />} />
          <Route path="/booking" element={<Booking consultantsData={consultantsData} />} />
          <Route path="/reviews" element={<Reviews consultantsData={consultantsData} reviews={reviews} setReviews={setReviews} />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </Main>
      <Footer />

      {isModalOpen && (
        <CalculatorModal
          consultant={selectedConsultant}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
