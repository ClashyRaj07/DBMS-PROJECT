import React, { useState } from 'react'
import { Box, Typography, Divider, InputBase, Button } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { useTheme } from '@emotion/react'
import Friend from '../../components/Friend'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import UserImage from '../../components/UserImage'
import FlexBetween from '../../components/FlexBetween'
import { useSelector } from 'react-redux'
import SendIcon from '@mui/icons-material/Send';
import Axios from '../../Axios'

const CommentWidget = ({ postId }) => {
    const navigate = useNavigate();
    const { palette } = useTheme();
    const [desc, setDesc] = useState("");
    const { user } = useSelector(state => state.profile)
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main
    const primary = palette.primary.main

    const { isLoading, error, data } = useQuery('comments', () => Axios.get(`/comments?postId=${postId}`, { withCredentials: true })
    )
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (newComment) => {
            return Axios.post('/comments/add', newComment, { withCredentials: true })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['comments'])
            }
        }
    )
    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ desc, postId })
        setDesc("");
    }
    const comments = data?.data?.data;


    return (
        <Box mt='0.5rem'>
            <Divider />
            <FlexBetween gap="1rem" m={'1rem'}>
                <UserImage image={user.picturePath} size="40px" />
                <InputBase
                    placeholder="Write A comment..."
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: ".5rem",
                        padding: ".5rem 2rem",
                    }}
                />
                <Button style={{ width: '40%', padding: '.6rem' }} onClick={handleClick} variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>
            </FlexBetween>
            {comments && comments?.length > 0 && comments.map((comment, i) => (

                <Box key={i} >
                    <Divider />
                    <Box gap="1rem" display={'flex'} width={'30%'} margin={'.5rem'}>
                        <UserImage image={comment.picturePath} size="40px" />
                        <Box
                            onClick={() => {
                                navigate(`/profile/${comment.userId}`);
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
                                {comment.firstName + comment.lastName}
                            </Typography>
                            <Typography color={medium} fontSize="0.75rem">
                                {moment(comment.createdAt).fromNow()}
                            </Typography>
                        </Box>
                    </Box>


                    <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                        {comment.desc}
                    </Typography>
                </Box>
            ))}
            <Divider />
        </Box>
    )
}

export default CommentWidget
