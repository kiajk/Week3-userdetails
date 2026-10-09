function SearchInput ({value, onChange}) {
    return (
        <input type="text"
        placeholder="Search Users..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
         />
    );
}
export default SearchInput;