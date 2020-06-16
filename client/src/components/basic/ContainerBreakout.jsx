import React from 'react'

export default function ContainerBreakout({children, marginY, paddingY, backgroundColor}) {

  const outerStyle = {
    width: '500%',
    marginLeft: '-200%',
    margin: `${marginY} 0 ${marginY} -200%`,
    overflow: 'hidden',
    backgroundColor: backgroundColor
  }

  const innerStyle = {
    width: '20%',
    margin: '0 auto',
    padding: `${paddingY} 0`
  }

  return (
    <div style={outerStyle}>
      <div style={innerStyle}>
        {children}
      </div>
    </div>
  )
}
