import React, { useState } from 'react'

export const Badge = ({children}) => {
  return (
    <div className='badge'  >
        <span>{children}</span>
    </div>
  )
}
