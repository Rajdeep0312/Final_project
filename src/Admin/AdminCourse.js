import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Alert, Box, Button, Grid, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Label } from '@mui/icons-material';
import { get, onValue, ref } from 'firebase/database';
import { database } from '../firebase/firebase';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const AdminCourse = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [courseData, setCourseData] = useState({
    courseId : "",
    courseName : "",
    instructor : "",
    about : "",
    subCourse: "",
  });
  const [error, setError] = useState("");
  const [crseData, setCrseData] = useState([])

  let name, value;
  const handleChange = (e) =>{
    name = e.target.name;
    value = e.target.value;
    setCourseData({...courseData, [name]:value})
  }
  

  const formPost = async (e) =>{
    e.preventDefault();
    const {courseId, courseName, instructor, about, subCourse} = courseData;
      if (courseId && courseName && instructor && about && subCourse) {
      const response = await fetch(`https://final-year-project-b1ebf-default-rtdb.firebaseio.com/CoursesData.json`, {
        method: "POST",
        headers:{
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          courseId, courseName, instructor, about, subCourse
        }),
      });
      if (response) {
        console.log(response);
        alert("data submitted")
        setError("");
        setDialogOpen(false);
      } else {
        alert("fill user data")
      }
    }else {
      alert("fill user data")
    }
  }

  useEffect(() => {
    const courseRef = ref(database, 'CoursesData');
    get(courseRef).then((snapshot) =>{
      if (snapshot.exists) { 
        let records = []
        snapshot.forEach(childSnapshot=>{
          let keyName = childSnapshot.key;
          let data = childSnapshot.val();
          records.push({"key":keyName,"data":data})
        })
        setCrseData(records)
      }
      else{
        alert("no data available");
      }
    }).catch((err)=>{
      setError(err.messages)
    })
  }, [])  


  return (
    <>
      {error && <Alert sx={{zIndex:50}}>{error}</Alert>}
      <Box>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ alignItems:"center"}}>
          {
            crseData.map((data, id)=>(
              <Grid item key={id}>
                <Card sx={{ Width: "75px" }}>
                  <CardContent>
                    <Typography fontWeight={600} gutterBottom>
                      {data.data.courseName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Course Id : {data.data.courseId}
                    </Typography>
                    <Typography variant="body2">
                      {data.data.about}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          }

          <Grid item>
            <Button onClick={()=>setDialogOpen(true)} sx={{ border:"2px solid", borderStyle: "dashed", borderColor:"#26486b",borderRadius:"5px", width:"100px", height:"100px", display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center", "&:hover":{borderColor:"#1a72bb"}}}>
              <AddIcon/>
              <p>Add Course</p>
            </Button>
          </Grid>
        </Grid>                
      </Box>




      {dialogOpen ? 
        <Dialog
          open={dialogOpen}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="add-course-details"
          sx={{overflow:"auto"}}
        >
          <DialogTitle fontSize={25} marginBottom={0} fontWeight={600}>
            Course Details
          </DialogTitle>
          <DialogContent>
            <Box component="form" method='post' onSubmit={formPost} noValidate autoComplete='off'>
                <TextField
                  margin="normal"
                  required
                  id="courseId"
                  label="Course Id"
                  name="courseId"
                  type='number'
                  autoFocus
                  sx={{marginRight:"2em"}}
                  value={courseData.courseId}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required                  
                  id="courseName"
                  label="Course Name"
                  name="courseName"
                  autoFocus
                  sx={{marginLeft:"2em"}}
                  value={courseData.courseName}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"                  
                  fullWidth
                  name="instructor"
                  label="Instructor"
                  type="text"
                  id="instructor"
                  value={courseData.instructor}
                  onChange={handleChange}
                />

                <Typography variant='h6' fontWeight={500} component="h6" marginLeft={2} marginTop={2}>About Course</Typography>

                <TextField
                  margin="normal"                  
                  fullWidth
                  name="about"
                  label="What to learn"
                  type="text"
                  id="about"
                  value={courseData.about}
                  multiline
                  maxRows={4}
                  onChange={handleChange}
                />

                <Typography variant='h6' fontWeight={500} component="h6" marginLeft={2} marginTop={2}>Add Sub Course</Typography>

                <Box sx={{ display:"flex", gap:"1em",alignItems:"center"}}>
                  <TextField
                    margin="normal"                  
                    name="subCourse"
                    label="Sub Course Name"
                    type="text"
                    id="subCourse"
                    value={courseData.subCourse}
                    onChange={handleChange}
                  />
                  <Button variant='outlined'>Add</Button>
                </Box>

                <DialogActions>
                  <Button onClick={()=>setDialogOpen(false)}>Cancel</Button>
                  <Button variant='contained' type='submit'>Submit</Button>
                </DialogActions>
              </Box>
          </DialogContent>
          
        </Dialog>:null
      }
    </>
  )
}

export default AdminCourse