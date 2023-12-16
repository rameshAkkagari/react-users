import { configureStore } from "@reduxjs/toolkit";
import Details from "./Details";
const store = configureStore({
    reducer:{
        detailsStore:Details.reducer,
    }
})
export default store;