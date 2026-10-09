import useUsers from "../hooks/useUsers";
import UserList from "./UserList";
import { useState } from "react";
import UserDetails from "./UserDetails";
import SearchInput from "./SearchInput";
import CompanyFilter from "./CompanyFilter";
import ClearFilters from "./ClearFilters";

function UserExplorer() {
  const { users, loading, error } = useUsers();
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
    return <p>Error: {error}</p>;
  }
   if (users.length === 0) {
    return <p>No users found</p>;
  }

  if (filteredUsers.length === 0) {
    return <p>No users match your search</p>;
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
      <UserList 
      users={filteredUsers}
      onSelectUser={setSelectedUser}/>
      <UserDetails user={selectedUser}/>
    </div>
  );
}

export default UserExplorer;