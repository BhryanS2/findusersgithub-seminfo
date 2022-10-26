import style from "../css/components/user.module.css";
import { Button } from "./button";

type UserProps = {
  name: string;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  login: string;
  handleRemoveUser: () => void;
};

export function UserComponent(user: UserProps) {
  return (
    <div className={style.user}>
      <img src={user.avatar_url} alt={user.name} className={style.user_image} />
      <a
        className={style.user_content}
        href={`https://github.com/${user.login}`}
        target="_blank"
        rel="noreferrer"
      >
        <strong className={style.user_content__name}>
          {user.name ?? "Usuário sem nome"}
        </strong>
        <p className={style.user_content__bio}>
          {user.bio ?? "Usuário sem bio"}
        </p>
        <div className={style.user_content__stats}>
          <span>
            Seguidores: <b>{user.followers}</b>
          </span>
          <span>
            Seguindo: <b>{user.following}</b>
          </span>
          <span>
            Repositórios: <b>{user.public_repos}</b>
          </span>
        </div>
      </a>
      <Button onClick={user.handleRemoveUser} isDanger>
        Remover
      </Button>
    </div>
  );
}
