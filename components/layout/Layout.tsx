import React from 'react';
import Footer from '../footer/Footer';

import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export interface layoutPropsType {
  children: ReactElement;
}

export default function Layout({ children }: layoutPropsType) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
