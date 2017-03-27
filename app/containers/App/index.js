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
import Img from 'components/Img';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';
import _ from 'lodash';
import ReactAudioPlayer from 'react-audio-player'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectSelectedTrack, makeSelectUser, makeSelectBStreamUser, makeSelectUserBalance, makeSelectIsTrackPlaying } from './selectors';
import { socialLoginPrepare, socialLoginRequest, socialLoginSuccess, socialLoginFailure, socialLogout, startTrack, stopTrack } from './actions';
import AnimatedCoin from './AnimatedCoin';
import coinImg from './coin.png';

const facebookAppId = '394516554261290';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const AudioPlayerBar = styled.div`
  border-top: 1px solid #ccc;
  position: relative;
  padding: 10px 20px;
  text-align: center;
`;

const AudioPlayerBarInner = styled.div`
  max-width: 960px;
`;

const TrackInfo = styled.div`
  display: inline-block;
  margin-left: 30px;
`;

const TrackLabel = styled.div`
  margin-left: 10px;
  display: inline-block;
  vertical-align: middle;
`;

const AlbumPreviewImg = styled(Img)`
  display: inline-block;
  vertical-align: middle;
  width: 25px;
  height: 25px;
`;


const CoinImg = styled(Img)`
  width: 30px;
  height: 30px;
`;

export class App extends React.PureComponent {
  
  componentDidMount() {
    this.props.prepareFacebook()
  }

  onTrackPlay() {
    console.log('onTrackPlay');
    this.props.startTrack(this.props.selectedTrack);
  }

  onTrackPause() {
    console.log('onTrackPause');
    this.props.stopTrack();
  }

  onTrackEnded() {
    console.log('onTrackEnded');
    this.props.stopTrack();
  }

  onTrackAbort() {
    console.log('onTrackAborted');
    this.props.stopTrack();
  }


  render() {
    const props = this.props;
    const user = { ...this.props.user, balance: this.props.userBalance };
    const coinAnimationStyle = {

    };
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application' },
          ]}
        />
        <Header user={user} onLoginClicked={() => { this.props.loginFacebook() }}/>
        {props.selectedTrack &&
          <AudioPlayerBar>
            <AudioPlayerBarInner>
              <ReactAudioPlayer 
                id="musicPlayer"
                src={_.get(props.selectedTrack, 'preview_url')}
                autoPlay
                onPlay={() => (this.onTrackPlay())}
                onPause={() => (this.onTrackPause())}
                onEnded={() => (this.onTrackEnded())}
                onAbort={() => (this.onTrackAbort())}
              /> <TrackInfo>
                <AlbumPreviewImg src={_.get(props.selectedTrack, 'album.images[0].url')} />
                <TrackLabel>{_.get(props.selectedTrack, 'name')} - {_.get(props.selectedTrack, 'artists[0].name')}</TrackLabel>
              </TrackInfo>
            </AudioPlayerBarInner>
          </AudioPlayerBar>
        }
        {React.Children.toArray(props.children)}
        {this.props.isTrackPlaying &&
          <div>
            <AnimatedCoin style={{ animationDelay: '0.1s' }}>
              <CoinImg src={coinImg} />
            </AnimatedCoin>
            <AnimatedCoin style={{ animationDelay: '0.3s' }}>
              <CoinImg src={coinImg} />
            </AnimatedCoin>
            <AnimatedCoin style={{ animationDelay: '0.5s' }}>
              <CoinImg src={coinImg} />
            </AnimatedCoin>
          </div>
        }
        <Footer />
      </AppWrapper>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  selectedTrack: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selectedTrack: makeSelectSelectedTrack(),
  user: makeSelectUser(),
  bStreamUser: makeSelectBStreamUser(),
  userBalance: makeSelectUserBalance(),
  isTrackPlaying: makeSelectIsTrackPlaying(),
});

const mapDispatchToProps = (dispatch) => ({
  prepareFacebook: () => dispatch(socialLoginPrepare('facebook', { appId: facebookAppId })),
  loginFacebook: () => dispatch(socialLoginRequest('facebook')),
  logout: () => dispatch(socialLogout()),
  startTrack: (track) => dispatch(startTrack(track)),
  stopTrack: () => dispatch(stopTrack()),
})

// export default withProgressBar(App);

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(withProgressBar(App));

