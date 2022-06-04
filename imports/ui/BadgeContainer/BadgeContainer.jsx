import React from 'react'
import { Badge } from '../Badge/Badge'
import '../../../client/styles/components/BadgeContainer'
import { useDataContext } from '../../Context/context'
export const BadgeContainer = () => {

  const {data} = useDataContext()
  return (
      <div className='badge_container'>
          {data.eventUsers.map((user,index) => <Badge key={index}>{user.title}</Badge>)}
      </div>
  )
}
