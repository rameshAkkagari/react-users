import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl,Stack, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
    const countries = [
        { name: 'India', code: 'INDIA' },
        { name: 'United States', code: 'US' },
        {name:"Australia",code:"Australia"}
    ];


const statesByCountry = {
    INDIA:['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur',],
    US: ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana',],
    Australia:['New South Wales (NSW)','Victoria (VIC)','Queensland (QLD)','South Australia (SA)','Western Australia (WA)','Tasmania (TAS)',]
  
};

    const AlluserDetails = (props) => {
        const [userDetails,setUserDetails] = useState({
            firstName:"",
            lastName:"",
            email:"",
            mobile:"",
            address1:"",
            address2:"",
            zipCode:"",
        })
        const [country, setCountry] = useState('');
        const [state, setState] = useState('');
        const [users,setUsers] = useState([])
        const [isedit,setIsedit] = useState({
            id:"",
            isEditing:false
        })
        // const [isCountryValid, setIsCountryValid] = useState(true);

    const handleCountryChange = (event) => {
            const selectedCountry = event.target.value;
            setCountry(selectedCountry);
            // setIsCountryValid(countries.includes(selectedCountry));
            // Reset state when country changes
            setState('');
        };

    const handleSubmit  =(e)=>{
            e.preventDefault();

            if(!userDetails.firstName || userDetails.firstName.length < 5){
                return toast.error("Firstname must be minimum 5 char",{position:toast.POSITION.TOP_CENTER,theme:"colored"})
            }

            if(!userDetails.lastName || userDetails.lastName.length < 5){
                return toast.error("lastName must be minimum 5 char",{position:toast.POSITION.TOP_CENTER,theme:"colored"})
            }

            if(!isValidEmail(userDetails.email)) {
                return toast.error("Please enter a valid email address.",{position:toast.POSITION.TOP_CENTER,theme:"colored"})
                
            }

            if(userDetails.address1.length < 10) {
                return toast.error("Please enter your stress name and House no",{position:toast.POSITION.TOP_CENTER,theme:"colored"})
            }

            if (userDetails.zipCode.length !== 6 ) {
                return toast.info("Please enter a valid 6-digit zip code", { position: toast.POSITION.TOP_CENTER });
            }
            //   if (isCountryValid){

            //     return toast.info("Invalid country. Please select a valid country.",{position:toast.POSITION.TOP_CENTER})
            // } else {
            //     return;
            //    }

            const newUser ={
                id:new Date().getTime().toString(),
                firstName:userDetails.firstName.toLocaleUpperCase(),
                lastName:userDetails.lastName,
                email:userDetails.email,
                mobile:userDetails.mobile,
                address1:userDetails.address1,
                address2:userDetails.address2,
                country:country,
                state:state,
                zipCode:userDetails.zipCode
            }
            console.log(users);
            setUsers([...users,newUser])
            setUserDetails({
                firstName:"",
                lastName:"",
                email:"",
                mobile:"",
                address1:"",
                address2:"",
                zipCode:"",
            })
            setCountry("")
            setState("")
        
    }

    // Function to validate email using a regular expression
    const isValidEmail = (email) => {
        // Regular expression for a simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    // Delete user using the filter method
    const OnHandlerDelete  =(id)=>{
        const removeUser = users.filter((remove)=>{
            return remove.id !== id
        })
        setUsers(removeUser)
        toast.success("Delete successfull",{position:toast.POSITION.TOP_CENTER,theme:"light"})
    }
    
    // function to edit user details 
    const OnEditHandler = (id) =>{
        setIsedit({
            ...isedit,
            id:id,
            isEditing:true
        })
        // Find the specific user with the help of find method
    const edituserDetails = users.find((findEachuser)=> findEachuser.id === id)
    console.log(edituserDetails);
        setUserDetails({
            id:edituserDetails.id,
            firstName:edituserDetails.firstName,
            lastName:edituserDetails.lastName,
            email:edituserDetails.email,
            mobile:edituserDetails.mobile,
            address1:edituserDetails.address1,
            address2:edituserDetails.address2,
            country:edituserDetails.country,
            state:edituserDetails.state,
            zipCode:edituserDetails.zipCode
        })
    }

  const OnUpdateUserDetails = (e) => {
    e.preventDefault();
  
    // Use map to create a new array with the updated user details
    const updatedUsers = users.map((item) => {
      if (item.id === isedit.id) {
        return {
          id: isedit.id,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          mobile: userDetails.mobile,
          address1: userDetails.address1,
          address2: userDetails.address2,
          country: country,
          state: state,
          zipCode: userDetails.zipCode,
        }
      } else {
        return item;
      }
    });
  
    // Update the state with the new array of users
    setUsers(updatedUsers);
  
    // Reset the form and state values
    setUserDetails({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address1: "",
      address2: "",
      zipCode: "",
    });
    setCountry("");
    setState("");
    setIsedit({
      id: "",
      isEditing: false,
    });
    toast.success("updated successfull",{position:toast.POSITION.TOP_CENTER,theme:"light"})
  };
  
  return (
    <>
    <div className='center'>
    <Typography variant='h4' padding={3}>Craete user</Typography>
    
    <Stack direction={'column'} width={900} spacing={3}>
        <TextField
            label="First Name"
            value={userDetails.firstName}
            onChange={(e) => setUserDetails({
                ...userDetails,
                firstName:e.target.value
            })}
            required
            autoComplete='off'
        />

        <TextField
            label="Last Name"
            value={userDetails.lastName}
            onChange={(e) => setUserDetails({
                ...userDetails,
                lastName:e.target.value
            })}
            required
            autoComplete='off'

        />

        <TextField
            label="Email Id"
            type="email"
            value={userDetails.email}
            onChange={(e) => setUserDetails({
                ...userDetails,
                email:e.target.value
            })}
            required
            autoComplete='off'

        />

        <TextField
            label="Mobile"
            type='number'
            value={userDetails.mobile}
            onChange={(e) => setUserDetails({
                ...userDetails,
                mobile:e.target.value
            })}
            required
            autoComplete='off'

        />

        <TextField
            label="Address 1"
            value={userDetails.address1}
            onChange={(e) => setUserDetails({
                ...userDetails,
                address1:e.target.value
            })}
            required
            autoComplete='off'

        />

        <TextField
            label="Address 2"
            value={userDetails.address2}
            autoComplete='off'
            onChange={(e) => setUserDetails({
                ...userDetails,
                address2:e.target.value
            })}
        />

        <FormControl>
            <InputLabel>Country</InputLabel>
            <Select value={country} onChange={handleCountryChange} required>
                {countries.map((item) => (
                    <MenuItem key={item.code} value={item.code}>
                    {item.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        {country && (
            <FormControl>
            <InputLabel>State</InputLabel>
                <Select value={state} onChange={(e) => setState(e.target.value)} required>
                    {statesByCountry[country].map((stateName) => (
                    <MenuItem key={stateName} value={stateName}>
                        {stateName}
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )}

        <TextField
            label="Zip Code"
            value={userDetails.zipCode}
            onChange={(e) => setUserDetails({
                ...userDetails,
                zipCode:e.target.value
            })}
            required
            type="number"
            autoComplete='off'

        />
       {isedit.isEditing ? (<Button size='medium' style={{ width: '200px' }} variant="contained" color="primary" onClick={OnUpdateUserDetails}>
            update
            </Button>
        ):(<Button size='medium' style={{ width: '200px' }} variant="contained" color="primary" onClick={handleSubmit}>
            create
            </Button>
            )
        }

    </Stack>
    </div>

    <div className='container'>
        {
            users.map((eachUsers)=>{
                const {firstName,id,lastName,address1,country,email,mobile,state,zipCode} = eachUsers
                return (
                    <ul className='usersdetails'>
                    <li key={id}>
                        <h3>First name:{firstName}</h3>
                        <h3>Last name: {lastName}</h3>
                        <h4>Add: {address1}</h4>
                        <h4>Email: {email}</h4>
                        <p>Mobile: {mobile}</p>
                        <h3>Country: {country}</h3>
                        <h4>{state}</h4>
                        <span>{zipCode}</span>
                        
                        <Button size='medium' style={{ width: '100px',height:"30px",margin:"7px" }} color='error' variant="contained" onClick={()=>OnHandlerDelete(id)}>
                            Delete
                        </Button>
                        <Button size='medium' style={{ width: '100px',height:"30px",margin:"7px" }} variant="contained" onClick={()=>OnEditHandler(id)}>
                            Edit
                        </Button>
                        
                    </li>
                    </ul>
                )
            })
        }
    </div>
    <ToastContainer></ToastContainer>
    </>
  );
};

export default AlluserDetails;
