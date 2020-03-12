import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login/Login'
import Water from './components/Water/Water'
import WaterDetail from './components/Water/WaterDetail'
import Repair from './components/Repair/Repair'
import RepairDetail from './components/Repair/RepairDetail'
import JJ from './components/JJ/JJ'
import JZ from './components/JZ/JZ'
import JZlist from './components/JZ/JZlist'
import JZdetail from './components/JZ/JZdetail'
import Index from './components/Index/Index'
import Register from './components/Register/Register'
import Repass from './components/Repass/Repass'
import User from './components/User/User'
import './App.css'
export default class item extends Component {
  endY = 0;
  start(e) {
    this.endY = 0;
  }
  move(e) {
    e.preventDefault()
    this.endY = e.touches[0].clientY;
  }
  end(e) {
    var target = e.target
    if (target.parentNode.className == 'banner') {
      return
    }
    if (this.endY !== 0) {
      e.stopPropagation();
    }
  }

  render() {

    return (
      <div onTouchStartCapture={(e) => this.start(e)}
        onTouchMoveCapture={(e) => this.move(e)}
        onTouchEndCapture={(e) => this.end(e)}>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/water" component={Water}></Route>
          <Route path="/waterdetail/:id" component={WaterDetail}></Route>
          <Route path="/repair" component={Repair}></Route>
          <Route path="/repairdetail/:id" component={RepairDetail}></Route>
          <Route path="/jz" component={JZ}></Route>
          <Route path="/jzlist/:type" component={JZlist}></Route>
          <Route path="/jzdetail/:id" component={JZdetail}></Route>
          <Route path="/jj" component={JJ}></Route>
          <Route path="/index" component={Index}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/repass" component={Repass}></Route>
          <Route path="/user" component={User}></Route>
          <Redirect to="/login"></Redirect>
        </Switch>
      </ div>
    )
  }
}