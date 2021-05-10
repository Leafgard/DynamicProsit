import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { FiHelpCircle, FiSettings } from 'react-icons/fi'
import { BsNewspaper } from 'react-icons/bs'

import { VscFeedback } from 'react-icons/vsc'

import { InformationView } from './views/InformationsView'
import { SettingsView } from './views/SettingsView'
import { AboutView } from './views/help/AboutView'
import { FeedbackView } from './views/help/FeedbackView'

export interface IRoute {
  id: string
  label: string
  path: string
  exact: boolean
  icon: JSX.Element
  component?: JSX.Element
  subRoutes: IRoute[]
}

export const routes: IRoute[] = [
  {
    id: 'prosit',
    label: 'Prosit',
    path: '/',
    exact: true,
    icon: <BsNewspaper className='anticon' />,
    component: <InformationView />,
    subRoutes: []
  },
  {
    id: 'settings',
    label: 'Paramètres',
    path: '/settings',
    exact: true,
    icon: <FiSettings className='anticon' />,
    component: <SettingsView />,
    subRoutes: []
  },
  {
    id: 'help',
    label: 'Aide',
    path: '/help',
    exact: true,
    icon: <FiHelpCircle className='anticon' />,
    subRoutes: [
      {
        id: 'about',
        label: 'A propos',
        path: '/help/about',
        exact: true,
        icon: <AiOutlineInfoCircle className='anticon' />,
        component: <AboutView />,
        subRoutes: []
      },
      {
        id: 'feedback',
        label: 'Feedback',
        path: '/help/feedback',
        exact: true,
        icon: <VscFeedback className='anticon' />,
        component: <FeedbackView />,
        subRoutes: []
      }
    ]
  }
]
