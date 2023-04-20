import { useTheme } from '@emotion/react'
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { useFetcher } from 'react-router-dom'
import Axios from '../../Axios'

const LikesWidget = ({ postId }) => {
    const { palette } = useTheme()
    const main = palette.neutral.main
    const primary = palette.primary.main
    const loggedInUserId = useSelector((state) => state.profile.user.userId)
    const [likes, setLikes] = useState([])
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false)
    const mutation = useMutation(
        (liked) => {

            if (!liked) return axios.post(`http://localhost:5000/likes`, { postId: postId }, { withCredentials: true }).then(setIsLoading(false))


            return axios.delete(`http://localhost:5000/likes?postId=${postId}`, { withCredentials: true }).then(setIsLoading(false))
        }
    )
    const handleClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        mutation.mutate(likes?.includes(loggedInUserId))

    }

    useEffect(() => { Axios.get(`/likes?postId=${postId}`).then(res => res.data.data).then(data => setLikes(data)) }, [isLoading, postId])


    return (<>

        <IconButton onClick={handleClick}>
            {isLoading ? "loading..." : likes?.includes(loggedInUserId) ? (
                <FavoriteOutlined sx={{ color: primary }} />
            ) : (
                <FavoriteBorderOutlined />
            )}
        </IconButton>
        <Typography>{likes?.length}</Typography>
    </>
    )
}

export default LikesWidget