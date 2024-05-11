import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../apiService";
import axios from "axios";

export const addToReadingList = createAsyncThunk(
  "books/addToReadingList",
  async (book) => {
    const response = await api.post("/favorite", book);
    return response.data;
  }
);
export const fetchBookDetails = createAsyncThunk(
  "books/fetchBookDetails",
  async ({ bookId }) => {
    const response = await axios.get(`http://localhost:5000/books/${bookId}`);
    return response.data;
  }
);
export const getBooks = createAsyncThunk(
  "books/getBooks",
  async ({ pageNum, limit, query }) => {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const response = await api.get(url);
    console.log(response.data, "data");
    return response.data;
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    book: null,
    books: [],
    bookList: [],
    isloading: false,
    errorMessage: null,
  },
  extraReducer: {
    [getBooks.pending]: (state, action) => {
      state.isloading = true;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isloading = false;
      state.books = action.payload;
      console.log(action.payload, "ful");
    },
    [getBooks.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },

    [fetchBookDetails.pending]: (state, action) => {
      state.isloading = true;
    },
    [fetchBookDetails.fulfilled]: (state, action) => {
      state.isloading = false;
      state.book = action.payload;
    },
    [fetchBookDetails.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },

    [addToReadingList.pending]: (state, action) => {
      state.isloading = true;
    },
    [addToReadingList.fulfilled]: (state, action) => {
      state.isloading = false;
      state.book = action.payload;
    },
    [addToReadingList.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
  },
});
// export const { getBookSuccess } = bookSlice.actions;

// export const getBook =
//   ({ pageNum, limit, query }) =>
//   async (dispatch) => {
//     try {
//       let url = `/books?_page=${pageNum}&_limit=${limit}`;
//       if (query) url += `&q=${query}`;
//       const res = await api.get(url);
//       dispatch(getBookSuccess(res.data));
//       console.log(res, "res");
//     } catch (error) {}
//   };
export default bookSlice.reducer;
