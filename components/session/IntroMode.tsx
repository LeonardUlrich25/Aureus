"use client";

import React from "react";
import ExampleBox from "../ui/ExampleBox";

type Props = {
  word: string;
  onPlayed?: () => void;
};

export default function IntroMode({ word }: Props) {
  return (
    <div>
      <p className="text-base text-[#2D2D2D]">When different skills combine to create a result neither could alone.</p>

      <div className="mt-4">
        <ExampleBox label="🔧 Work" color="#FFF4E6">
          The design and marketing teams found synergy once they aligned goals.
        </ExampleBox>

        <ExampleBox label="🌸 Daily" color="#FDE7DC">
          Playing piano while your sister sings feels effortless, pure synergy.
        </ExampleBox>
      </div>
    </div>
  );
}
