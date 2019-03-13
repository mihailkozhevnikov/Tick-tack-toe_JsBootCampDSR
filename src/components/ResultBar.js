import React from 'react';

function ResultBar(props){
  return (
    <footer className="resultBar">          
       <h1> {props.value}</h1>   
    </footer>
  )
}
export default ResultBar;