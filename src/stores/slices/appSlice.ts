import { AppLanguage, LanguageType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';
import { AppState } from '../types/app';
import { RootState } from '../types/root';

const initialAppState: AppState = {
  isInternet: true,
  appLanguage: LanguageType.en,
  isDebugging: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    onSetAppLanguage: (state, action: PayloadAction<AppLanguage>) => {
      state.appLanguage = action.payload;
    },
  },

  extraReducers: builder => {},
});

export const { reducer: appReducer, actions: appActions } = appSlice;

export const getAppState = (state: RootState) => state.app;
