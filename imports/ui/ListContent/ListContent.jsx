import React, {useState, useRef, memo, useEffect} from 'react';
import { Group, Button } from '@mantine/core';
import { Event } from '../../collections/event';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor'
import { MeteorsNames } from '../../infra/publish-names';



const ListContent =({data, onCheck}) => {
    const [isChecked, setIsChecked] = useState(data.checkState)
    const animatedEl = useRef(null)
    const itemContainer = useRef(null)

    
    useEffect(() => { 
        console.log('re-render')
    }, [])
    function onCheckOut() {
        handleCheck()
        
    }
    
    function  onCheckIn() { 
        addWaitingStyle() 
        setTimeout(() => {
            handleCheck()
            removeWaitingStyle()

        }, 5000)
    }

    function handleCheck () { 
        const newState = !isChecked
        setIsChecked(newState)
        onCheck(data)
    }

    function addWaitingStyle (){ 
        itemContainer.current.classList.add('--waiting')
        animatedEl.current.classList.add('--waiting')
    }
    function removeWaitingStyle() { 
        itemContainer.current.classList.remove('--waiting')
        animatedEl.current.classList.remove('--waiting')
    }
    return (
        <Group ref={itemContainer} className='sticker' mt="xs">
            <div ref={animatedEl} className='waiting-feedback'></div>
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
                            { !isNaN(parseInt(data.checkedInTime)) ? moment(data.checkedInTime).format('MM/DD/YYYY, HH:mm') : ''}
                        </span > 
                    </div>
                    <div>
                        <span className='check_label'>Check-out: 
                        </span>
                        <span className='check_time'>
                        { !isNaN(parseInt(data.checkedOutTime)) ? moment(data.checkedOutTime).format('MM/DD/YYYY, HH:mm') : ''}
                        </span> 
                    </div>
                </Group>
            </Group>
            {
            data.checkState 
            ? <Button className='button_margin' variant="gradient" onClick={() => onCheckOut() } gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>Check-Out</Button>
            : <Button className='button_margin' variant="gradient" onClick={() => onCheckIn()} gradient={{ from: 'indigo', to: 'cyan' }}>Check-In</Button>
            }
        </Group>
    )
}

export default memo(ListContent)