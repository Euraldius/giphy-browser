import React from 'react';

const Gif = ({ gif }) => {
  const { images, title } = gif;
  const { fixed_height } = images;
  const { url } = fixed_height;

  return <img src={url} alt={title} />;
};

export default Gif;
