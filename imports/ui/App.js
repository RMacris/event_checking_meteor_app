import React, { useEffect }from 'react';
import { TEXTS } from '../infra/constants';
import EventSelector from './EventSelector/EventSelector';
import { ListUserEvents } from './ListUserEvents/ListUserEvents';

export const App = () =>{
 return (
  <div>
    <h1>{TEXTS.HOME_TITLE}</h1>
    <EventSelector></EventSelector>
    <ListUserEvents communityID={"aTrjcjpP7CtjCRto8"}></ListUserEvents>
  </div>
);
}