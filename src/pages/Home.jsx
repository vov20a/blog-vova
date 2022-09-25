import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { fetchPosts, fetchTags, fetchComments, setMode } from '../redux/slices/posts';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import * as moment from 'moment';
import { Typography } from '@mui/material';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags, comments } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const isCommentsLoading = comments.status === 'loading';
  const isHome = true;

  React.useEffect(() => {
    dispatch(fetchPosts(posts.mode));
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, [posts.mode]);
  // console.log(comments);
  const handleChange = (value) => {
    if (value) {
      dispatch(setMode(0));
    } else dispatch(setMode(1));
  };

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={posts.mode}
        onChange={() => handleChange(posts.mode)}
        aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={obj._id}
                id={obj._id}
                title={obj.title}
                // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
                // user={{
                //   avatarUrl:
                //     'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                //   fullName: obj.user.fullName,
                // }}
                user={obj.user}
                createdAt={moment(obj.createdAt).format('MMMM Do YYYY, HH:mm')}
                viewsCount={obj.viewsCount}
                commentsCount={
                  comments.items.reduce((sum, item) => {
                    if (item.postId === obj._id) {
                      sum += 1;
                    }
                    return sum;
                  }, 0) || 0
                }
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            ),
          )}
        </Grid>

        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          {!comments.items.length && !isCommentsLoading ? (
            <Typography>No comments</Typography>
          ) : (
            <CommentsBlock
              items={
                comments.items
                //   {
                //     user: {
                //       fullName: 'Вася Пупкин',
                //       avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                //     },
                //     text: 'Это тестовый комментарий',
                //   },
                //   {
                //     user: {
                //       fullName: 'Иван Иванов',
                //       avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                //     },
                //     text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                //   },
                // ]
              }
              isLoading={isCommentsLoading}
              isHome={isHome}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};
