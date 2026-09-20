"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";
import { navLinks, profile, socials } from "@/lib/content/site";
import { allWork } from "@/lib/content/work";

type Command = {
  id: string;
  label: string;
  hint: string;
  group: "Sections" | "Work" | "Elsewhere" | "Actions";
  icon: IconName;
  run: (ctx: { router: ReturnType<typeof useRouter> }) => void;
};

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => {
      window.location.href = href;
    };

    return [
      ...navLinks.map<Command>((link) => ({
        id: `nav:${link.href}`,
        label: link.label,
        hint: "Section",
        group: "Sections",
        icon: "arrowDown",
        run: go(link.href),
      })),
      ...allWork.map<Command>((item) => ({
        id: `work:${item.slug}`,
        label: item.name,
        hint: item.kind === "venture" ? item.role : item.tagline,
        group: "Work",
        icon: "arrowUpRight",
        run: ({ router: r }) => r.push(`/work/${item.slug}/`),
      })),
      ...socials.map<Command>((social) => ({
        id: `social:${social.label}`,
        label: social.label,
        hint: social.handle,
        group: "Elsewhere",
        icon: social.icon,
        run: () => window.open(social.href, "_blank", "noopener,noreferrer"),
      })),
      {
        id: "action:email",
        label: "Copy email address",
        hint: profile.email,
        group: "Actions",
        icon: "copy",
        run: () => {
          void navigator.clipboard?.writeText(profile.email);
          setCopied(true);
        },
      },
      {
        id: "action:cv",
        label: "Download CV",
        hint: "PDF",
        group: "Actions",
        icon: "download",
        run: () => window.open(profile.cv, "_blank", "noopener,noreferrer"),
      },
    ];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.hint} ${command.group}`
        .toLowerCase()
        .includes(q),
    );
  }, [commands, query]);

  const close = useCallback(() => {
    onOpenChange(false);
    setQuery("");
    setCursor(0);
    setCopied(false);
  }, [onOpenChange]);

  // Global ⌘K / Ctrl+K.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      // Wait a frame so the input exists before focusing it.
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${cursor}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  if (!open) return null;

  const onKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((c) =>
        results.length ? (c - 1 + results.length) % results.length : 0,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      const command = results[cursor];
      if (!command) return;
      command.run({ router });
      // Keep the panel open just long enough to show the copy confirmation.
      if (command.id !== "action:email") close();
    }
  };

  let lastGroup = "";

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command menu"
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        aria-label="Close command menu"
        onClick={close}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
      />

      <div className="card relative w-full max-w-xl overflow-hidden shadow-2xl shadow-black/60">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Icon name="arrowRight" size={15} className="shrink-0 text-ink-ghost" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              // Reset the highlight here rather than in an effect, so the
              // filtered list and the cursor land in the same render.
              setCursor(0);
            }}
            placeholder="Search sections, work, links…"
            aria-label="Search"
            className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-ink-ghost"
          />
          <kbd className="shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[0.625rem] text-ink-ghost">
            ESC
          </kbd>
        </div>

        <ul ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-8 text-center text-sm text-ink-faint">
              Nothing matches “{query}”.
            </li>
          ) : (
            results.map((command, index) => {
              const showGroup = command.group !== lastGroup;
              lastGroup = command.group;
              return (
                <li key={command.id}>
                  {showGroup ? (
                    <p className="label-mono px-3 pt-4 pb-2 first:pt-1">
                      {command.group}
                    </p>
                  ) : null}
                  <button
                    type="button"
                    data-index={index}
                    onMouseMove={() => setCursor(index)}
                    onClick={() => {
                      command.run({ router });
                      if (command.id !== "action:email") close();
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                      index === cursor ? "bg-overlay" : "bg-transparent",
                    )}
                  >
                    <Icon
                      name={
                        copied && command.id === "action:email"
                          ? "check"
                          : command.icon
                      }
                      size={14}
                      className={cn(
                        "shrink-0",
                        copied && command.id === "action:email"
                          ? "text-emerald-400"
                          : "text-ink-ghost",
                      )}
                    />
                    <span className="min-w-0 flex-1 truncate text-sm">
                      {copied && command.id === "action:email"
                        ? "Copied to clipboard"
                        : command.label}
                    </span>
                    <span className="hidden max-w-[45%] truncate font-mono text-[0.6875rem] text-ink-ghost sm:block">
                      {command.hint}
                    </span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
