"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CHAPTERS, FONTS, OSES } from "../lib/guide-data";
import { LESSONS } from "../lib/curriculum";
import { displayName, useGuide } from "./guide-context";
import { Icon, type IconName } from "./icons";
import { LessonSlide } from "./lesson-slide";
import { CodeViewTabs } from "./code-view-tabs";
import { CheckRow, Chip, Hint, PickCard, StepHead, Sticker, Tray } from "./kit";
import { Plaque, PlaqueLink } from "./plaque";

export type Slide = {
	id: string;
	/** Shown in the header breadcrumb. */
	crumb: string;
	Body: () => ReactNode;
	/** Only shown on the beginner track. */
	setupOnly?: boolean;
};

/* ------------------------------------------------------------------ */
/* 1 · welcome                                                         */
/* ------------------------------------------------------------------ */

function Welcome() {
	const g = useGuide();
	return (
		<div className="flex h-full min-h-0 gap-[1.6vw]">
			<div className="hatch relative flex w-[36%] shrink-0 flex-col items-center justify-center gap-[1.4vh] overflow-hidden rounded-[1.4vh] border-[0.3vh] border-dashed border-choco/25 bg-accent-soft/70 p-[1.5vh] text-center">
				{/* <Icon
					name="boba"
					className="text-[15vh] text-choco/80"
					strokeWidth={1.2}
				/> */}
				<img src="/boba.png" className="w-[15vw] rounded-[1vh]" alt="" />
				<h1 className="cute-notebook text-[7.5vh] leading-[0.9] font-semibold text-ink">
					Refresher
				</h1>
				<p className="cute-notebook max-w-[28ch] text-[2.5vh] leading-[1.25] text-choco/75">
					make a website, and get a $10 grant to go buy yourself something cold
					and sweet.
				</p>
				<div className="mt-[0.5vh] flex flex-col items-center gap-[0.7vh]">
					<Sticker rotate="0deg" icon="ribbon">
						Athena · girls only
					</Sticker>
					<a
						href="https://hackclub.com"
						target="_blank"
						rel="noopener noreferrer"
						className="cute-notebook text-[2.05vh] mt-[1vh] leading-none text-choco/60 underline decoration-choco/30 underline-offset-[0.5vh] hover:text-accent"
					>
						a Hack Club program ↗
					</a>
				</div>
			</div>

			<div className="flex min-h-0 flex-1 flex-col justify-center gap-[2vh]">
				<div>
					<h2 className="cute-notebook text-[4.4vh] leading-[1.05] font-semibold text-ink mb-[2vh]">
						What is Refresher?
					</h2>
					<p className="cute-notebook text-[2.5vh] leading-[1.3] text-choco/75">
						If this is your first time ever building a website, you can follow
						the guide and make your HTML, CSS, and JS personal website, and
						submit it! And if you already know how to make a website, then make
						one and submit it for a Refresher!
					</p>
				</div>

				<div className="grid grid-cols-2 gap-[1.1vh]">
					{[
						[
							"1",
							"Complete the Setup",
							"get the VS code, Github account, etc.",
						],
						["2", "Write the HTML", "setup the website"],
						["3", "Write the CSS", "make your website pretty"],
						["4", "Write the JS", "ALL DONE - get a refrsher"],
					].map(([n, t, s]) => (
						<div
							key={n}
							className="flex items-start gap-[0.7vw] rounded-[1vh] border-[0.25vh] border-dashed border-choco/25 bg-paper px-[1vw] py-[1.1vh]"
						>
							{/* <span className="cute-notebook flex h-[3.2vh] w-[3.2vh] shrink-0 items-center justify-center rounded-full bg-accent text-[2.1vh] text-white">
								{n}
							</span> */}
							<span className="min-w-0">
								<span className="cute-notebook block text-[2.5vh] leading-[1.1] text-ink">
									{t}
								</span>
								<span className="cute-notebook block text-[2vh] leading-[1.15] text-choco/60">
									{s}
								</span>
							</span>
						</div>
					))}
				</div>

				<div className="flex flex-col gap-[0.9vh]">
					<p className="cute-notebook text-[2.9vh] leading-none text-ink my-[1vh]">
						Where are you starting from?
					</p>
					<div className="flex gap-[0.9vw]">
						<TrackButton
							icon="sprout"
							title="First website"
							sub="start at installing VS Code"
							onClick={() => g.start("beginner")}
						/>
						<TrackButton
							icon="bolt"
							title="Made one before"
							sub="start at the code"
							onClick={() => g.start("pro")}
						/>
						<TrackButton
							icon="envelope"
							title="Submit your own"
							sub="made one without a guide"
							onClick={() => g.start("submit")}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function TrackButton({
	icon,
	title,
	sub,
	onClick,
}: {
	icon: IconName;
	title: string;
	sub: string;
	onClick: () => void;
}) {
	return (
		<Plaque
			onClick={onClick}
			className="flex flex-1 items-center justify-center gap-[0.7vw] px-[1vw] py-[1.5vh] text-center"
		>
			{/* 			<Icon name={icon} className="text-[4vh] text-cream/85" />
			 */}{" "}
			<span className="min-w-0">
				<span className="block text-[2.5vh] leading-[1.15] font-semibold">
					{title}
				</span>
				<span className="block text-[1.9vh] leading-[1.2] text-cream/70">
					{sub}
				</span>
			</span>
		</Plaque>
	);
}

/* ------------------------------------------------------------------ */
/* 2 · the outline                                                     */
/* ------------------------------------------------------------------ */

function Outline() {
	const g = useGuide();
	return (
		<div className="flex h-full min-h-0 flex-col gap-[1.4vh] pt-[2vh]">
			<StepHead
				kicker="the whole thing on one page"
				title="Table of Contents"
				sub="Setup, HTML, CSS, JS, Deploy"
			/>
			<div className="flex min-h-0 flex-1 flex-col justify-center gap-[1.1vh]">
				{CHAPTERS.map((c, i) => {
					const skipped = c.setupOnly && g.track === "pro";
					return (
						<div
							key={c.id}
							className={`flex shrink-0 items-center gap-[1vw] rounded-[1.2vh] border-[0.3vh] border-dashed border-choco/25 bg-paper px-[1.3vw] py-[1.3vh] ${
								skipped ? "opacity-55" : ""
							}`}
						>
							<span className="cute-notebook w-[3.6vh] shrink-0 text-[2.2vh] text-choco/40">
								0{i + 1}
							</span>
							{/* <Icon name={c.icon} className="text-[3.6vh] text-accent" /> */}
							<span className="min-w-0 flex-1">
								<span
									className={`cute-notebook block text-[2.9vh] leading-[1.1] font-semibold text-ink ${
										skipped ? "line-through" : ""
									}`}
								>
									{c.label}
								</span>
								<span className="cute-notebook block text-[2.1vh] leading-[1.2] text-choco/60">
									{c.blurb}
								</span>
							</span>
							{skipped && (
								<Sticker rotate="0deg">skipping, you got this</Sticker>
							)}
						</div>
					);
				})}
			</div>
			<Hint>psst, the arrow keys turn the pages too.</Hint>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/* 3 · install vs code (beginner)                                       */
/* ------------------------------------------------------------------ */

function InstallEditor() {
	const [os, setOs] = useState<string>("mac");
	const [installed, setInstalled] = useState(false);
	const chosen = OSES.find((o) => o.id === os)!;

	return (
		<div className="flex h-full min-h-0 flex-col gap-[1.4vh]">
			<StepHead
				chapter="setup"
				title="Get an editor"
				sub="VS Code is a text editor that understands code. It's free, and it's the one most people use."
			/>
			<Tray
				title="pick your computer"
				icon="cursor"
				className="flex-1 gap-[1.6vh]"
			>
				<div className="flex h-[13vh] shrink-0 gap-[1vw]">
					{OSES.map((o) => (
						<PickCard
							key={o.id}
							selected={os === o.id}
							onClick={() => setOs(o.id)}
							className="flex-1 items-center justify-center gap-[0.6vh]"
						>
							<Icon
								name={o.icon}
								className={`text-[5vh] ${
									os === o.id ? "text-accent" : "text-choco/55"
								}`}
							/>
							<span className="cute-notebook text-[2.5vh] leading-none text-ink">
								{o.name}
							</span>
						</PickCard>
					))}
				</div>
				<div className="flex min-h-0 flex-1 gap-[1vw]">
					<div className="flex w-[52%] shrink-0 flex-col gap-[1vh]">
						<ol
							key={os}
							className="page-in flex min-h-0 flex-1 flex-col justify-center gap-[1.6vh] rounded-[1vh] border-[0.25vh] border-dashed border-choco/25 bg-paper px-[1.4vw] py-[1.2vh]"
						>
							{chosen.steps.map((s, i) => (
								<li
									key={i}
									className="cute-notebook flex gap-[0.8vw] text-[2.5vh] leading-[1.25] text-ink"
								>
									<span className="text-accent">{i + 1}.</span>
									<span>{s}</span>
								</li>
							))}
						</ol>
						<PlaqueLink
							href="https://code.visualstudio.com/download"
							className="flex shrink-0 items-center justify-center gap-[0.6vw] px-[1vw] py-[1vh] text-[2.4vh] leading-none"
						>
							code.visualstudio.com
							<Icon name="chevron" className="-rotate-90 text-[2.2vh]" />
						</PlaqueLink>
						<button
							type="button"
							onClick={() => setInstalled((v) => !v)}
							className="press flex shrink-0 cursor-pointer items-center justify-center gap-[0.8vw] rounded-[1vh] border-[0.3vh] border-dashed border-choco/30 bg-paper px-[1vw] py-[1vh] text-center hover:bg-white"
						>
							{installed ? (
								<>
									<Icon
										name="confetti"
										className="stamp-in text-[3.4vh] text-accent"
									/>
									<span className="cute-notebook text-[2.5vh] leading-none font-semibold text-accent">
										installed. nice one
									</span>
								</>
							) : (
								<>
									<Icon
										name="download"
										className="float text-[3.4vh] text-choco/60"
									/>
									<span className="cute-notebook text-[2.5vh] leading-none text-ink">
										tap this once it&apos;s installed
									</span>
								</>
							)}
						</button>
					</div>
					<MiniEditor className="min-h-0 flex-1" />
				</div>
			</Tray>
		</div>
	);
}

/** A pretend VS Code window, so "an editor" stops being an abstract noun. */
function MiniEditor({ className = "" }: { className?: string }) {
	const code: [string, string][] = [
		["#c792ea", "<h1>"],
		["#f7c9d2", "  hi, i'm you"],
		["#c792ea", "</h1>"],
		["", ""],
		["#82aaff", "body {"],
		["#c3e88d", "  background: pink;"],
		["#82aaff", "}"],
	];
	return (
		<div
			className={`flex flex-col overflow-hidden rounded-[1vh] border-[0.3vh] border-choco/30 bg-[#1e1e2e] ${className}`}
		>
			<div className="flex shrink-0 items-center gap-[0.4vw] border-b-[0.2vh] border-white/10 px-[0.7vw] py-[0.5vh]">
				<span className="h-[1vh] w-[1vh] rounded-full bg-[#f18aa0]" />
				<span className="h-[1vh] w-[1vh] rounded-full bg-[#f0cf9e]" />
				<span className="h-[1vh] w-[1vh] rounded-full bg-[#a8c686]" />
				<span className="ml-[0.5vw] font-mono text-[1.5vh] text-white/40">
					index.html — my-website
				</span>
			</div>
			<div className="flex min-h-0 flex-1">
				<div className="flex w-[38%] shrink-0 flex-col gap-[0.6vh] border-r-[0.2vh] border-white/10 px-[0.6vw] py-[0.8vh]">
					{(
						[
							["fileCode", "index.html"],
							["fileBrush", "style.css"],
							["fileText", "about.md"],
						] as [IconName, string][]
					).map(([icon, f], i) => (
						<span
							key={f}
							className={`flex items-center gap-[0.4vw] truncate font-mono text-[1.5vh] leading-[1.4] ${
								i === 0 ? "text-white/80" : "text-white/35"
							}`}
						>
							<Icon name={icon} className="text-[1.8vh]" />
							{f}
						</span>
					))}
				</div>
				<div className="flex min-h-0 flex-1 flex-col px-[0.7vw] py-[0.8vh]">
					{code.map(([c, t], i) => (
						<span
							key={i}
							className="font-mono text-[1.5vh] leading-[1.5] whitespace-pre"
							style={{ color: c || "transparent" }}
						>
							{t || " "}
						</span>
					))}
					<span className="mt-auto font-mono text-[1.4vh] text-white/25 italic">
						this is where you type
					</span>
				</div>
			</div>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/* 5 · github (beginner)                                                */
/* ------------------------------------------------------------------ */

function GithubStep() {
	const [done, setDone] = useState<Record<string, boolean>>({});
	const toggle = (k: string) => setDone((d) => ({ ...d, [k]: !d[k] }));
	const steps = [
		"go to github.com and hit Sign up",
		"use an email you actually check",
		"pick any username you like",
		"click the link in the verification email",
	];
	const allDone = steps.every((t) => done[t]);

	return (
		<div className="flex h-full min-h-0 flex-col gap-[1.4vh]">
			<StepHead
				chapter="setup"
				title="Make a GitHub account"
				sub="GitHub stores code online, and it will host your website for free once it's finished. Signing up takes about two minutes."
			/>
			<div className="flex min-h-0 flex-1 gap-[1.2vw]">
				<div className="flex w-[44%] shrink-0 flex-col justify-center gap-[1.2vh] rounded-[1.2vh] border-[0.3vh] border-dashed border-choco/25 bg-paper px-[1.4vw] py-[1.4vh]">
					<p className="cute-notebook text-[2.4vh] leading-[1.3] text-ink">
						You need it for one reason: at the end of this guide, GitHub turns a
						folder of files into a real web address for free.
					</p>
					<p className="cute-notebook text-[2.2vh] leading-[1.3] text-choco/70">
						You won&apos;t touch it again until the last chapter. Make the
						account now and forget about it.
					</p>
					<Hint>
						Your username ends up in your website address, so pick something
						you&apos;d be fine putting on a CV.
					</Hint>
				</div>

				<Tray title="tick these off" icon="checklist" className="flex-1">
					<div className="flex min-h-0 flex-1 flex-col justify-center gap-[0.4vh]">
						{steps.map((t) => (
							<CheckRow key={t} done={!!done[t]} onToggle={() => toggle(t)}>
								{t}
							</CheckRow>
						))}
						<p
							className={`cute-notebook mt-[1vh] text-center text-[2.4vh] ${
								allDone ? "stamp-in text-accent" : "text-choco/45"
							}`}
						>
							{allDone
								? "that's the account sorted"
								: "tap each one as you do it"}
						</p>
					</div>
				</Tray>
			</div>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/* 8 · font                                                             */
/* ------------------------------------------------------------------ */

function FontStep() {
	const g = useGuide();
	const [bold, setBold] = useState(true);
	const font = FONTS[g.font];

	return (
		<div className="flex h-full min-h-0 flex-col gap-[1.4vh]">
			<StepHead
				chapter="css"
				title="Serif, sans, or mono?"
				sub="Serifs are the little feet on the ends of letters. That's the entire difference between the first two, and it changes how the page feels."
			/>
			<div className="flex min-h-0 flex-1 gap-[1.2vw]">
				<Tray
					title="click through them"
					icon="letters"
					className="w-[42%] shrink-0"
				>
					<div className="flex min-h-0 flex-1 flex-col gap-[1vh]">
						{FONTS.map((f, i) => (
							<PickCard
								key={f.name}
								selected={g.font === i}
								onClick={() => g.setFont(i)}
								className="min-h-0 flex-1 flex-row items-center gap-[1vw]"
							>
								<span
									className="w-[6vh] shrink-0 text-center text-[4.5vh] leading-[1]"
									style={{ fontFamily: f.stack }}
								>
									Aa
								</span>
								<span className="min-w-0">
									<span className="cute-notebook block text-[2.4vh] leading-[1.1] text-ink">
										{f.name}
									</span>
									<span className="cute-notebook block text-[1.9vh] leading-[1.2] text-choco/60">
										{f.blurb}
									</span>
								</span>
							</PickCard>
						))}
						<Chip
							active={bold}
							onClick={() => setBold((v) => !v)}
							className="shrink-0 self-start"
						>
							<span className="cute-notebook flex items-center gap-[0.3vw]">
								bold
								{bold && (
									<Icon name="check" className="text-[2vh]" strokeWidth={2.6} />
								)}
							</span>
						</Chip>
					</div>
				</Tray>

				<CodeViewTabs
					className="min-h-0 flex-1"
					code={[
						{
							label: "style.css",
							lang: "css",
							code: `body {\n  ${font.css}\n}`,
							note: "That one line sets the font for everything inside body.",
						},
					]}
					view={
						/* a type specimen, in whichever font is winning */
						<div
							key={`${g.font}-${bold}`}
							className="page-in flex min-h-0 flex-1 flex-col justify-center gap-[1.6vh] overflow-hidden rounded-[1.1vh] border-[0.3vh] border-choco/25 bg-white px-[1.6vw] py-[1.2vh]"
							style={{ fontFamily: font.stack }}
						>
							<p
								className={`text-[4.4vh] leading-[1.1] text-ink ${
									bold ? "font-bold" : "font-normal"
								}`}
							>
								hi, i&apos;m {displayName(g.name)}
							</p>
							<p className="max-w-[62ch] text-[2.3vh] leading-[1.45] text-choco/80">
								I built this website from an empty folder on a Tuesday. It has
								my name on it, a photo I like, and three things I made.
							</p>
							<p className="text-[1.9vh] tracking-[0.25vw] text-choco/50 uppercase">
								about · projects · say hi
							</p>
						</div>
					}
				/>
			</div>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/* 13 · the treat                                                       */
/* ------------------------------------------------------------------ */
/* send it in                                                          */
/* ------------------------------------------------------------------ */

const FORM_URL = "https://forms.hackclub.com/t/oQzwoH6LQmus";

function SubmitStep() {
	const g = useGuide();
	const [done, setDone] = useState<Record<string, boolean>>({});
	const toggle = (k: string) => setDone((d) => ({ ...d, [k]: !d[k] }));
	const handle =
		displayName(g.name)
			.toLowerCase()
			.replace(/[^a-z0-9]/g, "") || "yourname";
	const needs = [
		`your live link, like ${handle}.github.io`,
		"your repo link, so we can see the code",
		"an email we can reach you on",
	];

	return (
		<div className="flex h-full min-h-0 flex-col gap-[1.4vh]">
			<StepHead
				chapter="ship"
				title="Send it in"
				sub={
					g.track === "submit"
						? "You already have a site, so there's nothing to build. Drop the link in the form and you're done."
						: "One form, three fields. This is what gets you the drink."
				}
			/>
			<div className="flex min-h-0 flex-1 gap-[1.2vw]">
				<Tray
					title="have these ready"
					icon="checklist"
					className="w-[46%] shrink-0"
				>
					<div className="flex min-h-0 flex-1 flex-col justify-center gap-[0.3vh]">
						{needs.map((t) => (
							<CheckRow key={t} done={!!done[t]} onToggle={() => toggle(t)}>
								{t}
							</CheckRow>
						))}
						<Hint>
							Not finished yet? The form isn&apos;t going anywhere. Come back to
							it.
						</Hint>
					</div>
				</Tray>

				<div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-[1.2vh] rounded-[1.2vh] border-[0.3vh] border-dashed border-choco/25 bg-paper px-[1.4vw] py-[1.4vh] text-center">
					<Icon
						name="envelope"
						className="float text-[7vh] text-accent"
						strokeWidth={1.5}
					/>
					<PlaqueLink
						href={FORM_URL}
						className="flex items-center gap-[0.6vw] px-[1.6vw] py-[1.3vh] text-[2.6vh] leading-none"
					>
						open the form
						<Icon name="chevron" className="-rotate-90 text-[2.4vh]" />
					</PlaqueLink>
					<code className="rounded-[0.7vh] border-[0.25vh] border-dashed border-choco/25 bg-cream px-[0.9vw] py-[0.5vh] font-mono text-[1.7vh] break-all text-choco/70">
						{FORM_URL}
					</code>
					<Hint>
						opens in a new tab, so you won&apos;t lose your place here.
					</Hint>
				</div>
			</div>
		</div>
	);
}

/** Look a lesson up by id so the deck below reads as an explicit running order. */
function lessonSlide(id: string): Slide {
	const lesson = LESSONS.find((l) => l.id === id);
	if (!lesson) throw new Error(`unknown lesson: ${id}`);
	return {
		id: lesson.id,
		crumb: lesson.crumb,
		Body: () => <LessonSlide lesson={lesson} />,
	};
}

export const SLIDES: Slide[] = [
	{ id: "welcome", crumb: "welcome", Body: Welcome },
	{ id: "outline", crumb: "the outline", Body: Outline },

	// Set up: install one app, sign up for one site.
	{
		id: "editor",
		crumb: "set up · editor",
		Body: InstallEditor,
		setupOnly: true,
	},
	{ id: "github", crumb: "set up · github", Body: GithubStep, setupOnly: true },

	// HTML: files, then the page, built up one element at a time.
	lessonSlide("html-files"),
	lessonSlide("html-skeleton"),
	lessonSlide("html-headings"),
	lessonSlide("html-text"),
	lessonSlide("html-boxes"),
	lessonSlide("html-lists"),
	lessonSlide("html-links"),
	lessonSlide("html-open"),

	// CSS: hook it up, learn to aim, then style. The font picker sits right
	// before the lesson that writes font-family, so the choice is fresh.
	lessonSlide("css-link"),
	lessonSlide("css-selectors"),
	lessonSlide("css-colour"),
	{ id: "font", crumb: "css · pick a font", Body: FontStep },
	lessonSlide("css-fonts"),
	lessonSlide("css-box"),
	lessonSlide("css-flex"),
	lessonSlide("css-hover"),

	// JavaScript.
	lessonSlide("js-link"),
	lessonSlide("js-select"),
	lessonSlide("js-click"),

	{ id: "submit", crumb: "send it in", Body: SubmitStep },
];
