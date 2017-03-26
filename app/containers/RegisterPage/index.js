/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { makeSelectRepos, makeSelectLoading, makeSelectError, makeSelectUser } from 'containers/App/selectors';
import H2 from 'components/H2';
import Img from 'components/Img';
import Button from 'components/Button';
import Input from './Input';
import CenteredSection from './CenteredSection';
import { loadRepos } from '../App/actions';

const UserImg = styled(Img)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 3px solid white;
`;

export class RegisterPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        <div>
          <CenteredSection>
            <H2>
              BSTREAM
            </H2>
            <p>
              Stream music and support artists you love.
            </p>
          </CenteredSection>
          {this.props.user &&
            <CenteredSection>
              <UserImg src={this.props.user.picture} />
              <p>
                Logged in as {this.props.user.name}
              </p>
            </CenteredSection>
          }
          <CenteredSection>
            <label>Your Wallet</label><br />
            <Input
                id="username"
                type="text"
                placeholder="1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                value={this.props.username}
                onChange={this.props.onChangeUsername}
              />
            <Link to="/discover">
              <Button>Register</Button>
            </Link>
          </CenteredSection>
        </div>
      </article>
    );
  }
}

RegisterPage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  user: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  onChangeUsername: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  user: makeSelectUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
