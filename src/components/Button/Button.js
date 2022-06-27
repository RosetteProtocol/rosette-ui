import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Inside, useInside } from 'use-inside'
import { textStyle, GU, BIG_RADIUS } from '../../style'
import { useTheme } from '../../theme'
import { warn, warnOnce, unselectable } from '../../utils'
import { useLayout } from '../Layout/Layout'
import ButtonBase from '../ButtonBase/ButtonBase'

// Base styles related to every size.
// See src/icons/icon-size.js for the corresponding icon sizes.
const SIZE_STYLES = {
  medium: {
    textStyleName: 'title4',
    height: 8 * GU,
    padding: 3 * GU,
    iconPadding: 2 * GU,
    minWidth: 18.25 * GU,
    middleSpace: 1 * GU,
  },
  small: {
    textStyleName: 'body2',
    height: 5 * GU,
    padding: 2 * GU,
    iconPadding: 1.5 * GU,
    minWidth: 16 * GU,
    middleSpace: 1 * GU,
  },
  mini: {
    textStyleName: 'body4',
    height: 3 * GU,
    padding: 1.5 * GU,
    iconPadding: 1 * GU,
    minWidth: 9.25 * GU,
    middleSpace: 0.5 * GU,
  },
}

function getPadding(size, displayIcon, displayLabel) {
  const { padding, iconPadding } = SIZE_STYLES[size]

  if (displayIcon && !displayLabel) {
    return '0'
  }

  if (displayIcon && displayLabel) {
    return `0 ${padding}px 0 ${iconPadding}px`
  }

  return `0 ${padding}px`
}

function getWidth(size, displayIconOnly, wide) {
  const { height } = SIZE_STYLES[size]

  if (wide) {
    return '100%'
  }

  if (displayIconOnly) {
    return `${height}px`
  }

  return 'auto'
}

function getMinWidth(size, displayLabelOnly) {
  const { minWidth } = SIZE_STYLES[size]
  return displayLabelOnly ? `${minWidth}px` : '0'
}

// CSS styles related to the current size
function sizeStyles(size, wide, displayIcon, displayLabel) {
  const { height, textStyleName, middleSpace } = SIZE_STYLES[size]

  return {
    height: `${height}px`,
    middleSpace: displayIcon && displayLabel ? `${middleSpace}px` : '0',
    minWidth: getMinWidth(size, !displayIcon && displayLabel),
    padding: getPadding(size, displayIcon, displayLabel),
    textStyleCss: textStyle(textStyleName),
    width: getWidth(size, displayIcon && !displayLabel, wide),
  }
}

// CSS styles related to the current mode
function modeStyles(theme, layoutName, mode, disabled, size) {
  const borderSize =
    size === 'mini'
      ? '1'
      : layoutName === 'medium' || size === 'small'
      ? '2'
      : '3'

  if (disabled) {
    return {
      background: theme.surface.alpha(0.5),
      color: theme.disabledContent,
      iconColor: theme.disabledContent,
      border: `${borderSize}px solid ${theme.disabledBorder}`,
    }
  }
  if (mode === 'strong') {
    return {
      background: `linear-gradient(${theme.surface} 0 0) padding-box,
      linear-gradient(90deg, #FAC758 12.5%, #FFA254 25%, #F86E38 37.5%, #F7513E 50%, #F86E38 62.5%, #FFA254 75%, #FAC758 87.5%) border-box`,
      color: theme.content,
      iconColor: theme.content,
      border: `${borderSize}px solid transparent`,
      hoverCss: `background-position: 100%`,
      additionalCss: `
          background-size: 250%;
          transition: background-position 1s ease-in-out;
      `,
    }
  }

  if (mode === 'normal') {
    return {
      background: theme.surface.alpha(0.5),
      color: theme.content,
      iconColor: theme.content,
      border: `${borderSize}px solid ${theme.borderSecondary}`,
      hoverCss: `background-color: ${theme.surfaceUnder.alpha(0.1)}`,
    }
  }

  return {
    color: theme.accent,
    iconColor: theme.accent,
  }
}

function Button({
  children,
  disabled,
  display,
  icon,
  iconOnly,
  innerRef,
  label,
  mode,
  size,
  wide,
  ...props
}) {
  // backward compatibility and deprecated props
  if (iconOnly) {
    warnOnce(
      'Button:iconOnly',
      'Button: "iconOnly" is deprecated, please use "display".'
    )
    display = 'icon'
  }
  if (mode === 'outline' || mode === 'secondary') {
    warnOnce(
      'Button:mode',
      `Button: the mode "${mode}" is deprecated, please use "normal".`
    )
    mode = 'normal'
  }
  if (size === 'normal' || size === 'large') {
    warnOnce(
      'Button:size',
      `Button: the size "${size}" is deprecated, please use "medium".`
    )
    size = 'medium'
  }

  // prop warnings
  if (display === 'icon' && !icon) {
    warn('Button: the display "icon" was used without providing an icon.')
  }
  if (!children && !label) {
    warn('Button: please provide a label.')
  }

  const theme = useTheme()
  const { layoutName } = useLayout()

  const [insideEmptyStateCard] = useInside('EmptyStateCard')
  const [insideHeaderSecondary] = useInside('Header:secondary')

  // Always wide + strong when used as an empty state card action
  if (insideEmptyStateCard) {
    mode = 'strong'
    wide = true
  }

  // Alternate between icon and label automatically when used in Header
  if (insideHeaderSecondary && display === 'auto' && icon && label) {
    display = layoutName === 'small' ? 'icon' : 'label'
  }

  // Otherwise, display both
  if (display === 'auto') {
    display = 'all'
  }

  const displayIcon = icon && (display === 'all' || display === 'icon')
  const displayLabel = label && (display === 'all' || display === 'label')

  // Mode styles
  const {
    additionalCss = '',
    background,
    hoverCss,
    color,
    iconColor,
    border,
  } = useMemo(() => modeStyles(theme, layoutName, mode, disabled, size), [
    mode,
    theme,
    disabled,
    layoutName,
    size,
  ])

  // Size styles
  const {
    height,
    middleSpace,
    minWidth,
    padding,
    textStyleCss,
    width,
  } = useMemo(() => sizeStyles(size, wide, displayIcon, displayLabel), [
    size,
    wide,
    displayIcon,
    displayLabel,
  ])

  // Use the label as a title when only the icon is displayed
  if (displayIcon && !displayLabel && label && typeof label === 'string') {
    props.title = label
  }

  const insideData = { size }
  console.log(theme.surfaceUnder.alpha(0.1))
  return (
    <ButtonBase
      ref={innerRef}
      focusRingSpacing={layoutName === 'medium' ? 6 : 7}
      focusRingRadius={BIG_RADIUS}
      disabled={disabled}
      {...props}
      css={`
        display: ${wide ? 'flex' : 'inline-flex'};
        align-items: center;
        justify-content: center;
        width: ${width};
        height: ${height};
        min-width: ${minWidth};
        padding: ${padding};
        ${textStyleCss};
        ${unselectable};
        background: ${background};
        color: ${color};
        white-space: nowrap;
        border: ${border};
        box-shadow: ${disabled ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1)'};
        transition-property: transform, box-shadow;
        transition-duration: 50ms;
        transition-timing-function: ease-in-out;
        ${additionalCss};

        &:active {
          transform: ${disabled ? 'none' : 'translateY(1px)'};
          box-shadow: ${disabled ? 'none' : '0px 1px 2px rgba(0, 0, 0, 0.08)'};
        }
        &:hover {
          ${hoverCss};
        }
      `}
    >
      <Inside name="Button" data={insideData}>
        {children || (
          <React.Fragment>
            {displayIcon && (
              <Inside name="Button:icon" data={insideData}>
                <span
                  css={`
                    position: relative;
                    display: flex;
                    color: ${iconColor};
                    margin-right: ${middleSpace};
                  `}
                >
                  {icon}
                </span>
              </Inside>
            )}
            {displayLabel && (
              <Inside name="Button:label" data={insideData}>
                {label}
              </Inside>
            )}
          </React.Fragment>
        )}
      </Inside>
    </ButtonBase>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  display: PropTypes.oneOf(['auto', 'all', 'icon', 'label']),
  icon: PropTypes.node,
  innerRef: PropTypes.any,
  label: PropTypes.string,
  mode: PropTypes.oneOf([
    'normal',
    'strong',
    'positive',
    'negative',

    // deprecated
    'outline',
    'secondary',
    'text',
  ]),
  size: PropTypes.oneOf([
    'medium',
    'small',
    'mini',

    // deprecated
    'large',
    'normal',
  ]),
  wide: PropTypes.bool,

  // deprecated
  iconOnly: PropTypes.bool,
}

Button.defaultProps = {
  disabled: false,
  display: 'auto',
  mode: 'normal',
  size: 'small',
  wide: false,
}

const ButtonWithRef = React.forwardRef((props, ref) => (
  <Button innerRef={ref} {...props} />
))

ButtonWithRef.Anchor = React.forwardRef((props, ref) => {
  warnOnce(
    'Button.Anchor',
    'Button.Anchor is deprecated: please use Button with a href prop instead.'
  )
  return <ButtonWithRef ref={ref} {...props} />
})

export default ButtonWithRef
