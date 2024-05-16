import React from 'react'
import DrawerAppBar from '../NavComponents/DrawerAppBar'
import { Box, Toolbar , Button, Grid, Typography } from '@mui/material'

const ViewCourse = (props) => {
  return (
    <>
        <DrawerAppBar/>
        <Toolbar/>
        <Box sx={{ padding:"1rem", display:"flex", width:"100wh", height:"100vh", justifyContent:"space-between" }}>        
            <Grid sx={{flex:"1"}} container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                <img src="./images/AI ML.jpeg" alt="" className='view-course-image'/>
                <Grid item xs={6} md={8}>
                    <Typography variant='h4' component="h2">Course Details</Typography>
                    <Typography variant='h4' component="h2">{props.courseData}</Typography>
                </Grid>
            </Grid>
            
  
            <Box>
                <Button>Apply Now</Button>
            </Box>
        </Box>
    </>
  )
}

export default ViewCourse