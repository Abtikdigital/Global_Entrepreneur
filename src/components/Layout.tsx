import React from 'react';
import { Outlet } from 'react-router-dom';
import { TravelNavigation } from './travel/TravelNavigation';
import { TravelFooter } from './travel/TravelFooter';
import { useDialog } from '../contexts/DialogContext';
import { BookingDialog } from './BookingDialog';

export function Layout() {
  const { isOpen, packageDetails, closeDialog } = useDialog();

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full">
      <TravelNavigation />
      <Outlet />
      <TravelFooter />
      
      <BookingDialog
        isOpen={isOpen}
        onClose={closeDialog}
        packageDetails={packageDetails}
      />
    </div>
  );
}
