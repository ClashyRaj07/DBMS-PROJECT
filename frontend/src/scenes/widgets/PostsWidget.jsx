import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { getAllPosts } from "../../actions/postActions";
import axios from "axios";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  // const posts = useSelector((state) => state.posts);
  // const token = useSelector((state) => state.token);
  // const token = useSelector((state) => state.token);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjE5MDEwNGRkZTVlNjY2NWYzZWQ1MiIsImlhdCI6MTY3OTkyMjQwOX0.jT5j7tlfby13a-2P5zSjGX9lKUJhppATMR2AmCdl0gg"
  // const friends = useSelector((state) => state.user.friends);
  const { posts } = useSelector(state => state.posts)
  const { isLiked } = useSelector(state => state.post)
  const [updatedPost, setUpdatedPost] = useState([])
  const getPosts = async () => {
    dispatch(getAllPosts(userId));
  };



  useEffect(() => {

    getPosts();

    if (isLiked) {
      dispatch({ type: 'CLEAR_ERRORS' })
    }
  }, [isLiked]); // eslint-disable-line react-hooks/exhaustive-deps

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
            description,
            location,
            post_img,
            picturePath: userPicturePath,
            likes = [1, 3, 5],
            comments = [],
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
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
