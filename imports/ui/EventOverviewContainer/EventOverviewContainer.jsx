import React ,  {useEffect, useState} from 'react'
import { Badge } from '../Badge/Badge'
import '../../../client/styles/components/EventOverviewContainer'
import { useDataContext } from '../../Context/context'
import { sort } from 'prettier'
export const EventOverviewContainer = () => {
  const { data } = useDataContext()
  const [badgeContainerData,setBadgeContainerData] = useState([])

  useEffect(() => {
    if(data.eventUsers.length > 0) {
      setBadgeContainerData(countUniqueTitles())
    }


  },[data.eventUsers])

  function sortTitlesIntoArray(titlesObj)  {
    let titleGroup = [];
    for (var title in titlesObj) {
      titleGroup.push([title, titlesObj[title]]);
    }

    titleGroup.sort(function(a, b) {
        return  b[1] - a[1];
    });
    return titleGroup
  }

  function countUniqueTitles() { 
    let result = {}
    for(let user of data.eventUsers){
      if(user.checkState) { 
        if(result[user.title] != undefined && user.title.length > 1){ 
          result[user.title] += 1
          continue
        }
        if(user.title.length > 1){
          result[user.title] = 1

        }
      }
    }
    result = sortTitlesIntoArray(result)
    return result
  }
  return (
      <div className='badge_container'>
        <div className='event_overview_info'>
            <p>People in the event right now: <span>{badgeContainerData.reduce((prev,curr)=> prev + curr[1], 0)}</span></p>
            <p>People not checked-in: <span> {data.eventUsers.reduce((prev,curr)=> {
              console.log(curr)
                if(curr.checkState === false) return prev + 1
                else return prev 
            }, 0)} </span> </p>
        </div>
        <div className='event_badge_info'>
            {badgeContainerData.map((titleGroup,index) => {
              return (<Badge key={index}>{titleGroup[0]} {titleGroup[1]} </Badge>)
            })}
        </div>
      </div>
  )
}
