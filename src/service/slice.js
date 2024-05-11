import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../apiService";
import axios from "axios";

export const addToReadingList = createAsyncThunk(
  "books/addToReadingList",
  async (book) => {
    const response = await api.post("/favorites", book);
    return response.data;
  }
);
export const fetchBookDetails = createAsyncThunk(
  "books/fetchBookDetails",
  async ({ bookId }) => {
    console.log(bookId, "slice");
    const response = await axios.get(`http://localhost:5000/books/${bookId}`);
    console.log(response.data, "response");
    return response.data;
  }
);
export const getBooks = createAsyncThunk(
  "books/getBooks",
  async ({ pageNum, limit, query }) => {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const response = await api.get(url);
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isloading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state) => {
        state.isloading = false;
      })
      .addCase(fetchBookDetails.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.isloading = false;
        state.book = action.payload;
      })
      .addCase(fetchBookDetails.rejected, (state) => {
        state.isloading = false;
      })
      .addCase(addToReadingList.pending, (state) => {
        state.isloading = true;
      })
      .addCase(addToReadingList.fulfilled, (state, action) => {
        state.isloading = false;
        state.bookList.push(action.payload);
      })
      .addCase(addToReadingList.rejected, (state) => {
        state.isloading = false;
      });
  },
});
export default bookSlice.reducer;
