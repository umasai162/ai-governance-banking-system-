import { useEffect, useState } from "react";
import axios from "axios";

function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/audit-logs")
      .then(res => setLogs(res.data));
  }, []);

  return (
    <div style={{ marginLeft: "240px", padding: "40px" }}>
      <h2>Audit Logs</h2>

      {logs.length === 0 ? (
        <p>No logs available</p>
      ) : (
        <ul>
          {logs.map(log => (
            <li key={log.id}>
              {log.action} - {new Date(log.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AuditLogs;
