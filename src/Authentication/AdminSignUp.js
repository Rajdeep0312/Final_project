import React, {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link,useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

import Card from '@mui/material/Card';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" to={"/"}>
          SkillSphere
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}
  
const theme = createTheme();




export default function AdminSignUp(){

  const [adminUsers, setAdminUsers] = useState({
    uniqueId : "",
    email : "",
    password : ""
  })
  const [error, setError] = useState("");

  const navigate = useNavigate();

  let name, value;
  const handleChange = (e) =>{
    name = e.target.name;
    value = e.target.value;
    setAdminUsers({...adminUsers, [name]:value})
  }


  const handleSubmit = async (event) => {
      event.preventDefault();   
      const {uniqueId, email, password} = adminUsers;
      if (uniqueId && email && password) {
        const response = await fetch(`https://final-year-project-b1ebf-default-rtdb.firebaseio.com/AdminUsers.json`, {
          method: "POST",
          headers:{
            "Content-Type" : "application/json",
          },
          body: JSON.stringify({
            uniqueId, email, password
          }),
        });
        if (response) {
          alert("data submitted")
          setError("");
          navigate("/admindashboard");
        } else {
          alert("fill user data")
        }
      }else {
        alert("fill user data")
      }
    };



const toggleswitch=()=>{
  navigate('/register')
}




  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card variant='outlined'
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2
          }}
        >

          <Button onClick={toggleswitch}><SwitchAccessShortcutAddIcon/><p>Switch to Student SignUp</p></Button>


          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin SignUp
          </Typography>

          {error && <Alert sx={{marginTop:2}} severity="error">{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="uniqueId"
              label="Username"
              name="uniqueId"
              value={adminUsers.uniqueId}
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={adminUsers.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={adminUsers.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SignUp
            </Button>
            <Grid container>
              <Grid item>
                <Link to='/adminlogin'>
                    Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </>
  )
}
