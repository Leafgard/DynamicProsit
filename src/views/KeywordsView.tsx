import { Layout, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { withErrorBoundary } from '../components/ErrorBoundary'

const { Content } = Layout
const { Title } = Typography

export const KeywordsView = withErrorBoundary((): JSX.Element => {
  return (
    <Content
      className='site-layout-background'
      style={{
        padding: 24,
        margin: '24px 0 0 0',
        minHeight: 280
      }}
    >
      <Title id='language' level={3}>
        Mots-clés
      </Title>

    </Content>
  )
})
