import { useOnClickOutside } from 'hooks'
import React, { useRef, useState } from 'react'
import { AiOutlineClose, AiOutlineSmallDash } from 'react-icons/ai'
import { connect } from 'react-redux'
import { deleteColumn, openAddTask } from 'reducers/board'
import swal from 'sweetalert'
import './index.scss'
function DropdownHeader({ columnId, deleteColumn, openAddTask }) {
  const [isOpen, setOpen] = useState(false)
  const refDropdown = useRef()

  const doToggle = () => {
    setOpen(o => !o)
  }

  const doClose = () => {
    setOpen(false)
  }
  useOnClickOutside(refDropdown, doClose)

  const handleDelete = () => {
    swal({
      text: 'Bạn có chắc chắn là muốn xoá cột này?',
      icon: 'warning',
      buttons: ['Huỷ', 'Chấp nhận'],
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          deleteColumn({ columnId })
        }
        doClose()
      })
  }

  const handleAddTask = () => {
    doClose()
    openAddTask({ columnId, isOnTop: true })
  }
  return (
    <div className="dropdown-header">
      <button className="dropdown-icon" onClick={doToggle}>
        <AiOutlineSmallDash size={16} />
      </button>
      {isOpen && <div className="dropdown-header-wrapper no-wrap" ref={refDropdown}>
        <div className="title">
          Thao tác
          <AiOutlineClose className="close" size={14} onClick={doClose} />
        </div>
        <ul>
          <li onClick={handleDelete}>
            Xoá cột hiện tại
          </li>
          <li onClick={handleAddTask}>
            Thêm thẻ
          </li>
        </ul>
      </div>}
    </div>
  )
}

const mapDispatchToProps = { deleteColumn, openAddTask }
export default connect(null, mapDispatchToProps)(DropdownHeader)
