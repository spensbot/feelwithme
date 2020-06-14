import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import SiteContainer from './basic/SiteContainer'
import Notification from './basic/Notification'
import Spacer from './basic/Spacer'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  site: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '100%'
  }
}))

export default function Layout({children, dontUseHeader, dontUseFooter, dontUseContainer, fixHeight}) {

  const classes = useStyles();

  const fixHeightStyle = {
    height: '100vh',
  }

  return (
    <div className={classes.site} style={fixHeight ? fixHeightStyle : null}>
      {dontUseHeader ? null : <Header dummy />}
      {dontUseHeader ? null : <Header />}
      <div className={classes.content}>
        <SiteContainer dontUseContainer={dontUseContainer}>
          {children}
        </SiteContainer>
      </div>
      {dontUseFooter ? null : <Footer />}
      <Notification />
    </div>
  )
}