import { Col, Form, Input, Layout, Row, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React from 'react'
import { withErrorBoundary } from '../components/ErrorBoundary'

const { Content } = Layout
const { Title } = Typography

import { MdTitle, MdInsertLink, MdShortText } from 'react-icons/md'

export const DetailsView = withErrorBoundary((): JSX.Element => {
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
        Détails
      </Title>
      <br />
      <Form
        layout="vertical"
        size='large'
      >
        <Form.Item label="Titre du prosit">
          <Input placeholder="Virtualisation" prefix={<MdTitle />} />
        </Form.Item>
        <Form.Item label="Lien du prosit">
          <Input placeholder="https://moodle-ingenieurs.cesi.fr/course/view.php?id=603" prefix={<MdInsertLink />}  />
        </Form.Item>
        <Form.Item label="Généralisation">
          <Input placeholder="Allumer un feu" prefix={<MdShortText />}  />
        </Form.Item>
        <Form.Item label="Contexte">
          <Input placeholder="Fred et Jammy cherchent la réponse à la vie" prefix={<MdShortText />}  />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Animateur">
              <Input placeholder="John Doe" prefix={<UserOutlined />} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Scribe">
              <Input placeholder="John Doe" prefix={<UserOutlined />} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Secrétaire">
              <Input placeholder="John Doe" prefix={<UserOutlined />} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Gestionnaire">
              <Input placeholder="John Doe" prefix={<UserOutlined />} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Content>
  )
})
