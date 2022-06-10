import React from 'react';
import { Connect } from './Connect';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  text-align: center;
  min-height: 100vh;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
`;

function App() {
  return (
    <Container>
      <Global
        styles={css`
          body {
            text-align: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
              'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
              'Helvetica Neue', sans-serif;
            background-color: #02022b;
          }
        `}
      />
      <header>
        <Connect />
      </header>
    </Container>
  );
}

export default App;
