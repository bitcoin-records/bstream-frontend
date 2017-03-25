import React, { PropTypes } from 'react';

import Img from 'components/Img';
import H3 from 'components/H3';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import styled from 'styled-components';
import _ from 'lodash';

const TrackItem = styled.div`
  background: white;
  display: inline-block;
  justify-content: space-between;
  width: 150px;
  margin: 5px;
  height: 300px;
  vertical-align: middle;
  box-shadow: 0px 2px 1px #888888;
`;

const AlbumImg = styled(Img)`
  max-height: 150px;
  margin: 0;
`;

const SongInfo = styled.div`
  padding: 10px;
`;

const SongTitleLabel = styled.span`
  font-size: 14px;
`;

const ArtistLabel = styled.span`
  color: #cccccc;
  font-size: 12px;
`;



function TrackList({ loading, error, tracks, onTrackSelected }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (tracks !== false) {
    return <div>
      {_.map(tracks, (track) => (
        <TrackItem key={track.id} onClick={(e) => { onTrackSelected(track); }}>
          <AlbumImg src={_.get(track, 'album.images[0].url')} alt="react-boilerplate - Logo" /><br />
          <SongInfo>
            <SongTitleLabel>{track.name}</SongTitleLabel><br />
            <ArtistLabel>{_.get(track, 'artists.[0].name')}</ArtistLabel>
          </SongInfo>
        </TrackItem>
      ))}
    </div>;
  }

  return null;
}

TrackList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  tracks: PropTypes.any,
  onTrackSelected: PropTypes.func,
};

export default TrackList;
