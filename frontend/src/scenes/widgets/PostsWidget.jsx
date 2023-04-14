import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { getAllPosts, getUserPosts } from "../../actions/postActions";
import { baseURL } from '../../Axios'
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from 'react-query'

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  // const { posts } = useSelector(state => state.posts)
  const { isLiked } = useSelector(state => state.post)
  const [updatedPost, setUpdatedPost] = useState([])

  const options = {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };


  const { isLoading: postsLoading, error, data: posts } = useQuery('[posts]', () =>
    axios.get(`${baseURL}/posts`, options).then(res => res.data.data
    ));

  return (
    <>
      {
        posts &&
        posts?.map(
          ({
            postId: _id,
            userId,
            firstName,
            lastName,
            createdAt,
            description,
            location,
            post_img,
            picturePath: userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              createdAt={createdAt}
              picturePath={post_img}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
    </>
  );
};

export default PostsWidget;
