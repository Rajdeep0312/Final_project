import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useUserAuth } from '../Authentication/UseAuthContext';
import { useParams } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Apply() {
  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [course, setCourse] = React.useState([]); 
  
  const { id } = useParams();

  const { data } = useUserAuth();

  useEffect(() => {
    function dataLoading() {
        try {
            if (!data) {
                setLoading(true)
            }
            else{
                setLoading(false)
                setCourse(data.data)
            }
        } catch (error) {
            console.log(error.messages)
        }
    }
    dataLoading()
    
  }, [data])



  return (
    <React.Fragment>
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
      
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
}
