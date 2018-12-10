import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import SidePanel from '../../components/ORGANISMS/Profile-O/SidePanel-O/SidePanel';
import Subtitle from '../../components/ATOMS/Shared-A/Subtitle-A/Subtitle';
import CarouselSecondary from '../../components/ATOMS/UI-A/CarouselSecondary-A/CarouselSecondary';
import Thumbnail from '../../components/MOLECULES/FilmList-M/Thumbnail-M/Thumbnail';

import c from './Profile.module.scss';
import * as actions from '../../store/actions/ProfileActions';
import * as actionsLogin from '../../store/actions/LoginActions';
import * as actionsMovie from '../../store/actions/MoviesActions';
import * as actionsTV from '../../store/actions/TVActions';
import * as u from '../../shared/Utility';

class Profile extends Component { 
  state = {
    guest: {
      categories: {
        rated: {
          movies: 'Rated Movies',
          tv: 'Rated TV Shows'
        }
      },
      type: {
        rated: {
          movies: 'ratedMovies',
          tv: 'ratedTV',
        }
      }
    },
    login: {
      categories: {
        favorite: {
          movies: 'Favorite Movies',
          tv: 'Favorite TV Shows'
        },
        rated: {
          movies: 'Rated Movies',
          tv: 'Rated TV Shows'
        }
      },
      type: {
        favorite: {
          movies: 'favoriteMovies',
          tv: 'favoriteTV'
        },
        rated: {
          movies: 'ratedMovies',
          tv: 'ratedTV',
        }
      }
    }
  }
  
  componentDidMount() {
    if(JSON.parse(localStorage.getItem('session'))) {
      this.props.onGetProfileInit();
    } else {
      this.props.history.replace('/login');
      this.props.onClearProfileData();
    }
  }
  
  getFilmDetailsHandler = (videoId, videoType) => {
    if(videoType === 'tv') {      
      this.props.onGetTVDetails(videoId); 
    } else if(videoType === 'movie') {
      this.props.onGetMovieDetails(videoId); 
    }
  }

  render() { 
    let sidePanel = null;
    let filmList  = [];
    const { authType, loadingInit } = this.props;
    const settings = {
      slidesToShow: 5,
      slidesToScroll: 1
    }

    if(!loadingInit && authType) {
      let userName  = null;
      let name      = null;
      let data      = null;
      const userState = this.state[authType];
      const { rated, favorite, profile } = this.props;
      
      if(authType === 'guest') {
        userName  = 'Guest';
        data      = { rated };
      } else if(authType === 'login') {
        name      = profile.name;
        userName  = profile.userName;
        data      = { favorite, rated };
      }

      if(u.isObjNotEmpty(data)) {
        let typePathBase = '/profile/';
        Object.entries(data).forEach(([key, value]) => {
          Object.entries(value).forEach(([filmType, list]) => {
            let pathBase = filmType === 'movies' ? '/profile/movie/' : '/profile/tv/';
            const newList = list.map(film => {
              return (
                <Thumbnail
                  key={film.id} 
                  videoId={film.id}
                  image={film.poster_path}
                  title={film.title || film.name}
                  rating={film.vote_average}
                  showVideo={this.getFilmDetailsHandler}
                  pathBase={pathBase}
                  typePathBase={typePathBase} />
              );
            });
            
            if(u.isArrayGT(newList, 0)) {
              filmList.push(
                <div 
                  key={userState.type[key][filmType]} 
                  className={c.Profile__Carousel}>
                  <Subtitle 
                    context='moreInfo' 
                    subtitle={userState.categories[key][filmType]} />
                  <CarouselSecondary {...settings} list={newList} />
                </div>);
            } else {
              filmList.push(
                <div 
                  key={userState.type[key][filmType]} 
                  className={c.Profile__Carousel}>
                  <Subtitle 
                    context='moreInfo' 
                    subtitle={userState.categories[key][filmType]} />
                  <p className={c.Profile__NotAvailable}>No {userState.categories[key][filmType]} Found</p>
                </div>
              );
            }
          })
        });
      }

      sidePanel = (
        <SidePanel
          isGuest={authType === 'guest'}
          userName={userName}
          name={name}
          logout={this.props.onLogout} />
      );
    }

    return ( 
      <div className={c.Profile}>
        <div className={c.Profile__SidePanel}>
          {sidePanel}
        </div>
        <section className={c.Profile__Lists}>
          {filmList}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile.profile,
    favorite: state.profile.favorite,
    rated: state.profile.rated,
    authType: state.profile.authType,
    loadingInit: state.profile.loadingInit
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetProfileInit: () => dispatch(actions.getProfileInit()),
    onClearProfileData: () => dispatch(actions.clearProfileData()),
    onLogout: () => dispatch(actionsLogin.logout()),
    onGetTVDetails: (videoId) => dispatch(actionsTV.getTVDetails(videoId)),
    onGetMovieDetails: (videoId) => dispatch(actionsMovie.getMovieDetails(videoId))
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Profile);