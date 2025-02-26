import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'
import { EmailContextProvider } from './context/emailContext/EmailContext'
import { PlansContextProvider } from './context/plansContext/PlansContext'
import { NewsContextProvider } from './context/newContext/NewsContext'
import { NotifContextProvider } from './context/notifContext/NotifContext'
import { UsersContextProvider } from './context/usersContext/UsersContext'
import { TicketContextProvider } from './context/ticketContext/TicketContext'
import { TicketInfoContextProvider } from './context/ticketInfoContext/TicketInfoContext'
import { WithContextProvider } from './context/withContext/WithContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <EmailContextProvider>
      <PlansContextProvider>
        <NewsContextProvider>
          <NotifContextProvider>
            <UsersContextProvider>
              <TicketContextProvider>
                <TicketInfoContextProvider>
                  <WithContextProvider>
                    <App />
                  </WithContextProvider>
                </TicketInfoContextProvider>
              </TicketContextProvider>
            </UsersContextProvider>
          </NotifContextProvider>
        </NewsContextProvider>
      </PlansContextProvider>
    </EmailContextProvider>
  </React.StrictMode>,
)
