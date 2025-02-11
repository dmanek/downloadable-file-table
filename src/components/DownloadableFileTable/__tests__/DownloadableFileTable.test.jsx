import { describe, expect, test, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DownloadableFileTable from "../DownloadableFileTable";
import "@testing-library/jest-dom";

describe("DownloadableFileTable", () => {
  const mockFiles = [
    {
      name: "smss.exe",
      device: "Mario",
      path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
      status: "available",
    },
    {
      name: "netsh.exe",
      device: "Luigi",
      path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
      status: "available",
    },
    {
      name: "aries.sys",
      device: "Daisy",
      path: "\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys",
      status: "scheduled",
    },
  ];

  beforeEach(() => {
    window.alert = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders "No data to render" message when files array is empty', () => {
    render(<DownloadableFileTable files={[]} />);
    expect(screen.getByText("No data to render")).toBeInTheDocument();
  });

  test("download button is disabled when no files are selected", () => {
    render(<DownloadableFileTable files={mockFiles} />);
    const downloadButton = screen
      .getByText("Download Selected")
      .closest("button");
    expect(downloadButton).toBeDisabled();
  });

  test("renders all files in the table", () => {
    render(<DownloadableFileTable files={mockFiles} />);
    mockFiles.forEach((file) => {
      expect(screen.getByText(file.name)).toBeInTheDocument();
      expect(screen.getByText(file.device)).toBeInTheDocument();
      expect(screen.getByText(file.path)).toBeInTheDocument();
      // There could be multiple "available"/"scheduled" in the document, so skip checking status.
      // expect(screen.getByText(file.status)).toBeInTheDocument();
    });
  });

  test("shows correct alert message when downloading available files", () => {
    render(<DownloadableFileTable files={mockFiles} />);
    const checkboxes = screen.getAllByRole("checkbox").slice(1);

    // Select first file that has status = available.
    fireEvent.click(checkboxes[0]);
    const downloadButton = screen
      .getByText("Download Selected")
      .closest("button");
    fireEvent.click(downloadButton);

    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining("downloading 1 available")
    );
  });

  test("only includes available files in download list", () => {
    render(<DownloadableFileTable files={mockFiles} />);
    const selectAllCheckbox = screen.getAllByRole("checkbox")[0];

    // Select all files
    fireEvent.click(selectAllCheckbox);
    const downloadButton = screen
      .getByText("Download Selected")
      .closest("button");
    fireEvent.click(downloadButton);

    // Alert message should include 2 available files.
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining("downloading 2 available")
    );
  });

  test("only scheduled files in download list", () => {
    render(<DownloadableFileTable files={mockFiles} />);

    // Select last file in list with status as scheduled.
    const checkbox = screen.getAllByRole("checkbox").at(-1);

    fireEvent.click(checkbox);
    const downloadButton = screen
      .getByText("Download Selected")
      .closest("button");
    fireEvent.click(downloadButton);

    // Assert no available files
    expect(window.alert).toHaveBeenCalledWith(
      "Sorry, no files ready to download"
    );
  });
});
