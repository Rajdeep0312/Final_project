import React from 'react'
import DrawerAppBar from '../NavComponents/DrawerAppBar';
import { Box, Container, Toolbar } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ApplyCourse from './ApplyCourse';
import { useParams } from 'react-router-dom';
import Payment from '../RazorPay/Payment';
import Confirmation from '../RazorPay/Confirmation';

const steps = ['Course & Student Details', 'Proceed to Payment', 'Complete Payment','Download Invoice'];

const ApplyWithPayment = () => {
  const {id,cname} = useParams();

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  // const isStepOptional = (step) => {
  //   return step === 1;
  // };

  // const isStepSkipped = (step) => {
  //   return skipped.has(step);
  // };

  const handleNext = () => {
    let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
  };



  return (
    <>
      <DrawerAppBar/>
      <Toolbar/>
      
      <Container sx={{marginTop:"2em"}}>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              {/* if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              } */}
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button color='success' variant='outlined' onClick={handleReset}>Go to Dashboard</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>


              {
                activeStep === 0 &&
                <Box sx={{ mt: 2, mb: 1, py: 1 }}>
                  <ApplyCourse id={id} cname={cname}/>
                </Box>
              }
              {
                activeStep === 2 &&
                <Box sx={{ mt: 2, mb: 1, py: 1 }}>
                  <Payment/>
                </Box>
              }
              {
                activeStep === 3 &&
                <Box sx={{ mt: 2, mb: 1, py: 1 }}>
                  <Confirmation/>
                </Box>
              }



              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                {activeStep > 2 ? null :
                <>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>                  
                </>
                }
                {/* {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )} */}
                <Box sx={{ flex: '1 1 auto' }} />
                <Button variant='outlined' onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Container>
    </>
  )
}

export default ApplyWithPayment