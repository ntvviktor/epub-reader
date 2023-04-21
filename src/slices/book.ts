import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Book from '@/types/book'
import Page from '@/types/page'
import Toc from '@/types/toc'

const initialBook: Book = {
    coverURL: '',
    title: '',
    description: '',
    published_date: '',
    modified_date: '',
    author: '',
    publisher: '',
    language: ''
}

const initialCurrentLocation: Page = {
    chapterName: "-",
    currentPage: 0,
    totalPage: 0,
    startCfi: '',
    endCfi: '',
    base: ''
}


const initialState: BookState = {
    book: initialBook,
    currentLocation: initialCurrentLocation,
    toc: [],
}


const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        updateBook(state, action: PayloadAction<Book>) {
            state.book = action.payload;
        },
        updateCurrentPage(state, action: PayloadAction<Page>) {
            state.currentLocation = action.payload;
        },
        clearBook(state) {
            state.book = initialBook;
        },
        updateToc(state, action: PayloadAction<Toc[]>) {
            state.toc = action.payload;
        },
        clearToc(state) {
            state.toc = [];
        },
    }
});


export interface BookState {
    book: Book;
    currentLocation: Page;
    toc: Toc[];
}

export const {
    updateBook,
    clearBook,
    updateCurrentPage,
    updateToc,
    clearToc
} = bookSlice.actions;

export default bookSlice.reducer