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
import Loader from '../../components/Loader'
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { baseURL } from "../../Axios";
const options = {
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
};
const MyPostWidget = () => {

  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { user } = useSelector((state) => state.profile);

  const userId = user?.userId;

  // const friends = useSelector((state) => state.user.friends);
  const imageRef = useRef();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newPost) => {
      return axios.post(`${baseURL}/posts/create`, newPost, options)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['[posts]'])
      }
    }
  )

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

    mutation.mutate(myForm)
    imageRef.current.value = null;
    setImage(null);
    setPost("");
  };

  return (
    <>

      {
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

      }
    </>
  );
};

export default MyPostWidget;
