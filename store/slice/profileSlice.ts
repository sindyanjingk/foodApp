import {createSlice} from '@reduxjs/toolkit';
import { Address } from '../../types/types';

type ProfileState = {
    id: string,
    name:string,
    email: string,
    role: string,
    createdAt: Date,
    avatar: string,
    bio: string,
    wa: string,
    address?: Address
};

const initialState = {
    id: '',
    name: '',
    email: '',
    role: '',
    createdAt: new Date(),
    avatar: '',
    bio: '',
    wa: '',
    address: {},  
} as ProfileState;

export const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    reset: () => initialState,
    setProfile: (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.createdAt = action.payload.createdAt;
        state.avatar = action.payload.avatar;
        state.bio = action.payload.bio;
        state.wa = action.payload.wa;
        state.address = action.payload.address;
    },
    deleteProfile: state => {
        state.id = '';
        state.name = '';
        state.email = '';
        state.role = '';
        state.createdAt = new Date();
        state.avatar = '';
        state.bio = '';
        state.wa = '';
        state.address = {
            id: '',
            zip: '',
            userId: '',
            kabupaten: '',
            kecamatan: '',
            keterangan: '',
            kelurahan: '',
        };
    },
  },
});

export const {
    setProfile,
    deleteProfile,
} = profile.actions;
export default profile.reducer;
