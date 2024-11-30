import React from "react";
import NavTecnico from "../components/nav/sidebar";

export default function SidebarLayout({ children }) {
  return (
    <div className="flex w-full max-w-[90%]">
      <NavTecnico />
      <div className="w-full">{children}</div>
    </div>
  );
}
