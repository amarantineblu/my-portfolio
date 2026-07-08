import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const CardSkeleton: React.FC<{
  lines?: number;
  titleWidth?: number;
}> = ({ lines = 3, titleWidth = 220 }) => (
  <div className="card" style={{ padding: "1rem", borderRadius: 8 }}>
    <h2>
      <Skeleton width={titleWidth} />
    </h2>
    <div>
      {Array.from({ length: lines }).map((_, i) => (
        <p key={i}>
          <Skeleton />
        </p>
      ))}
    </div>
  </div>
);

export const MediaSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div style={{ display: "grid", gap: "1rem" }}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        style={{
          width: "100%",
          minHeight: 180,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <Skeleton height={220} />
      </div>
    ))}
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({
  rows = 4,
  cols = 3,
}) => (
  <div className="table-responsive">
    <table className="table">
      <thead>
        <tr>
          {Array.from({ length: cols }).map((_, i) => (
            <th key={i}>
              <Skeleton width={120} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, r) => (
          <tr key={r}>
            {Array.from({ length: cols }).map((_, c) => (
              <td key={c}>
                <Skeleton />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default null;
