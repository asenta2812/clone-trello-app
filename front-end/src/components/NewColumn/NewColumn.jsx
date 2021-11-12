import { useOnClickOutside } from 'hooks'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import './index.scss'
function NewColumn({ onAddColumn }) {
  const [showInput, setShowInput] = useState(false)
  const refInputAction = useRef()
  const refInput = useRef()

  const offInput = () => {
    setShowInput(false)
  }
  const onInput = () => {
    setShowInput(true)
  }
  useOnClickOutside(refInputAction, offInput)

  useEffect(() => {
    if (showInput && refInput && refInput.current) {
      refInput.current.focus()
    }
  }, [showInput])

  const handleAddColumn = () => {
    if (onAddColumn && typeof onAddColumn === 'function' && refInput && refInput.current) {
      onAddColumn(refInput.current.value)
    }
    offInput()
  }
  return (
    <div className="new-column" ref={r => r && r.scrollIntoView()}>
      {!showInput && <div className="new-column-wrapper" onClick={onInput}>
        <AiOutlinePlus size={20} />
        <p>Thêm mới danh sách khác</p>
      </div>}
      {showInput && <div className="new-column-input" ref={refInputAction}>
        <label htmlFor="title">
          <input
            ref={refInput} type="text" placeholder="Nhập tiêu đề danh sách" name="title"
            onKeyDown={e => (e.key === 'Enter') && handleAddColumn()}
          />
        </label>
        <div className="action">
          <button type="button" onClick={handleAddColumn}>Thêm danh sách</button>
          <div className="close" onClick={offInput}><AiOutlineClose size={20} /></div>
        </div>
      </div>}
    </div>
  )
}

export default NewColumn
