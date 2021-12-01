import React from 'react'
import {storiesOf} from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1 > Reactd组件库</h1>
        <h3>安装</h3>
        <code>
          npm install Reactd --save
        </code>
      </>
    )
  }, { info : { disable: true }})
