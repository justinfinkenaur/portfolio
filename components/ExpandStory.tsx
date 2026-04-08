"use client";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function ExpandStory({ children }: Props) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button className="cs-expand-btn" onClick={() => setOpen(o => !o)}>
        {open ? "Collapse ↑" : "Read the full story ↗"}
      </button>
      <div className={`cs-expand-body${open ? " open" : ""}`}>
        <div className="cs-expand-inner">{children}</div>
      </div>
    </>
  );
}
