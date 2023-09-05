import React from 'react';
import { TextInput } from 'react-native';

const InputType = ({props: TextInputProps, ...otherProps}) => {
    return (
        <TextInput
            style={{
                borderWidth: 1,
                borderColor: '#000',
                padding: 10,
                backgroundColor: 'none',
            }}
            {...otherProps}
        />
    )
};

export default InputType;