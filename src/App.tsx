import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './components/pages/HomePage';
import { DestinationsPage } from './components/pages/DestinationsPage';
import { PackagesPage } from './components/pages/PackagesPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactSection } from './components/travel/ContactSection';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route 
          path="destinations" 
          element={
            <>
              <DestinationsPage />
              <ContactSection />
            </>
          } 
        />
        <Route 
          path="packages" 
          element={
            <>
              <PackagesPage />
              <ContactSection />
            </>
          } 
        />
        <Route 
          path="about" 
          element={
            <>
              <AboutPage />
              <ContactSection />
            </>
          } 
        />
      </Route>
    </Routes>
  );
}
