import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Input } from './input'


const ControlledInput = () => {
    const [value, setValue] = useState()
    return <Input value={value} defaultValue={value} onChange={(e) => {// @ts-ignore
        setValue(e.target.value)}}/>
}
const defaultInput = () => (
    <>
        <Input
            style={{width: '300px'}}
            placeholder="placeholder"
            onChange={action('changed')}
        />
        <ControlledInput />
    </>
)
const disabledInput = () => (
    <Input
        style={{width: '300px'}}
        placeholder="disabled input"
        disabled
    />
)

// @ts-ignore
const iconInput = () => (
    <Input
        style={{width: '300px'}}
        placeholder="input with icon"
        icon="search"
    />
)

// @ts-ignore
const sizeInput = () => (
    <>
        <Input
            style={{width: '300px'}}
            defaultValue="large size"
            size="lg"
        />
        <Input
            style={{width: '300px'}}
            placeholder="small size"
            size="sm"
        />
    </>
)
// @ts-ignore
const pandInput = () => (
    <>
        <Input
            style={{width: '300px'}}
            defaultValue="prepend text"
            prepend="https://"
        />
        <Input
            style={{width: '300px'}}
            defaultValue="append"
            append=".com"
        />

    </>
)


storiesOf('Input component', module)
    .add('Input', defaultInput)
    .add('被禁用的 Input', disabledInput)
    .add('带图标的 Input', iconInput)
    .add('大小不同的 Input', sizeInput)
    .add('带前后缀的 Input', pandInput)
