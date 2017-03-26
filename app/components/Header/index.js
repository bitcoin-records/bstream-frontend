import React from 'react';
import { FormattedMessage } from 'react-intl';

import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        {/*
        <A href="https://twitter.com/mxstbr">
          <Img src={Banner} alt="react-boilerplate - Logo" />
        </A>
        */}
        <NavBar>
          <HeaderLink to="/">
            HOME
          </HeaderLink>
          <HeaderLink to="/features">
            DISCOVER
          </HeaderLink>
          <HeaderLink to="/history">
            MY HISTORY
          </HeaderLink>
          <HeaderLink to="/features">
            CREDIT: 0.002 BTC
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}

export default Header;
