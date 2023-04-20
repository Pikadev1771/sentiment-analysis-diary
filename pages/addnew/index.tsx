import React from 'react';
import DiaryForm from '../../components/diaryForm/DiaryForm';
import styled from 'styled-components';

export default function AddNew() {
  return (
    <AddNewLayout>
      <DiaryForm />
    </AddNewLayout>
  );
}

const AddNewLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
