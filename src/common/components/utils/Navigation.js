import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { updateLocale } from '../../actions/intlActions';
import { pushErrors } from '../../actions/errorActions';
import NavLink from './NavLink';
import Text from '../widgets/Text';

class Navigation extends Component {
  _setLanguage(lang) {
    let { store } = this.context;
    store
      .dispatch(updateLocale(lang))
      .then(() => {
        console.log('load locale (manually) ok');
      }, (err) => {
        store.dispatch(pushErrors(err));
      });
  }

  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Link className="navbar-brand" to="/">
            <Text id="nav.brand" />
          </Link>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavLink to="/blog">
              <Text id="nav.blog" />
            </NavLink>
            <NavLink to="/resume">
              <Text id="nav.resume" />
            </NavLink>
          </Nav>
          <Nav pullRight>
            <NavDropdown
              id="language-dropdown"
              title={<Text id="nav.language" />}
            >
              <MenuItem onClick={this._setLanguage.bind(this, 'en-us')}>
                English
              </MenuItem>
              <MenuItem onClick={this._setLanguage.bind(this, 'zh-tw')}>
                繁體中文
              </MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

Navigation.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

export default connect(({ cookies: { token, user } }) => ({
  isAuth: !!token,
  user: (user && JSON.parse(user)) || {},
}), null, null, {
  pure: false,
})(Navigation);
