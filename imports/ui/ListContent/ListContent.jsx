import React, {useState} from 'react'
import { Group, Button } from '@mantine/core';
export const ListContent = ({data}) => {
    const [isChecked, setIsChecked] = useState(false)

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
            ? <Button className='button_margin' variant="gradient" onClick={() => setIsChecked(false)} gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>Check-Out</Button>
            : <Button className='button_margin' variant="gradient" onClick={() => setIsChecked(true)} gradient={{ from: 'indigo', to: 'cyan' }}>Check-In</Button>
            }
            
            
        </Group>
    )
}
