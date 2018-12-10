import React from 'react';
import c from './ClickImage.module.scss';

const image = (props) => {  
  let classNames = [c.ClickImage];
  if(props.className) {
    classNames.push(props.className);
  }

  if(props.context === 'arrowRound') {
    classNames.push(c.ClickImage__ArrowRound);
  }

  let args = props.category;
  let func = () => props.clicked();
  if(props.clicked) {
    if(props.clickParam) {
      func = () => props.clicked(props.clickParam, args);
    }
  } else if(props.onClick) {
    func = props.onClick;
  }
  
  return <img 
    className={classNames.join(' ')} 
    src={props.imgSrc} 
    alt={props.imgAlt}
    onClick={func} />;
}
 
export default image;