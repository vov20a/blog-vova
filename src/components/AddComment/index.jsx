import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { addComment } from '../../redux/slices/posts';
import axios from '../../axios';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export const Index = ({ postId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const [text, setText] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        text,
        postId,
      };

      const { data } = await axios.post('/comments', fields);
      dispatch(addComment(data));
      navigate(`/posts/${postId}`, { state: Math.random() });
      // window.location.reload();
      setLoading(false);
      setText('');
    } catch (err) {
      console.warn(err);
      alert('Не удалось создать комментарий');
    }
  };

  if (!isAuth) {
    return (
      <Link to="/login">
        <Typography>Чтобы написать комметарий - авторизуйтесь</Typography>
      </Link>
    );
  }

  return (
    <>
      <div className={styles.root}>
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={onSubmit} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
