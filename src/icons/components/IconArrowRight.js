import React from 'react'
import useIconSize from '../icon-size'
import IconPropTypes from '../IconPropTypes'

function IconArrowRight({ size = undefined, ...props }) {
  const sizeValue = useIconSize(size)
  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.2}
        d="M5.566 12.566h12.869a.566.566 0 000-1.132H5.565a.566.566 0 100 1.132z"
      />
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.2}
        d="M17.634 12l-4.426 4.426a.566.566 0 00.8.8l4.826-4.826a.566.566 0 000-.8l-4.826-4.826a.564.564 0 00-.8 0 .566.566 0 000 .8L17.634 12z"
      />
    </svg>
  )
}

IconArrowRight.propTypes = IconPropTypes
export default IconArrowRight
