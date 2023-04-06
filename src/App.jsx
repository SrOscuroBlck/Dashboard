import { useState } from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import UserLayout from './layouts/User/User'

import './assets/scss/black-dashboard-react.scss'
import './assets/demo/demo.css'
import './assets/css/nucleo-icons.css'

import ThemeContextWrapper from './contexts/ThemeContext'
import BackgroundColorWrapper from './contexts/BackgroundColorContext'
import './App.css'

function App() {
  return (
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        <BrowserRouter>
          <Switch>
            <Route path="/admin" render={(props) => <UserLayout {...props} />} />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </BrowserRouter>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  )
}

export default App
