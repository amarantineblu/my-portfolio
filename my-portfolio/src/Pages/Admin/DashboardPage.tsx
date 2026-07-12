import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getProjectsData, Project } from "../../utils/ProjectsData";
import supabase from "../../supabase";

type ProjectWithDates = Project & {
  createdAt?: { toDate: () => Date };
  updatedAt?: { toDate: () => Date };
};

const DashboardPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectWithDates[]>([]);
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [loadingVisitors, setLoadingVisitors] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        const querySnapshot = await getProjectsData();
        const data = querySnapshot?.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ProjectWithDates[] | undefined;
        setProjects(data ?? []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoadingProjects(false);
      }
    };

    const fetchVisitorCount = async () => {
      try {
        const { count, error } = await supabase
          .from("visitors")
          .select("id", { count: "exact", head: true });
        if (error) {
          console.error("Error fetching visitor count:", error);
        } else {
          setVisitorCount(count ?? 0);
        }
      } catch (err) {
        console.error("Error fetching visitor count:", err);
      } finally {
        setLoadingVisitors(false);
      }
    };

    fetchProjects();
    fetchVisitorCount();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Dashboard Overview</h1>

      <div className="card glass-card text-bg-info mb-4">
        <div className="card-body">
          <h5 className="card-title">
            <i className="fas fa-users"></i> Visitors
          </h5>
          <p className="card-text fs-3">
            {loadingVisitors ? <Skeleton width={140} /> : visitorCount}
          </p>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-folder"></i> My Projects
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {loadingProjects ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i}>
                      <td>
                        <Skeleton />
                      </td>
                      <td>
                        <Skeleton width={100} />
                      </td>
                      <td>
                        <Skeleton width={120} />
                      </td>
                    </tr>
                  ))
                ) : projects.length === 0 ? (
                  <tr>
                    <td colSpan={3}>No projects found.</td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project.id}>
                      <td>{project.projectName || "Untitled"}</td>
                      <td>
                        <span
                          className={`badge text-white ${
                            project.projectStatus === "completed"
                              ? "bg-success"
                              : project.projectStatus === "in-progress"
                                ? "bg-warning"
                                : "bg-secondary"
                          }`}
                        >
                          {project.projectStatus || "Unknown"}
                        </span>
                      </td>
                      <td>
                        {project.createdAt?.toDate
                          ? project.createdAt.toDate().toLocaleDateString()
                          : project.updatedAt?.toDate
                            ? project.updatedAt.toDate().toLocaleDateString()
                            : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
