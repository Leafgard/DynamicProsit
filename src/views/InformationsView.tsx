import { Layout } from 'antd'
import React from 'react'
import { withErrorBoundary } from '../components/ErrorBoundary'

const { Content } = Layout

export const InformationView = withErrorBoundary((): JSX.Element => {
  return (
    <Content
      className='site-layout-background'
      style={{
        padding: 24,
        margin: '24px 0 0 0',
        minHeight: 280
      }}
    >
      <h1>Information</h1>
    </Content>
  )
})
