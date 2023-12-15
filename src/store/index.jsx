import { configureStore } from "@reduxjs/toolkit";
import Details from "./Details";
// import UserActions from "./UserActions";
// import Edituser from "./EditUSer";
const store = configureStore({
    reducer:{
        detailsStore:Details.reducer,
        // userstore:UserActions.reducer,
        // edit:Edituser.reducer
    }
})
export default store;