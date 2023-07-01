import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

import { useState, useCallback } from 'react';

import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ otherProperties }) => {
  const [showModal, setShowModal] = useState(false);
  const { tags, webformatURL, largeImageURL } = otherProperties;

  const toggleModal = useCallback(() => {
    setShowModal(prevShowModal => !prevShowModal);
  }, []);

  return (
    <GalleryItem>
      <GalleryItemImage src={webformatURL} alt={tags} onClick={toggleModal} />
      {showModal && (
        <Modal
          selectedImage={largeImageURL}
          text={tags}
          onClose={toggleModal}
        />
      )}
    </GalleryItem>
  );
};

export default ImageGalleryItem;
