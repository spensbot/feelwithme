import React, { useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { setIsMobile } from '../../redux/actions'

function MobileDetector({setIsMobile}) {

  function handleResize() {
    const isMobile = (window.innerWidth < 480)
    setIsMobile(isMobile)
  }

  handleResize()

  window.addEventListener('resize', handleResize);

  return(
    null
  )
}

const mapDispatchToProps = dispatch => ({
  setIsMobile: isMobile => dispatch(setIsMobile(isMobile))
})

export default connect(
  null,
  mapDispatchToProps
)(MobileDetector)

