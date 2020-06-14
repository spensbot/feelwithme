import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import SiteContainer from './basic/SiteContainer'
import Notification from './basic/Notification'
import Spacer from './basic/Spacer'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  site: {
    //position: 'relative'
  }
}))

export default function Layout({children, dontUseHeader, dontUseFooter, dontUseContainer, fixHeight}) {

  const classes = useStyles();

  const fixHeightStyle = {
    maxHeight: '100vh'
  }

  const style = {
    minHeight: '100vh'
  }

  return (
    <>
      {dontUseHeader ? null : 
      <><Header dummy /><Header /></>}
      <div className={classes.site}>
        <SiteContainer dontUseContainer={dontUseContainer} style={fixHeight ? fixHeightStyle : style}>
        {children}
        </SiteContainer>
      </div>
      <Spacer percent={30}/>
      {dontUseFooter ? null : <Footer />}
      <Notification />
    </>
  )
}