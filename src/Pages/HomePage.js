import React from 'react'
import DrawerAppBar from '../NavComponents/DrawerAppBar'
import Box from '@mui/material/Box';
import Footer from '../NavComponents/Footer';
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';



import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';


const cards = [
  {
    id:1,
    img : "images/pic1.jpg",
    title: "Course 1",
    link: "",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. "
  },
  {
    id:2,
    img : "images/pic2.jpg",
    title: "Course 2",
    link: "",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. "
  },
  {
    id:3,
    img : "images/pic3.jpg",
    title: "Course 3",
    link: "",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. "
  }
]

const HomePage = () => {

  const navi = useNavigate();

  const hcert = ()=>{
    navi('/certificate')
  }



  return (
    <>
      <DrawerAppBar/>
      <section className='main-section'>
        <div className="section1"></div>
        <div className='types'>
          <Typography variant='h2' component="h2">Develop your skills</Typography>
          <Typography variant="h5" component="h2" sx={{mt:1, mb:0}}>
           More than 500 courses
          </Typography>
          <div className="button-navi">
          <button className='btn pointer' onClick={()=>{
            navi("/courses")
          }}>Courses</button>
          <button className="btn pointer" onClick={hcert}>Certificate</button>
        </div>
        </div>
      </section>
      <Box component="main" sx={{ p: 2 }}>        
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sequi ut iure dolorum culpa perferendis adipisci ratione suscipit hic magni. Possimus fugit est asperiores, non, explicabo aut voluptas magni sint quasi hic minima, deleniti esse? Quam, iusto sequi corporis repellat culpa autem reiciendis optio! Vel rerum necessitatibus culpa. Eum, in.
        </Typography>   
      </Box>
      <Box component="main" sx={{ 
        p: 2, 
        display:'flex',
        flexDirection:'column', 
        alignItems:'center'
        }}>   
        <Typography variant="h2" component="h2">
          Courses
        </Typography> 
        <Grid
          spacing={2}
          p={2}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          >   
          {cards.map((card)=>(
            <Grid key={card.id} item>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt={card.title}
                height="140"
                image={card.img}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View Course</Button>
              </CardActions>
            </Card></Grid>
          ))}
        </Grid>
      </Box>
      <Footer/>
    </>
  )
}

export default HomePage