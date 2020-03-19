import * as React from "react"
import { useCallback, useState } from "react"
import { Icon } from "antd"
import { Image } from "../mytypes/componentTypes"
import ImagesZoom from "./ImagesZoom"
import { backURL } from "../config/config"

export const IS_PRODUCTION = process.env.NODE_ENV === "production"

const PostImages: React.FC<{ images: Image[] }> = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false)
  const onZoom = useCallback(() => {
    setShowImagesZoom(true)
  }, [showImagesZoom])

  const onClose = useCallback(() => {
    setShowImagesZoom(false)
  }, [showImagesZoom])

  if (images.length === 1) {
    return (
      <>
        <img
          src={
            IS_PRODUCTION
              ? images[0].src.replace(/original\//, "thumb/")
              : backURL + `${images[0].src}`
          }
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose}></ImagesZoom>}
      </>
    )
  } else if (images.length === 2) {
    return (
      <>
        <div>
          <img
            src={
              IS_PRODUCTION
                ? images[0].src.replace(/original\//, "thumb/")
                : backURL + `${images[0].src}`
            }
            width='50%'
            onClick={onZoom}
          />
          <img
            src={
              IS_PRODUCTION
                ? images[1].src.replace(/original\//, "thumb/")
                : backURL + `${images[0].src}`
            }
            width='50%'
            onClick={onZoom}
          />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose}></ImagesZoom>}
      </>
    )
  } else {
    return (
      <>
        <div>
          <img
            src={
              IS_PRODUCTION
                ? images[0].src.replace(/original\//, "thumb/")
                : backURL + `${images[0].src}`
            }
            width='50%'
            onClick={onZoom}
          />
          <div
            style={{
              display: "inline-block",
              width: "50%",
              textAlign: "center",
              verticalAlign: "middle",
            }}
          >
            <Icon type='plus' />
            <br></br>
            {images.length}
            개의 사진 더보기
          </div>
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose}></ImagesZoom>}
      </>
    )
  }
}

export default PostImages
