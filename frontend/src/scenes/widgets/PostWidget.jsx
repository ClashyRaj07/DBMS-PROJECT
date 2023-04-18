import { ChatBubbleOutlineOutlined, ShareOutlined } from '@mui/icons-material'
import { IconButton, Typography, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import Friend from '../../components/Friend'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useState } from 'react'
import CommentWidget from './CommentWidget'
import LikesWidget from './LikesWidget'

const PostWidget = ({ postId, postUserId, name, description, createdAt, picturePath, userPicturePath }) => {
  const [isComments, setIsComments] = useState(false)

  const { palette } = useTheme()
  const main = palette.neutral.main

  return (
    <WidgetWrapper m='2rem 0'>
      <Friend
        friendId={postUserId}
        name={name}
        createdAt={createdAt}
        postId={postId}
        userPicturePath={userPicturePath} />
      <Typography color={main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      <div>
        {picturePath && picturePath.length > 20 &&
          <img
            width='100%'
            height='auto'
            alt='post'
            style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
            src={picturePath} />}
      </div>
      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          <FlexBetween gap='0.3rem'>
            <LikesWidget postId={postId} />
          </FlexBetween>
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>
              Comments
            </Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && <CommentWidget postId={postId} />}
    </WidgetWrapper >
  )
}

export default PostWidget
