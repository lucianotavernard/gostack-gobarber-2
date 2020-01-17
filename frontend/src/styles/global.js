import { createGlobalStyle } from 'styled-components';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background: #181818;
    font-family: 'Montserrat', sans-serif;
    text-rendering: optimizeLegibility !important;
    --webkit-font-smoothing: antialiased !important;
  }

  ul {
    list-style: none;
  }
`;
