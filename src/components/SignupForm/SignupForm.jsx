import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { auth, db } from '../../authentication/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

export default function SignupForm() {
    
    const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    const initialState = {
        "fullname":"",
        "email": "",
        "username": "",
        "password": "",
        "gender":""
    };
    let [userInput, setUserInput] = useState(initialState);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, userInput.email, userInput.password);
          console.log('User signed up successfully:', userCredential);
          const user = userCredential.user;
      
          // Save additional user information in Firestore
          await setDoc(doc(db, "users", user.uid), {
            fullname: userInput.fullname,
            email: userInput.email,
            username: userInput.email,
            gender:userInput.gender
          });
          
          setUserInput(initialState);
        } catch (error) {
          console.error('Error signing up:', error.message);
          console.error('Error details:', error);
          // Optionally, you can display user-friendly messages or take other actions
        }
      };
    const handleChanges = (e) => {
        const { name, value } = e.target;
        setUserInput((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <div className="signup-form">
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-fullname">Full Name</InputLabel>
                                    <OutlinedInput
                                        name='fullname'
                                        value={userInput.fullname}
                                        onChange={handleChanges}
                                        id="outlined-adornment-fullname"
                                        // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Full Name"
                                    />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            value={userInput.email}
                                            name="email"
                                            onChange={handleChanges}
                                            id="outlined-adornment-email"
                                            label="Email"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            value={userInput.password}
                                            name="password"
                                            onChange={handleChanges}
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="gender"
                                    value={userInput.gender}
                                    onChange={handleChanges}
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                                </FormControl>
                                </Grid>
                              </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign Up
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Link to='/signin'>
                                    <Button
                                        type="reset"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        color='error'
                                    >
                                        Back
                                    </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </div>
        </>
    );
}
