import React from 'react';
import { FormattedMessage } from 'react-intl';

import Avatar from 'react-avatar';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';
import styled from 'styled-components';
import Img from 'components/Img';
import logoImg from './logo.png';

const UserImg = styled(Img)`
  width: 25px;
  height: 25px;
  border-radius: 10px;
`;

const LogoImg = styled(Img)`
  height: 30px;
  width: auto;
`;

const LogoHeaderLink = styled(HeaderLink)`
  margin-top: 15px;
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
    const balance = parseFloat(_.get(this.props.user, 'balance') || 0).toFixed(2);
    return (
      <div>
        {/*
        <A href="https://twitter.com/mxstbr">
          <Img src={Banner} alt="react-boilerplate - Logo" />
        </A>
        */}
        <NavBar>
          <LogoHeaderLink to="/">
            <LogoImg src={logoImg} />
          </LogoHeaderLink>
          <HeaderLink to="/discover">
            DISCOVER
          </HeaderLink>
          {this.props.user &&
            <HeaderLink to="/history">
              MY HISTORY
            </HeaderLink>
          }
          {this.props.user &&
            <HeaderLink to = '/playlist'>
              PLAY LIST
            </HeaderLink>
          }
          {this.props.user &&
            <HeaderLink to="/userName">
              <UserImg src={_.get(this.props.user, 'picture')} />
              <UserIdentity>
                <UsernameLabel>{_.get(this.props.user, 'name')}</UsernameLabel><UserCreditLabel>BALANCE: {balance}</UserCreditLabel>
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
  onLoginClickd: React.PropTypes.func,
};


export default Header;
