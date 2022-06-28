import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '../../theme'
import { warnOnce } from '../../utils'
import { textStyle, GU, MEDIUM_RADIUS } from '../../style'

const SIZE_STYLES = {
  medium: {
    textStyleName: 'title4',
    height: 8 * GU,
  },
  small: {
    textStyleName: 'body2',
    height: 5 * GU,
  },
}

// CSS styles related to the current size
function sizeStyles(size) {
  const { height, textStyleName } = SIZE_STYLES[size]

  return {
    height: `${height}px`,
    textStyleCss: textStyle(textStyleName),
  }
}

// Simple text input
const TextInput = React.forwardRef(
  ({ autofocus, error, multiline, type, size, ...props }, ref) => {
    const theme = useTheme()

    // Size styles
    const { height, textStyleCss } = useMemo(() => sizeStyles(size), [size])

    const handleRef = useCallback(
      element => {
        if (ref) {
          ref.current = element
        }
        if (autofocus && element) {
          element.focus()
        }
      },
      [autofocus, ref]
    )

    return (
      <input
        ref={handleRef}
        as={multiline ? 'textarea' : 'input'}
        type={multiline ? undefined : type}
        {...props}
        css={`
          width: ${({ wide }) => (wide ? '100%' : 'auto')};
          height: ${height};
          padding: 0 ${1.5 * GU}px;
          background: ${theme.surface};
          border: 1px solid ${error ? theme.negative : theme.borderDark};
          color: ${theme.surfaceContent};
          border-radius: ${MEDIUM_RADIUS}px;
          appearance: none;
          ${textStyleCss};

          ${multiline
            ? `
              height: auto;
              padding: ${1 * GU}px ${1.5 * GU}px;
              resize: vertical;
            `
            : ''}

          &:focus {
            outline: none;
            border: 2px solid ${error ? theme.negative : theme.focus};
          }

          &:read-only {
            color: ${theme.contentSecondary};
            border-color: ${theme.borderDark};
          }

          &::placeholder {
            color: ${theme.surfaceOpened};
            opacity: 1;
          }

          &:invalid {
            box-shadow: none;
          }
        `}
      />
    )
  }
)

TextInput.propTypes = {
  autofocus: PropTypes.bool,
  error: PropTypes.bool,
  multiline: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
}

TextInput.defaultProps = {
  autofocus: false,
  multiline: false,
  required: false,
  type: 'text',
  size: 'small',
}

const Wrapper = ({ children, wide }) => (
  <div
    css={`
      display: inline-flex;
      flex-direction: column;
      position: relative;
      width: ${wide ? '100%' : 'max-content'};
      gap: ${0.5 * GU}px;
    `}
  >
    {children}
  </div>
)

// Text input wrapped to allow adornments
const WrapperTextInput = React.forwardRef(
  (
    {
      adornment,
      adornmentPosition,
      adornmentSettings: {
        width: adornmentWidth = 36,
        padding: adornmentPadding = 4,
      },
      ...props
    },
    ref
  ) => {
    const theme = useTheme()
    if (!adornment) {
      return <TextInput ref={ref} {...props} />
    }
    return (
      <div
        css={`
          display: inline-flex;
          position: relative;
          width: ${props.wide ? '100%' : 'max-content'};
        `}
      >
        <TextInput
          ref={ref}
          css={`
            ${adornmentPosition === 'end'
              ? 'padding-right'
              : 'padding-left'}: ${adornmentWidth - adornmentPadding * 2}px;
          `}
          {...props}
        />
        <div
          css={`
            position: absolute;
            top: 0;
            bottom: 0;
            height: 100%;
            ${adornmentPosition === 'end'
              ? 'right'
              : 'left'}: ${adornmentPadding}px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${theme.surfaceContentSecondary};
          `}
        >
          {adornment}
        </div>
      </div>
    )
  }
)

Wrapper.propTypes = {
  wide: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

WrapperTextInput.propTypes = {
  ...TextInput.propTypes,
  adornment: PropTypes.node,
  adornmentPosition: PropTypes.oneOf(['start', 'end']),
  adornmentSettings: PropTypes.shape({
    width: PropTypes.number,
    padding: PropTypes.number,
  }),
}

WrapperTextInput.defaultProps = {
  ...TextInput.defaultProps,
  adornment: null,
  adornmentPosition: 'start',
  adornmentSettings: {},
}

// <input type=number> (only for compat)
function TextInputNumber(props) {
  warnOnce(
    'TextInputNumber',
    'TextInputNumber is deprecated. Please use TextInput instead.'
  )
  return <TextInput type="number" {...props} />
}

// Multiline input (textarea element)
function TextInputMultiline(props) {
  return <TextInput multiline {...props} />
}

TextInputMultiline.propTypes = {
  required: PropTypes.bool,
}
TextInputMultiline.defaultProps = {
  required: false,
}

WrapperTextInput.Number = TextInputNumber
WrapperTextInput.Multiline = TextInputMultiline

export default WrapperTextInput
