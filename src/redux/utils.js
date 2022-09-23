export const getCommentsFromLS = () => {
  const data = localStorage.getItem('comments');
  const items = data ? JSON.parse(data) : [];

  return {
    items,
  };
};
