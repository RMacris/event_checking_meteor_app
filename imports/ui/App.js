import React, { useEffect }from 'react';
import { DataProvider } from '../Context/context';
import { EventInfoContainer } from './EventInfoContainer/EventInfoContainer';


export const App = () =>{
 return (
  <DataProvider>
    <div style={{display:'flex', flexDirection:'column'}}>
      <EventInfoContainer></EventInfoContainer>
    </div>
  </DataProvider> 
);
}