import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login, PostsByTag } from './pages';
import React from 'react';
import { fetchAuthMe } from './redux/slices/auth';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tags" element={<Home />} />
          <Route path="/tags/:name" element={<PostsByTag />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
