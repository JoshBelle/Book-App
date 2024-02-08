import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
import createBookWithId from '../../utils/createBookWithId'
import { setError } from './errorSlice';

const initialState = {
    books: [],
    isLoadingViaAPI: false
};

export const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async (url, thunkAPI) => {
        try {
            const res = await axios.get(url)
            return res.data
        } catch (error) {
            thunkAPI.dispatch(setError('Network Error'))
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload);
        },
        deleteBook: (state, action) => {
            return { ...state, books: state.books.filter((book) => book.id !== action.payload) }
        },
        toggleFavourite: (state, action) => {
            state.books.forEach((book) => {
                if (book.id === action.payload) {
                    book.isFavourite = !book.isFavourite; 
                }
            });
        },
    },

    extraReducers:{
        [fetchBook.pending]: (state) => {
            state.isLoadingViaAPI = true
        },
        [fetchBook.fulfilled]: (state, action) => {
            state.isLoadingViaAPI = false
            if (action?.payload?.title && action?.payload?.author) {
                state.books.push(createBookWithId(action.payload, 'API'))
            }
        },
        [fetchBook.rejected]: (state) => {
            state.isLoadingViaAPI = false
        }
    }
});

export const { addBook, deleteBook, toggleFavourite } = bookSlice.actions;

export const selectBook = (state) => state.books.books

export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI

export default bookSlice.reducer;
