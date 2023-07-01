import ImageGalleryItem from 'components/ImageGalleryItem';
import { useRef, useEffect } from 'react';
import { GalleryList } from './ImageGallery.styled';

const ImageGallery = ({ images }) => {
  const imagesContainerRef = useRef(null);

  useEffect(() => {
    const container = imagesContainerRef.current;
    window.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }, [images]);

  return (
    <GalleryList ref={imagesContainerRef}>
      {images.map(({ id, ...otherProperties }) => {
        return <ImageGalleryItem key={id} otherProperties={otherProperties} />;
      })}
    </GalleryList>
  );
};

export default ImageGallery;
