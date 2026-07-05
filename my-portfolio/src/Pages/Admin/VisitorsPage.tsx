import React, { useEffect, useState } from "react";
import supabase from "../../supabase";

type Visitor = {
  id: number | string;
  timestamp?: string;
  page?: string;
  url?: string;
  referrer?: string;
  user_agent?: string;
  language?: string;
  screen_size?: string;
  ip?: string;
  city?: string;
  country?: string;
  region?: string;
};

const VisitorsPage: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVisitors = async () => {
      const { data, error, count } = await supabase
        .from("visitors")
        .select("*", { count: "exact" })
        .order("timestamp", { ascending: false })
        .limit(100);

      if (error) {
        console.error("Error loading visitors:", error);
      } else {
        setVisitors(data || []);
        setVisitorCount(count ?? data?.length ?? 0);
      }

      setLoading(false);
    };

    loadVisitors();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Visitor Log</h1>

      <div className="card glass-card text-bg-info mb-4">
        <div className="card-body">
          <h5 className="card-title">
            <i className="fas fa-users"></i> Total Visitors
          </h5>
          <p className="card-text fs-3">{visitorCount}</p>
          <p className="card-text">
            Showing the most recent 100 visitor records.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <i className="fas fa-globe"></i> Recent Visitor Activity
        </div>
        <div className="card-body">
          {loading ? (
            <p>Loading visitors...</p>
          ) : visitors.length === 0 ? (
            <p>No visitor records found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Page</th>
                    <th>URL</th>
                    <th>Location</th>
                    <th>Device</th>
                    <th>IP</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((visitor) => (
                    <tr key={`${visitor.id}-${visitor.timestamp}`}>
                      <td>
                        {visitor.timestamp
                          ? new Date(visitor.timestamp).toLocaleString()
                          : "-"}
                      </td>
                      <td>{visitor.page || "-"}</td>
                      <td>{visitor.url || "-"}</td>
                      <td>
                        {visitor.city || "-"}, {visitor.region || "-"},{" "}
                        {visitor.country || "-"}
                      </td>
                      <td>
                        {visitor.screen_size || visitor.user_agent || "-"}
                      </td>
                      <td>{visitor.ip || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorsPage;
