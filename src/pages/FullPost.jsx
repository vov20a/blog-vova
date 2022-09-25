import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from '../axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export const FullPost = () => {
  const location = useLocation();
  // console.log('Location:', location.state);
  const { id } = useParams();
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

  const [commentsData, setCommentsData] = React.useState([]);
  const [isCommentsLoading, setCommentsLoading] = React.useState(true);
  const isHome = false;

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(`/comments/${id}`)
      .then((res) => {
        setCommentsData(res.data);

        localStorage.setItem('comments', JSON.stringify(res.data));
        setCommentsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении комментариев');
      });
  }, [location.state]);
  // console.log('Data', data);
  // console.log('Comments', commentsData);
  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
        // user={{
        //   avatarUrl:
        //     'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
        //   fullName: data.user.fullName,
        // }}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={commentsData.length}
        tags={data.tags}
        isFullPost>
        {/* <p>{data.text}</p> */}
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={
          commentsData
          //   [
          //   {
          //     user: {
          //       fullName: 'Вася Пупкин',
          //       avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
          //     },
          //     text: 'Это тестовый комментарий 555555',
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
        isHome={isHome}>
        <Index postId={id} />
      </CommentsBlock>
    </>
  );
};
