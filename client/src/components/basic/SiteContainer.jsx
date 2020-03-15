import React from 'react'
import Container from '@material-ui/core/Container'

export default function SiteContainer({children}) {
  return (
    <Container maxWidth="lg">
      {children}
    </Container>
  )
}
