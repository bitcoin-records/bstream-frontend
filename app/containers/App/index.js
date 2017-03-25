/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Header from 'components/Header';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';
import _ from 'lodash';
import ReactAudioPlayer from 'react-audio-player'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectSelectedTrack } from 'containers/HomePage/selectors';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;



export function App(props) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
        meta={[
          { name: 'description', content: 'A React.js Boilerplate application' },
        ]}
      />
      <Header />
      <ReactAudioPlayer id = "musicPlayer"
        src="my_audio_file.ogg"
        autoPlay
      />
      {React.Children.toArray(props.children)}
      <span>
        Selected Track: {_.get(props.selectedTrack, 'name')}
      </span>

      <Footer />
      
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
  selectedTrack: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selectedTrack: makeSelectSelectedTrack(),
});

// export default withProgressBar(App);

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(withProgressBar(App));

