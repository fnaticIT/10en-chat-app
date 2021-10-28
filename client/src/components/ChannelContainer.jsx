import React, { useState, useEffect } from "react";
import { Channel, MessageTeam } from "stream-chat-react";

import { ChannelInner, CreateChannel, EditChannel } from "./";
import { useChatContext } from "stream-chat-react";

import BackgroundAnimation from "./BackgroundAnimation";

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
  const { client, setActiveChannel } = useChatContext();
  const [state, setstate] = useState(false);
  useEffect(() => {
    //console.log(client.activeChannels);
    if (client.activeChannels) {
      //console.log("ok");
      setstate(true);
    } else {
      setstate(false);
    }
    //console.log(state);
  }, [client.activeChannels]);

  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">This is the beginning of your chat history.</p>
      <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p>
    </div>
  );
  

  const ff2 = async (user) => {
    await client.upsertUser({
      id: user,
      invisible: false,
    });
  };
  const handle = async () => {
    console.log(client);

    // console.log(client.activeChannels);
    const filter = { type: "messaging", members: { $in: [client.userID] } };
    const sort = [{ last_message_at: -1 }];
    const channels = await client.queryChannels(filter, sort, {
      watch: true, // this is the default
      state: true,
    });

    channels.map((channel) => {
      console.log(channel.data.name, channel.cid);
      handle2(channel);
    });
  };

  const f = async (channel) => {
    const d = await channel.queryMembers({});
    ff2(d.members[0].user_id);
    ff2(d.members[1].user_id);
  };
  const handle2 = async (channel) => {
    console.log(client);

    // console.log(client.activeChannels);
    const filter = { type: "messaging", members: { $in: [client.userID] } };
    const sort = [{ last_message_at: -1 }];
    const channels = await client.queryChannels(filter, sort, {
      watch: true, // this is the default
      state: true,
    });

    channels.map((channel) => {
      console.log(channel.data.name, channel.cid);

      f(channel);
    });
    const destroy = await channel.delete();
    
  };

  return (
    <div className="channel__container" style={{ backgroundColor: "black" }}>
      {state && (
        <div style={{ backgroundColor: "black" }}>
          <div style={{ color: "palevioletred", padding: "140px" }}>
            <h2 style={{ fontSize: "40px" }}>Please follow the guidlines</h2>
            <ul>
              <li style={{ padding: "10px", fontSize: "25px" }}>1) Refraim from using foul language</li>
              <li style={{ padding: "10px", fontSize: "25px" }}>2) Be Respectfull </li>
              <li style={{ padding: "10px", fontSize: "25px" }}>3) Try to be creative</li>
              <li style={{ padding: "10px", fontSize: "25px" }}>4) Respect privacy of others</li>
              <li style={{ padding: "10px", fontSize: "25px" }}>5) You have 10 minutes thats all !</li>
              {/*<li>6)</li>*/}
            </ul>
          </div>
          <div style={{ marginTop: "-1120px" }}>
            <BackgroundAnimation />
          </div>
        </div>
      )}
      <Channel EmptyStateIndicator={EmptyState} Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}>
        <ChannelInner setIsEditing={setIsEditing} />
        <button onClick={handle}>End chat</button>
      </Channel>
    </div>
  );
};

export default ChannelContainer;
