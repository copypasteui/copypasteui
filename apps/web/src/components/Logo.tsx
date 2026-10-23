/** The ⌘ V keycaps and the wordmark. */
export default function Logo({ wordmark = true, className = "" }: { wordmark?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span aria-hidden className="flex gap-1 text-[0.7em]">
        <kbd className="keycap">⌘</kbd>
        <kbd className="keycap bg-accent text-accent-foreground">V</kbd>
      </span>
      {wordmark && (
        <span className="font-display font-extrabold tracking-tight">
          copypaste<span className="text-muted-foreground">ui</span>
        </span>
      )}
    </span>
  );
}
