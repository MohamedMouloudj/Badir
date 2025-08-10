import Stat from "@/components/pages/Stat";
import statistics from "@/data/statistics";
import React from "react";

export default function Stats() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
      {statistics.map((stat) => (
        <Stat key={stat.id} title={stat.title} value={stat.value} />
      ))}
    </section>
  );
}
