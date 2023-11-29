import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';


type AuthState = {
  currentUser: string | null;
  selectedFile: string | null;
  result: string | null;
  isLoading: boolean;
  token: number;
};

const slice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    selectedFile: null,
    result: null,
    isLoading: false,
    token: 0
  } as AuthState,
  reducers: {
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCurrentUser: (state, action) => {
      localStorage.setItem('currentUser', action.payload);
      state.currentUser = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    }
  }
});

export const selectFile = (state: RootState): string | null =>
  state.authSlice.selectedFile;
export const selectResult = (state: RootState): string | null =>
  state.authSlice.result;
export const selectLoading = (state: RootState): boolean =>
  state.authSlice.isLoading;
export const selectCurrentUser = (state: RootState): string | null =>
  state.authSlice.currentUser;
export const selectToken = (state: RootState): number =>
  state.authSlice.token;
export const { setSelectedFile, setResult, setIsLoading, setCurrentUser, setToken } = slice.actions;

export default slice.reducer;
