import React, { Component } from 'react';

import Header from '../../components/organisms/MoreInfo/Header/Header';
import Money from '../../components/organisms/MoreInfo/Money/Money';
import Staff from '../../components/organisms/MoreInfo/Staff/Staff';
import Reviews from '../../components/organisms/MoreInfo/Reviews/Reviews';
import c from './MoreInfo.module.scss';

class MoreInfo extends Component {
  state = { 
    activeVideoId: this.props.videoDetails.videos[0].key,
    overviewExpanded: false,
    sideDrawerExpanded: true,
    youtubeState: null
  }  

  videoClickedHandler = (newVideoId) => {
    this.setState({ activeVideoId: newVideoId });
  };

  overviewToggleHandler = () => {
    this.setState(prevState => ({overviewExpanded: !prevState.overviewExpanded}));
  };
  
  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({sideDrawerExpanded: !prevState.sideDrawerExpanded}));
  };

  youtubeStateChangeHandler = (playerState) => {
    this.setState({ youtubeState: playerState });
  }

  render() { 
    console.log(this.props.videoDetails);  
    return ( 
      <div className={c.MoreInfo}>
        <Header 
          videoDetails={this.props.videoDetails}
          activeVideoId={this.state.activeVideoId}
          overviewExpanded={this.state.overviewExpanded}
          sideDrawerExpanded={this.state.sideDrawerExpanded}
          playerState={this.state.youtubeState}
          overviewToggle={this.overviewToggleHandler}
          sideDrawerToggle={this.sideDrawerToggleHandler}
          videoClicked={this.videoClickedHandler}
          youtubeStateChanged={this.youtubeStateChangeHandler} />
        <Money
          budget={this.props.videoDetails.budget}
          revenue={this.props.videoDetails.revenue} />
        <Staff
          staffList={this.props.videoDetails.cast}
          staffType='Cast' />
        <Staff
          staffList={this.props.videoDetails.crew}
          staffType='Crew' />
        <Reviews reviewList={this.props.videoDetails.reviews} />
      </div>
    );
  }
}
 
export default MoreInfo;