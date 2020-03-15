import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import SiteContainer from './basic/SiteContainer'

export default function Layout({children, me, dontUseHeader, dontUseFooter, dontUseContainer}) {
  return (
    <SiteContainer>
      {dontUseHeader ? null : <Header me={me}/>}
      {children}
      {dontUseFooter ? null : <Footer />}
    </SiteContainer>
  )
}
