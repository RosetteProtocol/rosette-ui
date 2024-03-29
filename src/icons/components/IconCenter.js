import React from 'react'
import useIconSize from '../icon-size'
import IconPropTypes from '../IconPropTypes'

function IconCenter({ size = undefined, ...props }) {
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
        d="M17.657 6.343A7.947 7.947 0 0012 4a7.948 7.948 0 00-5.657 2.343A7.948 7.948 0 004 12c0 2.137.832 4.146 2.343 5.657A7.948 7.948 0 0012 20a7.948 7.948 0 005.657-2.343A7.948 7.948 0 0020 12a7.948 7.948 0 00-2.343-5.657zM12 18.707A6.715 6.715 0 015.293 12 6.715 6.715 0 0112 5.293 6.715 6.715 0 0118.707 12 6.715 6.715 0 0112 18.707z"
      />
      <path
        fill="currentColor"
        d="M12 9.883A2.12 2.12 0 009.883 12 2.12 2.12 0 0012 14.117 2.12 2.12 0 0014.117 12 2.12 2.12 0 0012 9.883zm0 2.941a.825.825 0 010-1.648.825.825 0 010 1.648z"
      />
    </svg>
  )
}

IconCenter.propTypes = IconPropTypes
export default IconCenter
