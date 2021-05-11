import { Layout } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { FallbackErrorComponent } from './components/ErrorBoundary'

import { Header } from './components/Header'
import { Navigation } from './components/Navigation'

import { IRoute, routes } from './routes'
import { RootState } from './store/features'

const { Footer } = Layout

export const App = (): JSX.Element => {
  const { error, eventId } = useSelector((state: RootState) => state.error)

  /**
   * Build route elements for content
   */
  function buildContentRoutes (): JSX.Element[] {
    const routeElements: JSX.Element[] = []
    routes.forEach((route) => {
      // Build menu routes
      const menu = buildContent(route)
      if (menu !== undefined) routeElements.push(menu)
      route.subRoutes.forEach((route) => {
        // Build item routes
        const item = buildContent(route)
        if (item !== undefined) routeElements.push(item)
      })
    })
    return routeElements
  }

  /**
   * Build route content if existing
   * @param route Route to build
   */
  function buildContent (route: IRoute): JSX.Element | undefined {
    if (route.component !== undefined) {
      return (
        <Route key={route.id} path={route.path} exact={route.exact}>{route.component}</Route>
      )
    }
  }

  return (
    <div className='app'>
      {error !== undefined && eventId !== undefined ? (
        <FallbackErrorComponent error={error} eventId={eventId} />
      ) : (
        <Layout style={{ height: '100vh' }}>
          <Router>
            <Header />
            <Layout>
              <Navigation />
              <Layout style={{ padding: '0 24px 24px' }}>
                <Switch>
                  {buildContentRoutes()}
                </Switch>
                <Footer style={{ textAlign: 'center' }}>DynamicProsit | Made with 💜 by Yann SEGET | v4.0.0</Footer>
              </Layout>
            </Layout>
          </Router>
        </Layout>
      )}
    </div>
  )
}
