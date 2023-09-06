import React from 'react';
import { Button } from 'react-native-paper';

const ButtonType = ({props: ButtonProps, ...otherProps}) => {
    return (
        <Button
            mode='contained'
            style={{
                width: '100%',
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: 5,
            }}
            {...otherProps}
        >
        </Button>
    )
};

export default ButtonType;