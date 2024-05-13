import React from 'react'
import DrawerAppBar from '../NavComponents/DrawerAppBar'
import { Box, Toolbar } from '@mui/material'
import Footer from '../NavComponents/Footer'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const Course = () => {
  return (
    <>
        <DrawerAppBar/>
            <Box sx={{p:2}}>
                <Toolbar/>

                <Typography variant='h3' sx={{}}>Courses</Typography>


                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image="./images/pic3.jpg"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            
            </Box>
        <Footer/>
    </>
  )
}

export default Course