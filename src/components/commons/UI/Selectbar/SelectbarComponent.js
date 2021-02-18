import React from "react";
import "./SelectbarComponent.scss";
export default function SelectbarComponent({
  currentCategory = "",
  onSelect = () => {},
}) {
  return (
    <select
      className="selectbar-style"
      name="select"
      id="select"
      onChange={onSelect}
    >
      <option value="users">Users</option>
      <option value="storage">Storage</option>
    </select>
  );
}
