/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import { FaMusic } from 'react-icons/lib/fa';

import { makeSelectRepos, makeSelectLoading, makeSelectError, makeSelectTracks } from 'containers/App/selectors';
import H2 from 'components/H2';
import Button from 'components/Button';
import TrackList from 'components/TrackList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos, loadTracks } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    const { loading, error, tracks } = this.props;
    const trackListProps = {
      loading,
      error,
      tracks: _.get(tracks, 'tracks.items'),
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
              BSTREAM <FaMusic />
            </H2>
            <p>
              Stream music and support artists you love.
            </p>
          </CenteredSection>
          <CenteredSection>
            <Link to="/register">
              <Button>Getting Started</Button>
            </Link>  
          </CenteredSection>
          <CenteredSection>
            {/* Mock sound player here */}
          </CenteredSection>
          <Section>
            <H2>
              Look for Songs
            </H2>
            <Form onSubmit={this.props.onSubmitForm}>
              <Input
                id="username"
                type="text"
                placeholder="Song title, artist, album..."
                value={this.props.username}
                onChange={this.props.onChangeSearchQuery}
              />
            </Form>
            <TrackList {...trackListProps} />
          </Section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  tracks: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeSearchQuery: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeSearchQuery: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadTracks());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  tracks: makeSelectTracks(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
