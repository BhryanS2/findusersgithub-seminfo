import { useState, useEffect } from "react";
import { Button } from "./components/button";
import { UserComponent } from "./components/user";
import "./css/global.css";
import style from "./css/home.module.css";

type User = {
  name: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  login: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([] as User[]);
  const [search, setSearch] = useState("");

  const handleAddUser = async (user: string) => {
    const response = await fetch(`https://api.github.com/users/${user}`);
    const data = await response.json();
    const newUser = {
      name: data.name,
      avatar_url: data.avatar_url,
      bio: data.bio,
      followers: data.followers,
      following: data.following,
      public_repos: data.public_repos,
      login: data.login,
    };
    console.log(newUser);
    setUsers([...users, newUser]);
  };

  const handleRemoveUser = (user: User) => {
    const filteredUsers = users.filter((u) => u !== user);
    setUsers(filteredUsers);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddUser(search);
    setSearch("");
  };

  useEffect(() => {
    const users = localStorage.getItem("users");
    if (users) {
      setUsers(JSON.parse(users));
    }
  }, []);

  useEffect(() => {
    if (users.length) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.form_group}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={style.form_group__input}
            required
          />
          <label htmlFor="name" className={style.form_group__label}>
            Entre com um nickname do github
          </label>
        </div>
        <Button>Adicionar</Button>
      </form>
      <ul className={style.users}>
        {users.map((user, index) => (
          <li key={index}>
            <UserComponent
              {...user}
              handleRemoveUser={() => handleRemoveUser(user)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
