import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

export default function DiaryCard() {
  return (
    <div>
      <DiaryFormContainer>
        <Container>
          <TitleContainer>
            <h3>제목입니당</h3>
          </TitleContainer>
          <DiaryTextarea>야호~~</DiaryTextarea>
        </Container>
      </DiaryFormContainer>
    </div>
  );
}

const DiaryFormContainer = styled.div`
  width: 40vw;
  height: 90vh;
  /* border: 1px solid blue; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 90%;
  height: 500px;
  padding: 32px;
  background: ${({ theme }) => theme.color.cream};
  border: 4px solid ${({ theme }) => theme.color.brown};
  box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.brown};
  border-radius: 24px;
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.color.brown};

  p {
    font-size: 16px;
    color: ${({ theme }) => theme.color.red};
    text-align: right;
  }
`;

const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;

const DiaryInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  border-radius: 10px;
  border: 4px solid ${({ theme }) => theme.color.brown};
  padding: 10px 15px;
  font-size: 16px;
  color: ${({ theme }) => theme.color.brown};
  margin: 10px 0 8px 0;

  ${(props) =>
    props.id === 'title' &&
    css`
      height: 60px;
      margin-left: 20px;
      background: ${({ theme }) => theme.color.lime};
    `}

  ${(props) =>
    props.type === 'submit' &&
    css`
      background: ${({ theme }) => theme.color.pink};
      color: ${({ theme }) => theme.color.brown};
      border: 4px solid ${({ theme }) => theme.color.brown};
      height: 60px;
      text-transform: uppercase;
      margin-top: 20px;
      padding: 20px;
      font-size: 14px;
      font-weight: 100;
      letter-spacing: 10px;
    `}
`;

const DiaryTextarea = styled.textarea`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  border-radius: 10px;
  border: 4px solid ${({ theme }) => theme.color.brown};
  padding: 10px 15px;
  font-size: 16px;
  color: ${({ theme }) => theme.color.brown};
  margin: 10px 0 8px 0;
`;

const TitleContainer = styled.div`
  display: flex;
`;
