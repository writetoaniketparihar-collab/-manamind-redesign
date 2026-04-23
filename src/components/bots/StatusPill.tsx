import { STATUS_CONFIG, type BotStatus } from "@/data/bots";

export function StatusPill({ status }: { status: BotStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${config.color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot} ${status === "online" ? "animate-pulse" : ""}`} />
      {config.label}
    </span>
  );
}

export function StatusLegend() {
  return (
    <div className="flex items-center justify-center gap-6">
      {(["online", "spawning", "training"] as BotStatus[]).map((status) => {
        const config = STATUS_CONFIG[status];
        return (
          <div key={status} className="flex items-center gap-2 text-xs text-text-muted">
            <span className={`h-2 w-2 rounded-full ${config.dot} ${status === "online" ? "animate-pulse" : ""}`} />
            <span className="font-medium">{config.label}</span>
            <span className="hidden sm:inline">
              {status === "online" && "- Live and operational"}
              {status === "spawning" && "- Deploying soon"}
              {status === "training" && "- In development"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
