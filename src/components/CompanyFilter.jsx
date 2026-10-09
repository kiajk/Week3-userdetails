function CompanyFilter({ companies, value, onChange }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="">All Companies</option>

      {companies.map((company) => (
        <option key={company} value={company}>
          {company}
        </option>
      ))}
    </select>
  );
}

export default CompanyFilter;