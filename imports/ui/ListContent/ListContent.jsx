import React, {useState, useEffect} from 'react';
import { Group, Button } from '@mantine/core';
import { Event } from '../../collections/event';
import { useTracker } from 'meteor/react-meteor-data';


export const ListContent = ({data, onCheck}) => {
    const [isChecked, setIsChecked] = useState(false)


    function handleCheck() {
        const newState = !isChecked
        setIsChecked(newState)
        onCheck(newState, data)
        
    }

    return (
        <Group className='sticker' mt="xs">
            <Group className='--no-gap' direction='column'>
                <Group direction='row'>
                    <span className="user_name">{data?.firstName} {data?.lastName}</span>
                    { data?.title ? <span>-</span> : null }
                    { data?.title ? <span className='user_title'>{ data?.title } at {data?.companyName}</span> : null }
                </Group>
                <Group className='--vertical-margin'>
                    <div>
                        <span className='check_label'>Check-in: 
                        </span>
                        <span className='check_time'>
                            02/24/2022  17:45
                        </span> 
                    </div>
                    <div>
                        <span className='check_label'>Check-in: 
                        </span>
                        <span className='check_time'>
                            02/24/2022  17:45
                        </span> 
                    </div>
                </Group>
            </Group>
            {
            isChecked 
            ? <Button className='button_margin' variant="gradient" onClick={() => handleCheck()} gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>Check-Out</Button>
            : <Button className='button_margin' variant="gradient" onClick={() => handleCheck()} gradient={{ from: 'indigo', to: 'cyan' }}>Check-In</Button>
            }
            
            
        </Group>
    )
}
