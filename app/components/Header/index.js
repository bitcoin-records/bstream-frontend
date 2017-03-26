import React from 'react';
import { FormattedMessage } from 'react-intl';

import Avatar from 'react-avatar';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';
import styled from 'styled-components';
import Img from 'components/Img';

const UserImg = styled(Img)`
  width: 25px;
  height: 25px;
  border-radius: 10px;
`;

const UserIdentity = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  text-align: left;
`;

const UsernameLabel = styled.div`
  font-size: 16px;
  line-height: 18px;
`;


const UserCreditLabel = styled.div`
  font-size: 12px;
  line-height: 12px;
`;


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
          <HeaderLink to="/discover">
            DISCOVER
          </HeaderLink>
          <HeaderLink to="/history">
            MY HISTORY
          </HeaderLink>
          {this.props.user &&
            <HeaderLink to="/userName">
              <UserImg src={_.get(this.props.user, 'picture')} />
              <UserIdentity>
                <UsernameLabel>{_.get(this.props.user, 'name')}</UsernameLabel><UserCreditLabel>CREDIT: 0.002 BTC</UserCreditLabel>
              </UserIdentity>
            </HeaderLink>
          }  
          {!this.props.user &&
            <HeaderLink onClick={() => (this.props.onLoginClicked())}>
              LOGIN
            </HeaderLink>
          }
        </NavBar>
      </div>
    );
  }
}

Header.propTypes = {
  user: React.PropTypes.optionalObject,
  onLoginClicked: React.PropTypes.func,
};


export default Header;
