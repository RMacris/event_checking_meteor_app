import React from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { Communities } from '../../collections/communities';
import { Meteor } from 'meteor/meteor';
import { Select } from '@mantine/core';
import { MeteorsNames } from '../../infra/publish-names';
import { useDataContext } from '../../Context/context';

export const EventSelector = () => {

    const { data, setData } = useDataContext()
    const communities = useTracker(() => {
        Meteor.subscribe(MeteorsNames.GetAllCommunities)
        return Communities.find({})
        .fetch()
        .map(el => { return {value: el._id, label: el.name}})
    });
    
    function HandleSelectedCategory(value) { 
        setData({...data, currentSelectedEvent: value})
      
    }

    
    return (
        <div>
            <Select 
                label='Communities'
                placeholder='Pick me'
                data={communities}
                onChange={HandleSelectedCategory}>
            </Select>
        </div>
    )
}
