import React from 'react'
import { render } from 'react-dom'
import Button from 'react-bootstrap/lib/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Hamburger from './hamburger'

class Menu extends React.Component {
  
  loadGoalsView() {
    window.location.href = window.location.origin + '/goals';
  }

  loadDepartmentsView() {
    window.location.href = window.location.origin + '/departments';
  }

  render() {
    return (
      <div className="top-container">
        <h1>ABQ Open Budget</h1>
        <Hamburger/>
        <ButtonGroup>
          <Button className="budget-type" onClick={this.loadGoalsView}>Goals</Button>
          <Button className="budget-type" onClick={this.loadDepartmentsView}>Departments</Button>
          <Button className="search"><i className="fa fa-search"></i></Button>
        </ButtonGroup>
      </div>
    )
  }
}

module.exports = Menu;