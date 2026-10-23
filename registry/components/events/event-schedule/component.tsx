"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, MapPin, Bookmark } from "lucide-react";

type Session = { time: string; title: string; who: string; room: string; track: "Main" | "Build" | "Design" | "Break" };
const days: Record<string, Session[]> = {
  "Day 1 · Apr 15": [
    { time: "09:00", title: "Doors open & coffee", who: "", room: "Atrium", track: "Break" },
    { time: "10:00", title: "Keynote: The next ten years of the web", who: "Maya Okonkwo", room: "Stage A", track: "Main" },
    { time: "11:15", title: "Agents in production: what actually breaks", who: "Lukas Brandt", room: "Stage B", track: "Build" },
    { time: "11:15", title: "Designing for latency", who: "Sana Iqbal", room: "Studio", track: "Design" },
    { time: "13:00", title: "Lunch", who: "", room: "Terrace", track: "Break" },
    { time: "14:30", title: "Edge databases, demystified", who: "Chen Wei", room: "Stage A", track: "Build" },
  ],
  "Day 2 · Apr 16": [
    { time: "09:30", title: "Design systems that survive reorgs", who: "Inés Duarte", room: "Stage A", track: "Design" },
    { time: "11:00", title: "Live: building a startup in 60 minutes", who: "The Shipfest crew", room: "Stage A", track: "Main" },
    { time: "13:00", title: "Lunch", who: "", room: "Terrace", track: "Break" },
    { time: "14:00", title: "Security for people who hate security", who: "Rafael Costa", room: "Stage B", track: "Build" },
    { time: "17:00", title: "Closing party", who: "DJ set by Nightshift", room: "Rooftop", track: "Main" },
  ],
};
const trackStyle: Record<Session["track"], string> = {
  Main: "bg-primary text-primary-foreground",
  Build: "bg-accent text-accent-foreground",
  Design: "bg-secondary text-secondary-foreground",
  Break: "bg-muted text-muted-foreground",
};

export default function EventSchedule() {
  const dayNames = Object.keys(days);
  const [day, setDay] = useState(dayNames[0]!);
  const [track, setTrack] = useState<"All" | Session["track"]>("All");
  const [saved, setSaved] = useState<string[]>([]);
  const list = (days[day] ?? []).filter((s) => track === "All" || s.track === track || s.track === "Break");

  return (
    <section id="schedule" className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase md:text-6xl">Schedule</h2>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex rounded-lg bg-muted p-1">
            {dayNames.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDay(d)}
                className={`relative rounded-md px-4 py-2 text-sm font-semibold ${day === d ? "text-primary-foreground" : "text-muted-foreground"}`}
              >
                {day === d && <motion.span layoutId="day-pill" className="absolute inset-0 rounded-md bg-primary" />}
                <span className="relative">{d}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            {(["All", "Main", "Build", "Design"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTrack(t)}
                className={`rounded-full border px-3 py-1 ${track === t ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.ol
            key={day + track}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 divide-y divide-border border-y border-border"
          >
            {list.map((s, i) => {
              const id = `${day}-${s.time}-${s.title}`;
              const isSaved = saved.includes(id);
              return (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="grid grid-cols-[64px_1fr_auto] items-center gap-4 py-5 sm:grid-cols-[90px_1fr_auto]"
                >
                  <span className="flex items-center gap-1.5 font-display text-lg font-bold tabular-nums">
                    <Clock className="hidden size-4 text-muted-foreground sm:block" />
                    {s.time}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded px-2 py-0.5 text-xs font-semibold ${trackStyle[s.track]}`}>{s.track}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3" /> {s.room}
                      </span>
                    </div>
                    <p className={`mt-1 font-semibold ${s.track === "Break" ? "text-muted-foreground" : "text-lg"}`}>{s.title}</p>
                    {s.who && <p className="text-sm text-muted-foreground">{s.who}</p>}
                  </div>
                  {s.track !== "Break" && (
                    <button
                      type="button"
                      aria-label={isSaved ? "Remove from my schedule" : "Add to my schedule"}
                      onClick={() => setSaved((v) => (isSaved ? v.filter((x) => x !== id) : [...v, id]))}
                      className="grid size-10 place-items-center rounded-full border border-border hover:border-primary"
                    >
                      <Bookmark className={`size-4 ${isSaved ? "fill-primary text-primary" : ""}`} />
                    </button>
                  )}
                </motion.li>
              );
            })}
          </motion.ol>
        </AnimatePresence>
        <p className="mt-4 text-sm text-muted-foreground">
          {saved.length ? `${saved.length} session(s) in your schedule.` : "Bookmark talks to build your own schedule."}
        </p>
      </div>
    </section>
  );
}
