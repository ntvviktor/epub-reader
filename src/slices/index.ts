import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from 'redux'
import book from '@/slices/book'

const reducer = combineReducers({
    book
});

export type RootState = ReturnType<typeof reducer>

const store = configureStore({
    reducer,
});

export default store