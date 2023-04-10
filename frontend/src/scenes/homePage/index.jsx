import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import Navbar from '../navbar'
import UserWidget from '../widgets/UserWidget'
import MyPostWidget from '../widgets/MyPostWidget'
import PostsWidget from '../widgets/PostsWidget'
import AdvertWidget from '../widgets/AdvertWidget'
import FriendListWidget from '../widgets/FriendListWidget'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Loader from '../../components/Loader'

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
  const { userId: _id, picturePath = 'https://imgs.search.brave.com/tfPSA7_h4u0xIonW23pcAmplHavUbB2DZeVlrNMgKSA/rs:fit:844:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC50/UVhnOGpEY0NaVHpS/WVNwUnJtWHR3SGFF/SyZwaWQ9QXBp' } = useSelector((state) => state.profile)
  const { user } = useSelector(state => state.profile)
  useEffect(
    () => {

    }, [user]
  )
  return (
    <>{!user ? <Loader /> :
      <Box>
        <Navbar />
        <Box
          width='100%'
          padding='2rem 6%'
          display={isNonMobileScreens ? 'flex' : 'block'}
          gap='0.5rem'
          justifyContent='space-between'>
          <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>

          <Box flexBasis={isNonMobileScreens ? '42%' : undefined} mt={isNonMobileScreens ? undefined : '2rem'} height={'85vh'} overflow={'scroll'}>
            <MyPostWidget picturePath={picturePath} />
            <PostsWidget userId={_id} />
          </Box>

          {isNonMobileScreens && (
            <Box flexBasis='26%'>
              <AdvertWidget />
              <Box m='2rem 0' />
              <FriendListWidget userId={_id} />
            </Box>
          )}
        </Box>
      </Box>
    }
    </>
  )
}

export default HomePage
