import { Layout, Menu } from 'antd'
import React, { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { IRoute, routes } from '../routes'
import { withErrorBoundary } from './ErrorBoundary'

const { SubMenu } = Menu
const { Sider } = Layout

export const Navigation = withErrorBoundary((): JSX.Element => {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(true)

  const defaultSelectedKey = useMemo(() => {
    const route = routes.find((r) => r.path === location.pathname)
    return route !== undefined ? route.id : routes[0].id
  }, [])

  /**
   * Build navigation menu
   */
  function buildNavigation (): JSX.Element[] {
    return routes.map((route) => {
      if (route.subRoutes.length > 0) {
        return createMenu(route)
      } else {
        return createMenuItem(route)
      }
    })
  }

  /**
   * Build accordion menu item
   * @param route Accordion item properties
   */
  function createMenu (route: IRoute): JSX.Element {
    return (
      <SubMenu
        key={route.id}
        icon={route.icon}
        title={route.label}
      >
        {
          route.subRoutes.map((route) => createMenuItem(route))
        }
      </SubMenu>
    )
  }

  /**
   * Build menu item
   * @param route Item properties
   */
  function createMenuItem (route: IRoute): JSX.Element {
    return (
      <Menu.Item key={route.id}>
        <Link to={route.path}>
          {route.icon}
          <span>
            {route.label}
          </span>
        </Link>
      </Menu.Item>
    )
  }

  return (
    <Sider
      width={200}
      className='site-layout-background'
      collapsible
      collapsed={isCollapsed}
      onCollapse={() => setIsCollapsed(!isCollapsed)}
    >
      <Menu
        mode='inline'
        defaultSelectedKeys={[defaultSelectedKey]}
        style={{ height: '100%', borderRight: 0 }}
      >
        {buildNavigation()}
      </Menu>
    </Sider>
  )
})
