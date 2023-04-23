import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { setFriends } from "../../actions/friendsAction";
import Axios from "../../Axios";

const FriendListWidget = ({ user, title }) => {
  const dispatch = useDispatch();
  const { friendsList: friends } = useSelector(state => state.friends)
  const { palette } = useTheme();

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (liked) => {
      if (!liked) return Axios.post(`/likes`, { userId: user.userId }, { withCredentials: true })


      return Axios.delete(`/likes?userId=${user.userId}`, { withCredentials: true })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['likes'])
      }
    }
  )





  useEffect(() => {
  }, [dispatch, user?.userId]);
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        {title}
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.length > 0 && friends.map((friend, i) => (
          <Friend
            key={i}
            friendId={friend.userId}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
