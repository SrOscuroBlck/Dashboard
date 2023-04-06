import React from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'

import PerfectScrollbar from 'perfect-scrollbar'

import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import Plugin from '../../components/Plugin/Plugin'

import routes from '../../routes'

import logo from '../../assets/img/react-logo.png'

var ps

export const User = (props) => {
    const location = useLocation()
    const mainPanelRef = React.useRef(null)
    const [sidebarOpened, setSidebarOpened] = React.useState(
        document.documentElement.className.indexOf('nav-open') !== -1
    )
    React.useEffect(() => {
        if (navigator.platform.indexOf('Win') > -1) {
            document.documentElement.className += ' perfect-scrollbar-on'
            document.documentElement.classList.remove('perfect-scrollbar-off')
            ps = new PerfectScrollbar(mainPanelRef.current, {
                suppressScrollX: true,
            })
            let tables = document.querySelectorAll('.table-responsive')
            for (let i = 0; i < tables.length; i++) {
                ps = new PerfectScrollbar(tables[i])
            }
        }
        return function cleanup() {
            if (navigator.platform.indexOf('Win') > -1) {
                ps.destroy()
                document.documentElement.className += ' perfect-scrollbar-off'
                document.documentElement.classList.remove('perfect-scrollbar-on')
            }
        }
    })
    React.useEffect(() => {
        if (navigator.platform.indexOf('Win') > -1) {
            let tables = document.querySelectorAll('.table-responsive')
            for (let i = 0; i < tables.length; i++) {
                ps = new PerfectScrollbar(tables[i])
            }
        }
        document.documentElement.scrollTop = 0
        document.scrollingElement.scrollTop = 0
        if (mainPanelRef.current) {
            mainPanelRef.current.scrollTop = 0
        }
    }, [location])

    const toggleSidebar = () => {
        document.documentElement.classList.toggle('nav-open')
        setSidebarOpened(!sidebarOpened)
    }
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === '/user') {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                )
            } else {
                return null
            }
        })
    }
    const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
            if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name
            }
        }
        return 'Brand'
    }
        

  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            <Sidebar
              routes={routes}
              logo={{
                outterLink: "https://www.creative-tim.com/",
                text: "Creative Tim",
                imgSrc: logo
              }}
              toggleSidebar={toggleSidebar}
            />
            <div className="main-panel" ref={mainPanelRef} data={color}>
              <AdminNavbar
                brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
              />
              <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to="/admin/dashboard" />
              </Switch>
              {
                // we don't want the Footer to be rendered on map page
                location.pathname === "/admin/maps" ? null : <Footer fluid />
              }
            </div>
          </div>
          <FixedPlugin bgColor={color} handleBgClick={changeColor} />
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  )
}
