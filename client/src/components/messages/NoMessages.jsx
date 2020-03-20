import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div>
      <p>You haven't sent or received any messages yet.</p>
      <Link>Try messaging one of your matches</Link>
    </div>
  )
}
