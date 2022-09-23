import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SideBlock } from './SideBlock';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import { Typography } from '@mui/material';
import * as moment from 'moment';
import { fetchRemoveComment } from '../redux/slices/posts';

export const CommentsBlock = ({ items, children, isHome, isLoading = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);

  const isEditable = items.map((item) => {
    if (userData?._id === item.user._id) {
      return true;
    }
    return false;
  });

  const onClickRemove = (id, postId) => {
    if (window.confirm('Are you sure?')) {
      dispatch(fetchRemoveComment(id));
      navigate(`/posts/${postId}`, { state: Math.random() });
    }
  };

  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <>
                  <ListItemText primary={obj.user.fullName} secondary={obj.text} />
                  {!isHome && (
                    <>
                      <Typography>{moment(obj.createdAt).format('MM/DD/YYYY')}</Typography>
                      {isEditable[index] && (
                        <div>
                          <IconButton
                            onClick={() => onClickRemove(obj._id, obj.postId)}
                            color="secondary">
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
