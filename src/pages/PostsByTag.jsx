import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { PostsTagBlock } from '../components/PostsTagBlock';
import axios from '../axios';

export const PostsByTag = () => {
  const { name } = useParams();
  const nameTag = 'Tag: ' + name;

  const [posts, setPosts] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`/posts/?name=${name}`)
      .then(({ data }) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении статьи');
        setLoading(false);
      });
  }, []);
  return (
    <Grid container spacing={4}>
      <Grid xs={8} item>
        <PostsTagBlock tag={nameTag} items={posts} isLoading={isLoading} />
      </Grid>
    </Grid>
  );
};
