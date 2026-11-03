"use client";

import React, { useState } from "react";
import { Bangladesh2050Cinematic } from "@/components/cinematic/Bangladesh2050Cinematic";
import { Desktop } from "@/components/os/Desktop";

export default function Home() {
  const [currentView, setCurrentView] = useState<"cinematic" | "os">("cinematic");

  return (
    <>
      {currentView === "cinematic" ? (
        <Bangladesh2050Cinematic onComplete={() => setCurrentView("os")} />
      ) : (
        <Desktop onReplayIntro={() => setCurrentView("cinematic")} />
      )}
    </>
  );
}
