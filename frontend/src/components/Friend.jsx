import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import moment from 'moment'
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { followUser, unfollowUser } from "../actions/friendsAction";
import { useEffect, useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { setFriends } from "../actions/friendsAction";
import MoreOptions from "./MoreOptions";




const Friend = ({ friendId, name, createdAt, userPicturePath, postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, isUpdated } = useSelector((state) => state.profile);
  const { user: cUser } = useSelector(state => state.user)
  const { friendsList: friends } = useSelector((state) => state.friends);
  const [isFriend, setIsFriend] = useState(false)
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;





  const patchFriend = async () => {
    if (friends && friends.map(f => f.userId === friendId)) {
      dispatch(unfollowUser(friendId));
    }
    else {
      dispatch(followUser(friendId))
    }
  };
  useEffect(() => {
    if (isUpdated) {
      dispatch(setFriends(cUser.userId))

    }


  }, [loading])


  return (
    <FlexBetween>

      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {moment(createdAt).fromNow()}
          </Typography>
        </Box>
      </FlexBetween>{friendId !== user.userId ?
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {friends && friends.map(f => f.userId === friendId) ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
        :
        <>

          <MoreOptions postId={postId} />

        </>

      }

    </FlexBetween>

  );
};

export default Friend;
