import React from 'react';
import Button from "./button";
import {storiesOf} from '@storybook/react'
import {action} from "@storybook/addon-actions";


const defaultButton = () => (
    <Button onClick={action('clicked')} >default button </Button>
)

const buttonWithSize = ()=>(
    <>
        <Button size={"lg"}> large button </Button>
        <Button size={"sm"}> small button </Button>
    </>
)

const buttonWithType = ()=>(
    <>
        <Button btnType={"default"}> default button </Button>
        <Button btnType={"primary"}> Primary button </Button>
        <Button btnType={"success"}> Success button </Button>
        <Button btnType={"danger"}> Danger button </Button>
        <Button btnType={ "link"} href={"https://www.baidu.com"}> Link button </Button>

    </>
)

storiesOf('Button Compopnent', module)
    .add('Button', defaultButton)
    .add('不同大小的 Button',buttonWithSize)
    .add('不同类型的 Button', buttonWithType);


