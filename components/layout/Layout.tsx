import React from 'react';
import Footer from '../footer/Footer';

export default function Layout(props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  return (
    <div>
      {props.children}
      <Footer />
    </div>
  );
}
