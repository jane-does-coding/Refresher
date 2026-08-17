export type FileName = "index.html" | "style.css" | "script.js";

/**
 * Everything a lesson needs to know about the learner's earlier choices, so the
 * code we teach is *their* code: their name, their palette, their font.
 */
export type CodeCtx = {
	name: string;
	handle: string;
	tagline: string;
	accent: string;
	mid: string;
	soft: string;
	fontCss: string;
};

export type PlainTab = {
	label: string;
	lang: "html" | "css" | "js" | "text";
	code: (c: CodeCtx) => string;
	note?: string;
};

export type Lesson = {
	id: string;
	crumb: string;
	chapter: "html" | "css" | "js";
	title: string;
	sub: string;
	/** plain-language things to actually do */
	todo: string[];
	/**
	 * The whole contents of any file this lesson changes. These are folded
	 * together as you go, so the code pane always shows the complete file so
	 * far with this lesson's new lines marked.
	 */
	files?: Partial<Record<FileName, (c: CodeCtx) => string>>;
	/** caption under the code, per file */
	notes?: Partial<Record<FileName, string>>;
	/** shown instead of the real files (a folder tree, expected output) */
	plainTabs?: PlainTab[];
	/** a small inline input, shown where the answer gets used */
	asks?: ("name" | "tagline")[];
	/** tappable jargon-busters */
	glossary?: { term: string; what: string }[];
	milestone?: string;
};

/* ------------------------------------------------------------------ */
/* the artifact, stage by stage                                        */
/* ------------------------------------------------------------------ */

const head = (c: CodeCtx) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${c.name} - my corner of the internet</title>
  </head>
  <body>`;

const headLinked = (c: CodeCtx) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${c.name} - my corner of the internet</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>`;

const heroPlain = (c: CodeCtx) => `    <h1>hi, i'm ${c.name}</h1>`;

const heroBoxed = (c: CodeCtx) => `    <header class="hero">
      <h1>hi, i'm ${c.name}</h1>
      <p class="tagline">${c.tagline}</p>
    </header>`;

const aboutCard = `    <main>
      <section class="card">
        <h2>About me</h2>
        <p>
          I built this page <strong>from an empty folder</strong>. It has my
          name on it and <em>three</em> things I like.
        </p>
      </section>`;

const listCard = `      <section class="card">
        <h2>Things I like</h2>
        <ul>
          <li>iced drinks</li>
          <li>fonts with little feet</li>
          <li>finishing things</li>
        </ul>
      </section>`;

const linkCard = `      <section class="card">
        <h2>Find me</h2>
        <p><a href="https://github.com">my github</a></p>
        <button id="cheer">cheer me on</button>
        <p id="count">0 cheers</p>
      </section>
    </main>`;

const foot = (c: CodeCtx) => `    <footer>
      <p>made by ${c.name}</p>
    </footer>
  </body>
</html>`;

const footScripted = (c: CodeCtx) => `    <footer>
      <p>made by ${c.name}</p>
    </footer>
    <script src="script.js"></script>
  </body>
</html>`;

/* CSS, built up one lesson at a time */

/*
 * style.css, one lesson at a time. Each stage is the whole file, so the code
 * pane can diff it against the previous one. Earlier lines stay byte-identical
 * on purpose — that's what keeps the "+" marks down to just what's new.
 */

/* the three selector kinds, aimed at elements that really exist on the page */
const selectorRules = (c: CodeCtx) => `/* by tag: every h2 on the page */
h2 {
  color: ${c.accent};
}

/* by class: anything with class="card" */
.card {
  background: #fff;
}

/* by id: the one element with id="cheer" */
#cheer {
  cursor: pointer;
}`;

const cardBoxed = (c: CodeCtx) => `/* by class: anything with class="card" */
.card {
  background: #fff;
  border: 2px solid ${c.mid};
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
}`;

const cssLinked = (c: CodeCtx) => `body {
  background: ${c.soft};
}`;

const cssSelectors = (c: CodeCtx) => `${cssLinked(c)}

${selectorRules(c)}`;

const cssColour = (c: CodeCtx) => `body {
  margin: 0;
  padding: 2rem 1.5rem;
  color: #2f2118;
  background: ${c.soft};
}

${selectorRules(c)}`;

const cssFonts = (c: CodeCtx) => `body {
  margin: 0;
  padding: 2rem 1.5rem;
  ${c.fontCss}
  color: #2f2118;
  background: ${c.soft};
}

${selectorRules(c)}

h1 {
  font-size: 2.5rem;
  margin: 0 0 0.5rem;
}

.tagline {
  color: #6b5748;
  margin: 0;
}`;

const cssBoxed = (c: CodeCtx) => `body {
  margin: 0;
  padding: 2rem 1.5rem;
  ${c.fontCss}
  color: #2f2118;
  background: ${c.soft};
}

/* by tag: every h2 on the page */
h2 {
  color: ${c.accent};
}

${cardBoxed(c)}

/* by id: the one element with id="cheer" */
#cheer {
  cursor: pointer;
}

h1 {
  font-size: 2.5rem;
  margin: 0 0 0.5rem;
}

.tagline {
  color: #6b5748;
  margin: 0;
}`;

const cssFlexed = (c: CodeCtx) => `${cssBoxed(c)}

.hero {
  max-width: 40rem;
  margin: 0 auto 2rem;
  text-align: center;
}

main {
  max-width: 40rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}`;

const cssFinal = (c: CodeCtx) => `${cssFlexed(c)}

a {
  color: ${c.accent};
}

button {
  font: inherit;
  background: ${c.accent};
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.6rem 1.2rem;
  transition: transform 0.15s ease;
}

button:hover {
  transform: translateY(-2px);
}

footer {
  max-width: 40rem;
  margin: 2rem auto 0;
  text-align: center;
  color: #6b5748;
}`;

/* ------------------------------------------------------------------ */

export const LESSONS: Lesson[] = [
	/* ---------------- HTML ---------------- */
	{
		id: "html-files",
		crumb: "html · the three files",
		chapter: "html",
		title: "Three files, one folder",
		sub: "A website is just files sitting in a folder. You need three of them, and they always have these names.",
		todo: [
			"make a folder called my-website",
			"make an empty file in it called index.html",
			"then style.css, then script.js",
			"in VS Code that's File > Open Folder, then the new-file icon",
		],
		plainTabs: [
			{
				label: "my-website/",
				lang: "text",
				code: () => `my-website/
├── index.html    the words and the structure
├── style.css     what it all looks like
└── script.js     what happens when you click`,
				note: "Browsers open index.html by default, so don't rename that one.",
			},
		],
		files: {
			"index.html": () => "",
			"style.css": () => "",
			"script.js": () => "",
		},
		glossary: [
			{
				term: "index.html",
				what: "Browsers look for this filename first. That's why every site has one.",
			},
			{
				term: "file extension",
				what: "The bit after the dot. It tells your computer what kind of file it's looking at.",
			},
		],
	},
	{
		id: "html-skeleton",
		crumb: "html · the skeleton",
		chapter: "html",
		title: "Every page starts like this",
		sub: "The skeleton of every HTML Website, you'll not need to write it out by hand every time you make a new site",
		todo: [
			"type this into index.html",
			"change the title to your own name",
			"save it",
		],
		notes: {
			"index.html":
				"Tags come in pairs. <body> opens, </body> closes. The slash is what makes it a closing tag.",
		},
		files: { "index.html": (c) => `${head(c)}\n  </body>\n</html>` },
		glossary: [
			{
				term: "<!DOCTYPE html>",
				what: "Tells the browser to use modern HTML rules. It goes first, before anything else.",
			},
			{
				term: "<head>",
				what: "Facts about the page that don't appear on it: the title, the stylesheet link, the character set.",
			},
			{
				term: "<body>",
				what: "Everything you can see goes in here.",
			},
			{
				term: 'lang="en"',
				what: "Says the page is in English. Screen readers use it to pick a voice.",
			},
		],
	},
	{
		id: "html-headings",
		crumb: "html · headings",
		chapter: "html",
		title: "Headings: h1 down to h6",
		sub: "h1 is the page title, h2 is a section, h3 is a subsection. Together they make an outline, so go in order and don't skip a level to get a smaller font.",
		asks: ["name"],
		todo: [
			"add one h1 inside body, with your name in it",
			"save and see how big it is by default",
			"don't reach for h1 just because it looks bigger",
		],
		notes: {
			"index.html":
				"The green line is what you just added. Everything above it is what you already had.",
		},
		files: {
			"index.html": (c) => `${head(c)}
${heroPlain(c)}
  </body>
</html>`,
		},
		glossary: [
			{
				term: "h1–h6",
				what: "Six levels of heading, h1 being the most important. Think table of contents, not font size.",
			},
			{
				term: "nesting",
				what: "Tags inside other tags. Your h1 sits inside body. Indent one step per level so you can see the shape.",
			},
		],
	},
	{
		id: "html-text",
		crumb: "html · text",
		chapter: "html",
		title: "Paragraphs, and words that matter",
		sub: "p is a paragraph. strong and em mark words as important or emphasised. They carry meaning, which is why you use them instead of just making text bold.",
		todo: [
			"add a p under your h1",
			"wrap a couple of words in strong, and a couple in em",
			"notice it comes out bold and italic with no CSS at all",
		],
		notes: {
			"index.html":
				"Line breaks in your code don't show up on the page. HTML squashes whitespace down to single spaces.",
		},
		files: {
			"index.html": (c) => `${head(c)}
    <h1>hi, i'm ${c.name}</h1>
    <p>
      I built this page <strong>from an empty folder</strong>.
      It has my name on it and <em>three</em> things I like.
    </p>
  </body>
</html>`,
		},
		glossary: [
			{
				term: "<strong>",
				what: "Means this matters. Comes out bold, and a screen reader will stress it.",
			},
			{
				term: "<em>",
				what: "Emphasis, comes out italic. Use em for tone and strong for importance.",
			},
			{
				term: "<br>",
				what: "A single line break, with no closing tag. Use it rarely. Usually you want a paragraph.",
			},
		],
	},
	{
		id: "html-boxes",
		crumb: "html · boxes & classes",
		chapter: "html",
		title: "Boxes: header, main, footer, div",
		sub: "These wrap other elements. On their own they draw nothing at all. You use them to group things, so that later you can move or restyle a whole group at once.",
		asks: ["tagline"],
		todo: [
			"wrap your h1 and tagline in a header",
			"put your paragraph inside main, then a section",
			"add a footer at the bottom",
			"give them class names. next chapter aims CSS at these",
		],
		notes: {
			"index.html":
				'class="hero" is a label you make up yourself. CSS finds it by that name.',
		},
		files: {
			"index.html": (c) => `${head(c)}
${heroBoxed(c)}

${aboutCard}
    </main>

${foot(c)}`,
		},
		glossary: [
			{
				term: "<div>",
				what: "A plain box with no meaning attached. Use it when nothing more specific fits.",
			},
			{
				term: "<header> <main> <footer>",
				what: "Boxes that say what they hold. They look identical to a div but screen readers can navigate them.",
			},
			{
				term: "class",
				what: "A name you stick on an element so CSS and JS can find it. Lots of elements can share one class.",
			},
			{
				term: "id",
				what: "Like a class, but only one element on the page is allowed to have it.",
			},
		],
	},
	{
		id: "html-lists",
		crumb: "html · lists",
		chapter: "html",
		title: "Lists",
		sub: "ul gives you bullets, ol gives you numbers. Either way each item is an li, and every li has to live inside the list.",
		todo: [
			"add a second section with class card and an h2",
			"put a ul inside it with three li items",
			"swap the ul for an ol and watch the bullets turn into numbers",
		],
		notes: {
			"index.html":
				"Only li can sit directly inside a ul. Anything else goes inside the li.",
		},
		files: {
			"index.html": (c) => `${head(c)}
${heroBoxed(c)}

${aboutCard}

${listCard}
    </main>

${foot(c)}`,
		},
		glossary: [
			{
				term: "<ul> vs <ol>",
				what: "u is unordered, so bullets. o is ordered, so numbers. Pick based on whether the order matters.",
			},
			{ term: "<li>", what: "One item in the list." },
		],
	},
	{
		id: "html-links",
		crumb: "html · links & buttons",
		chapter: "html",
		title: "Links, and a button for later",
		sub: "a makes a link, and its href says where the link goes. Add a button while you're here. It does nothing yet, and you'll wire it up in chapter five.",
		todo: [
			"add a third card with a link to anything you like",
			'add a button with id="cheer"',
			'add an empty p with id="count" under it',
		],
		notes: {
			"index.html":
				'href="https://..." goes to another site. href="#about" jumps to an id on this page.',
		},
		files: {
			"index.html": (c) => `${head(c)}
${heroBoxed(c)}

${aboutCard}

${listCard}

${linkCard}

${foot(c)}`,
		},
		glossary: [
			{
				term: "href",
				what: "Short for hypertext reference. It's where the link points, and it lives inside the opening tag.",
			},
			{
				term: "attribute",
				what: 'Extra information on a tag, written as name="value". href, class, id and src are all attributes.',
			},
			{
				term: "<img>",
				what: 'Puts a picture in: <img src="me.jpg" alt="a photo of me" />. Always fill in the alt text.',
			},
		],
	},
	{
		id: "html-open",
		crumb: "html · see it for real",
		chapter: "html",
		title: "Open it in a real browser",
		sub: "Go and look at the thing you made. Double-click index.html in your folder and it opens in your browser. No server, no build step, no internet.",
		todo: [
			"find index.html in your folder and double-click it",
			"it opens in your browser at a file:// address",
			"it'll look plain and unstyled. that's just HTML with no CSS yet",
			"leave the tab open and refresh it after every save",
		],
		notes: {
			"index.html":
				"That's the finished HTML. Times New Roman on a white page: it looks bad and it works.",
		},
		files: {
			"index.html": (c) => `${head(c)}
${heroBoxed(c)}

${aboutCard}

${listCard}

${linkCard}

${foot(c)}`,
		},
		milestone:
			"HTML done. That's a real web page. Next, making it look like something.",
		glossary: [
			{
				term: "file://",
				what: "You're opening the file straight off your disk. That's fine for plain HTML, CSS and JS all the way through this guide.",
			},
			{
				term: "why so plain?",
				what: "You're seeing the browser's built-in default styles. CSS is how you override them.",
			},
		],
	},

	/* ---------------- CSS ---------------- */
	{
		id: "css-link",
		crumb: "css · link the stylesheet",
		chapter: "css",
		title: "Introduce your CSS to your HTML",
		sub: "Nothing knows style.css exists yet. One line in the head hooks them together. Forget it and you'll spend an hour wondering why your CSS does nothing.",
		todo: [
			"add the link line inside head, under the title",
			"set a background in style.css so you can prove it worked",
			"save both files and refresh",
		],
		notes: {
			"index.html": "One new line in the head. That's the whole connection.",
			"style.css":
				"If the colour doesn't show up, the filename in href doesn't match your actual file.",
		},
		files: {
			"index.html": (c) => `${headLinked(c)}
${heroBoxed(c)}

${aboutCard}

${listCard}

${linkCard}

${foot(c)}`,
			"style.css": cssLinked,
		},
		glossary: [
			{
				term: "<link>",
				what: 'Pulls an outside file into your page. rel="stylesheet" says what sort of file it is. No closing tag.',
			},
			{
				term: "CSS",
				what: "Cascading style sheets. The cascading part: when two rules disagree, the more specific one wins, and a later one beats an earlier one.",
			},
		],
	},
	{
		id: "css-selectors",
		crumb: "css · selectors",
		chapter: "css",
		title: "How CSS picks what to change",
		sub: "Every rule has two halves: what to pick, and what to change about it. The picking half is the selector, and three kinds cover almost everything.",
		todo: [
			"add these three rules to style.css",
			"each one uses a different kind of selector",
			"save, refresh, and watch three things change at once",
			"flip to the index.html tab to see what they're aiming at",
		],
		notes: {
			"style.css":
				"h2 by tag name, .card by class, #cheer by id. The dot and the hash are the whole difference.",
			"index.html":
				'This is what those selectors are pointing at. class="card" and id="cheer" are the labels you added earlier.',
		},
		files: { "style.css": cssSelectors },
		glossary: [
			{
				term: ".class",
				what: "A dot means find every element with this class. Reusable, so it's the one you'll use most.",
			},
			{
				term: "#id",
				what: "A hash means find the single element with this id.",
			},
			{
				term: "declaration",
				what: "One property: value; pair. A rule is a selector plus a { } block full of declarations.",
			},
			{
				term: "/* comment */",
				what: "A note to yourself that the browser skips. CSS has no // comments, only these.",
			},
		],
	},
	{
		id: "css-colour",
		crumb: "css · colour",
		chapter: "css",
		title: "Colour and background",
		sub: "color is the text. background is what sits behind it. Two properties, and they get mixed up forever.",
		todo: [
			"set a background and a text colour on body",
			"paste in your own hex codes",
			"keep it readable: pale background, dark text",
		],
		notes: {
			"style.css":
				"A hex code is #RRGGBB: two digits each of red, green and blue, counting from 00 up to ff.",
		},
		files: { "style.css": cssColour },
		glossary: [
			{
				term: "color vs background",
				what: "color is the text itself. background is behind it. Everyone mixes these two up at first.",
			},
			{
				term: "#f18aa0",
				what: "Hex. ff means as much of that colour as possible, 00 means none. You start recognising them after a while.",
			},
			{
				term: "margin: 0 on body",
				what: "Browsers add about 8px of margin around the page. Nearly everyone zeroes it out.",
			},
		],
	},
	{
		id: "css-fonts",
		crumb: "css · fonts",
		chapter: "css",
		title: "Fonts, for real this time",
		sub: "You just picked one. This is the line that applies it, plus a font stack so there is a backup if the first font is missing.",
		todo: [
			"add font-family to your body rule",
			"give h1 a size, and calm the tagline down",
			"everything inside body picks up the font for free",
		],
		notes: {
			"style.css":
				"The commas are fallbacks. Georgia first, and any old serif if Georgia is missing.",
		},
		files: { "style.css": cssFonts },
		glossary: [
			{
				term: "font stack",
				what: 'A comma-separated list, best first: "Georgia, serif". The browser walks it until it finds one it has.',
			},
			{
				term: "inherit",
				what: "Font and colour pass down to children on their own. Set them once on body and you're done.",
			},
			{
				term: "rem",
				what: "A multiple of the page's base font size, usually 16px. Scales better than hard-coded pixels.",
			},
		],
	},
	{
		id: "css-box",
		crumb: "css · the box model",
		chapter: "css",
		title: "The box model",
		sub: "Every element is a rectangle. Padding is the space inside its border, margin is the space outside. Once this lands, a lot of confusing CSS stops being confusing.",
		todo: [
			"give .card a background, a border, a radius and some padding",
			"swap the padding for margin and see what moves",
			"padding pads the inside. margin shoves other things away",
		],
		notes: {
			"style.css":
				"Two values means vertical then horizontal, so 1.25rem top and bottom, 1.5rem left and right.",
		},
		files: { "style.css": cssBoxed },
		glossary: [
			{
				term: "padding",
				what: "Space inside the border, between the edge and the content. The background colour reaches into it.",
			},
			{
				term: "margin",
				what: "Space outside the border that pushes other elements away. Always see-through.",
			},
			{
				term: "border-radius",
				what: "Rounds the corners. Put 999px on something short and you get a pill.",
			},
			{
				term: "shorthand",
				what: "One value covers all sides. Two means top/bottom then left/right. Four goes clockwise from the top.",
			},
		],
	},
	{
		id: "css-flex",
		crumb: "css · flexbox",
		chapter: "css",
		title: "Flexbox, and centring things",
		sub: "The layout you picked, in code. display: flex makes an element arrange its children in a row or a column, and max-width with margin: 0 auto gives you a centred column.",
		todo: [
			"give main display: flex and flex-direction: column",
			"space the cards with gap instead of margins",
			"add max-width and margin: 0 auto to centre the lot",
			"try flex-direction: row to see them line up sideways",
		],
		notes: {
			"style.css":
				"gap only works on flex and grid containers. Before it existed everyone did this with margins and it was miserable.",
		},
		files: { "style.css": cssFlexed },
		glossary: [
			{
				term: "display: flex",
				what: "Turns an element into a flex container. Its direct children become flex items and line themselves up.",
			},
			{
				term: "flex-direction",
				what: "row puts children side by side, column stacks them. Changing this one word rearranges your whole layout.",
			},
			{
				term: "gap",
				what: "Even spacing between flex children. Simpler than margins and it doesn't collapse weirdly.",
			},
			{
				term: "margin: 0 auto",
				what: "No margin top or bottom, automatic on the sides. Auto splits the leftover space in half, so the box ends up centred.",
			},
		],
	},
	{
		id: "css-hover",
		crumb: "css · hover",
		chapter: "css",
		title: "Make it react to the mouse",
		sub: ":hover styles an element only while the pointer is sitting on it. Add a transition and the change slides in instead of snapping.",
		todo: [
			"style the button, then add a :hover rule",
			"put transition on the button, not on the hover",
			"hover it and watch it lift",
		],
		notes: {
			"style.css":
				"transition belongs on the normal rule, so it animates on the way in and on the way out.",
		},
		files: { "style.css": cssFinal },
		milestone:
			"CSS done. Your colours, your font, your layout. One chapter left.",
		glossary: [
			{
				term: ":hover",
				what: "A pseudo-class, meaning while the mouse is over this. Others worth knowing: :focus, :active, :first-child.",
			},
			{
				term: "transition",
				what: "Animates a change over time. Written as: what, how long, and how it eases.",
			},
			{
				term: "transform",
				what: "Moves, rotates or scales something without disturbing the layout around it. translateY(-2px) nudges it up.",
			},
			{
				term: "cursor: pointer",
				what: "Gives you the little hand. People read that as clickable.",
			},
		],
	},

	/* ---------------- JS ---------------- */
	{
		id: "js-link",
		crumb: "js · link the script",
		chapter: "js",
		title: "Plug in the JavaScript",
		sub: "Same idea as the stylesheet, different tag. Put it at the bottom of body, so the HTML already exists by the time the script goes looking for it.",
		todo: [
			"add the script line just before the closing body tag",
			"write a console.log in script.js",
			"right-click, Inspect, Console, and read it",
		],
		notes: {
			"index.html": "Right at the bottom, after everything else.",
			"script.js":
				"console.log is how you check what your code is up to. You'll use it constantly, including ten years from now.",
		},
		files: {
			"index.html": (c) => `${headLinked(c)}
${heroBoxed(c)}

${aboutCard}

${listCard}

${linkCard}

${footScripted(c)}`,
			"script.js": () => `console.log("the script is running");`,
		},
		glossary: [
			{
				term: "why at the bottom?",
				what: "Scripts run the moment the browser reaches them. At the bottom, the whole page already exists to be grabbed.",
			},
			{
				term: "console",
				what: "The browser's scratchpad. Errors land here too, so check it first when something breaks.",
			},
			{
				term: "// comment",
				what: "JS notes start with two slashes. That one does work here, unlike in CSS.",
			},
		],
	},
	{
		id: "js-select",
		crumb: "js · find and change",
		chapter: "js",
		title: "Grab an element and change it",
		sub: "Most of what JavaScript does on a page is find something, then change it. querySelector does the finding, using the same selectors you learned for CSS.",
		todo: [
			"grab your count paragraph with querySelector",
			"keep it in a const",
			"change its textContent, then refresh",
		],
		notes: {
			"script.js":
				"const for things that never get reassigned, let for things that change.",
		},
		files: {
			"script.js": () => `const button = document.querySelector("#cheer");
const count = document.querySelector("#count");

let cheers = 0;

count.textContent = "0 cheers";`,
		},
		glossary: [
			{
				term: "querySelector",
				what: 'Finds the first element matching a CSS selector. "#count" for an id, ".card" for a class.',
			},
			{
				term: "const / let",
				what: "Two ways to name a value. const can't be pointed at something else later, let can. Both are better than var.",
			},
			{
				term: "textContent",
				what: "The text inside an element. Read it, or assign to it to replace what's there.",
			},
			{
				term: "document",
				what: "The whole page, as something JS can rummage around in. Everything starts here.",
			},
		],
	},
	{
		id: "js-click",
		crumb: "js · listen for a click",
		chapter: "js",
		title: "Listen for a click",
		sub: "addEventListener says: when this happens, run this. It's behind every button on every site you use.",
		todo: [
			"add a click listener to your button",
			"inside it, add one to cheers and update the text",
			"save, refresh, and click your own button",
		],
		notes: {
			"script.js":
				"The () => { } part is a function: some code saved up to run later. This one runs on every click.",
		},
		files: {
			"script.js": () => `const button = document.querySelector("#cheer");
const count = document.querySelector("#count");

let cheers = 0;

button.addEventListener("click", () => {
  cheers = cheers + 1;
  count.textContent = cheers + " cheers";
});`,
		},
		milestone:
			"JavaScript done. Your page reacts to a person clicking it. That's all three languages.",
		glossary: [
			{
				term: "addEventListener",
				what: 'Written as element.addEventListener("click", fn). Runs fn every time that thing happens. Try "mouseover" too.',
			},
			{
				term: "event",
				what: "Something that happened: a click, a keypress, a scroll. You listen for the ones you care about.",
			},
			{
				term: "() => {}",
				what: "An arrow function. A small parcel of code you hand to something else to run on your behalf.",
			},
			{
				term: "+ on strings",
				what: 'cheers + " cheers" sticks a number onto text. JS turns the number into text for you.',
			},
		],
	},
];

/** Fold every lesson's file overrides up to `index` to get the current files. */
export function filesAt(index: number, c: CodeCtx): Record<FileName, string> {
	const state: Record<FileName, string> = {
		"index.html": "",
		"style.css": "",
		"script.js": "",
	};
	for (let i = 0; i <= index && i < LESSONS.length; i++) {
		const files = LESSONS[i].files;
		if (!files) continue;
		for (const key of Object.keys(files) as FileName[]) {
			const build = files[key];
			if (build) state[key] = build(c);
		}
	}
	return state;
}

/**
 * Which lines of `next` weren't in `prev`, by index. A small LCS diff, so
 * inserting a block in the middle marks only that block and not everything
 * after it. Files here are a few dozen lines, so the O(n·m) table is free.
 */
export function addedLines(prev: string, next: string): Set<number> {
	const a = prev ? prev.split("\n") : [];
	const b = next ? next.split("\n") : [];
	const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
		new Array(b.length + 1).fill(0),
	);
	for (let i = a.length - 1; i >= 0; i--) {
		for (let j = b.length - 1; j >= 0; j--) {
			dp[i][j] =
				a[i] === b[j]
					? dp[i + 1][j + 1] + 1
					: Math.max(dp[i + 1][j], dp[i][j + 1]);
		}
	}
	const added = new Set<number>();
	let i = 0;
	let j = 0;
	while (i < a.length && j < b.length) {
		if (a[i] === b[j]) {
			i++;
			j++;
		} else if (dp[i + 1][j] >= dp[i][j + 1]) {
			i++;
		} else {
			added.add(j);
			j++;
		}
	}
	while (j < b.length) added.add(j++);
	return added;
}

/**
 * Which files a lesson shows as tabs. The file you're editing comes first so
 * it's the open tab; in the CSS and JS chapters index.html rides along as a
 * second tab, because you're aiming at markup you wrote earlier and need to
 * be able to look at it.
 */
export function filesShownBy(lesson: Lesson): FileName[] {
	const order: FileName[] = ["index.html", "style.css", "script.js"];
	const changed = order.filter((f) => lesson.files && f in lesson.files);
	if (lesson.chapter !== "html" && !changed.includes("index.html"))
		return [...changed, "index.html"];
	return changed;
}
