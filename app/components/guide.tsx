"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { PALETTES, type Track } from "../lib/guide-data";
import { GuideProvider, type GuideCtx } from "./guide-context";
import { Icon, type IconName } from "./icons";
import { Plaque } from "./plaque";
import { SLIDES } from "./slides";

const TRACK_LABEL: Record<Track, string> = {
	beginner: "beginner",
	pro: "speedrun",
	submit: "submitting",
};

const FOOTER_PLAQUE =
	"flex h-[5.4vh] min-w-[15vh] items-center justify-center px-[1.4vw] text-[2.1vh] leading-none";

export function Guide() {
	const [track, setTrack] = useState<Track>("beginner");
	const [index, setIndex] = useState(0);
	const [palette, setPalette] = useState(0);
	const [font, setFont] = useState(1);
	const [layout, setLayout] = useState(0);
	const [name, setName] = useState("");
	const [tagline, setTagline] = useState(0);
	const [stickers, setStickers] = useState<IconName[]>([]);

	const slides = useMemo(() => {
		// "I already made one" skips the whole guide and goes straight to the form.
		if (track === "submit")
			return SLIDES.filter((s) =>
				["welcome", "submit", "treat"].includes(s.id),
			);
		return SLIDES.filter((s) => !(s.setupOnly && track === "pro"));
	}, [track]);

	// Track switching changes the deck length — never point past the end.
	const current = Math.min(index, slides.length - 1);
	const slide = slides[current];

	const go = useCallback(
		(delta: number) =>
			setIndex((i) =>
				Math.max(
					0,
					Math.min(slides.length - 1, Math.min(i, slides.length - 1) + delta),
				),
			),
		[slides.length],
	);

	const ctx: GuideCtx = {
		track,
		setTrack,
		palette,
		setPalette,
		font,
		setFont,
		layout,
		setLayout,
		name,
		setName,
		tagline,
		setTagline,
		stickers,
		toggleSticker: (s) =>
			setStickers((prev) =>
				prev.includes(s)
					? prev.filter((x) => x !== s)
					: prev.length >= 5
						? prev
						: [...prev, s],
			),
		go,
		start: (t) => {
			setTrack(t);
			setIndex(1);
		},
	};

	// Arrow keys turn pages, unless the user is typing.
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			const el = e.target as HTMLElement | null;
			if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
			if (e.key === "ArrowRight") go(1);
			if (e.key === "ArrowLeft") go(-1);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [go]);

	const p = PALETTES[palette];
	const onWelcome = current === 0;
	const atEnd = current === slides.length - 1;

	return (
		<GuideProvider value={ctx}>
			<div
				style={
					{
						"--accent": p.accent,
						"--accent-mid": p.mid,
						"--accent-soft": p.soft,
						backgroundImage:
							"radial-gradient(ellipse at 50% 40%, rgba(255,240,215,0.35), rgba(60,32,15,0.55)), url(/wood.png)",
						backgroundSize: "auto, 60vh",
					} as React.CSSProperties
				}
				className="grid h-dvh w-full place-items-center overflow-hidden p-[2vh]"
			>
				{/* the dessert box */}
				<div className="flex h-[94vh] w-[min(92vw,168vh)] flex-col overflow-hidden rounded-[1.8vh] border-[0.45vh] border-[#4a2a16]/60">
					{/* lid */}
					<header className="flex h-[8.5vh] shrink-0 items-center justify-between gap-[1.5vw] border-b-[0.35vh] border-[#2f1a0c]/50 bg-[#d1b289] px-[1.6vw]">
						<div className="fixed top-0 left-[8vw] w-[13vw] z-10">
							<img
								src="/board.png"
								className=" drop-shadow-xl z-10 drop-shadow-black/40"
								alt=""
							/>
							{/* <span className="cute-notebook absolute bottom-[25%] left-[50%] -translate-x-[50%] text-[3.4vh] leading-[0.95] tracking-[0.15vw] text-cream">
								REFRESHER
							</span> */}
							<div className="flex min-w-0 items-center gap-[0.8vw] absolute bottom-[25%] left-[50%] -translate-x-[50%]">
								<span className="min-w-0">
									<span className="cute-notebook block text-[3.4vh] leading-[0.95] tracking-[0.15vw] text-cream">
										REFRESHER
									</span>
								</span>
							</div>
						</div>
						{/* <div className="flex min-w-0 items-center gap-[0.8vw]">
							<Icon name="boba" className="text-[4vh] text-cream/90" />
							<span className="min-w-0">
								<span className="cute-notebook block text-[3.4vh] leading-[0.95] tracking-[0.15vw] text-cream">
									REFRESHER
								</span>
								<span className="cute-notebook block truncate text-[1.75vh] leading-[1.1] text-cream/60">
									{slide.crumb}
								</span>
							</span>
						</div> */}
						<div className=""></div>

						<div className="flex shrink-0 items-center gap-[0.8vw]">
							{!onWelcome && (
								<span className="cute-notebook hidden text-[1.8vh] text-choco/55 sm:block">
									{TRACK_LABEL[track]}
								</span>
							)}
							{/* dots, grouped by chapter so 30+ of them stay legible */}
							<div className="flex items-center gap-[1.1vh]">
								{groupByChapter(slides).map((group) => (
									<div
										key={group.key}
										className="flex items-center gap-[0.4vh]"
									>
										{group.items.map(({ slide: s, index: i }) => (
											<button
												key={s.id}
												type="button"
												aria-label={s.crumb}
												aria-current={i === current}
												onClick={() => setIndex(i)}
												className="press h-[1.2vh] cursor-pointer rounded-full transition-all"
												style={{
													width: i === current ? "3vh" : "1.2vh",
													background:
														i === current
															? p.accent
															: i < current
																? "rgba(107,63,34,0.45)"
																: "rgba(107,63,34,0.18)",
												}}
											/>
										))}
									</div>
								))}
							</div>
							<span className="cute-notebook w-[6vh] shrink-0 text-right text-[1.8vh] text-choco">
								{current + 1}/{slides.length}
							</span>
						</div>
					</header>

					{/* the page */}
					<main
						style={{
							backgroundImage: "url(/paper.png)",
							backgroundSize: "cover",
							backgroundBlendMode: "multiply",
						}}
						className="min-h-0 flex-1 bg-cream p-[2vh]"
					>
						<div key={slide.id} className="page-in h-full min-h-0">
							<slide.Body />
						</div>
					</main>

					{/* footer / nav */}
					<footer className="flex h-[7.5vh] shrink-0 items-center justify-between gap-[1vw] border-t-[0.35vh] border-[#2f1a0c]/50 bg-[#d1b289] px-[1.6vw]">
						<Plaque
							onClick={() => go(-1)}
							disabled={onWelcome}
							className={FOOTER_PLAQUE}
						>
							← back
						</Plaque>

						<span className="cute-notebook hidden items-center gap-[0.5vw] truncate text-[1.85vh] text-choco/70 md:flex">
							<Icon name="ribbon" className="text-[2.1vh] text-accent" />
							<span>
								Athena · girls only · a{" "}
								<a
									href="https://hackclub.com"
									target="_blank"
									rel="noopener noreferrer"
									className="underline decoration-choco/30 underline-offset-[0.4vh] hover:text-accent"
								>
									Hack Club
								</a>{" "}
								program
							</span>
						</span>

						{onWelcome ? (
							<span className="cute-notebook text-[1.95vh] text-choco/70">
								↑ pick a starting point
							</span>
						) : atEnd ? (
							<Plaque onClick={() => setIndex(0)} className={FOOTER_PLAQUE}>
								start over ↺
							</Plaque>
						) : (
							<Plaque onClick={() => go(1)} className={FOOTER_PLAQUE}>
								next →
							</Plaque>
						)}
					</footer>
				</div>
			</div>
		</GuideProvider>
	);
}

/**
 * Bucket slides by the chapter in their crumb ("html · headings" → "html") so
 * the progress dots can breathe once the deck is 30 slides long.
 */
function groupByChapter(slides: { id: string; crumb: string }[]) {
	const groups: {
		key: string;
		items: { slide: { id: string; crumb: string }; index: number }[];
	}[] = [];
	slides.forEach((slide, index) => {
		const key = slide.crumb.split("·")[0].trim();
		const last = groups[groups.length - 1];
		if (last && last.key === key) last.items.push({ slide, index });
		else groups.push({ key, items: [{ slide, index }] });
	});
	return groups;
}
