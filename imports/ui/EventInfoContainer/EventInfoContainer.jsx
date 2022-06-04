import React , {useEffect} from 'react'
import { EventSelector } from '../EventSelector/EventSelector'
import { ListUserEvents } from '../ListUserEvents/ListUserEvents'
import { TEXTS } from '../../infra/constants';
BadgeContainer
import '../../../client/styles/components/EventInfoContainer.css'
import { BadgeContainer } from '../BadgeContainer/BadgeContainer';
import { useDataContext } from '../../Context/context';


export const EventInfoContainer = ()  => {
    const { data, setData } = useDataContext()
    useEffect(()=> {
        console.log(data)
    })
    return (
        <div className='event_info_container'>
            <h1>{TEXTS.HOME_TITLE}</h1>
            <EventSelector></EventSelector>
            <BadgeContainer></BadgeContainer>
            <ListUserEvents></ListUserEvents>
        </div>
    )
}
