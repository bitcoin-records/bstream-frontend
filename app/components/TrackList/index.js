import React, { PropTypes } from 'react';

import Img from 'components/Img';
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
  height: 200px;
  padding: 5px;
  margin: 5px;
  vertical-align: middle;

`;

const AlbumImg = styled(Img)`
  max-height: 150px;
`;

function TrackList({ loading, error, tracks }) {
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
      {_.map(tracks, (track) => (<TrackItem key={track.id}>
        <AlbumImg src={_.get(track, 'album.images[0].url')} alt="react-boilerplate - Logo" /><br />
        {track.name}
      </TrackItem>))}
    </div>;
  }

  return null;
}

TrackList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  tracks: PropTypes.any,
};

export default TrackList;
