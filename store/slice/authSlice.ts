import {createSlice} from '@reduxjs/toolkit';

type AuthState = {
  token: string;
  id: string;
  isGoogle: boolean;
  isLoading: boolean;
};

const initialState = {
  token: '',
  id: '',
  isGoogle: false,
  isLoading: false,
} as AuthState;

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
    loadingAuth: (state, action) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.isGoogle = action.payload.isGoogle;
      state.isLoading = false;
    },
    loginGoogleSuccess: (state, action) => {
      state.token = action.payload.msg;
    },
    loginFailed: state => {
      state.token = '';
      state.id = '';
      state.isGoogle = false;
      state.isLoading = false;
    },
    logout: state => {
      state.token = '';
      state.id = '';
      state.isGoogle = false;
      state.isLoading = false;
    },
  },
});

export const {
  loginFailed,
  loginSuccess,
  logout,
  reset,
  loadingAuth,
  loginGoogleSuccess,
} = auth.actions;
export default auth.reducer;
