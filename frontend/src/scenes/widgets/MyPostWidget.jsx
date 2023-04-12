import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { getAllPosts, newPost } from "../../actions/postActions";

const MyPostWidget = ({ picturePath }) => {

  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { user } = useSelector((state) => state.profile);
  const userId = user?.userId;
  const { isCreated, error } = useSelector(state => state.post)
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjE5MDEwNGRkZTVlNjY2NWYzZWQ1MiIsImlhdCI6MTY3OTkyMjQwOX0.jT5j7tlfby13a-2P5zSjGX9lKUJhppATMR2AmCdl0gg"
  // const friends = useSelector((state) => state.user.friends);
  const imageRef = useRef();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {

        setImage(reader.result);
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }
  const handlePost = async () => {


    const myForm = {
      "userId": userId,
      "description": post
    }
    if (image) myForm.image = image

    console.log("Description-->", myForm, post);
    dispatch(newPost(myForm));
    imageRef.current.value = null;
    setImage(null);
    setPost("");
  };

  useEffect(
    () => {
      if (isCreated) {
        dispatch(getAllPosts());
      }
      if (error) {
        alert(error);
        dispatch({ type: "CLEAR_ERRORS" })
      }

    }
    ,
    [isCreated, error, dispatch]
  )
  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={user.picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      <div>
        <input type="file" hidden ref={imageRef} onChange={handleImageChange} />
      </div>
      {isImage && image && (

        <Box
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >

          <img style={{ width: "100%" }} src={image} alt="" />

        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            onClick={() => imageRef.current.click()}
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper >
  );
};

export default MyPostWidget;
