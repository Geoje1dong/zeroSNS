import React, {useState} from 'react'
import styled from 'styled-components'
import Slick from 'react-slick'
import {Icon} from 'antd'

const ImagesZoom = ({images, onClose}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return(
    <>
    <ImagesZoomBox>
      <Article>
        <div>
          <h1>상세이미지</h1>
          <Icon type="close" onClick={onClose} />
        </div>
        <div>
          <Slick
            initialSlide={0}
            afterChange={(slide) => setCurrentSlide(slide)}
            infinit={false}
            dots={true}
          >
            {images.map((image, index) => {
              return(
                <div key={index}>
                  <img src={`http://localhost:8080/${image.src}`}/>
                </div>
              )
            })}
          </Slick>
          {/* <span>
            {currentSlide + 1} / {images.length}
          </span> */}
        </div>
      </Article>
    </ImagesZoomBox>
    </>
  )
}

export default ImagesZoom;

const ImagesZoomBox = styled.div`
  background:rgba(0,0,0,0.4);
  position:fixed;
  z-index:2;
  top:0;
  left:0;
  width:100%;
  height:100%;
`

const Article = styled.div`
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
  max-width:580px;
  background:#fff;
`