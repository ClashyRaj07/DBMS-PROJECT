import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from "axios";
import CommentWidget from "./CommentWidget";


const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  createdAt,
  picturePath,
  userPicturePath,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.profile.user?.userId);

  const [isLiked, setIsLiked] = useState(false)
  const [likes, setlikes] = useState([])

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const { isLoading, error, data } = useQuery('likes', () => axios.get(`http://localhost:5000/likes?postId=${postId}`, { withCredentials: true }).then(res => {
    setlikes([]);
    setlikes([...new Set(res.data.data)])
    setIsLiked(likes.includes(loggedInUserId) ? true : false)
  }));


  const queryClient = useQueryClient();
  const mutation = useMutation(
    (liked) => {
      if (!liked) return axios.post(`http://localhost:5000/likes`, { postId: postId }, { withCredentials: true })


      return axios.delete(`http://localhost:5000/likes?postId=${postId}`, { withCredentials: true })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['likes'])
      }
    }
  )

  const handleClick = () => {
    mutation.mutate(isLiked)

  }

  useEffect(() => {

  }, [likes, isLoading])
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        createdAt={createdAt}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      <div>
        {picturePath && picturePath.length > 20 &&
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={picturePath}
          />
        }
      </div>

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={handleClick}>
              {likes && likes.includes(loggedInUserId) ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likes.length}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>Comments</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && <CommentWidget postId={postId} />}
    </WidgetWrapper>
  );
};

export default PostWidget;
