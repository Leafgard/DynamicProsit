import { Layout, Menu } from 'antd'
import React from 'react'
import { FaRegWindowMinimize } from 'react-icons/fa'

import { FiMaximize } from 'react-icons/fi'
import { VscChromeClose } from 'react-icons/vsc'

import { withErrorBoundary } from './ErrorBoundary'

const { Header: AntdHeader } = Layout

export const Header = withErrorBoundary((): JSX.Element => {
  /**
   * Minimizes window
   */
  function minimize (): void {
    window.WindowControls.minimize()
  }

  /**
   * Either maximize or un-maximize window depending on current state
   */
  function toggleMaximization (): void {
    window.WindowControls.toggleMaximization()
  }

  /**
   * Closes application
   */
  function close (): void {
    window.WindowControls.close()
  }

  return (
    <AntdHeader className='header'>
      {/*<img height={24} src={icon} alt='Logo DynamicProsit' />*/}
      <Menu selectable={false} theme='dark' mode='horizontal' style={{ position: 'absolute', top: 0, right: 0 }}>
        <Menu.Item key='1' onClick={minimize}>
          <FaRegWindowMinimize className='anticon' />
        </Menu.Item>
        <Menu.Item key='2' onClick={toggleMaximization}>
          <FiMaximize className='anticon' />
        </Menu.Item>
        <Menu.Item key='3' onClick={close}>
          <VscChromeClose className='anticon' />
        </Menu.Item>
      </Menu>
    </AntdHeader>
  )
})
