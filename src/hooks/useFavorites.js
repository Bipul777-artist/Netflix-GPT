// src/hooks/useFavorites.js
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../utils/favoriteSlice';

const useFavorites = () => {
  const dispatch = useDispatch();
  const favoritesList = useSelector(state => state.favorites.favoritesList);

  const addContentToFavorites = (content) => {
    dispatch(addToFavorites(content));
  };

  const removeContentFromFavorites = (contentId) => {
    dispatch(removeFromFavorites({ id: contentId }));
  };

  const isContentInFavorites = (contentId) => {
    return favoritesList.some(item => item.id === contentId);
  };

  return {
    favoritesList,
    addContentToFavorites,
    removeContentFromFavorites,
    isContentInFavorites
  };
};

export default useFavorites;