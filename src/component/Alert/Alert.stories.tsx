import React from 'react';
import Alert, {AltType} from "./alert";
import {storiesOf} from '@storybook/react'
import {action} from "@storybook/addon-actions";


const defaultAlert = () => (
    <Alert onClick={action('clicked')} >default alert </Alert>
)



const alertWithType = ()=>(
    <>
        <Alert altType={AltType.Info}> default button </Alert>

        <Alert altType={AltType.Success}> default button </Alert>

        <Alert altType={AltType.Warning}> default button </Alert>

        <Alert altType={AltType.Error}> default button </Alert>
    </>
)

storiesOf('Alert Compopnent', module)
    .add('Alert', defaultAlert)
    .add('不同类型的 Alert', alertWithType);



