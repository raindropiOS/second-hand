import React, { useState, useRef } from 'react';

import ImageInput from '@atoms/Inputs/ImageInput';
import { $ImagePreviews, $FirstImage, $Image, $CancelButton } from './ImagePreviews.style';
import Icon from '@atoms/Icon';

const ImagePreviews = () => {
  // File List Post 할때 필요..
  // TODO(hoonding): 부모에서 props로 imgFiles state 줘야할듯.
  const [imgFiles, setImgFiles] = useState<{ file: File; url: string }[]>([]);
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
        setImgFiles(prev => [...prev, { file: newImage, url: result }]);
      }
    };

    if (newImage) fileReader.readAsDataURL(newImage); // url로 바꾸는 과정.
  };

  const handleDelete = (idx: number) => {
    setImgFiles(prev => prev.filter((_, index) => index !== idx));
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
