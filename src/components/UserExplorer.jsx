import useUsers from "../hooks/useUsers";
import UserList from "./UserList";
import { useState } from "react";
import UserDetails from "./UserDetails";
import SearchInput from "./SearchInput";
import CompanyFilter from "./CompanyFilter";
import ClearFilters from "./ClearFilters";

function UserExplorer() {
  const { users, loading, error, retry} = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");

  const filteredUsers = users.filter((user) => {
  const matchesSearch = user.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCompany =
    company === "" || user.company.name === company;

  return matchesSearch && matchesCompany;
});
  const companies = [...new Set(users.map((user) => user.company.name))];

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return (    <div>
    <p>Error: {error}</p>;
    <button onClick={retry}>retry</button>
    </div>
    )
  }
   if (users.length === 0) {
    return <p>No users found</p>;
  }

 

  return (
    <div>
      <h1>User Explorer</h1>
      <SearchInput value={search} onChange={setSearch} />
      <CompanyFilter
            companies={companies}
            value={company}
            onChange={setCompany}
        />
        <ClearFilters
        onClear={() =>{
            setSearch("");
            setCompany("");
        }}/>
        {filteredUsers.length > 0 ? (
      <UserList 
      users={filteredUsers}
      onSelectUser={setSelectedUser}/>
        ) : (
            <p>no users match your search of filter</p>
        )}
      <UserDetails user={selectedUser}/>
    </div>
  );
}

export default UserExplorer;