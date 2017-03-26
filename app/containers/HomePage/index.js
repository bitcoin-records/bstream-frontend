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
import styled from 'styled-components';

import { makeSelectRepos, makeSelectLoading, makeSelectError, makeSelectTracks } from 'containers/App/selectors';
import H1 from 'components/H1';
import H2 from 'components/H2';
import Button from 'components/Button';
import TrackList from 'components/TrackList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos, loadTracks, selectTrack, socialLoginRequest } from '../App/actions';
import { changeSearchString } from './actions';
import { makeSelectUsername } from './selectors';
import splashImg from './splash.jpg';


const BannerSection = styled(CenteredSection)`
  background-size: cover;
  color: white;
  min-height: 80vh;
  margin-top: -100px;
`;

const BannerOverlay = styled(CenteredSection)`
  background-color: rgba(50,50,50,0.8);
  padding: 60px 60px;
  min-height: 80vh;
`;

const WhiteButton = styled(Button)`
  color: white;
  border-color: white;
`;


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  onLoginButtonClicked() {
    this.props.loginFacebook();
  }

  render() {

    const { loading, error, tracks } = this.props;
    const trackListProps = {
      loading,
      error,
      tracks: _.get(tracks, 'tracks.items'),
    };
    const bannerStyle = {
      backgroundImage: 'url(' + splashImg + ')',
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
          <BannerSection style={bannerStyle}>
            <BannerOverlay>
              <H1>
                BSTREAM <FaMusic />
              </H1>
              <p>
                Stream music and support artists you love.
              </p>
              {/*
              <Link to="/register">
              </Link>
              */} 
              <WhiteButton onClick={() => (this.onLoginButtonClicked())}>Getting Started</WhiteButton>
            </BannerOverlay>
          </BannerSection>
          <Section>
            <CenteredSection>
              <H2>
                Look for Songs
              </H2>
              <Form onSubmit={this.props.onSubmitForm}>
                <Input
                  id="username"
                  type="text"
                  placeholder="Song title, artist, album..."
                  value={this.props.searchString}
                  onChange={this.props.onChangeSearchQuery}
                />
              </Form>
            </CenteredSection>
            <TrackList {...trackListProps} onTrackSelected={(track) => { this.props.onTrackSelected(track); }} />
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
  onTrackSelected: React.PropTypes.func,
  loginFacebook: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeSearchQuery: (evt) => dispatch(changeSearchString(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadTracks());
    },
    onTrackSelected: (track) => {
      dispatch(selectTrack(track));
    },
    loginFacebook: () => dispatch(socialLoginRequest('facebook')),
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
