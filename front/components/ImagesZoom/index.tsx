import * as React from "react"
import { useState } from "react"
import Slick from "react-slick"
import { Icon } from "antd"
import styled from "styled-components"
import { Image, BACKEND_HTTP } from "../../pages/mytypes/componentTypes"

const ImagesZoomDiv = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  rigth: 0;
  bottom: 0;
`
const ImageHeader = styled.header`
  height: 44;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;
`
const ImageZoomTitle = styled.h1`
  margin: 0;
  font-size: 17px;
  color: #333;
  line-height: 44px;
`
const ImageZoomCloseIcon = styled(Icon)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15;
  line-height: 44px;
  cursor: pointer;
`
const ImageView = styled.div`
  height: calc(100%-44px);
  background-color: #090909;
`
const ImagesZoom: React.FC<{ images: Image[]; onClose: React.EffectCallback }> = ({
  images,
  onClose,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <ImagesZoomDiv>
      <ImageHeader>
        <ImageZoomTitle>상세 이미지</ImageZoomTitle>
        <ImageZoomCloseIcon type='close' onClick={onClose} />
      </ImageHeader>
      <ImageView>
        <div>
          <Slick
            initialSlide={0}
            afterChange={slide => setCurrentSlide(slide)}
            infinite={false}
            arrows
            slidesToScroll={1}
            slidesToShow={1}
          >
            {images.map(v => {
              return (
                <div>
                  <img
                    src={BACKEND_HTTP + `${v.src}`}
                    style={{ margin: "0 auto", maxHeight: 750 }}
                  />
                </div>
              )
            })}
          </Slick>
        </div>
        <div>
          <div
            style={{
              width: 75,
              height: 30,
              lineHeight: "30px",
              borderRadius: 15,
              background: "#313131",
              display: "inline-block",
              textAlign: "center",
              color: "white",
              fontSize: "15px",
            }}
          >
            {currentSlide + 1} / {images.length}
          </div>
        </div>
      </ImageView>
    </ImagesZoomDiv>
  )
}

export default ImagesZoom
