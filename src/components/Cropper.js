import React, {useState} from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function CropDemo({ src }) {
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  return <ReactCrop src="https://www.am570.com.br/images/posts/1119/1119.jpg" crop={crop} onChange={newCrop => setCrop(newCrop)} />;
}

export default CropDemo
