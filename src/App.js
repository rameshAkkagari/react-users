import React from 'react'
import CreateUser from './Components/CreateUser'
import DisplayAllusers from './Components/DisplayAllusers'
import { Stack } from '@mui/material'
// import AlluserDetails from './Components/AlluserDetails'
function App() {
  return (
    <Stack display={'flex'}>
        {/* <AlluserDetails/>   */}
        <CreateUser/>
        <DisplayAllusers/>
    </Stack>
  )
}

export default App
