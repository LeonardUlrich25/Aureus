"use client";

import React from "react";

type Props = {
  onClick?: () => void;
};

export default function HelpButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="Help"
      className="w-10 h-10 rounded-full flex items-center justify-center"
      style={{ background: "#E0E0E0" }}
    >
      <span style={{ fontSize: 18, color: "#666" }}>?</span>
    </button>
  );
}
