import React from 'react'
import Container from '@material-ui/core/Container'

export default function SiteContainer({children, dontUseContainer}) {

  if(dontUseContainer) return (
    <div>{children}</div>
  )

  return (
    <Container maxWidth="md">
      {children}
    </Container>
  )
}
