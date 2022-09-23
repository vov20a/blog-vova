import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { SideBlock } from './SideBlock';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const PostsTagBlock = ({ isLoading, items, tag }) => {
  if (!items.length && !isLoading) {
    return <Typography>Статей c {tag} нет!</Typography>;
  }
  return (
    <SideBlock title={tag}>
      <List>
        {(isLoading ? [...Array(5)] : items).map((item, i) => (
          <div key={i} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <WysiwygIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <Link to={`/posts/${item._id}`}>
                    <ListItemText primary={item.title} />
                  </Link>
                )}
              </ListItemButton>
            </ListItem>
          </div>
        ))}
      </List>
    </SideBlock>
  );
};
