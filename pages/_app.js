/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import App, {Container} from 'next/app'
import Head from 'next/head'
import React, {Component} from 'react'
// import { Provider } from 'react-redux'
import { register, unregister } from 'next-offline/runtime';

class AppWrapper extends App{
  componentDidMount(){
    //initialized firebase configs
    // addToHomescreen();
    register('/service-worker.js');

  }

  componentWillUnmount(){
    unregister();
  }

  render(){
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Head>
          <title>Suzuki Prototype</title>
        </Head>
        {/* <Provider store={store}> */}
          <Component {...pageProps}/>
        {/* </Provider> */}
      </Container>
    )
  }
}

export default AppWrapper;

