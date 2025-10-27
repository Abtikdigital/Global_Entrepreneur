import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PackageDetails {
  name?: string;
  image?: string;
  duration?: string;
  rating?: number;
  price?: string;
  highlights?: string;
  includes?: string[];
  destination?: string;
  date?: string;
}

interface DialogContextType {
  isOpen: boolean;
  packageDetails: PackageDetails | null;
  openDialog: (packageDetails: PackageDetails) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(null);

  const openDialog = (details: PackageDetails) => {
    setPackageDetails(details);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setPackageDetails(null);
  };

  return (
    <DialogContext.Provider value={{ isOpen, packageDetails, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within DialogProvider');
  }
  return context;
}

