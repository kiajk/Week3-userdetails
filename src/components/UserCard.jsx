function UserCard ({ user, onSelectUser }) {
    return(
        <li>
            <button onClick={() => onSelectUser(user)}>
            <strong>{user.name}</strong>
            <p>{user.email}</p>
            </button>
        </li>
    );
}
export default UserCard;