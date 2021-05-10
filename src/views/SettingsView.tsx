import { Layout } from 'antd'
import React from 'react'
import { withErrorBoundary } from '../components/ErrorBoundary'

const { Content } = Layout

export const SettingsView = withErrorBoundary((): JSX.Element => {
  return (
    <Content
      className='site-layout-background'
      style={{
        padding: 24,
        margin: '24px 0 0 0',
        minHeight: 280
      }}
    >
      <h1>Settings</h1>
    </Content>
  )
})
