import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box; 
    padding: 0;
    margin: 0;
  font-family: 'Open Sans', sans-serif, 'Roboto Serif', 'Noto Serif', 'DM Serif Display', serif; 
 

}

html,
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    letter-spacing: -1px;
    font-size: 15px;
    background-color: #e8e7dc;
  
  }


  p {
    margin: 0;
  }

      /* @media only screen and (max-width: 767px) {
        body {
          font-size: 12px;
        }
      }

      @media only screen and (max-width: 576px) {
        body {
          font-size: 10px;
        }
      } */
    `;

export default GlobalStyle;
