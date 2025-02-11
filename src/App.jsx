import "./App.css";
import fileTableData from "./data/FileTableData";
import DownloadableFileTable from "./components/DownloadableFileTable/DownloadableFileTable";

function App() {
  return <DownloadableFileTable files={fileTableData} />;
}

export default App;
