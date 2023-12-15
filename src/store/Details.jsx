import { createSlice } from "@reduxjs/toolkit";

const Details = createSlice({
    name:"details",
    initialState:{
        users:[],
        isEdit:{
            id:"",
            status:false
        },
        id:"",
        firstName:"",
        lastname:"",
        email:"",
        mobile:"",
        address1:"",
        address2:"",
        country:"",
        state:"",
        zipcode:"",

        countries:[
                { name: 'India', code: 'INDIA' },
                { name: 'United States', code: 'US' },
                {name:"Australia",code:"Australia"}
            ],
            statesByCountry:{
                 INDIA:['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur',],
                 US: ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana',],
                 Australia:['New South Wales (NSW)','Victoria (VIC)','Queensland (QLD)','South Australia (SA)','Western Australia (WA)','Tasmania (TAS)',]
            }
    },
    reducers:{
        firstnameChnage(state,action){
             state.firstName = action.payload
        },
        lastNameChange(state,action){
            state.lastname = action.payload
        },
        emailchange(state,action){
            state.email = action.payload
        },
        mobileChange(state,action){
            state.mobile = action.payload
        },
        address1Change(state,action){
            state.address1 = action.payload
        },
        address2Change(state,action){
            state.address2 = action.payload
        },

        seletecountry(state,action){
            state.country = action.payload
        },

        seleteState(state,action){
            state.state = action.payload
        },

        typezipcode(state,action){
            state.zipcode = action.payload
        },

        adduser(state,action){
            state.users.push(action.payload);
            // Reset the form and values
            state.firstName = "";
            state.lastname = "";
            state.email = "";
            state.mobile = "";
            state.address1 = "";
            state.address2 = "";
            state.country = "";
            state.state = "";
            state.zipcode = ""
            state.id = "";

        },

        removeuser(state,action){
            const id = action.payload
            state.users = state.users.filter((each) => each.id !== id);
        },

        edituser(state,action){
             state.id = action.payload.id;
             state.isEdit.status = true;
             state.isEdit.id = action.payload.id
             state.firstName = action.payload.firstName;
             state.lastname = action.payload.lastname;
             state.email = action.payload.email;
             state.mobile = action.payload.mobile;
             state.address2 = action.payload.address2;
             state.address1 = action.payload.address1;
             state.country = action.payload.country;
             state.state = action.payload.state;
             state.zipcode = action.payload.zipcode
        },

        updatedetails(state,action){
            const update = state.users.map((item)=>{
                if(item.id === state.isEdit.id){
                    return {
                        id:state.isEdit.id,
                        firstname:state.firstName,
                        lastname:state.lastname,
                        email:state.email,
                        mobile:state.mobile,
                        address1:state.address1,
                        address2:state.address2,
                        country:state.country,
                        state:state.state,
                        zipcode:state.zipcode
                    }
                }
                else {
                    return item
                }
            })
            // Update the state with the new array of users
            state.users = update;
            // Reset the form 
            state.firstName = "";
            state.isEdit.status = false;
            state.isEdit.id = ""
            state.lastname = "";
            state.email = "";
            state.mobile = "";
            state.address1 = "";
            state.address2 = "";
            // state.country = "";
            // state.state  = "";
            state.zipcode = ""
            state.id = "";

        }

    }
})

export const DetailsActions = Details.actions;

export default Details;