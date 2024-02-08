import { createSlice } from '@reduxjs/toolkit';
import axios from "axios"
import createBookWithId from '../../utils/createBookWithId'

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

export const thunkFunction = async (dispatch, getState) => {
    try {
      const res = await axios.get('http://localhost:4000/random-book')
      if (res?.data?.title && res?.data?.author) {
        dispatch(addBook(createBookWithId(res.data, 'API')))
      }
    } catch (error) {
      console.log('error fetching randombook', error)
    }

  } 

export const selectBook = (state) => state.books

export default bookSlice.reducer;
