import React from 'react'
import { Meteor } from 'meteor/meteor'
import { MeteorsNames } from '../../infra/publish-names';
import { useTracker } from 'meteor/react-meteor-data';
import { List } from '@mantine/core';
import { People } from '../../collections/people';
import { ListContent } from '../ListContent/ListContent'
import { useDataContext } from '../../Context/context';
export const ListUserEvents = () => {

  const {data, setData} = useDataContext()
  const eventUsers = useTracker(() => {
      Meteor.subscribe(MeteorsNames.GetRegisteredUsersInCommunity, {communityID: data.currentSelectedEvent })
      const result = People.find().fetch()
      return result
  })

  return (
    <div>
        <List >
            {eventUsers.map(user => 
                <List.Item key={user._id}> 
                    <ListContent data={user}></ListContent> 
                </List.Item>) 
            }
        </List>
    </div>
  )
}
