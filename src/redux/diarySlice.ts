import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DiaryProps {
  id: number;
  date: string;
  title: string;
  content: string;
  score: number | null;
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
    },
    {
      id: 2,
      date: '2023-04-02',
      title: '메리 크리스마스🎅🏽',
      content: '🎄🎄🎄',
      score: 0.5,
    },
    {
      id: 3,
      date: '2023-04-10',
      title: '해피 뉴이어',
      content: '행복한 2023년',
      score: 0.1,
    },
    {
      id: 4,
      date: '2023-04-13',
      title: '야호',
      content: '날씨 좋다~~!',
      score: 1,
    },
    {
      id: 5,
      date: '2023-04-16',
      title: '날씨가 넘 좋아요',
      content: '날씨가 미쳤어요 한강 가서 자전거 탔는데...',
      score: 0.5,
    },
    {
      id: 6,
      date: '2023-04-18',
      title: '해피 뉴이어',
      content: '행복한 2023년',
      score: 0.1,
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
