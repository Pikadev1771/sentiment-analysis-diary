import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DiaryProps {
  id: number;
  date: string | string[] | undefined;
  title: string;
  content: string;
  score: number | null;
  emotion: string;
}
interface StateType {
  diaryList: DiaryProps[];
}

const initialState: StateType = {
  diaryList: [
    {
      id: 1,
      date: '2023-04-01',
      title: '야호',
      content: '날씨 좋다~~!',
      score: 1,
      emotion: 'good',
    },
    {
      id: 2,
      date: '2023-04-04',
      title: '메리 크리스마스🎅🏽',
      content: '🎄🎄🎄',
      score: 0.5,
      emotion: 'soso',
    },
    {
      id: 3,
      date: '2023-04-14',
      title: '해피 뉴이어',
      content: '행복한 2023년',
      score: 0.1,
      emotion: 'bad',
    },
    {
      id: 4,
      date: '2023-04-20',
      title: '야호',
      content: '날씨 좋다~~!',
      score: 1,
      emotion: 'happy',
    },
  ],
};

export const diarySlice = createSlice({
  name: 'myDiary',
  initialState,
  reducers: {
    create_diary: (state: StateType, action: PayloadAction<DiaryProps>) => {
      state.diaryList = [...state.diaryList, action.payload];
    },
    delete_diary: (state: StateType, action: PayloadAction<DiaryProps>) => {
      state.diaryList = state.diaryList.filter(
        (diary: DiaryProps) => diary.id !== action.payload.id
      );
    },
    update_diary: (state: StateType, action: PayloadAction<DiaryProps>) => {
      let filtered = state.diaryList.filter(
        (diary: DiaryProps) => diary.id !== action.payload.id
      );
      state.diaryList = [...filtered, action.payload];
    },
  },
});

export const { create_diary, delete_diary, update_diary } = diarySlice.actions;

export default diarySlice;
