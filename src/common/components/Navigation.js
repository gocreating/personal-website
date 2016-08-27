import React, { Component } from 'react';
import Navbar from './main/Navbar';
import Container from './main/Container';
import NavLink from './NavLink';
import MenuItem from './MenuItem';
import Text from './Text';
import { updateLocale } from '../actions/intlActions';

class Navigation extends Component {
  _setLanguage(lang) {
    this.context.store
      .dispatch(updateLocale(lang))
      .then(() => {
        console.log('load locale (manually) ok');
      }, (err) => {
        alert('load locale (manually) fail', err);
      });
  }

  render() {
    return (
      <Navbar staticTop className="navbar-custom">
        <Container>
          <div className="navbar-header page-scroll">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#navbar-collapse"
            >
              <span className="sr-only">Toggle navigation</span>
              Menu <i className="fa fa-bars"></i>
            </button>
            <a className="navbar-brand" href="/">Go Creating</a>
          </div>

          <Navbar.Body id="navbar-collapse">
            <Navbar.Nav>
              <NavLink to="/blog">
                部落格
              </NavLink>
              <NavLink to="/resume">
                履歷
              </NavLink>
            </Navbar.Nav>
            <Navbar.Nav right>
              <Navbar.Dropdown title={<Text id="nav.language" />}>
                <MenuItem
                  title="English"
                  onClick={this._setLanguage.bind(this, 'en-us')}
                />
                <MenuItem
                  title="繁體中文"
                  onClick={this._setLanguage.bind(this, 'zh-tw')}
                />
              </Navbar.Dropdown>
            </Navbar.Nav>
          </Navbar.Body>
        </Container>
      </Navbar>
    );
  }
};

Navigation.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

export default Navigation;
