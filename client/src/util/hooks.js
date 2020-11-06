import React from 'react';

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = React.useState(initialState);

    function handleChange(e) {
        setValues({...values, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        callback();
    }

    return { handleChange, handleSubmit, values }
}