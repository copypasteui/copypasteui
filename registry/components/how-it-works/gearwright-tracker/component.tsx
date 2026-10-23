"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, ClipboardCheck, KeyRound, MessageSquare, Play, Search, Wrench } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const stages = [
  { icon: KeyRound, title: "Checked in", msg: "Hi Sarah, your car’s with Jordan now. We’ll send a video within the hour." },
  { icon: Search, title: "Video health check", msg: "Video’s ready: front pads at 2mm, everything else looks good. Tap to watch." },
  { icon: ClipboardCheck, title: "Awaiting approval", msg: "Front pads & discs: £186 fitted. Reply YES to approve. No pressure." },
  { icon: Wrench, title: "In the workshop", msg: "Thanks! Parts are here, Jordan’s on it. Ready by 3:30." },
  { icon: CheckCircle2, title: "Ready to collect", msg: "All done, washed and ready. Pay by link or at the desk." },
];

export default function GearwrightTracker() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % stages.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-foreground py-24 font-sans text-background">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-6xl leading-[0.9] font-extrabold uppercase italic">
            Know exactly
            <br />
            <span className="underline decoration-primary decoration-[0.08em] underline-offset-[0.14em]">what’s happening.</span>
          </h2>
          <p className="mt-5 max-w-md opacity-75">
            Live text updates and a video of your car on the ramp. Nothing gets done until you say yes.
          </p>
          <ol className="mt-10 space-y-1">
            {stages.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  className={`flex w-full items-center gap-4 p-3 text-left transition ${i === step ? "bg-background/10" : ""}`}
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center transition-colors ${i <= step ? "bg-primary text-primary-foreground" : "bg-background/10"}`}
                  >
                    <s.icon className="size-5" />
                  </span>
                  <span className={`font-display text-xl font-bold uppercase italic ${i <= step ? "" : "font-normal"}`}>{s.title}</span>
                  {i === step && <motion.span layoutId="tq-dot" className="ml-auto size-2.5 rounded-full bg-primary" />}
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="mx-auto w-full max-w-sm rounded-[2.5rem] border-[10px] border-background/15 bg-background p-4 text-foreground shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
              <MessageSquare className="size-4" />
            </span>
            <span>
              <span className="block text-sm font-bold">Gearwright Garage</span>
              <span className="text-xs text-muted-foreground">Usually replies in minutes</span>
            </span>
          </div>
          <div className="relative mt-4 h-80 overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 space-y-3">
              <AnimatePresence initial={false}>
                {stages
                  .slice(0, step + 1)
                  .slice(-3)
                  .map((s, i, arr) => (
                    <motion.div
                      key={s.title}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="max-w-[85%] rounded-2xl rounded-bl-sm bg-muted p-3 text-sm"
                    >
                      {s.msg}
                      {s.title === "Video health check" && i === arr.length - 1 && (
                        <span className="relative mt-2 block overflow-hidden rounded-xl">
                          <img
                            src={img("photo-1645445522156-9ac06bc7a767")}
                            alt="Technician checking a tyre on the ramp"
                            className="aspect-video w-full object-cover"
                          />
                          <span className="absolute inset-0 grid place-items-center bg-black/30">
                            <span className="grid size-10 place-items-center rounded-full bg-white text-black">
                              <Play className="size-4 fill-current" />
                            </span>
                          </span>
                        </span>
                      )}
                    </motion.div>
                  ))}
                {step === 2 && (
                  <motion.div
                    key="reply"
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="ml-auto w-fit rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    YES
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
