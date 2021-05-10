import { CloseOutlined, InfoOutlined, ReloadOutlined } from '@ant-design/icons'
import { captureException, showReportDialog } from '@sentry/browser'
import { Button, Collapse, Result } from 'antd'
import React from 'react'
import { withErrorBoundary as withDefaultErrorBoundary } from 'react-error-boundary'
import { store } from '../store'
import { IErrorAction, setError } from '../store/features/error'

const { Panel } = Collapse

export const FallbackErrorComponent = ({ error, eventId }: IErrorAction): JSX.Element => {
  /**
   * Closes application
   */
  function close (): void {
    window.WindowControls.close()
  }

  /**
   * Restarts application
   */
  function restart (): void {
    window.WindowControls.restart()
    window.WindowControls.close()
  }

  return (
    <div style={{ position: 'fixed', backgroundColor: '#FFF', width: '100vw', height: '100vh', zIndex: 999 }}>
      <Result
        status='error'
        title='Une erreur a eu lieu'
        subTitle='Désolé pour ce désagrément'
        style={{ position: 'fixed', width: '80vw', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        extra={[
          <Button key='exit' icon={<CloseOutlined />} onClick={close}>
            Quitter
          </Button>,
          <Button key='feedback' type='default' danger icon={<InfoOutlined />} onClick={() => showReportDialog({ eventId })}>
            Ajouter des détails sur l'erreur
          </Button>,
          <Button key='restart' type='primary' danger icon={<ReloadOutlined />} onClick={restart}>
            Redémarrer
          </Button>
        ]}
      >
        <div className='desc'>
          <Collapse>
            <Panel header="Détails de l'erreur" key='1'>
              <code>{error.stack}</code>
            </Panel>
          </Collapse>
        </div>
      </Result>
    </div>
  )
}

export function withErrorBoundary<T> (Component: React.ComponentType<T>): React.ComponentType<T> {
  return withDefaultErrorBoundary<T>(Component, {
    FallbackComponent: () => <></>,
    onError (error) {
      const eventId = captureException(error)
      store.dispatch(setError({
        error,
        eventId
      }))
    }
  })
}
