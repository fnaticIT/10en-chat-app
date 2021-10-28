import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";

const TeamChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => {
    <p className="channel-preview__item"># {channel?.data?.name || channel?.data?.id}</p>;
  };

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);

    console.log(members[0]);

    return (
      <div>
        <div className="channel-preview__item single">
          <Avatar image={members[0]?.user?.image} name={members[0]?.user?.fullName || members[0]?.user?.id} size={24} />
          <div>
            <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
          </div>
        </div>
        <div style={{alignItems:"center",padding:"20px",justifyContent:"center"}}>
          <p>Your chat is ready</p><p>Click here and Scroll down </p>

          <div style={{marginLeft:"40px",marginTop:"30px"}} className="triangle-down"></div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={channel?.id === activeChannel?.id ? "channel-preview__wrapper__selected" : "channel-preview__wrapper"}
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default TeamChannelPreview;
