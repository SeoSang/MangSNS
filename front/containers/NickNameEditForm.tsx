import React, { useCallback, useState } from "react"
import { Form, Button, Input } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { StoreState } from "../reducers"
import { EDIT_NICKNAME_REQUEST } from "../mytypes/reducerTypes"

const NickNameEditForm = () => {
  const [editedName, setEditedName] = useState("")
  const [editedToggle, setEditedToggle] = useState(true)
  const { me, isEditingNickname } = useSelector((state: StoreState) => state.user)
  const dispatch = useDispatch()
  const onChangeNickname = useCallback(
    e => {
      setEditedName(e.target.value)
      setEditedToggle(false)
    },
    [editedToggle],
  )
  const onEditNickname = useCallback(
    e => {
      e.preventDefault
      dispatch({
        type: EDIT_NICKNAME_REQUEST,
        data: editedName,
      })
      setEditedToggle(true)
    },
    [editedName],
  )
  console.log("editedToggle =>", editedToggle)
  return (
    <Form
      onSubmit={onEditNickname}
      style={{ marginBottom: "20px", border: "1px solid #d9d9d9", padding: "20px" }}
    >
      <Input
        addonBefore='닉네임'
        onChange={onChangeNickname}
        value={editedName || (editedToggle && me && me.nickname) || ""}
      ></Input>
      <Button type='primary' htmlType='submit' loading={isEditingNickname}>
        수정
      </Button>
    </Form>
  )
}

export default NickNameEditForm
