import React, { useState, useContext } from 'react'
// import { useTracker } from 'meteor/react-meteor-data';
// import { Meteor } from 'meteor/meteor'
// import { People } from '../collections/people';
// import { Communities } from '../collections/communities'
// import { MeteorsNames } from '../infra/publish-names';


const DataContex = React.createContext({
  data:{
    currentSelectedEvent: '',
    eventUsers: [],
    selectedFilters: []
  },
  setData: () => {}
})

export function useDataContext(){ 
    return useContext(DataContex)
}

export const DataProvider = ({children}) => {
  console.log()
  const [data, setData] = useState({
    currentSelectedEvent: '',
    eventUsers: [],
    selectedFilters: []
  })
  const value = { data, setData}

  return (
    <DataContex.Provider value={value}>
        {children}
    </DataContex.Provider>
  )
}
