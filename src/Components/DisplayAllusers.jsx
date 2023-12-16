import { Button, Stack } from '@mui/material'
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { DetailsActions } from '../store/Details'
function DisplayAllusers() {
    const allusers = useSelector((state)=>state.detailsStore.users)
    const dispatch = useDispatch();


    const deleteuser = (id) => {
        console.log(id);
        dispatch(DetailsActions.removeuser(id));
    };

    const Edituser = (each) => {
        console.log(each.id);
        console.log(each);
    
        dispatch(DetailsActions.edituser({
             id: each.id,
             firstName: each.firstname,
             lastname: each.lastname,
             email: each.email,
             mobile: each.mobile,
             address1: each.address1,
             address2: each.address2,
             country:each.countrys,
             state:each.states,
             zipcode:each.zipcode
        }));
    };

  return (
    <>
    <Stack spacing={2} width={400} margin={2}>
        <ul>
            {
                allusers.map((each,i)=>{
                    console.log(each);
                    const {id,firstname,lastname,email,mobile,address1,address2,countrys,states,zipcode} = each
                    return (
                        <li key={i}>
                            <h3>{firstname}</h3>
                            <h3>{lastname}</h3>
                            <h3>{email}</h3>
                            <h3>{mobile}</h3>
                            <h3>{address1}</h3>
                            <h3>{address2}</h3>
                            <h3>{countrys}</h3>
                            <h4>{states}</h4>
                            <p>{zipcode}</p>
                            <Button variant='contained' onClick={(e)=>deleteuser(id)}>Delete</Button>
                            <Button variant='outlined' onClick={(e)=>Edituser(each)}>Edit</Button>
                        </li>
                    )
                })
            }
        </ul>
    </Stack>
    
    </>
  )
}

export default DisplayAllusers