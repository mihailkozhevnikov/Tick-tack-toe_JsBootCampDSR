import React from 'react';
function Square(props) {
  return (
    <button className="square" style= {{color: props.mark ? 'red' : ''}}  onClick={props.onClick} >
      {props.value}
    </button>
  );
}

  export default Square;