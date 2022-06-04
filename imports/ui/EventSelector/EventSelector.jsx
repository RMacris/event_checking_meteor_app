import React from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { Communities } from '../../collections/communities';
import { Meteor } from 'meteor/meteor';
import { Select } from '@mantine/core';
import { MeteorsNames } from '../../infra/publish-names';

export const EventSelector = () => {

    const communities = useTracker(() => {
        Meteor.subscribe(MeteorsNames.GetAllCommunities)
        return Communities.find({})
        .fetch()
        .map(el => { return {value: el._id, label: el.name}})
    });
  
    return (
        <div>
            <Select 
                label='Communities'
                placeholder='Pick me'
                data={communities}>
            </Select>
        </div>
    )
}
