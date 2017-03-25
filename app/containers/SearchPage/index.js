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
import styled from 'styled-components';
import _ from 'lodash';

import { makeSelectRepos, makeSelectLoading, makeSelectError, makeSelectTracks } from 'containers/App/selectors';
import H1 from 'components/H1';
import H2 from 'components/H2';
import Button from 'components/Button';
import TrackList from 'components/TrackList';
// import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
// import Section from './Section';
import { loadTracks } from '../App/actions';
import { changeSearchString } from './actions';
import { makeSelectSearchString } from './selectors';

const WhiteButton = styled(Button)`
  color: white;
  border-color: white;
`;


export class SearchPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.searchString && this.props.searchString.trim().length > 0) {
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
          <div>
            <div>
              <H2>
                Look for Songs
              </H2>
              <Form onSubmit={this.props.onSubmitForm}>
                <Input
                  id="searchString"
                  type="text"
                  placeholder="Song title, artist, album..."
                  value={this.props.searchString}
                  onChange={this.props.onChangeSearchQuery}
                />
              </Form>
            </div>
            <TrackList {...trackListProps} onTrackSelected={(track) => { this.props.onTrackSelected(track); }} />
          </div>
        </div>
      </article>
    );
  }
}

SearchPage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  tracks: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  searchString: React.PropTypes.string,
  onChangeSearchQuery: React.PropTypes.func,
  onTrackSelected: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeSearchQuery: (evt) => dispatch(changeSearchString(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadTracks());
    },
    onTrackSelected: (track) => {
      //TODO change
      //dispatch(selectTrack(track));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  tracks: makeSelectTracks(),
  searchString: makeSelectSearchString(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
