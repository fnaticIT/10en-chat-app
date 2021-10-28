import React from "react";

import { AddChannel } from "../assets";

const TeamChannelList = ({ setToggleContainer, children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing }) => {
  if (error) {
    return type === "team" ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">Connection error, please wait a moment and try again.</p>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className="team-channel-list">
        <p className="team-channel-list__message loading">{type === "team" ? "Channels" : "Messages"} loading...</p>
      </div>
    );
  }

  return (
    <div className="team-channel-list"   style={{marginTop:"20px"}}>
      <div className="team-channel-list__header channel-preview__wrapper"   style={{padding:"30px",backgroundColor:"black"}}>
        <p
          className="team-channel-list__header__title  channel-preview__item2 "
          onClick={() => {
            setCreateType(type);
            setIsCreating((prevState) => !prevState);
            setIsEditing(false);
            if (setToggleContainer) setToggleContainer((prevState) => !prevState);
          }}
        
        >
          {type === "team" ? "Channels" : "Find me a match"}
        </p>
        <AddChannel isCreating={isCreating} setIsCreating={setIsCreating} setCreateType={setCreateType} setIsEditing={setIsEditing} type={type === "team" ? "team" : "messaging"} setToggleContainer={setToggleContainer} />
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;
