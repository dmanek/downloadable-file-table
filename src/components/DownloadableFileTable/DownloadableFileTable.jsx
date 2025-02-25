import { useState } from "react";
import styles from "./DownloadableFileTable.module.css";
import { GrDownload } from "react-icons/gr";
import Table from "../Table/Table";
import TriStateCheckbox from "../TriStateCheckbox/TriStateCheckbox";

function DownloadableFileTable({ files }) {
  const [selectedRowIds, setSelectedRowIds] = useState(new Set());
  const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);

  if (!files?.length) {
    return <p>No data to render</p>;
  }

  // The files prop does not include ids, so we use the rudimentary approach of using index as ids.
  // We use these to create a map of ids as keys and file objects as values for O(1) look ups.
  const tableData = new Map();
  files.forEach((file, idx) => {
    tableData.set(idx, { ...file, id: idx });
  });

  // List of columns to show in the table. Label is displayed as column name.
  const columns = [
    { key: "select", label: "" },
    { key: "name", label: "Name" },
    { key: "device", label: "Device" },
    { key: "path", label: "Path" },
    { key: "status-icon", label: "" },
    { key: "status", label: "Status" },
  ];

  /**
   * Callback when a row is selected.
   * @param {number} fileId
   * @param {boolean} isChecked
   */
  function handleRowSelected(fileId, isChecked) {
    const newSelectedRowIds = new Set(selectedRowIds);
    if (isChecked) {
      newSelectedRowIds.add(fileId);
    } else {
      newSelectedRowIds.delete(fileId);
    }
    setSelectedRowIds(newSelectedRowIds);
    // update state of select all checkbox
    if (newSelectedRowIds.size === 0) {
      setSelectAllCheckbox(false);
    } else if (newSelectedRowIds.size === tableData.size) {
      setSelectAllCheckbox(true);
    } else {
      setSelectAllCheckbox("indeterminate");
    }
  }

  /**
   * Callback when download button is clicked.
   */
  function handleDownload() {
    const fileList = [];
    for (const fileId of selectedRowIds) {
      const file = tableData.get(fileId);
      if (file?.status.toLowerCase() === "available") {
        fileList.push(`${file.path} on ${file.device}`);
      }
    }

    const count = fileList.length;

    if (count === 0) {
      alert("Sorry, no files ready to download");
    } else {
      alert(
        `You are downloading ${count} available ${
          count > 1 ? "files" : "file"
        }:\n${fileList.join("\n")}`
      );
    }
  }

  /**
   * Callback when select all checkbox is checked/unchecked.
   * @param {e} React.SyntheticEvent
   */
  function handleSelectAll(e) {
    if (e.target.checked) {
      setSelectedRowIds(new Set(tableData.keys()));
    } else {
      setSelectedRowIds(new Set());
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.selectAndDownload}>
        <div className={styles.column}>
          <TriStateCheckbox
            checked={selectAllCheckbox}
            onChange={handleSelectAll}
            ariaLabel="Select all"
          />
          <p>
            {selectedRowIds.size === 0
              ? `None Selected`
              : `Selected ${selectedRowIds.size}`}
          </p>
        </div>
        <div className={styles.column}>
          <button
            className={styles.downloadBtn}
            onClick={handleDownload}
            disabled={selectedRowIds.size === 0}
          >
            <GrDownload /> Download Selected
          </button>
        </div>
      </div>
      <Table
        tableData={tableData}
        columns={columns}
        selectedRows={selectedRowIds}
        onRowSelect={handleRowSelected}
        ariaLabel="Downloadable files table"
      />
    </div>
  );
}

export default DownloadableFileTable;
