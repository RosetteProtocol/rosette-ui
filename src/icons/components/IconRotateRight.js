import React from 'react'
import useIconSize from '../icon-size'
import IconPropTypes from '../IconPropTypes'

function IconRotateRight({ size = undefined, ...props }) {
  const sizeValue = useIconSize(size)
  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.2}
        clipPath="url(#clip0)"
      >
        <path d="M18.434 6.286a.565.565 0 00-.565.565v3.295h-3.295a.566.566 0 000 1.131h3.86a.566.566 0 00.566-.565v-3.86a.566.566 0 00-.566-.566z" />
        <path d="M18.822 10.3l-2.973-2.8a6.395 6.395 0 00-2.372-1.493 6.315 6.315 0 00-4.858.258 6.315 6.315 0 00-3.253 3.618 6.315 6.315 0 00.258 4.858 6.315 6.315 0 003.618 3.252 6.334 6.334 0 004.858-.258 6.315 6.315 0 003.253-3.618.565.565 0 10-1.067-.376 5.191 5.191 0 01-2.674 2.974 5.19 5.19 0 01-3.993.212 5.191 5.191 0 01-2.974-2.674 5.19 5.19 0 01-.212-3.994 5.191 5.191 0 012.673-2.974 5.191 5.191 0 013.994-.212 5.258 5.258 0 011.968 1.245l2.979 2.806a.565.565 0 00.775-.824z" />
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0h14v14H0z" transform="translate(5 5)" />
        </clipPath>
      </defs>
    </svg>
  )
}

IconRotateRight.propTypes = IconPropTypes
export default IconRotateRight
