import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
    restaurants: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// Async thunk to fetch restaurants
export const fetchRestaurants = createAsyncThunk(
    'restaurants/fetchRestaurants',
    async ({ page = 1, limit = 10, countryCode = 1 }) => {
        const response = await fetch(`http://localhost:5000/api/restaurants?page=${page}&limit=${limit}&countryCode=${countryCode}`);
        const data = await response.json();
        return data.restaurants;
    }
);

// Create slice
const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurants.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRestaurants.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.restaurants = action.payload;
            })
            .addCase(fetchRestaurants.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default restaurantSlice.reducer;
