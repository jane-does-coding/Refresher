import type { IconName } from "../components/icons";

export type Track = "beginner" | "pro" | "submit";

export type Palette = {
	name: string;
	icon: IconName;
	accent: string;
	mid: string;
	soft: string;
};

export const PALETTES: Palette[] = [
	{
		name: "Strawberry Milk",
		icon: "strawberry",
		accent: "#f18aa0",
		mid: "#f7c9d2",
		soft: "#fdeef1",
	},
	{
		name: "Matcha Latte",
		icon: "matcha",
		accent: "#8fb573",
		mid: "#cfdfba",
		soft: "#eef4e4",
	},
	{
		name: "Blueberry Muffin",
		icon: "blueberry",
		accent: "#8b96d4",
		mid: "#c6cced",
		soft: "#eaecf8",
	},
	{
		name: "Caramel Drizzle",
		icon: "honey",
		accent: "#dc9a4a",
		mid: "#f0cf9e",
		soft: "#fbeed6",
	},
];

export type FontChoice = {
	name: string;
	blurb: string;
	stack: string;
	css: string;
};

export const FONTS: FontChoice[] = [
	{
		name: "Serif",
		blurb: "has little feet on the letters. reads warm and a bit bookish.",
		stack: "Georgia, ui-serif, serif",
		css: "font-family: Georgia, serif;",
	},
	{
		name: "Sans-serif",
		blurb: "no feet. plain and friendly. most sites use one of these.",
		stack: "var(--font-geist-sans), system-ui, sans-serif",
		css: "font-family: system-ui, sans-serif;",
	},
	{
		name: "Monospace",
		blurb:
			"every letter takes up the same width. looks like code, in a good way.",
		stack: "var(--font-geist-mono), ui-monospace, monospace",
		css: "font-family: monospace;",
	},
];

export type LayoutChoice = {
	name: string;
	blurb: string;
	centered: boolean;
};

/** Order matters — WireShape draws each one by index. */
export const LAYOUTS: LayoutChoice[] = [
	{
		name: "The Stack",
		blurb: "one column, top to bottom. the easiest one to get right.",
		centered: false,
	},
	{
		name: "The Sidebar",
		blurb: "a strip of you down the left, your stuff on the right.",
		centered: false,
	},
	{
		name: "The Card",
		blurb:
			"one small card in the middle of the screen. says very little on purpose.",
		centered: true,
	},
];

export const TAGLINES = [
	"i make things on the internet",
	"professional dessert enjoyer",
	"currently learning about six things",
	"i build small weird websites",
];

export const STICKERS: IconName[] = [
	"star",
	"heart",
	"flower",
	"cloud",
	"moon",
	"sparkle",
	"ribbon",
	"cherry",
	"donut",
	"leaf",
	"shell",
	"envelope",
];

export const DESSERTS: { icon: IconName; name: string; note: string }[] = [
	{
		icon: "boba",
		name: "Strawberry Refresher",
		note: "the standard order. ice to the top.",
	},
	{
		icon: "cake",
		name: "Slice of Something",
		note: "arguably not a drink. still counts.",
	},
	{
		icon: "cone",
		name: "Soft Serve Swirl",
		note: "you're on a timer with this one.",
	},
];

export const OSES: {
	id: string;
	icon: IconName;
	name: string;
	steps: string[];
}[] = [
	{
		id: "mac",
		icon: "apple",
		name: "Mac",
		steps: [
			"go to code.visualstudio.com. the big blue button knows you're on a Mac",
			"open the .zip, then drag Visual Studio Code into your Applications folder",
			"open it from Applications. right-click and Open if it gets nervous",
		],
	},
	{
		id: "windows",
		icon: "window",
		name: "Windows",
		steps: [
			"go to code.visualstudio.com and grab the Windows installer (.exe)",
			"run it, and tick Add to PATH when it offers. you will want that later",
			"launch VS Code from the Start menu",
		],
	},
	{
		id: "linux",
		icon: "penguin",
		name: "Linux",
		steps: [
			"grab the .deb or .rpm from code.visualstudio.com",
			"install it with your package manager, or grab the Flatpak",
			"launch it with `code` from your terminal",
		],
	},
];

export type Chapter = {
	id: string;
	label: string;
	icon: IconName;
	blurb: string;
	bullets: string[];
	setupOnly?: boolean;
};

export const CHAPTERS: Chapter[] = [
	{
		id: "setup",
		label: "Set up your workspace",
		icon: "toolbox",
		blurb: "install VS Code, make a GitHub account, etc.",
		bullets: [],
		setupOnly: true,
	},
	{
		id: "html",
		label: "Write the HTML",
		icon: "code",
		blurb: "Write the structure of your website.",
		bullets: [],
	},
	{
		id: "css",
		label: "Style it with CSS",
		icon: "braces",
		blurb: "Style how your website looks",
		bullets: [],
	},
	{
		id: "js",
		label: "Make it do something",
		icon: "bolt",
		blurb: "Add the Javascript to make it functional",
		bullets: [],
	},
];

export type ChapterId = (typeof CHAPTERS)[number]["id"];

/**
 * The eyebrow above each slide title, e.g. "02 · Write the HTML". Derived from
 * CHAPTERS so the numbering can't drift out of sync with the outline.
 */
export function chapterLabel(id: ChapterId): string {
	const i = CHAPTERS.findIndex((c) => c.id === id);
	if (i < 0) return "";
	return `${String(i + 1).padStart(2, "0")} · ${CHAPTERS[i].label}`;
}
