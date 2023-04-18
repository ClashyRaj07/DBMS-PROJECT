import { Box, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../navbar'
import UserWidget from '../widgets/UserWidget'
import MyPostWidget from '../widgets/MyPostWidget'
import PostsWidget from '../widgets/PostsWidget'
import AdvertWidget from '../widgets/AdvertWidget'
import FriendListWidget from '../widgets/FriendListWidget'
import { useEffect } from 'react'
import Loader from '../../components/Loader'
import { setFriends } from '../../actions/friendsAction'
import { findUser, getUser } from '../../actions/usersAction'
import { useQuery } from 'react-query'
import axios from 'axios'

const HomePage = () => {
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
  const _id = useSelector(state => state.profile.user.userId);
  const { user, isUpdated } = useSelector(state => state.profile)
  const { user: cUser } = useSelector(state => state.user)

  // const { isLoading, error, data } = useQuery('friends', () => axios.get(`http://localhost:5000/relationships?followedUserId=${_id}`, { withCredentials: true }).then(res => {
  //   dispatch({ type: 'SET_FRIENDS_SUCCESS', data: res.data.data })
  // }));

  useEffect(
    () => {
      if (!cUser || cUser.userId !== _id)
        dispatch(findUser(user.userId))

      dispatch(setFriends(user.userId))

    }, [user, isUpdated, dispatch, _id]
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
            <UserWidget userId={_id} picturePath={user.picturePath} />
          </Box>

          <Box flexBasis={isNonMobileScreens ? '42%' : undefined} mt={isNonMobileScreens ? undefined : '2rem'} height={'85vh'} overflow={'scroll'}>
            <MyPostWidget picturePath={user.picturePath} />
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
