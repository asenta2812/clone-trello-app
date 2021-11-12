import React from 'react'
import './index.scss'
import PropTypes from 'prop-types'

function Task({ data }) {
  return (
    <div className="task">
      {data.image && <img src={data.image} />}
      <p>
        {data.title}
      </p>
    </div>
  )
}
Task.propTypes = {
  data: PropTypes.shape({
    taskId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string
  })
}
export default Task
