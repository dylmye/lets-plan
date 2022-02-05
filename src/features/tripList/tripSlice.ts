import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Trip } from '../../types/Trip';

export interface TripState {
  trips: Trip[];
}

const initialState: TripState = {
  trips: [],
};


