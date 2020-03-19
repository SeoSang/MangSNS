import React, { useCallback, useState, useEffect, useRef } from "react"
import { message, Form, Input, Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from "../mytypes/reducerTypes"
import { StoreState } from "../reducers"
import { backURL } from "../config/config"

export const IS_PRODUCTION = process.env.NODE_ENV === "production"

const onSubmitFormSuccess = () => {
  message.success("게시글 작성에 성공했습니다!", 5)
}

const PostForm = () => {
  const [text, setText] = useState("")
  const dispatch = useDispatch()
  const { postAdded, isAddingPost, imagePaths } = useSelector((state: StoreState) => state.post)
  const imageInput = useRef<HTMLInputElement>(null)

  const onChangeTextArea = useCallback(e => {
    setText(e.target.value)
  }, [])

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault()
      if (!text || !text.trim()) {
        return alert("빈 게시글은 작성할 수 없습니다!")
      }

      const formData = new FormData()
      imagePaths.forEach(i => {
        formData.append("image", i)
      })
      formData.append("content", text)
      dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
      })
    },
    [text, imagePaths, imageInput.current],
  )

  useEffect(() => {
    console.log("useEffect")
    if (postAdded) {
      onSubmitFormSuccess()
      setText("")
    }
  }, [postAdded])

  const onChangeImage = useCallback(
    e => {
      console.log(e.target.files)
      const imageFormData = new FormData()
      ;[].forEach.call(e.target.files, f => {
        imageFormData.append("image", f)
      })
      dispatch({
        type: UPLOAD_IMAGES_REQUEST,
        data: imageFormData,
      })
    },
    [text],
  )

  const onClickImageUpload = useCallback(() => {
    console.log(imageInput.current)
    if (imageInput.current) {
      imageInput.current.click()
    }
  }, [imageInput.current, text])

  const onRemoveImage = useCallback(
    index => () => {
      dispatch({
        type: REMOVE_IMAGE,
        index,
      })
    },
    [imageInput.current],
  )

  return (
    <Form style={{ margin: "10px 0 " }} encType='multipart/form-data' onSubmit={onSubmitForm}>
      <Input.TextArea
        maxLength={140}
        placeholder='어떤 일이 있으셨나요?'
        onChange={onChangeTextArea}
        value={text}
      ></Input.TextArea>
      <div>
        <input type='file' multiple hidden ref={imageInput} onChange={onChangeImage} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type='primary' style={{ float: "right" }} htmlType='submit' loading={isAddingPost}>
          올리기
        </Button>
      </div>
      <br></br>
      <div>
        {imagePaths.map((v, i) => {
          return (
            <div key={v} style={{ display: "inline-block" }}>
              <img src={IS_PRODUCTION ? v : `${backURL}` + v} style={{ width: "200px" }} alt={v} />
              <div>
                <Button onClick={onRemoveImage(i)}>제거</Button>
              </div>
            </div>
          )
        })}
      </div>
    </Form>
  )
}

export default PostForm
