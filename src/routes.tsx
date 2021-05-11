import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { FiHelpCircle, FiSettings } from 'react-icons/fi'
import { VscFeedback, VscKey, VscLock } from 'react-icons/vsc'
import { BiQuestionMark, BiTargetLock } from 'react-icons/bi'
import { TiLightbulb } from 'react-icons/ti'
import { BsListCheck } from 'react-icons/bs'

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
    id: 'informations',
    label: 'Informations',
    path: '/',
    exact: true,
    icon: <AiOutlineInfoCircle className="anticon"/>,
    component: <InformationView/>,
    subRoutes: []
  },
  {
    id: 'keywords',
    label: 'Mots-clés',
    path: '/keywords',
    exact: true,
    icon: <VscKey className="anticon"/>,
    component: <InformationView/>,
    subRoutes: []
  },
  {
    id: 'constraints',
    label: 'Contraintes',
    path: '/constraints',
    exact: true,
    icon: <VscLock className="anticon"/>,
    component: <InformationView/>,
    subRoutes: []
  },
  {
    id: 'problematics',
    label: 'Problématiques',
    path: '/problematics',
    exact: true,
    icon: <BiQuestionMark className="anticon"/>,
    component: <InformationView/>,
    subRoutes: []
  },
  {
    id: 'solutions',
    label: 'Pistes de solution',
    path: '/solutions',
    exact: true,
    icon: <TiLightbulb className="anticon"/>,
    component: <InformationView/>,
    subRoutes: []
  },
  {
    id: 'deliverables',
    label: 'Livrables',
    path: '/deliverables',
    exact: true,
    icon: <BiTargetLock className="anticon"/>,
    component: <InformationView/>,
    subRoutes: []
  },
  {
    id: 'actionsplan',
    label: 'Plan d\'action',
    path: '/actionsplan',
    exact: true,
    icon: <BsListCheck className="anticon"/>,
    component: <InformationView/>,
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
