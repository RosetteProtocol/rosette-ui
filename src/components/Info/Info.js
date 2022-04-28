import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '../../theme'
import { GU, BIG_RADIUS, textStyle } from '../../style'

function getModeStyles(theme, mode) {
  if (mode === 'warning') {
    return {
      background: theme.warningSurface.alpha(0.1),
      borderColor: theme.warning,
      color: theme.warningSurfaceContent,
      titleColor: theme.warningSurfaceContent,
    }
  }
  if (mode === 'error') {
    return {
      background: theme.negativeSurface.alpha(0.1),
      borderColor: theme.negative,
      color: theme.negativeSurfaceContent,
      titleColor: theme.negativeSurfaceContent,
    }
  }
  if (mode === 'success') {
    return {
      background: theme.positiveSurface.alpha(0.1),
      borderColor: theme.positive,
      color: theme.positiveSurfaceContent,
      titleColor: theme.positiveSurfaceContent,
    }
  }
  if (mode === 'description') {
    return {
      background: theme.helpSurface,
      borderColor: theme.help,
      color: theme.helpContent,
      titleColor: theme.helpContent,
    }
  }
  return {
    background: theme.infoSurface.alpha(0.1),
    borderColor: theme.info,
    color: theme.infoSurfaceContent,
    titleColor: theme.infoSurfaceContent,
  }
}

function Info({
  children,
  mode,
  color,
  titleColor,
  background,
  borderColor,
  title,
  ...props
}) {
  const theme = useTheme()

  // Get styles from the current mode
  const modeStyles = useMemo(() => {
    const styles = getModeStyles(theme, mode)

    return styles
  }, [mode, theme])

  return (
    <section
      css={`
        color: ${color || modeStyles.color};
        background: ${background || modeStyles.background};
        border: 1px solid ${borderColor || modeStyles.borderColor};
        padding: ${2 * GU}px;
        border-radius: ${BIG_RADIUS}px;
        word-wrap: break-word;
        ${textStyle('body3')};
      `}
      {...props}
    >
      {title && (
        <h1
          css={`
            display: flex;
            align-items: center;
            color: ${titleColor || modeStyles.titleColor};
            ${textStyle('label2')};
            margin-bottom: ${1 * GU}px;
          `}
        >
          {title}
        </h1>
      )}
      {children}
    </section>
  )
}

Info.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  mode: PropTypes.oneOf(['info', 'description', 'warning', 'error', 'success']),
  color: PropTypes.string,
  titleColor: PropTypes.string,
  background: PropTypes.string,
  borderColor: PropTypes.string,
}

// Backward compatibility
function Description(props) {
  return <Info mode="description" {...props} />
}
function Warning(props) {
  return <Info mode="warning" {...props} />
}
function Error(props) {
  return <Info mode="error" {...props} />
}
function Success(props) {
  return <Info mode="success" {...props} />
}

Info.Description = Description
Info.Warning = Warning
Info.Error = Error
Info.Success = Success

export default Info
