import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const FriendListWidget = ({ userId, title }) => {
  const dispatch = useDispatch();
  const [friends, setFriends] = useState([]);
  const { palette } = useTheme();
  const { isLoading, data: relationshipData } = useQuery('relationships', () => axios.get(`http://localhost:5000/relationships?followedUserId=${userId}`, { withCredentials: true }).then(res => {
    dispatch(setFriends(res.data.data))

  }));


  const queryClient = useQueryClient();
  const mutation = useMutation(
    (liked) => {
      if (!liked) return axios.post(`http://localhost:5000/likes`, {}, { withCredentials: true })


      return axios.delete(`http://localhost:5000/likes?userId=${userId}`, { withCredentials: true })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['likes'])
      }
    }
  )

  const handleClick = () => {
    mutation.mutate()

  }

  const getFriends = async () => {

  };

  useEffect(() => {
    console.log(friends);
    getFriends();
  }, []);
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
        {friends.length > 0 && friends.map((friend) => (
          <Friend
            key={friend}
            friendId={friend._id}
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
