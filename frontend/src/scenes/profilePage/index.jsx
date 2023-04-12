import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";
import Loader from '../../components/Loader'
import { getUser } from "../../actions/usersAction";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { user } = useSelector(state => state.profile)

  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(getUser(userId));
    if (!user || user === null) {
      navigate('/');
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps



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
              <UserWidget userId={userId} picturePath={user.picturePath} />
              <Box m="2rem 0" />
              <FriendListWidget userId={userId} title={"Friends List"} />
            </Box>
            <Box
              height={'85vh'} overflow={'scroll'}

              flexBasis={isNonMobileScreens ? "42%" : undefined}
              mt={isNonMobileScreens ? undefined : "2rem"}
            >
              <MyPostWidget picturePath={user.picturePath} />
              <Box m="2rem 0" />
              <PostsWidget userId={userId} isProfile />
            </Box>
            <Box>
              <FriendListWidget userId={userId} title={"Friends Requests"} />
            </Box>
          </Box>
        </Box>
      }
    </>
  );
};

export default ProfilePage;
