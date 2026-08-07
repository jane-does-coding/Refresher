"use client";

import { useState, type ReactNode } from "react";
import { CodeBlock, type CodeTab } from "./code-block";
import { Icon, type IconName } from "./icons";

/**
 * The right-hand pane every slide shares: code on top by default, with a
 * second tab for the rendered result.
 *
 * Both panes stay mounted and one is just hidden, so flipping to "view" and
 * back doesn't reload the iframe or throw away anything you clicked in it.
 */
export function CodeViewTabs({
	code,
	view,
	className = "",
}: {
	code: CodeTab[];
	view: ReactNode;
	className?: string;
}) {
	const [tab, setTab] = useState<"code" | "view">("code");

	return (
		<div className={`flex min-h-0 flex-col ${className}`}>
			<div className="flex shrink-0 gap-[0.4vw]">
				<PaneTab
					active={tab === "code"}
					onClick={() => setTab("code")}
					icon="code"
					tone="dark"
				>
					code
				</PaneTab>
				<PaneTab
					active={tab === "view"}
					onClick={() => setTab("view")}
					icon="eye"
					tone="light"
				>
					view
				</PaneTab>
			</div>

			<div className="relative min-h-0 flex-1">
				<div
					className={`absolute inset-0 flex flex-col ${
						tab === "code" ? "" : "invisible pointer-events-none"
					}`}
				>
					<CodeBlock tabs={code} className="min-h-0 flex-1 rounded-tl-none" />
				</div>
				<div
					className={`absolute inset-0 flex flex-col ${
						tab === "view" ? "" : "invisible pointer-events-none"
					}`}
				>
					{view}
				</div>
			</div>
		</div>
	);
}

function PaneTab({
	active,
	onClick,
	icon,
	tone,
	children,
}: {
	active: boolean;
	onClick: () => void;
	icon: IconName;
	/** Active tabs match the pane they belong to, so they read as attached. */
	tone: "dark" | "light";
	children: ReactNode;
}) {
	const activeClass =
		tone === "dark"
			? "border-choco/35 bg-[#2b1d14] text-cream"
			: "border-choco/30 bg-white text-ink";

	return (
		<button
			type="button"
			onClick={onClick}
			aria-pressed={active}
			className={`cute-notebook flex cursor-pointer items-center gap-[0.4vw] rounded-t-[1vh] border-[0.3vh] border-b-0 px-[1.1vw] py-[0.5vh] text-[2vh] leading-none transition-colors ${
				active
					? activeClass
					: "border-dashed border-choco/25 bg-paper/60 text-choco/50 hover:bg-paper hover:text-choco"
			}`}
		>
			<Icon name={icon} className="text-[2.2vh]" />
			{children}
		</button>
	);
}
