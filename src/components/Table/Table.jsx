import styles from "./Table.module.css";
import { GrStatusGoodSmall } from "react-icons/gr";

function Table({ tableData, columns, selectedRows, onRowSelect, ariaLabel }) {
  return (
    <table className={styles.filesTable} role="table" aria-label={ariaLabel}>
      <thead className={styles.tableHeader}>
        <tr>
          {columns.map(({ key, label }) => (
            <th key={key}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from(tableData.values()).map((row) => (
          <TableRow
            key={row.id}
            row={row}
            isSelected={selectedRows.has(row.id)}
            onRowSelect={onRowSelect}
          />
        ))}
      </tbody>
    </table>
  );
}

function TableRow({ row, isSelected, onRowSelect }) {
  function handleRowSelect(e) {
    onRowSelect(row.id, e.target.checked);
  }

  return (
    <tr className={`${styles.tableRow} ${isSelected ? styles.selected : ""}`}>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleRowSelect}
        />
      </td>
      <td>{row.name}</td>
      <td>{row.device}</td>
      <td>{row.path}</td>
      <td>
        {row.status.toLowerCase() === "available" ? (
          <GrStatusGoodSmall color="#76C82F" />
        ) : null}
      </td>
      <td className={styles.fileStatus}>{row.status}</td>
    </tr>
  );
}

export default Table;
