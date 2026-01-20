"use client";

import { useState, useEffect } from "react";
import { formatDistanceStrict } from "date-fns";

export function JobTimer({ startTime }: { startTime: Date }) {
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setElapsed(formatDistanceStrict(new Date(startTime), new Date()));
    };
    updateTime(); // Initial run
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [startTime]);

  return <span className="font-mono font-bold text-blue-600">{elapsed}</span>;
}
