import React from 'react';
import Button, {ButtonSize, ButtonType} from "./button";
import {storiesOf} from '@storybook/react'
import {action} from "@storybook/addon-actions";
import {withInfo} from '@storybook/addon-info';


const defaultButton = () => (
    <Button onClick={action('clicked')} >default button </Button>
)

const buttonWithSize = ()=>(
    <>
        <Button size={ButtonSize.Large}> large button </Button>
        <Button size={ButtonSize.Small}> small button </Button>

    </>
)

const buttonWithType = ()=>(
    <>
        <Button btnType={ButtonType.Default}> default button </Button>
        <Button btnType={ButtonType.Primary}> Primary button </Button>
        <Button btnType={ButtonType.Success}> Success button </Button>
        <Button btnType={ButtonType.Danger}> Danger button </Button>
        <Button btnType={ButtonType.Link} href={"https://www.baidu.com"}> Link button </Button>

    </>
)

storiesOf('Button Compopnent', module)
    .addDecorator(withInfo)
    .addParameters({
        info:{
            text: "Button组件说明",
            inline: true
        }
    })
    .add('默认Button', defaultButton)
    .add('不同大小的 Button',buttonWithSize)
    .add('不同类型的 Button', buttonWithType,{info: {inline:false}});

