import React , {useEffect} from 'react'
import { EventSelector } from '../EventSelector/EventSelector'
import { ListUserEvents } from '../ListUserEvents/ListUserEvents'
import { TEXTS } from '../../infra/constants';
import '../../../client/styles/components/EventInfoContainer.css'
import { EventOverviewContainer } from '../EventOverviewContainer/EventOverviewContainer';
import { useDataContext } from '../../Context/context';


export const EventInfoContainer = ()  => {
    
    return (
        <div className='event_info_container'>
            <div className="info_container-header">
                <h1>{TEXTS.HOME_TITLE}</h1>
                <EventSelector></EventSelector>
            </div>
            <EventOverviewContainer></EventOverviewContainer>
            <ListUserEvents></ListUserEvents>
        </div>
    )
}
