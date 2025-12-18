import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import ProjectDetail from "./components/ProjectDetail";
import info from "../info.json";

export default function App() {
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: info.design_system.colors.background }}>
      <div className="max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Dashboard data={info} />} />
          <Route path="/project/:id" element={<ProjectDetail data={info} />} />
        </Routes>
      </div>
    </div>
  );
}