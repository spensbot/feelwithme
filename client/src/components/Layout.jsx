import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import SiteContainer from './basic/SiteContainer'
import Notification from './basic/Notification'

export default function Layout({children, dontUseHeader, dontUseFooter, dontUseContainer, fixHeight}) {

  const fixHeightStyle = {
    maxHeight: '100vh'
  }

  const style = {
    minHeight: '100vh'
  }

  return (
    <>
      {dontUseHeader ? null : 
      <><Header /><Header fixed/></>}
      <SiteContainer dontUseContainer={dontUseContainer} style={fixHeight ? fixHeightStyle : style}>
      {children}
      {dontUseFooter ? null : <Footer />}
      </SiteContainer>
      <Notification />
    </>
  )
}