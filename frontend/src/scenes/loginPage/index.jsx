import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import Form from './Form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../actions/usersAction'

const LoginPage = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')
  const { isAuthenticated, user } = useSelector(state => state.profile)
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUser(user.userId))
      navigate('/home')
    }
  }, [isAuthenticated])

  return (
    <Box>
      <Box
        width='100%'
        backgroundColor={theme.palette.background.alt}
        p='1rem 6%'
        textAlign='center'>
        <Typography fontWeight='bold' fontSize='32px' color='primary'>
          TwikTik
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p='2rem'
        m='2rem auto'
        borderRadius='1.5rem'
        backgroundColor={theme.palette.background.alt}>
        <Typography fontWeight='500' variant='h5' sx={{ mb: '1.5rem' }}>
          Welcome to TwikTik, the Ticklink Platform for All Tickllers Like You!
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage
