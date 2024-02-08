import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
import createBookWithId from '../../utils/createBookWithId'
import { setError } from './errorSlice';

const initialState = [];

export const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async (url, thunkAPI) => {
        try {
            const res = await axios.get(url)
            return res.data
        } catch (error) {
            thunkAPI.dispatch(setError('Network Error'))
            throw error
        }
    }
)

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
                    book.isFavourite = !book.isFavourite; 
                }
            });
        },
    },


    extraReducers: (builder) => {
        builder.addCase(fetchBook.fulfilled,(state, action) => {
           if (action.payload.title && action.payload.author) {
                state.push(createBookWithId(action.payload, 'API'))
           }
        })
    }

});


export const { addBook, deleteBook, toggleFavourite } = bookSlice.actions;

export const selectBook = (state) => state.books

export default bookSlice.reducer;
