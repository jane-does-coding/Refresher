"use client";

import { useMemo } from "react";
import type { FileName } from "../lib/curriculum";
import { Icon } from "./icons";

/**
 * Renders the learner's actual three files in a sandboxed iframe, so the page
 * they're building is really running next to the code that builds it.
 *
 * The HTML we fold up already contains its own <link> to style.css and
 * <script> to script.js, which don't exist inside a srcDoc — so we inline
 * both and strip the tags that would 404.
 */
export function LivePreview({
	files,
	className = "",
	label = "your page, right now",
}: {
	files: Record<FileName, string>;
	className?: string;
	label?: string;
}) {
	const html = files["index.html"];
	const css = files["style.css"];
	const js = files["script.js"];

	const srcDoc = useMemo(() => {
		if (!html.trim()) return "";
		const inlined = html
			.replace(/\s*<link[^>]*rel="stylesheet"[^>]*>/g, "")
			.replace(/\s*<script[^>]*src="[^"]*"[^>]*><\/script>/g, "");

		const style = css.trim() ? `<style>\n${css}\n</style>` : "";
		// Guard the script: a half-finished lesson shouldn't throw a red console.
		const script = js.trim()
			? `<script>try{\n${js}\n}catch(e){}<\/script>`
			: "";

		return inlined.includes("</head>")
			? inlined
					.replace("</head>", `${style}\n</head>`)
					.replace("</body>", `${script}\n</body>`)
			: `${style}${inlined}${script}`;
	}, [html, css, js]);

	return (
		<div
			className={`flex min-h-0 flex-col overflow-hidden rounded-[1.1vh] border-[0.3vh] border-choco/25 bg-white shadow-[0.4vh_0.6vh_0_rgba(107,63,34,0.14)] ${className}`}
		>
			<div className="flex shrink-0 items-center gap-[0.4vw] border-b-[0.25vh] border-choco/15 bg-cream px-[0.8vw] py-[0.6vh]">
				<span className="h-[1.1vh] w-[1.1vh] rounded-full bg-choco/25" />
				<span className="h-[1.1vh] w-[1.1vh] rounded-full bg-choco/25" />
				<span className="h-[1.1vh] w-[1.1vh] rounded-full bg-choco/25" />
				<span className="cute-notebook ml-[0.5vw] flex items-center gap-[0.4vw] truncate text-[1.6vh] text-choco/50">
					<Icon name="eye" className="text-[1.9vh]" />
					{label}
				</span>
			</div>

			{srcDoc ? (
				/* Rendered into a viewport ~1.45× the pane and scaled back down, so
				   the whole page fits instead of just its top edge. */
				<div className="relative min-h-0 flex-1 overflow-hidden bg-white">
					<iframe
						title="live preview of your website"
						srcDoc={srcDoc}
						sandbox="allow-scripts"
						className="absolute top-0 left-0 h-[145%] w-[145%] origin-top-left scale-[0.69] border-0 bg-white"
					/>
				</div>
			) : (
				<div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-[0.8vh] p-[1.5vh] text-center">
					<Icon name="fileCode" className="text-[6vh] text-choco/25" />
					<p className="cute-notebook text-[2.1vh] leading-[1.3] text-choco/45">
						Your file is empty so this page is too
						<br />
						that&apos;s not a bug, you just haven&apos;t written anything yet.
					</p>
				</div>
			)}
		</div>
	);
}
