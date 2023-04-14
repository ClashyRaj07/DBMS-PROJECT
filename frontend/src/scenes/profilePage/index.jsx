import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";
import Loader from '../../components/Loader'
import { findUser, getUser } from "../../actions/usersAction";
import { setFriends } from "../../actions/friendsAction";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { user } = useSelector(state => state.user)
  const { user: loggendUser } = useSelector(state => state.profile)

  useEffect(() => {

    if (!user || user.length === 0 || (user && user.userId !== userId)) {
      // dispatch(findUser(userId))
      // dispatch(setFriends(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userId]);



  return (
    <>
      {!user ? <Loader />
        :
        <Box>

          <Navbar />
          <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="2rem"
            justifyContent="center"
          >
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
              <UserWidget user={user} />
              <Box m="2rem 0" />

              {loggendUser.userId == user.userId &&
                <FriendListWidget user={user} title={"Friends List"} />
              }
            </Box>
            <Box
              height={'85vh'} overflow={'scroll'}

              flexBasis={isNonMobileScreens ? "42%" : undefined}
              mt={isNonMobileScreens ? undefined : "2rem"}
            >

              <MyPostWidget userId={userId} />
              <Box m="2rem 0" />

              <PostsWidget userId={userId} isProfile={true} />
            </Box>
            {loggendUser.userId == user.userId &&
              <Box>
                <FriendListWidget userId={userId} title={"Friends Suggestions"} />
              </Box>
            }

          </Box>
        </Box>
      }
    </>
  );
};

export default ProfilePage;
