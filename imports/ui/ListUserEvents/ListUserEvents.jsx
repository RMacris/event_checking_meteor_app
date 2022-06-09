import React, {useEffect} from 'react'
import { Meteor } from 'meteor/meteor'
import { MeteorsNames } from '../../infra/publish-names';
import { useTracker } from 'meteor/react-meteor-data';
import { List } from '@mantine/core';
import ListContent from '../ListContent/ListContent'
import { useDataContext } from '../../Context/context';
import { Event } from '../../collections/event';
import { People } from '../../collections/people';
export const ListUserEvents = () => {

  const {data, setData} = useDataContext()
    const eventData = useTracker(() => {
        Meteor.subscribe(MeteorsNames.GetUserEventInfo, {communityId: data.currentSelectedEvent})
        Meteor.subscribe(MeteorsNames.GetRegisteredUsersInCommunity, {communityId: data.currentSelectedEvent})
        const peopleFromCommunityInEvent = Event.find().fetch()
        const communityPeople = People.find().fetch()
        const result = _UpdatePeoleInEventStatus(communityPeople,peopleFromCommunityInEvent)
        return result
        
    },[data.currentSelectedEvent])

    useEffect(() => {
        setData({...data, eventUsers: eventData   })
        console.log(data)
    }, [eventData])


   
    function _UpdatePeoleInEventStatus(peopleToCheck = [], peopleInTheEvent = []) {
        return peopleToCheck.map(person => {
            const index = peopleInTheEvent.map(el => el.userId).indexOf(person._id)
            if( index !== -1){
                return _peopleEventObj(person, peopleInTheEvent[index])
            }
            return _peopleEventObj(person, {})
        })
    }
    
    function _peopleEventObj(people,event) {
        return {
            userId: people._id ,
            firstName: people.firstName,
            lastName: people.lastName,
            title: people?.title || '',
            companyName: people?.companyName || '',
            communityId: people.communityId,
            checkedInTime: event.checkedInTime || '',
            checkedOutTime: event.checkedOutTime || '',
            checkState: event.checkState || false
        }
    }
  //know i have to check if the people registered in the selected community is registered in the event and update the UI
  //if the people in the community is checked in the event, show Check-Out buton
  //else show check-in button
  //i'm considering the possibility that in case an user that has already been checked-out, if checked-in again, is as if he in another "instance" of the event
  // but i think i'm going to change that, because it doesn't make too much sense to re-check-in in an event, an then it to be another "instance" of the event, while 
  // other users still are in the event, and there isn't another instance yet

  function FetchServer(functionName) { 
        return new Promise((resolve,reject) => { 
            Meteor.call(functionName, {communityID: data.currentSelectedEvent}, (error, result) => {
            if(error) return reject(error)
            resolve(result)
            })
        })
    }

    function UpdateUserStatus(checkedUser){
        Meteor.call('setUserEventStatus',{userId: checkedUser.userId, communityId: data.currentSelectedEvent})
    }
  
  return (
    <div >
        
            <List className='event-list'>
                {eventData.map(user => 
                <List.Item key={user.userId}> 
                        <ListContent key={user.userId} data={user} onCheck={UpdateUserStatus}></ListContent> 
                </List.Item> )
                    
                }

            </List> 
       
    </div>
  )
}
