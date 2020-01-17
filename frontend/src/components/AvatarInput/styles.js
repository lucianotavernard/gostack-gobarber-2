import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-self: center;

  margin-bottom: 30px;

  label {
    cursor: pointer;

    img {
      width: 120px;
      height: 120px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;
