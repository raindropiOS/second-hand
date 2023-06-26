import React, { useState, useRef } from 'react';

import ImageInput from '@atoms/Inputs/ImageInput';
import { $ImagePreviews, $FirstImage, $Image, $CancelButton } from './ImagePreviews.style';
import Icon from '@atoms/Icon';

interface ImagePreviewsProps {
  imgFiles: { file: File; url: string }[];
  handleAddImg: (newImage: File, url: string) => void;
  handleDeleteImg: (idx: number) => void;
}

const ImagePreviews = ({ imgFiles, handleAddImg, handleDeleteImg }: ImagePreviewsProps) => {
  // File List Post 할때 필요..
  // TODO(hoonding): 부모에서 props로 imgFiles state 줘야할듯.
  // const [imgFiles, setImgFiles] = useState<{ file: File; url: string }[]>([]);
  const imgRef = useRef<HTMLInputElement | null>(null);

  const saveImgFiles = () => {
    if (!imgRef.current || !imgRef.current.files) return;
    const newImage = Array.from(imgRef.current.files)[0];
    const fileReader = new FileReader(); // url을 갖고오기 위함.

    fileReader.onloadend = endLoad => {
      const {
        currentTarget: { result },
      }: any = endLoad;

      if (result && !imgFiles.map(({ url }) => url).includes(result as string)) {
        handleAddImg(newImage, result);
      }
    };

    if (newImage) fileReader.readAsDataURL(newImage); // url로 바꾸는 과정.
  };

  const handleDelete = (idx: number) => {
    handleDeleteImg(idx);
  };

  return (
    <$ImagePreviews>
      <ImageInput count={imgFiles.length} imgRef={imgRef} onChange={saveImgFiles} />
      {imgFiles.map(({ file, url }, idx) =>
        idx === 0 ? (
          <$FirstImage key={file.name} imgUrl={url}>
            <$CancelButton onClick={() => handleDelete(idx)}>
              <Icon name="cancel" fill="white" />
            </$CancelButton>
          </$FirstImage>
        ) : (
          <$Image key={file.name} imgUrl={url}>
            <$CancelButton onClick={() => handleDelete(idx)}>
              <Icon name="cancel" fill="white" />
            </$CancelButton>
          </$Image>
        )
      )}
    </$ImagePreviews>
  );
};

export default ImagePreviews;
