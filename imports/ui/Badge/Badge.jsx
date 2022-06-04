import React, { useState } from 'react'
import { Checkbox } from '@mantine/core';

export const Badge = ({children}) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className='badge' onClick={(e) => setChecked(!checked)} >
        <span>{children}</span>
        <Checkbox checked={checked} onChange={(e) => e.preventDefault()} />
    </div>
  )
}
