import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd'
import Products from './components/ProductList'
import './App.css'
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom'
import Product from './pages/Product'
import Landing from './pages/Landing'
import ReturnConfig from "./pages/ReturnConfig";
import FooterComp from "./components/Footer";
import "antd/dist/antd.less";
import "./theme.less";

const { Header, Content, Footer } = Layout

function App(props) {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let enableAR = params.get('enableAR');

  return (
    <div className='App'>
      {enableAR ? <ReturnConfig {...props} /> : <Layout className='layout'>
        <Header id='header'></Header>
        <Content style={{ padding: '1em' }}>
          <Router>
            <Switch>
              <Route
                path='/vip'
                render={props => <Landing {...props} vip={'true'} />}
              ></Route>
              {/* <Route path='/product/:productId' component={Product}></Route> */}
              <Route
                path='/share'
                render={props => <ReturnConfig {...props} />}
              ></Route>
              {/* <Route path='/' component={Landing} ></Route> */}
              <Route
                path='/'
                render={props => <Landing {...props} vip={'false'} />}
              ></Route>

              {/* <Route path='/' component={Products}></Route> */}
            </Switch>
          </Router>
        </Content>
        <Footer>
        <FooterComp/>

        </Footer> 

      </Layout>}
    </div>

  )
}

export default App
