import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery/';
import Loader from 'components/Loader/';
import LoadMoreBtn from 'components/Button/';

import { Sections } from './App.styled';

import { searchPicture } from 'components/api/api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
};

const App = () => {
  const [searchRequest, setSearchRequest] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);

  const maxPage = useRef(0);
  const perPage = 12;

  useEffect(() => {
    if (!searchRequest) return;
    setStatus(Status.PENDING);
    const makeRequest = async () => {
      try {
        const response = await searchPicture(searchRequest, page, perPage);

        if (response.totalHits === 0) throw new Error('No matches found');
        if (page === 1)
          maxPage.current = Math.ceil(response.totalHits / perPage);

        setImages(prevImages => [...prevImages, ...response.hits]);

        if (page === maxPage.current) setStatus(Status.COMPLETED);
        else setStatus(Status.RESOLVED);
      } catch (error) {
        toast.warning(error.message);
        setStatus(Status.REJECTED);
      }
    };
    makeRequest();
  }, [page, searchRequest]);

  const setNewRequestValue = input => {
    if (input === searchRequest) {
      toast.info('Images for this query are already displayed');
      return;
    }
    setSearchRequest(input);
    setImages([]);
    setPage(1);
    maxPage.current = 0;
  };

  return (
    <Sections>
      <Searchbar enterNewSearchValue={setNewRequestValue} />
      {images.length > 0 && <ImageGallery images={images} />}
      {status === Status.PENDING && <Loader />}
      {status === Status.RESOLVED && (
        <LoadMoreBtn huddlerCLick={() => setPage(prevPage => prevPage + 1)} />
      )}
      <ToastContainer theme="colored" />
    </Sections>
  );
};

export default App;
