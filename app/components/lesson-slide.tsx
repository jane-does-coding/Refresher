"use client";

import { useState } from "react";
import { FONTS, PALETTES, TAGLINES } from "../lib/guide-data";
import {
	addedLines,
	filesAt,
	filesShownBy,
	LESSONS,
	type CodeCtx,
	type Lesson,
} from "../lib/curriculum";
import { displayName, useGuide } from "./guide-context";
import { type CodeTab } from "./code-block";
import { CodeViewTabs } from "./code-view-tabs";
import { Icon } from "./icons";
import { Chip, Hint, StepHead } from "./kit";
import { LivePreview } from "./live-preview";

/** Feed the learner's earlier picks into the code we teach. */
export function useCodeCtx(): CodeCtx {
	const g = useGuide();
	const palette = PALETTES[g.palette];
	const name = displayName(g.name);
	return {
		name,
		handle: name.toLowerCase().replace(/[^a-z0-9]/g, "") || "yourname",
		tagline: TAGLINES[g.tagline],
		accent: palette.accent,
		mid: palette.mid,
		soft: palette.soft,
		fontCss: FONTS[g.font].css,
	};
}

export function LessonSlide({ lesson }: { lesson: Lesson }) {
	const g = useGuide();
	const c = useCodeCtx();
	const [open, setOpen] = useState<number | null>(null);

	const index = LESSONS.findIndex((l) => l.id === lesson.id);
	const files = filesAt(index, c);
	const before = filesAt(index - 1, c);

	// The code pane shows the whole file as it stands now, with this lesson's
	// new lines marked, so you can see what you're adding to what you had.
	const tabs: CodeTab[] = lesson.plainTabs
		? lesson.plainTabs.map((t) => ({
				label: t.label,
				lang: t.lang,
				code: t.code(c),
				note: t.note,
			}))
		: filesShownBy(lesson).map((file) => ({
				label: file,
				lang: langOf(file),
				code: files[file],
				note: lesson.notes?.[file],
				added: addedLines(before[file], files[file]),
			}));

	return (
		<div className="flex h-full min-h-0 flex-col gap-[1.2vh]">
			<StepHead
					chapter={lesson.chapter}
					title={lesson.title}
					sub={lesson.sub}
				/>

			<div className="flex min-h-0 flex-1 gap-[1.1vw]">
				{/* left: what to do, and what the words mean */}
				<div className="flex w-[31%] shrink-0 flex-col gap-[1vh]">
					{lesson.asks?.includes("name") && (
						<label className="flex shrink-0 flex-col gap-[0.4vh] rounded-[1.1vh] border-[0.3vh] border-dashed border-choco/25 bg-paper px-[1vw] py-[0.9vh]">
							<span className="cute-notebook text-[1.95vh] leading-none text-choco/60">
								what should the heading say?
							</span>
							<input
								value={g.name}
								onChange={(e) => g.setName(e.target.value.slice(0, 22))}
								placeholder="your name"
								className="cute-notebook w-full rounded-[0.8vh] border-[0.25vh] border-dashed border-choco/30 bg-white px-[0.7vw] py-[0.5vh] text-[2.2vh] text-ink outline-none placeholder:text-choco/35 focus:border-solid focus:border-accent"
							/>
						</label>
					)}

					{lesson.asks?.includes("tagline") && (
						<div className="flex shrink-0 flex-col gap-[0.5vh] rounded-[1.1vh] border-[0.3vh] border-dashed border-choco/25 bg-paper px-[1vw] py-[0.9vh]">
							<span className="cute-notebook text-[1.95vh] leading-none text-choco/60">
								and the line under it?
							</span>
							<div className="flex flex-wrap gap-[0.35vw]">
								{TAGLINES.map((t, i) => (
									<Chip
										key={t}
										active={g.tagline === i}
										onClick={() => g.setTagline(i)}
										className="text-[1.75vh]"
									>
										{t}
									</Chip>
								))}
							</div>
						</div>
					)}

					<div className="flex min-h-0 flex-col gap-[0.5vh] rounded-[1.1vh] border-[0.3vh] border-dashed border-choco/25 bg-accent-soft/60 px-[1vw] py-[1vh]">
						<span className="cute-notebook flex items-center gap-[0.4vw] text-[1.9vh] leading-none text-choco/60">
							<Icon name="checklist" className="text-[2.1vh] text-accent" />
							do this
						</span>
						<ol className="flex flex-col gap-[0.5vh]">
							{lesson.todo.map((t, i) => (
								<li
									key={t}
									className="cute-notebook flex gap-[0.5vw] text-[2vh] leading-[1.25] text-ink"
								>
									<span className="shrink-0 text-accent">{i + 1}.</span>
									<span>{t}</span>
								</li>
							))}
						</ol>
					</div>

					{lesson.glossary && (
						<div className="flex min-h-0 flex-1 flex-col gap-[0.6vh] rounded-[1.1vh] border-[0.3vh] border-dashed border-choco/25 bg-paper px-[1vw] py-[1vh]">
							<span className="cute-notebook flex items-center gap-[0.4vw] text-[1.9vh] leading-none text-choco/60">
								<Icon name="bulb" className="text-[2.1vh] text-accent" />
								tap a word you don&apos;t know
							</span>
							<div className="flex flex-wrap gap-[0.4vw]">
								{lesson.glossary.map((entry, i) => (
									<button
										key={entry.term}
										type="button"
										onClick={() => setOpen(open === i ? null : i)}
										aria-pressed={open === i}
										className={`press cursor-pointer rounded-full border-[0.25vh] px-[0.7vw] py-[0.4vh] font-mono text-[1.6vh] leading-none ${
											open === i
												? "border-solid border-accent bg-accent text-white"
												: "border-dashed border-choco/30 bg-white text-ink hover:bg-accent-soft"
										}`}
									>
										{entry.term}
									</button>
								))}
							</div>
							<div className="min-h-0 flex-1">
								{open !== null ? (
									<p
										key={open}
										className="page-in cute-notebook text-[1.95vh] leading-[1.3] text-choco/80"
									>
										{lesson.glossary[open].what}
									</p>
								) : (
									<Hint>
										every one of these is a thing you&apos;ll type a thousand
										times.
									</Hint>
								)}
							</div>
						</div>
					)}

				</div>

				{/* right: the code, with the rendered page a tab away */}
				<CodeViewTabs
					className="min-h-0 flex-1"
					code={tabs}
					view={<LivePreview files={files} className="min-h-0 flex-1" />}
				/>
			</div>

			{lesson.milestone && (
				<p className="cute-notebook flex shrink-0 items-center justify-center gap-[0.5vw] rounded-[1vh] border-[0.3vh] border-solid border-accent bg-accent-soft px-[1.2vw] py-[0.4vh] text-center text-[2vh] leading-[1.2] text-ink">
					<Icon name="confetti" className="text-[2.3vh] text-accent" />
					{lesson.milestone}
				</p>
			)}
		</div>
	);
}

function langOf(file: string): "html" | "css" | "js" {
	if (file.endsWith(".css")) return "css";
	if (file.endsWith(".js")) return "js";
	return "html";
}
