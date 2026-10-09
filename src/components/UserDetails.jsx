function UserDetails ({user}) {
    if(!user) {
       return <p>No User Selected</p>
    }
    return (
        <div>
            <h2>{user.name}</h2>
            <p>email: {user.email}</p>
            <p>phone: {user.phone}</p>
            <p>company: {user.company.name}</p>
        </div>
    );
}
export default UserDetails;