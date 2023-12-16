import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { DetailsActions } from '../store/Details';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateUser() {

    const firstname = useSelector((state)=>state.detailsStore.firstName)
    const lastname = useSelector((state)=>state.detailsStore.lastname)
    const email = useSelector((state)=>state.detailsStore.email)
    const mobile = useSelector((state)=>state.detailsStore.mobile)
    const address1 = useSelector((state)=>state.detailsStore.address1)
    const address2 = useSelector((state)=>state.detailsStore.address2)
    const countrys = useSelector((state)=>state.detailsStore.country)
    const states = useSelector((state)=>state.detailsStore.state)
    const zipcode = useSelector((state)=>state.detailsStore.zipcode)
    

    const  countries = useSelector((state)=>state.detailsStore.countries)
    // console.log(countries);

    const statesByCountry  = useSelector((state)=>state.detailsStore.statesByCountry);

    const isEdit = useSelector((state)=>state.detailsStore.isEdit.status)
    console.log(isEdit);
    
    const dispatch = useDispatch()

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        dispatch(DetailsActions.seletecountry(selectedCountry));
        console.log(selectedCountry);
      };

      const handleStateChange = (event) => {
        const selectedState = event.target.value;
        dispatch(DetailsActions.seleteState(selectedState));
      };

         // Function to validate email using a regular expression
         const isValidEmail = (email) => {
            // Regular expression for a simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };
    

    const submituser  =(e) =>{
        e.preventDefault();
                if(!firstname || firstname.length < 5 ){
                        return toast.error("Firstname must be minimum 5 char",{position:toast.POSITION.TOP_CENTER,theme:"colored"})
                }

                if(!lastname ||lastname.length < 5){
                        return toast.error("lastName must be minimum 5 char",{position:toast.POSITION.TOP_CENTER,theme:"colored"})
                }
                    
                if(!isValidEmail(email)) {
                    return toast.error("Please enter a valid email address.",{position:toast.POSITION.TOP_CENTER,theme:"colored"})
                    
                }
            
                if(address1.length < 10){
                    return toast.error("Please enter your stress name and House no",{position:toast.POSITION.TOP_CENTER,theme:"colored"})
                }
            
                if (zipcode.length !== 6 ){
                    return toast.info("Please enter a valid 6-digit zip code", { position: toast.POSITION.TOP_CENTER });
                }

             
        const newUser = {
            id:new Date().getTime().toString(),
            firstname:firstname,
            lastname:lastname,
            email:email,
            mobile:mobile,
            countrys:countrys,
            states:states,
            address1:address1,
            address2:address2,
            zipcode:zipcode,
        };
        console.log(newUser);
        dispatch(DetailsActions.adduser(newUser))
    };

    const updateuserdetails  =(e) =>{
        e.preventDefault();
        dispatch(DetailsActions.updatedetails());
    }

  return (
    <>
    <form>
        <Stack padding={15}width={500} spacing={2}>
    <Typography variant='h4'>Create user</Typography>
            <TextField
                label="First Name"
                autoComplete='off'
                value={firstname}
                onChange={(e)=>dispatch(DetailsActions.firstnameChnage(e.target.value))}
            />

            <TextField
                label="Last Name"
                value={lastname}
                onChange={(e)=>dispatch(DetailsActions.lastNameChange(e.target.value))}
            />

        <TextField
            label="Email Id"
            type="email"
            value={email}
            onChange={(e)=>dispatch(DetailsActions.emailchange(e.target.value))}
        />

        <TextField
            label="Mobile"
            type='number'
            value={mobile}
            onChange={(e)=>dispatch(DetailsActions.mobileChange(e.target.value))}
        />

        <TextField
            label="Address 1"
            value={address1}
            onChange={(e)=>dispatch(DetailsActions.address1Change(e.target.value))}
        />

        <TextField
            label="Address 2"
            value={address2}
            onChange={(e)=>dispatch(DetailsActions.address2Change(e.target.value))}
        />

        <FormControl>
            <InputLabel>Country</InputLabel>
            <Select value={countrys} onChange={handleCountryChange}>
                {countries.map((item) => (
                    <MenuItem key={item.code} value={item.code}>
                    {item.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        {countrys && (
            <FormControl>
            <InputLabel>State</InputLabel>
                <Select value={states} required onChange={handleStateChange}>
                    {statesByCountry[countrys].map((stateName) => (
                    <MenuItem key={stateName} value={stateName}>
                        {stateName}
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )}

        <TextField
            label="Zip Code"
            value={zipcode}
            required
            type="number"
            autoComplete='off'
            onChange={(e)=>dispatch(DetailsActions.typezipcode(e.target.value))}

        />
        { isEdit ? (<Button variant='outlined' onClick={updateuserdetails}>update</Button>) 
            :(<Button type='submit' onClick={submituser} variant='contained'>create users</Button>)}
        
        

        </Stack>
        <ToastContainer></ToastContainer>
    </form>
    </>
  )
}

export default CreateUser