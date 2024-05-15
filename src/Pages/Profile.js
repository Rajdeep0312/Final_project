import { Typography } from '@mui/material'
import React from 'react'
import { useUserAuth } from '../Authentication/UseAuthContext'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile = () => {
  const {user} = useUserAuth();
  console.log(user)
  return (
    <>
    <div>
      <Typography>Name: {user.displayName}</Typography>
      <Typography>Email: {user.email}</Typography>
      <img alt='profileimg' src={user.PhotoURL ? user.PhotoURL : <AccountCircleIcon/>}/>
    </div>
    </>
  )
}

export default Profile