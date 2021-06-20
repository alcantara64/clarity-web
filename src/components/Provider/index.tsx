import * as React from 'react';
import './index.less';

const Provider = ({ name, isConnected, onClick = () => {}, onDisconnect = () =>{} }: any) => {
  return (
    <div id="app-provider" >
      <span className="provider-name">{name}</span>

      {!isConnected ? (
        <div className="status-container" onClick={onClick}>
          Connect 
        </div>
      ) : (
        <div className="status-container disconnect" onClick={onDisconnect}>Disconnect </div>
      )}
    </div>
  );
};

export default Provider;
