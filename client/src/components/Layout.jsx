import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import SiteContainer from './basic/SiteContainer'

export default function Layout({children, me, dontUseHeader, dontUseFooter, dontUseContainer, fixHeight}) {

  const fixHeightStyle = {
    height: '100vh',
    maxHeight: '100vh'
  }

  return (
    <>
      {dontUseHeader ? null : 
      <><Header /><Header fixed/></>}
      <SiteContainer dontUseContainer={dontUseContainer} style={fixHeight ? fixHeightStyle : null}>
      {children}
      {dontUseFooter ? null : <Footer />}
      </SiteContainer>
    </>
  )
}
