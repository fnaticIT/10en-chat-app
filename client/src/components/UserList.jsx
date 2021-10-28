import React, { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";

import { InviteIcon } from "../assets";

const ListContainer = ({ children }) => {
  return (
    <div className="user-list__container">
      <div className="user-list__header">
       
      </div>
      {children}
    </div>
  );
};

const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    console.log("clicked");
    if (selected) {
      setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id));
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
    }

    setSelected((prevSelected) => !prevSelected);
  };

  return (
    <div className="user-item__wrapper" onClick={handleSelect}>
      <div className="user-item__name-wrapper">
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className="user-item__name">{user.fullName || user.id}</p>
      </div>
      {selected ? <InviteIcon /> : <div className="user-item__invite-empty" />}
    </div>
  );
};

const UserList = ({ setSelectedUsers, type }) => {
  const [user, setUser] = useState("");
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [on, seton] = useState(0);

  const ff2 = async (user) => {
    await client.upsertUser({
      id: user,
      invisible: false,
    });
  };

  useEffect(() => {
    let array2 = [];
    users?.map((user, i) => {
      array2.push(user.online);
    });
    console.log(array2);
    let count = array2.filter(Boolean).length;

   seton(count);
//users?.map((user) => {
  //    ff2(user.id);
   // });
  });
  /*const ff = async ()=> {
  try {
    const response = await client.queryUsers({ id: { $autocomplete: user.id } });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
 }*/

  function handle() {
    let array = [];

    users?.map((user, i) => {
      if (user.online) {
        array.push(user);
        //    ff();
      }
    });
    seton(array.length);
    const v = Math.floor(Math.random() * array.length);
    setUser(array[v]);
  }

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;

      setLoading(true);

      try {
        const response = await client.queryUsers({ id: { $ne: client.userID } }, { id: 1 }, { limit: 8 });

        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    if (client) getUsers();
  }, []);

  if (error) {
    return (
      <ListContainer>
        <div className="user-list__message">Error loading, please refresh and try again.</div>
      </ListContainer>
    );
  }

  if (listEmpty) {
    return (
      <ListContainer>
        <div className="user-list__message">No users found.</div>
      </ListContainer>
    );
  }

  return (
    <div className="h1">
      {type !== "team" ? (
        <div className="h3">
        {on===0?<h1>No users online try later</h1>:
          <button className="h2" onClick={handle}>
            Find a Random Match
          </button>
        }
        </div>
      ) : (
        <div></div>
      )}
      <div className="create-channel__button-wrapper2"><p>Total online users : {on}</p></div>
      <ListContainer>{loading ? <div className="user-list__message">Loading users...</div> : user !== "" ? <UserItem key={user.id} user={user} setSelectedUsers={setSelectedUsers} /> : <div></div>}</ListContainer>
    </div>
  );
};

export default UserList;
//    users?.map((user, i) =>)
