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

import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import Button from 'components/Button';
import Input from './Input';
import CenteredSection from './CenteredSection';
import { loadRepos } from '../App/actions';

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
          <CenteredSection>
            <label>Your Wallet</label><br />
            <Input
                id="username"
                type="text"
                placeholder="1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                value={this.props.username}
                onChange={this.props.onChangeUsername}
              />
            <Button>Register</Button>
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
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
