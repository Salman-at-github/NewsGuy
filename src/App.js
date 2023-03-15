import './App.css';
import React, { Component } from 'react';
import Navbar from './components/navbar';
import Newsbox from './components/Newsbox';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';



export default class App extends Component {
  pageSize = 18;
  state = {
    progress: 0
  };
  api = process.env.REACT_APP_NEWS_API;


  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={2}
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route path='/' element={<Newsbox api={this.api} setProgress={this.setProgress} key='general' pageSize={this.pageSize} country='in' category='general' />}></Route>
            <Route path='/business' element={<Newsbox api={this.api} setProgress={this.setProgress} key='business' pageSize={this.pageSize} country='in' category='business' />}></Route>
            <Route path='/entertainment' element={<Newsbox api={this.api} setProgress={this.setProgress} key='entertainment' pageSize={this.pageSize} country='in' category='entertainment' />}></Route>
            <Route path='/health' element={<Newsbox api={this.api} setProgress={this.setProgress} key='health' pageSize={this.pageSize} country='in' category='health' />}></Route>
            <Route path='/science' element={<Newsbox api={this.api} setProgress={this.setProgress} key='science' pageSize={this.pageSize} country='in' category='science' />}></Route>
            <Route path='/sports' element={<Newsbox api={this.api} setProgress={this.setProgress} key='sports' pageSize={this.pageSize} country='in' category='sports' />}></Route>
            <Route path='/technology' element={<Newsbox api={this.api} setProgress={this.setProgress} key='technology' pageSize={this.pageSize} country='in' category='technology' />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

