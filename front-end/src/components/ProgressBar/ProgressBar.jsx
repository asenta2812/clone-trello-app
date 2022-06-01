import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { setProgress } from 'reducers/loading'
import { useThrottle } from 'ultilites/hooks'
import './index.css'
function ProgressBar({ percentage, setProgress }) {
  const elementRef = useRef(undefined)
  const [loading, setLoading] = useState(false)
  const updatedWidth = useThrottle(percentage, 400)

  useEffect(() => {
    if (updatedWidth) {
      updateWidth(updatedWidth)
      setLoading(true)

      if (updatedWidth == 100) {
        setTimeout(() => {
          setProgress(0)
          setLoading(false)
        }, 500)
      }
    }
  }, [updatedWidth, setProgress])

  function updateWidth(value) {
    elementRef.current.style.width = `${value}%`
  }

  return <div className={`progress-bar ${loading ? '' : 'hide'}`}>
    <div className="value" ref={elementRef} />
  </div>
}
const mapStateToProps = ({ progress }) => ({
  percentage: progress.value
})

const mapDispatchToProps = {
  setProgress
}
export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar)
