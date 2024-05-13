import React, { useEffect, useState } from 'react'
import DrawerAppBar from '../NavComponents/DrawerAppBar'
import { Box, Container, Grid, Toolbar } from '@mui/material'
import Footer from '../NavComponents/Footer'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';


const Course = () => {

    const [courseData, setCourseData] = useState([]);


    useEffect(() => {
        const options = {
        method: 'GET',
        url: 'https://courses9.p.rapidapi.com/api/v6/website/labels',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '1462331492msh4263adfe366c539p137e91jsn3ce32463ad72',
            'X-RapidAPI-Host': 'courses9.p.rapidapi.com'
        }
        };

        async function getData() {
            try {
              const response = await axios.request(options);
              setCourseData(response.data.data);
            } catch (error) {
              console.error(error);
            }
          } 

        return() =>{
            getData()
        }
    
    }, [])
    



  return (
    <>
        <DrawerAppBar/>
            <Box sx={{p:2}}>
                <Toolbar/>

                <Typography variant='h3' sx={{textAlign : 'center', marginBottom : "2rem" , padding : "5px"}}>Courses</Typography>


                <Container sx={{mx:'auto', }}>
                <Grid container spacing={3}>
                {courseData.map((data)=>(

                <Grid key={data.id} item xs={2} sm={4} md={4} sx={{ padding: "0px"}}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="./images/pic3.jpg"
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {data.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, nobis.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">View</Button>
                            <Button size="small">Apply Now</Button>
                        </CardActions>
                    </Card>
                </Grid>

                ))}
                </Grid>
                </Container>
                
            
            </Box>
        <Footer/>
    </>
  )
}

export default Course