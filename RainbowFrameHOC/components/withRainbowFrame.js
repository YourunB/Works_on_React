import React from 'react';

function withRainbowFrame(colors) {

  return function(Comp) {

    class NewComp extends React.Component {
      render() {

        let frames = <Comp {...this.props} />;
        colors.forEach(color => frames = <div className='frame' style={{borderColor:color}}>{frames}</div>);
    
        return (
          <div>
            {frames}
          </div>
        );
      }
    }
    return NewComp;
  }
  
}

export { withRainbowFrame };