"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./icons";

type Lang = "html" | "css" | "js" | "text";

/* ------------------------------------------------------------------ */
/* a small hand-rolled highlighter — no dependency, good enough to read */
/* ------------------------------------------------------------------ */

const COLOR = {
	tag: "#f2a0b4",
	attr: "#f0cf9e",
	string: "#a8c686",
	comment: "rgba(255,248,234,0.38)",
	keyword: "#d0a9ee",
	prop: "#8fc7e8",
	number: "#f0cf9e",
	punct: "rgba(255,248,234,0.5)",
	plain: "#f3e8d6",
};

function span(text: string, color: string, key: number, italic = false) {
	return (
		<span key={key} style={{ color, fontStyle: italic ? "italic" : undefined }}>
			{text}
		</span>
	);
}

/** Walk a regex over the source, colouring matches and leaving gaps plain. */
function scan(
	code: string,
	re: RegExp,
	pick: (m: RegExpExecArray) => [string, string, boolean?] | null,
) {
	const out: ReactNode[] = [];
	let last = 0;
	let key = 0;
	let m: RegExpExecArray | null;
	re.lastIndex = 0;
	while ((m = re.exec(code))) {
		const chosen = pick(m);
		if (!chosen) continue;
		if (m.index > last) out.push(span(code.slice(last, m.index), COLOR.plain, key++));
		out.push(span(chosen[0], chosen[1], key++, chosen[2]));
		last = m.index + m[0].length;
		if (m[0].length === 0) re.lastIndex++; // never spin on an empty match
	}
	if (last < code.length) out.push(span(code.slice(last), COLOR.plain, key++));
	return out;
}

const HTML_RE =
	/<!--[\s\S]*?-->|<!DOCTYPE[^>]*>|<\/?[A-Za-z][\w-]*|[A-Za-z-]+(?==)|"[^"]*"|\/?>/g;

const CSS_RE =
	/\/\*[\s\S]*?\*\/|[.#]?[-\w]+(?=[^{}:;]*\{)|[-\w]+(?=\s*:)|"[^"]*"|#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?[a-z%]*\b|[{}:;,]/g;

const JS_RE =
	/\/\/[^\n]*|"[^"]*"|'[^']*'|`[^`]*`|\b(?:const|let|var|function|return|if|else|for|while|new|null|true|false|=>)\b|\b\d+(?:\.\d+)?\b|[A-Za-z_$][\w$]*(?=\s*\()|[{}();,.=+]/g;

function highlight(code: string, lang: Lang): ReactNode {
	// Plain text still needs an explicit colour — the pane is dark, and
	// inheriting the page's ink would render it black on brown.
	if (lang === "text") return span(code, COLOR.plain, 0);

	if (lang === "html")
		return scan(code, HTML_RE, (m) => {
			const t = m[0];
			if (t.startsWith("<!--")) return [t, COLOR.comment, true];
			if (t.startsWith("<!DOCTYPE")) return [t, COLOR.comment];
			if (t.startsWith("<")) return [t, COLOR.tag];
			if (t === ">" || t === "/>") return [t, COLOR.tag];
			if (t.startsWith('"')) return [t, COLOR.string];
			return [t, COLOR.attr];
		});

	if (lang === "css")
		return scan(code, CSS_RE, (m) => {
			const t = m[0];
			if (t.startsWith("/*")) return [t, COLOR.comment, true];
			if (t.startsWith('"')) return [t, COLOR.string];
			if (t.startsWith("#") && /^#[0-9a-fA-F]{3,8}$/.test(t))
				return [t, COLOR.number];
			if (/^[.#]/.test(t)) return [t, COLOR.tag];
			if (/^[{}:;,]$/.test(t)) return [t, COLOR.punct];
			if (/^\d/.test(t)) return [t, COLOR.number];
			// a bare word before `{` is a tag selector, before `:` a property
			return [t, code[m.index + t.length] === ":" ? COLOR.prop : COLOR.tag];
		});

	return scan(code, JS_RE, (m) => {
		const t = m[0];
		if (t.startsWith("//")) return [t, COLOR.comment, true];
		if (/^["'`]/.test(t)) return [t, COLOR.string];
		if (/^[{}();,.=+]$/.test(t)) return [t, COLOR.punct];
		if (/^\d/.test(t)) return [t, COLOR.number];
		if (
			/^(const|let|var|function|return|if|else|for|while|new|null|true|false|=>)$/.test(
				t,
			)
		)
			return [t, COLOR.keyword];
		return [t, COLOR.prop];
	});
}

/* ------------------------------------------------------------------ */

export type CodeTab = {
	label: string;
	lang: Lang;
	code: string;
	note?: string;
	/** line indexes this lesson just added, tinted and marked with a + */
	added?: Set<number>;
};

/**
 * A little editor window: one tab per file, syntax colouring, copy button.
 * Long snippets scroll *inside* the pane so the page itself never scrolls.
 */
export function CodeBlock({
	tabs,
	className = "",
}: {
	tabs: CodeTab[];
	className?: string;
}) {
	// Track the tab by *label*, not index — a new lesson swaps the whole tab set,
	// and a stale label simply falls back to the first tab with no effect needed.
	const [activeLabel, setActiveLabel] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	const active = Math.max(
		0,
		tabs.findIndex((t) => t.label === activeLabel),
	);
	// A lesson with nothing to show shouldn't take the whole page down with it.
	const tab: CodeTab = tabs[active] ?? {
		label: "no code",
		lang: "text",
		code: "Nothing new to type on this page.",
	};
	const lines = tab.code.split("\n");

	useEffect(() => {
		if (!copied) return;
		const t = setTimeout(() => setCopied(false), 1400);
		return () => clearTimeout(t);
	}, [copied]);

	// Long files scroll inside the pane, so bring the new lines into view.
	const scroller = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const box = scroller.current;
		if (!box) return;
		const first = box.querySelector<HTMLElement>("[data-added]");
		box.scrollTop = first
			? Math.max(0, first.offsetTop - box.clientHeight / 2 + first.offsetHeight)
			: 0;
	}, [tab.code, tab.label]);

	return (
		<div
			className={`flex min-h-0 flex-col overflow-hidden rounded-[1.1vh] border-[0.3vh] border-choco/35 bg-[#2b1d14] shadow-[0.4vh_0.6vh_0_rgba(107,63,34,0.18)] ${className}`}
		>
			{/* tab strip */}
			<div className="flex shrink-0 items-center gap-[0.3vw] border-b-[0.2vh] border-white/10 px-[0.6vw] pt-[0.6vh]">
				{tabs.map((t, i) => (
					<button
						key={t.label}
						type="button"
						onClick={() => setActiveLabel(t.label)}
						className={`press cursor-pointer rounded-t-[0.7vh] px-[0.8vw] py-[0.5vh] font-mono text-[1.7vh] leading-none transition-colors ${
							i === active
								? "bg-white/12 text-white"
								: "text-white/40 hover:text-white/70"
						}`}
					>
						{t.label}
					</button>
				))}
				<button
					type="button"
					onClick={() => {
						navigator.clipboard?.writeText(tab.code);
						setCopied(true);
					}}
					className="press ml-auto mb-[0.4vh] flex cursor-pointer items-center gap-[0.3vw] rounded-full px-[0.7vw] py-[0.4vh] font-mono text-[1.5vh] leading-none text-white/45 hover:bg-white/10 hover:text-white/80"
				>
					<Icon name={copied ? "check" : "copy"} className="text-[1.7vh]" />
					{copied ? "copied" : "copy"}
				</button>
			</div>

			{/* code */}
			<div
				ref={scroller}
				className="min-h-0 flex-1 overflow-auto px-[0.9vw] py-[0.9vh]"
			>
				<pre className="font-mono text-[1.75vh] leading-[1.55] text-[#f3e8d6]">
					<code>
						{lines.map((line, i) => {
							const isNew = tab.added?.has(i);
							return (
								<div
									key={i}
									data-added={isNew || undefined}
									className={`flex ${
										isNew ? "-mx-[0.9vw] bg-[#a8c686]/15 px-[0.9vw]" : ""
									}`}
								>
									<span
										className={`mr-[0.3vw] w-[1.3vh] shrink-0 select-none ${
											isNew ? "text-[#a8c686]" : "text-transparent"
										}`}
									>
										+
									</span>
									<span className="mr-[0.7vw] w-[2.2vh] shrink-0 text-right text-white/20 select-none">
										{i + 1}
									</span>
									<span className="min-w-0 whitespace-pre-wrap">
										{line ? highlight(line, tab.lang) : " "}
									</span>
								</div>
							);
						})}
					</code>
				</pre>
			</div>

			{tab.note && (
				<p className="cute-notebook shrink-0 border-t-[0.2vh] border-white/10 px-[0.9vw] py-[0.7vh] text-[1.85vh] leading-[1.3] text-[#f0cf9e]">
					{tab.note}
				</p>
			)}
		</div>
	);
}
