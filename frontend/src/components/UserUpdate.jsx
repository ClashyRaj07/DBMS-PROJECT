import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Slide from '@mui/material/Slide';
import {
    ManageAccountsOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import {
    Avatar,
    Box,
    Stack,
    TextField,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getUser, updateUser } from '../actions/usersAction';




//Intial Values Defination With  Formik

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string(),
});



let initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
    const imageRef = React.useRef();
    const [image, setImage] = useState(null);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);
    };

    //Formik Form Handling

    const [pageType, setPageType] = useState("register");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isRegister = pageType === "register";

    const { user, isUpdated } = useSelector(state => state.profile)

    const register = async (values, onSubmitProps) => {
        if (image) {
            values.picturePath = image;
        }
        const { firstName, lastName, location, occupation, picturePath } = values


        const formData = {
            firstName, lastName, location, occupation, picturePath
        }
        console.log("dispatch is ongoing");
        dispatch(updateUser(formData, user.userId))

    };
    //Handle Image Change
    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {

                setImage(reader.result);
            }
        }
        if (e.target.files[0]) reader.readAsDataURL(e.target.files[0])
    }

    //Handle Form Submit
    const handleFormSubmit = async (values, onSubmitProps) => {

        register(values, onSubmitProps);
    };

    //Useeeffect ot rerendering page
    React.useEffect(() => {
        if (user) {
            initialValuesRegister = { ...user }
            setImage(user.picturePath)
        }
        if (isUpdated) {
            setOpen(false)
            dispatch(getUser(user.userId))
            dispatch(clearErrors())
        }

    }, [user, isUpdated])

    return (
        <div>

            <IconButton color='primary' onClick={handleClickOpen} aria-label="add to shopping cart">
                <ManageAccountsOutlined />
            </IconButton>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            My Account
                        </Typography>

                    </Toolbar>
                </AppBar>
                <List style={{ width: '60%', margin: 'auto' }}>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValuesRegister}
                        validationSchema={registerSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            resetForm,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                {isRegister && <Box>
                                    <div style={{ display: 'flex', justifyContent: 'center' }} onClick={e => imageRef.current.click()}>
                                        <Avatar
                                            alt="user"
                                            src={image}

                                            sx={{ width: '10rem', height: '10rem', marginBottom: '2rem' }}
                                        />
                                        <input type="file" name="image" id="image" hidden ref={imageRef} onChange={handleImageChange} />
                                    </div>
                                </Box>}

                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                    }}
                                >
                                    {isRegister && (
                                        <>


                                            <TextField
                                                label="First Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.firstName}
                                                name="firstName"
                                                error={
                                                    Boolean(touched.firstName) && Boolean(errors.firstName)
                                                }
                                                helperText={touched.firstName && errors.firstName}
                                                sx={{ gridColumn: "span 2" }}
                                            />
                                            <TextField
                                                label="Last Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.lastName}
                                                name="lastName"
                                                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                                helperText={touched.lastName && errors.lastName}
                                                sx={{ gridColumn: "span 2" }}
                                            />
                                            <TextField
                                                label="Location"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.location}
                                                name="location"
                                                error={Boolean(touched.location) && Boolean(errors.location)}
                                                helperText={touched.location && errors.location}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                            <TextField
                                                label="Occupation"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.occupation}
                                                name="occupation"
                                                error={
                                                    Boolean(touched.occupation) && Boolean(errors.occupation)
                                                }
                                                helperText={touched.occupation && errors.occupation}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                        </>
                                    )}

                                    <TextField
                                        disabled
                                        label="Email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        name="email"
                                        error={Boolean(touched.email) && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        disabled
                                        label="Password"
                                        type="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        name="password"
                                        error={Boolean(touched.password) && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <Stack direction="row" spacing={4} width={'70vw'}>
                                        <Button style={{ width: '40%' }} variant="outlined" startIcon={<DeleteIcon />}>
                                            Delete Account
                                        </Button>
                                        <Button style={{ width: '40%' }} variant="contained" endIcon={<EditIcon />}>
                                            Change Password
                                        </Button>
                                    </Stack>
                                </Box>
                                <Box>
                                    <Button
                                        fullWidth
                                        type="submit"
                                        sx={{
                                            m: "2rem 0",
                                            p: "1rem",
                                            backgroundColor: palette.primary.main,
                                            color: palette.background.alt,
                                            "&:hover": { color: palette.primary.main },
                                        }}
                                    >
                                        Save Changes
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </List>
            </Dialog>
        </div>
    );
}