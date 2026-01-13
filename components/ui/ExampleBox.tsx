"use client";

import React from "react";

type Props = {
  label?: string;
  color?: string; // background
  children?: React.ReactNode;
};

export default function ExampleBox({ label, color = "#FFF4E6", children }: Props) {
  return (
    <div className="rounded-lg p-4 mb-3" style={{ background: color }}>
      {label && <div className="text-xs font-medium mb-2">{label}</div>}
      <div className="text-sm text-[#2D2D2D]">{children}</div>
    </div>
  );
}
