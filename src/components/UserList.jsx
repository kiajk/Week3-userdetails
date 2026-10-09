import UserCard from "./UserCard";

function UserList ({ users, onSelectUser}) {
    
    return (
        <ul>
            {users.map((user) => (
                <UserCard key={user.id}
                 user={user} 
                 onSelectUser={onSelectUser}/>
            ))}
        </ul>
    ) ;
}
export default UserList;