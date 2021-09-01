import React from 'react'
import { Layout, Menu } from 'antd'
import Products from './components/ProductList'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Product from './pages/Product'
import VIPLanding from './pages/VIPLanding'
import Landing from './pages/Landing'
import ReturnConfig from "./pages/ReturnConfig";

const { Header, Content, Footer } = Layout
function App (props) {
  return (
    <div className='App'>
      <Layout className='layout'>
        <Header id='header'></Header>
        <Content style={{ padding: '1em' }}>
          <Router>
            <Switch>
              <Route
                path='/vip'
                render={props => <VIPLanding {...props} vip={true} />}
              ></Route>
              {/* <Route path='/product/:productId' component={Product}></Route> */}
              <Route
                path='/share'
                render={props => <ReturnConfig {...props} />}
              ></Route>
              {/* <Route path='/' component={Landing} ></Route> */}
              <Route
                path='/'
                render={props => <Landing {...props} vip={false} />}
              ></Route>
         
              {/* <Route path='/' component={Products}></Route> */}
            </Switch>
          </Router>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Threekit {new Date().getFullYear()}
        </Footer>
      </Layout>
    </div>
  )
}

export default App
