import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [frds, setFrds] = useState([...initialFriends]);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [selected, setSelected] = useState(null);
  const newFriend = {
    id: Math.trunc(Math.random() * 500000) + 1,
    name: name,
    image: img,
    balance: 0,
  };

  function addFriendToList() {
    setFrds((frds) => [...frds, newFriend]);
  }

  function handleAddFormOpening(e) {
    setIsOpen((isOpen) => !isOpen);
  }
  function handleSelection(friend) {
    setSelected(friend === selected ? null : friend);
    setIsOpen(false);
  }
  function handleSplit(value) {
    console.log(value);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          isOpen={isOpen}
          frds={frds}
          onSelection={handleSelection}
          selected={selected}
        />
        {isOpen && (
          <FormAddFriend
            name={name}
            img={img}
            setName={setName}
            setImg={setImg}
            addFriendToList={addFriendToList}
          />
        )}
        <Button value={isOpen} onClick={handleAddFormOpening}>
          {isOpen ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selected && (
        <FormSplitBill selected={selected} handleSplit={handleSplit} />
      )}{" "}
    </div>
  );
}

function FriendsList({ frds, onSelection, selected }) {
  return (
    <ul>
      {frds.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selected={selected}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selected }) {
  const isSelected = friend === selected;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 ? (
        <p style={{ color: "red" }}>{`You owe ${friend.name} ${Math.abs(
          friend.balance
        )}`}</p>
      ) : friend.balance === 0 ? (
        <p>{`You and ${friend.name} are even`}</p>
      ) : (
        <p style={{ color: "green" }}>{`${friend.name} owes you ${Math.abs(
          friend.balance
        )}`}</p>
      )}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ addFriendToList, name, img, setName, setImg }) {
  return (
    <form className="form-add-friend">
      <label>📛 Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🆔 Image URL</label>
      <input type="text" value={img} onChange={(e) => setImg(e.target.value)} />

      <Button onClick={addFriendToList}>Add</Button>
    </form>
  );
}

function FormSplitBill({ selected, handleSplit }) {
  const [bill, setBill] = useState(0);
  const [exp, setExp] = useState(0);
  const [whoPaying, setWhoPaying] = useState("user");
  const friendExp = bill - exp;
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !exp) return;
    handleSplit(whoPaying === "user" ? friendExp : -exp);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>{`Split a bill with ${selected.name}`}</h2>
      <label>Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />

      <label>Your expenses</label>
      <input
        type="text"
        value={exp}
        onChange={(e) => setExp(+e.target.value > bill ? exp : +e.target.value)}
      />

      <label>{`${selected.name}'s expenses`}</label>
      <input type="text" disabled value={friendExp} />

      <label>Who is paying</label>
      <select value={whoPaying} onChange={(e) => setWhoPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selected.name}</option>
      </select>

      <Button>Add</Button>
    </form>
  );
}

function Button({ children, value, onClick }) {
  return (
    <button className="button" value={value} onClick={onClick}>
      {children}
    </button>
  );
}

export default App;
