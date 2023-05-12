import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box; 
    padding: 0;
    margin: 0;
  font-family: monospace, sans-serif, 'Roboto Mono', 'JetBrains_Mono', -apple-system, BlinkMacSystemFont, Segoe UI, 

}

html,
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    letter-spacing: -1px;
    font-size: 15px;
    background-color: #BBB2B2;
  
  }


  p {
    margin: 0;
  }

      /* @media only screen and (max-width: 768px) {
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
