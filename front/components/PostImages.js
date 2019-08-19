import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import {Icon} from 'antd'
// import ImagesZoom from './imagesZoom';
import ImagesView from './imagesView';

const PostImages = ({images}) => {

  // const [showImagesZoom, setShowImagesZoom] = useState(false)
  // const onZoom = useCallback(() => {
  //   setShowImagesZoom(true);
  // }, [])

  // const onClose = useCallback(() => {
  //   setShowImagesZoom(false);
  // }, [])

  if(images.length === 1){
    return(
      <> 
        <ImageViewBox>
          <img src={`http://localhost:8080/${images[0].src}`} />
        </ImageViewBox>
        {/* {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />} */}
      </>
    )
  }
  if(images.length === 2){
    return(
      <>
        <ImageViewBox>
          <ImagesView images={images} />
        </ImageViewBox>
        {/* {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />} */}
      </>
    );
  }
  return(
    <>
      <ImageViewBox>
          <ImagesView images={images} />
      </ImageViewBox>
      {/* {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />} */}
    </>
  )
}

const ImageViewBox = styled.div`
  padding-bottom:20px;
  img{width:100%;}
  .slick-prev{
    left:18px;
    z-index:9;
  }
  .slick-next{
    right:18px;
    z-index:9;
  }
  .slick-active, .slick-dots li{
    margin:0;
  }
  .slick-dots li button{
    padding:0;
  }
`

export default PostImages