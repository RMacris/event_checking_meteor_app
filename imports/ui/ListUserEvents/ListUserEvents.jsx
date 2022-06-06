import React from 'react'
import { Meteor } from 'meteor/meteor'
import { MeteorsNames } from '../../infra/publish-names';
import { useTracker } from 'meteor/react-meteor-data';
import { List } from '@mantine/core';
import { People } from '../../collections/people';
import { ListContent } from '../ListContent/ListContent'
import { useDataContext } from '../../Context/context';
import { Event } from '../../collections/event';
export const ListUserEvents = () => {

  const {data, setData} = useDataContext()

  const eventUsers = useTracker(() => {
      Meteor.subscribe(MeteorsNames.GetRegisteredUsersInCommunity, {communityID: data.currentSelectedEvent })
      const result = People.find().fetch()
      return result
  },[data])


  function UpdateUserStatus(isChecked, checkedUser){
      Meteor.call('setUserEventStatus',{isChecking:isChecked, userData:checkedUser, eventId: data.currentSelectedEvent},(error, result) => { 
          console.log(result)
      })
  }
  
  return (
    <div>
        <List >
            {eventUsers.map(user => 
                <List.Item key={user._id}> 
                    <ListContent data={user} onCheck={UpdateUserStatus}></ListContent> 
                </List.Item>
                ) 
            }
        </List>
    </div>
  )
}
