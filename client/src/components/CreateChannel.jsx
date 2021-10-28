import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";

import { UserList } from "./";
import { CloseCreateChannel } from "../assets";
import TeamChannelList from "./TeamChannelList";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const handleChange = (event) => {
    event.preventDefault();

    setChannelName(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input value={channelName} onChange={handleChange} placeholder="channel-name" />
      <p>Add Members</p>
    </div>
  );
};

const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID]);
  const [channelName, setChannelName] = useState("");

  const ff = async (user) => {
    await client.upsertUser({
      id: user,
      invisible: true,
    });
  };
  const ff2 = async (user) => {
    await client.upsertUser({
      id: user,
      invisible: false,
    });
  };
  const f = async ({ y, newChannel }) => {
    await newChannel.delete();
    y.map((user) => {
      ff2(user);
    });
    window.location.reload();
  };

  const createChannel = async (e) => {
    e.preventDefault();

    try {
      console.log(selectedUsers)
      const newChannel = client.channel('messaging' ,{
        members: selectedUsers,
      });

      await newChannel.watch();

      setChannelName("");
      setIsCreating(false);

      const y = selectedUsers;

      selectedUsers.map((user) => {
        ff(user);
      });

      setSelectedUsers([client.userID]);
     setActiveChannel(newChannel);

      setTimeout(function () {
        f({ y, newChannel });
      }, 100000);


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>{createType === "team" ? "Create a New Channel" : "Sssh ! Its all secret ......"}</p>

        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === "team" && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}

      <UserList setSelectedUsers={setSelectedUsers} type={createType} />
      <div className="create-channel__button-wrapper" onClick={createChannel}>
        <p>{createType === "team" ? "Create Channel" : "Create Room"}</p>
      </div>
    </div>
  );
};

export default CreateChannel;
