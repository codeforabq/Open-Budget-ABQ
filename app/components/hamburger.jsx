import { Link } from 'react-router'

class Hamburger extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false
    }
  }

  setFilter(filter) {
    this.setState({active: filter})
  }

  isActive() {
    return 'menu-items ' + (this.state.active ? 'active' : '');
  }

  isVisible(state) {
    var state = typeof state != 'undefined' ? true : false;
    return this.state.active == state ? { display: 'none' } : {};
  }

  render() {
    var currentURL = window.location.href,
        barChartsURL = currentURL[currentURL.length-1] == '/' ? currentURL + 'bar-charts' : currentURL + '/bar-charts';
    return (
      <div className="Hamburger-menu-wrapper">
        <div className='hamburger-menu' onClick={this.setFilter.bind(this, !this.state.active)}>
          <i className="fa fa-bars" style={this.isVisible(true)}></i>
          <i className="fa fa-times" style={this.isVisible()}></i>
        </div>
        <ul className={this.isActive()}>
          <li><Link to={currentURL}>Pie charts</Link></li>
          <li><Link to={barChartsURL}>Bar charts</Link></li>
        </ul>
      </div>
    );
  }
}

module.exports = Hamburger;