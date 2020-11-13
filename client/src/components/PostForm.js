import { defaultDataIdFromObject } from '@apollo/client';
import React from 'react';
import { Form } from 'semantic-ui-react';

import { useForm } from '../util/hooks';

function PostForm(params) {
    const { onSubmit, onChange, values } = useForm();
    return(
        <Form onSubmit={onSubmit}>
            Post Form
        </Form>
    );
}

export default PostForm;