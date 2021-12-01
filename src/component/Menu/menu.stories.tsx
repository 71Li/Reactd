import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Menu from './menu'
import MenuItem from './menuItem'

export const defaultMenu = () => (
  <Menu defaultIndex='0' onSelect={(index) => {action(`clicked ${index} item`)}} >
    <MenuItem>
      item 1
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <MenuItem>
       item 2
    </MenuItem>
  </Menu>
)

storiesOf('Menu Component', module)
.add('Menu', defaultMenu )
