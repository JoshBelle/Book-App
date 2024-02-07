import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.push(action.payload);
        },
        deleteBook: (state, action) => {
            return state.filter((book) => book.id !== action.payload);
        },
        toggleFavourite: (state, action) => {
            state.forEach((book) => {
                if (book.id === action.payload) {
                    book.isFavourite = !book.isFavourite; // Заменено с book.isFavorite на book.isFavourite
                }
            });
        },
    },

});

export const { addBook, deleteBook, toggleFavourite } = bookSlice.actions;

export default bookSlice.reducer;
