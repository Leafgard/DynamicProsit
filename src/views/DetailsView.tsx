import { Col, Form, FormInstance, Input, Layout, Row, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React, { useEffect, useRef } from 'react'
import { withErrorBoundary } from '../components/ErrorBoundary'

const { Content } = Layout
const { Title } = Typography

import { MdTitle, MdInsertLink, MdShortText } from 'react-icons/md'

export const DetailsView = withErrorBoundary((): JSX.Element => {

  const formRef = useRef<FormInstance>()

  useEffect(() => {
    return () => {
      console.log(formRef.current?.getFieldsValue())
    }
  }, [])

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
        form={formRef.current}
        layout="vertical"
        size='large'
      >
        <Form.Item
          name="title"
          label="Titre du prosit"
        >
          <Input
            placeholder="Base de données"
            prefix={<MdTitle />}
          />
        </Form.Item>
        <Form.Item
          name="link"
          label="Lien du prosit"
        >
          <Input
            placeholder="https://moodle-ingenieurs.cesi.fr/course/view.php?id=1451"
            prefix={<MdInsertLink />}
          />
        </Form.Item>
        <Form.Item
          name="generalization"
          label="Généralisation"
        >
          <Input
            placeholder="Mise en place et gestion de BDD Oracle"
            prefix={<MdShortText />}
          />
        </Form.Item>
        <Form.Item
          name="context"
          label="Contexte"
        >
          <Input
            placeholder="On doit mettre en place un poste de travail avec une base de données Oracle sans master."
            prefix={<MdShortText />}
          />
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
