import React, {useState} from 'react'
import { Switch, Group, ActionIcon, Button } from '@mantine/core';
import { BsTrash } from 'react-icons/Bs'
export const ListContent = ({data}) => {
    const [isChecked, setIsChecked] = useState(false)

    return (
        <Group className='' mt="xs">
            <Group direction='column'>
                <Group direction='row'>
                    <span>{data?.firstName} {data?.lastName}</span>
                    { data?.title ? <span>-</span> : null }
                    { data?.title ? <span>{ data?.title } at {data?.companyName}</span> : null }
                </Group>
                <Group>
                    <span>Check-in Check-in : 02/24/2022  17:45</span>
                    <span>Check-out : 02/24/2022  21:32</span>
                </Group>
            </Group>
            {
            isChecked 
            ? <Button variant="gradient" onClick={() => setIsChecked(false)} gradient={{ from: 'indigo', to: 'cyan' }}>Check-Out</Button>
            : <Button variant="gradient" onClick={() => setIsChecked(true)} gradient={{ from: 'indigo', to: 'cyan' }}>Check-In</Button>
            }
            
            {/* <ActionIcon
                color="red"
                variant="hover"
                onClick={() => {}}
            >
                <BsTrash size={'16px'} />
            </ActionIcon > */}
        </Group>
    )
}
