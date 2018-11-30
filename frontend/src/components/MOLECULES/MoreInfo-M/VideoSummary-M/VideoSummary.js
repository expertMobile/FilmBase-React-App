import React from 'react';

import Tagline from '../../../ATOMS/MoreInfo-A/Tagline-A/Tagline';
import Overview from '../../../ATOMS/MoreInfo-A/Overview-A/Overview';
import Time from '../../../ATOMS/MoreInfo-A/Time-A/Time';
import Website from '../../../ATOMS/MoreInfo-A/Website-A/Website';
import Genre from '../../../ATOMS/Shared-A/Genre-A/Genre';

import c from './VideoSummary.module.scss';

const videoSummary = (props) => {  
  const classNames = props.className ? 
    [c.VideoSummary, props.className].join(' ') : c.VideoSummary;
    
  const details = props.details;
  const genres = [];
  Object.entries(details.genres).forEach(([_, value]) => {
    genres.push(
      <Genre 
      key={value.id} 
      genre={value.name}
      context='moreInfo' />
    );
  });
    
  const overviewText = props.expanded ? 
    details.overview : details.overview.substring(0, 100) + '...';

  const times = props.videoTimes.map(time => {
    return (
      <div key={time.name} className={c.VideoSummary__DescItem}>
        <span className={c.VideoSummary__DescTitle}>{time.name}</span>
          <Time
            className={c.VideoSummary__DescText}
            timeType={time.type}
            time={time.time} />
      </div>
    );
  });

  let heading = null;
  if(props.type === 'movie') {
    heading = (
      <>
        <Website website={details.homepage} name={details.title} />
        <Tagline tagline={details.tagline} />
      </>
    );
  } else if(props.type === 'tv') {
    heading = (
        <Website website={details.homepage} name={details.name} />
    );
  }

  return ( 
    <div className={classNames}>
      {heading}
      <div className={c.VideoSummary__Genres}>{genres}</div>
      <dl className={c.VideoSummary__DescList}>{times}</dl>
      <Overview 
        className={c.VideoSummary__Overview}
        overview={overviewText}
        expanded={props.expanded}
        clicked={props.expandToggle} />
    </div>
  );
}
 
export default videoSummary;