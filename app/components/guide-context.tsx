"use client";

import { createContext, useContext } from "react";
import type { Track } from "../lib/guide-data";
import type { IconName } from "./icons";

export type GuideCtx = {
	track: Track;
	setTrack: (t: Track) => void;
	palette: number;
	setPalette: (i: number) => void;
	font: number;
	setFont: (i: number) => void;
	layout: number;
	setLayout: (i: number) => void;
	name: string;
	setName: (s: string) => void;
	tagline: number;
	setTagline: (i: number) => void;
	stickers: IconName[];
	toggleSticker: (s: IconName) => void;
	go: (delta: number) => void;
	start: (t: Track) => void;
};

const Ctx = createContext<GuideCtx | null>(null);

export const GuideProvider = Ctx.Provider;

export function useGuide() {
	const value = useContext(Ctx);
	if (!value) throw new Error("useGuide must be used inside the guide");
	return value;
}

/** The name shown in previews before the user types their own. */
export function displayName(name: string) {
	return name.trim() || "your name";
}
