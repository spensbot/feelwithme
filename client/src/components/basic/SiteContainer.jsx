import React from 'react'
import Container from '@material-ui/core/Container'

export default function SiteContainer({children, dontUseContainer, className}) {

  if(dontUseContainer) return (
    <>{children}</>
  )

  return (
    <Container maxWidth="md" className={className}>
      {children}
    </Container>
  )
}
