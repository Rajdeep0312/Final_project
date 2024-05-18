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
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../Authentication/UseAuthContext';
import CircularProgress from '@mui/material/CircularProgress';


const Course = () => {

    const [courseData, setCourseData] = useState([])
    const [loading, setLoading] = useState(true);

    const navi = useNavigate();

    const { data } = useUserAuth();

    useEffect(() => {
        function dataLoading(){
            if (!data) {
                setLoading(true);
            }
            else{
                setLoading(false)
                setCourseData(data.data)
            }
        }
        dataLoading();
        
    }, [data]);  
    

    
  return (
    <>
        <DrawerAppBar/>
            <Box sx={{p:2}}>
                <Toolbar/>

                {loading ? <CircularProgress/>
                :
                <>
                <Typography variant='h3' sx={{textAlign : 'center', marginBottom : "2rem" , padding : "5px"}}>Courses</Typography>
                <Container sx={{mx:'auto', }}>
                <Grid container spacing={3}>
                {courseData.map((d)=>(
                <Grid key={d.id} item xs={2} sm={4} md={4} sx={{ padding: "0px"}}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="./images/pic3.jpg"
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {d.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, nobis.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant='contained' size="small" onClick={()=>{
                                navi(`/viewcourses/${d.name}/${d.id}`)
                            }}>View</Button>
                            <Button variant='outlined' size="small">Apply Now</Button>
                        </CardActions>
                    </Card>
                </Grid>

                ))}
                </Grid>
                </Container>     
                </>
            }
                
            
            </Box>
        <Footer/>
    </>
  )
}


export default Course