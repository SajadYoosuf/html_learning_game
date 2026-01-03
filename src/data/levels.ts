export type VisualType = 'structure-h1' | 'structure-p' | 'interactive-button' | 'media-img' | 'link-a' | 'list-ul' | 'list-ol' | 'input-text' | 'group-div' | 'style-color' | 'none';

export interface Level {
  id: number;
  title: string;
  missionName: string;
  description: string; // The "Start" mission text
  simpleExplanation: string; // The "Theory" / "Briefing" text
  analogy?: string; // Real-world comparison
  visualType?: VisualType; // For the SVG diagram
  instruction: string;
  exampleSnippet?: string;
  initialCode: string;
  solutionExample: string;
  validation: (code: string) => { passed: boolean; error?: string };
}

export const levels: Level[] = [
  {
    id: 1,
    title: "Level 01",
    missionName: "The Headline",
    description: "Welcome, Cadet. To start our website, we need a big title. In HTML, we use tags to tell the browser what to show.",
    simpleExplanation: "Think of an `<h1>` tag like the big headline on the front page of a newspaper. It tells everyone 'This is the most important thing here'.",
    analogy: "Newspaper Headline",
    visualType: 'structure-h1',
    instruction: "Create an `<h1>` tag with the text 'Hello Universe'.",
    exampleSnippet: "<h1>I am a Big Title</h1>",
    initialCode: "<!-- Write your code below -->\n",
    solutionExample: "<h1>Hello Universe</h1>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<h1>")) return { passed: false, error: "Missing opening <h1> tag." };
      if (!clean.includes("</h1>")) return { passed: false, error: "Missing closing </h1> tag." };
      if (!clean.includes("hello universe")) return { passed: false, error: "The text must say 'Hello Universe'." };
      return { passed: true };
    }
  },
  {
    id: 2,
    title: "Level 02",
    missionName: "The Story",
    description: "Great headline! Now we need to write the story. For normal text, we use paragraph tags.",
    simpleExplanation: "A `<p>` tag is for paragraphs. It's used for the main body of your text, like the articles in a newspaper or the pages of a book.",
    analogy: "Book Paragraphs",
    visualType: 'structure-p',
    instruction: "Create a `<p>` tag that says 'System Online'.",
    exampleSnippet: "<p>This is a normal sentence.</p>",
    initialCode: "<h1>Hello Universe</h1>\n",
    solutionExample: "<h1>Hello Universe</h1>\n<p>System Online</p>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<p>")) return { passed: false, error: "Missing opening <p> tag." };
      if (!clean.includes("</p>")) return { passed: false, error: "Missing closing </p> tag." };
      if (!clean.includes("system online")) return { passed: false, error: "The text inside the paragraph must be 'System Online'." };
      return { passed: true };
    }
  },
  {
    id: 3,
    title: "Level 03",
    missionName: "The Button",
    description: "Static pages are boring. Let's make it do something. We need a button to click.",
    simpleExplanation: "A `<button>` tag creates a clickable button. It's like a doorbell or a light switch—you press it to make something happen.",
    analogy: "Light Switch",
    visualType: 'interactive-button',
    instruction: "Add a `<button>` tag with the text 'Launch'.",
    exampleSnippet: "<button>Click Me</button>",
    initialCode: "<h1>Hello Universe</h1>\n<p>System Online</p>\n",
    solutionExample: "<h1>Hello Universe</h1>\n<p>System Online</p>\n<button>Launch</button>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<button>")) return { passed: false, error: "Missing opening <button> tag." };
      if (!clean.includes("</button>")) return { passed: false, error: "Missing closing </button> tag." };
      if (!clean.includes("launch")) return { passed: false, error: "The button text must be 'Launch'." };
      return { passed: true };
    }
  },
  {
    id: 4,
    title: "Level 04",
    missionName: "The Picture",
    description: "A picture is worth a thousand words. Let's show the universe what we found.",
    simpleExplanation: "The `<img>` tag puts an image on the page. Unlike other tags, it doesn't have a closing tag. It just needs a `src` (source) to know which picture to show.",
    analogy: "Picture Frame",
    visualType: 'media-img',
    instruction: "Add an `<img>` tag with `src` set to 'https://mw1.google.com/crisismap/2019-weather/assets/thunderstorm.png'.",
    exampleSnippet: "<img src='https://example.com/cat.jpg' />",
    initialCode: "<p>Incoming Transmission...</p>\n",
    solutionExample: "<img src='https://mw1.google.com/crisismap/2019-weather/assets/thunderstorm.png' />",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<img")) return { passed: false, error: "Missing <img> tag." };
      if (!clean.includes("src=")) return { passed: false, error: "Missing 'src' attribute." };
      if (!clean.includes("thunderstorm.png")) return { passed: false, error: "Incorrect image URL." };
      return { passed: true };
    }
  },
  {
    id: 5,
    title: "Level 05",
    missionName: "The Portal",
    description: "We are stuck here unless we build a portal to go somewhere else. Links take us to new places.",
    simpleExplanation: "The `<a>` (anchor) tag creates a link. The `href` attribute tells the browser where to go when you click it. It's your portal to the rest of the web.",
    analogy: "Teleportation Portal",
    visualType: 'link-a',
    instruction: "Create a link `<a>` to 'https://google.com' with the text 'Warp'.",
    exampleSnippet: "<a href='https://google.com'>Go to Google</a>",
    initialCode: "<p>Ready to travel?</p>\n",
    solutionExample: "<a href='https://google.com'>Warp</a>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<a")) return { passed: false, error: "Missing <a> tag." };
      if (!clean.includes("href=")) return { passed: false, error: "Missing 'href' attribute." };
      if (!clean.includes("google.com")) return { passed: false, error: "Link must go to google.com." };
      if (!clean.includes("warp")) return { passed: false, error: "Link text must be 'Warp'." };
      return { passed: true };
    }
  },
  {
    id: 6,
    title: "Level 06",
    missionName: "The Shopping List",
    description: "We need to list our supplies. The order doesn't matter, just list them.",
    simpleExplanation: "The `<ul>` (Unordered List) tag groups item together with bullet points. Each item inside starts with `<li>` (List Item).",
    analogy: "Grocery List",
    visualType: 'list-ul',
    instruction: "Create a `<ul>` with two `<li>` items: 'Fuel' and 'Rations'.",
    exampleSnippet: "<ul>\n  <li>Apples</li>\n  <li>Bananas</li>\n</ul>",
    initialCode: "<h3>Cargo Hold:</h3>\n",
    solutionExample: "<h3>Cargo Hold:</h3>\n<ul><li>Fuel</li><li>Rations</li></ul>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<ul>")) return { passed: false, error: "Missing <ul> tag." };
      if (!clean.includes("</ul>")) return { passed: false, error: "Missing closing </ul> tag." };
      if (!clean.includes("<li>")) return { passed: false, error: "Missing <li> tags." };
      if (!clean.includes("fuel")) return { passed: false, error: "Missing 'Fuel' item." };
      if (!clean.includes("rations")) return { passed: false, error: "Missing 'Rations' item." };
      return { passed: true };
    }
  },
  {
    id: 7,
    title: "Level 07",
    missionName: "The Recipe",
    description: "To launch the ship, we must follow steps in exact order.",
    simpleExplanation: "The `<ol>` (Ordered List) tag numbers the items 1, 2, 3... Use this when the order matters.",
    analogy: "Cooking Recipe",
    visualType: 'list-ol',
    instruction: "Create an `<ol>` with two `<li>` items: 'Check Engines' and 'Ignite'.",
    exampleSnippet: "<ol>\n  <li>Crack eggs</li>\n  <li>Fry eggs</li>\n</ol>",
    initialCode: "<h3>Launch Steps:</h3>\n",
    solutionExample: "<h3>Launch Steps:</h3>\n<ol><li>Check Engines</li><li>Ignite</li></ol>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<ol>")) return { passed: false, error: "Missing <ol> tag." };
      if (!clean.includes("</ol>")) return { passed: false, error: "Missing closing </ol> tag." };
      if (!clean.includes("<li>")) return { passed: false, error: "Missing <li> tags." };
      if (!clean.includes("check engines")) return { passed: false, error: "Missing 'Check Engines'." };
      if (!clean.includes("ignite")) return { passed: false, error: "Missing 'Ignite'." };
      return { passed: true };
    }
  },
  {
    id: 8,
    title: "Level 08",
    missionName: "The Form",
    description: "We need to ask the user for information.",
    simpleExplanation: "The `<input>` tag lets users type information like their name or email. It's a self-closing tag.",
    analogy: "Fill-in-the-blank Paper",
    visualType: 'input-text',
    instruction: "Create an `<input>` tag with `type='text'` and `placeholder='Enter Coordinates'`.",
    exampleSnippet: "<input type='text' placeholder='Write here...' />",
    initialCode: "<p>Set Destination:</p>\n",
    solutionExample: "<input type='text' placeholder='Enter Coordinates' />",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<input")) return { passed: false, error: "Missing <input> tag." };
      if (!clean.includes("type=") && !clean.includes("type =")) return { passed: false, error: "Missing type attribute." };
      if (!clean.includes("placeholder=")) return { passed: false, error: "Missing placeholder attribute." };
      if (!clean.includes("enter coordinates")) return { passed: false, error: "Placeholder text mismatch." };
      return { passed: true };
    }
  },
  {
    id: 9,
    title: "Level 09",
    missionName: "The Box",
    description: "Our content is messy. We need to put related things in a box.",
    simpleExplanation: "The `<div>` tag is an invisible box. It groups elements together so you can style them or move them as a single unit.",
    analogy: "Moving Box",
    visualType: 'group-div',
    instruction: "Wrap the existing `<h1>` and `<p>` inside a `<div>` tag.",
    exampleSnippet: "<div>\n  <h1>Title</h1>\n  <p>Text...</p>\n</div>",
    initialCode: "<h1>Warning</h1>\n<p>Oxygen Low</p>",
    solutionExample: "<div><h1>Warning</h1><p>Oxygen Low</p></div>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<div>")) return { passed: false, error: "Missing opening <div> tag." };
      if (!clean.includes("</div>")) return { passed: false, error: "Missing closing </div> tag." };
      const divContent = clean.split("<div>")[1].split("</div>")[0];
      if (!divContent.includes("<h1>") || !divContent.includes("<p>")) return { passed: false, error: "The h1 and p must be inside the div." };
      return { passed: true };
    }
  },
  {
    id: 10,
    title: "Level 10",
    missionName: "The Paint",
    description: "Everything looks the same. Let's add some color.",
    simpleExplanation: "The `style` attribute lets you change how things look immediately, like changing the color or size.",
    analogy: "Paint Brush",
    visualType: 'style-color',
    instruction: "Add `style='color: red;'` to the `<span>` tag to make the alert red.",
    exampleSnippet: "<p style='color: blue;'>I am blue</p>",
    initialCode: "<p>System Status: <span>CRITICAL</span></p>",
    solutionExample: "<p>System Status: <span style='color: red;'>CRITICAL</span></p>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<span")) return { passed: false, error: "Missing <span> tag." };
      if (!clean.includes("style=")) return { passed: false, error: "Missing style attribute." };
      if (!clean.includes("color:") || !clean.includes("red")) return { passed: false, error: "Style must set color to red." };
      return { passed: true };
    }
  },
  // ... (Remaining levels 11-25 would follow similar pattern, kept brief for this file update)
  {
    id: 11,
    title: "Level 11",
    missionName: "Breaks & Barriers",
    description: "Text needs breathing room. `<br>` forces a line break, and `<hr>` draws a horizontal line.",
    simpleExplanation: "`<br>` breaks the line like hitting 'Enter'. `<hr>` draws a line across the page to separate sections.",
    visualType: 'none',
    instruction: "Add a `<hr>` between the two paragraphs, and a `<br>` inside the second paragraph after 'Location:'.",
    exampleSnippet: "<p>First Line.<br>Second Line.</p>\n<hr>\n<p>Next Section</p>",
    initialCode: "<p>Sector 7G.</p>\n\n<p>Location: Earth.</p>",
    solutionExample: "<p>Sector 7G.</p><hr><p>Location:<br> Earth.</p>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<hr>")) return { passed: false, error: "Missing <hr> tag." };
      if (!clean.includes("<br>")) return { passed: false, error: "Missing <br> tag." };
      return { passed: true };
    }
  },
  {
    id: 12,
    title: "Level 12",
    missionName: "Strong Signal",
    description: "Make text stand out semantically. The `<strong>` tag indicates strong importance (usually bold).",
    simpleExplanation: "Use `<strong>` to make text bold and show it is important.",
    visualType: 'none',
    instruction: "Wrap the word 'DANGER' in a `<strong>` tag.",
    exampleSnippet: "<p>This is <strong>important</strong> info.</p>",
    initialCode: "<p>Status: DANGER ahead.</p>",
    solutionExample: "<p>Status: <strong>DANGER</strong> ahead.</p>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<strong>")) return { passed: false, error: "Missing <strong> tag." };
      if (!clean.includes("</strong>")) return { passed: false, error: "Missing closing </strong> tag." };
      if (!clean.includes("<strong>danger</strong>")) return { passed: false, error: "The word 'DANGER' must be inside strong tags." };
      return { passed: true };
    }
  },
  {
    id: 13,
    title: "Level 13",
    missionName: "Emphasis",
    description: "Add emphasis to speech or names. The `<em>` tag is for emphasized text (usually italic).",
    simpleExplanation: "Use `<em>` to italicize text, like when you are stressing a word.",
    visualType: 'none',
    instruction: "Wrap the ship name 'Odyssey' in an `<em>` tag.",
    exampleSnippet: "<p>Welcome to the <em>Endurance</em>.</p>",
    initialCode: "<p>Validating ID for Odyssey.</p>",
    solutionExample: "<p>Validating ID for <em>Odyssey</em>.</p>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<em>")) return { passed: false, error: "Missing <em> tag." };
      if (!clean.includes("</em>")) return { passed: false, error: "Missing closing </em> tag." };
      if (!clean.includes("<em>odyssey</em>")) return { passed: false, error: "The word 'Odyssey' must be inside em tags." };
      return { passed: true };
    }
  },
  {
    id: 14,
    title: "Level 14",
    missionName: "Sub-levels",
    description: "Headings have hierarchy. `<h1>` is main, `<h2>` is sub-section, `<h3>` is below that.",
    simpleExplanation: "Just like a book has chapters and sub-chapters, HTML has `<h1>` down to `<h6>`.",
    visualType: 'none',
    instruction: "Change the 'Mission Report' to `<h2>` and 'Stats' to `<h3>`.",
    exampleSnippet: "<h1>Title</h1>\n<h2>Subtitle</h2>\n<h3>Section</h3>",
    initialCode: "<h1>Log Entry</h1>\n<h1>Mission Report</h1>\n<h1>Stats</h1>",
    solutionExample: "<h1>Log Entry</h1>\n<h2>Mission Report</h2>\n<h3>Stats</h3>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<h2>mission report</h2>")) return { passed: false, error: "'Mission Report' should be h2." };
      if (!clean.includes("<h3>stats</h3>")) return { passed: false, error: "'Stats' should be h3." };
      return { passed: true };
    }
  },
  {
    id: 15,
    title: "Level 15",
    missionName: "The Grid",
    description: "We need to organize data in a grid. Use `<table>`, `<tr>` (table row), and `<td>` (table data).",
    simpleExplanation: "A table is for data. `<tr>` creates a row, and `<td>` creates the cells inside that row.",
    visualType: 'none',
    instruction: "Create a `<table>` with one `<tr>` containing two `<td>` cells: 'ID' and '99'.",
    exampleSnippet: "<table>\n  <tr>\n    <td>A1</td>\n    <td>B2</td>\n  </tr>\n</table>",
    initialCode: "<!-- Create table below -->\n",
    solutionExample: "<table><tr><td>ID</td><td>99</td></tr></table>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<table>")) return { passed: false, error: "Missing <table> tag." };
      if (!clean.includes("<tr>")) return { passed: false, error: "Missing <tr> tag." };
      if (!clean.includes("<td>") || !clean.includes("id")) return { passed: false, error: "Missing cell with 'ID'." };
      if (!clean.includes("99")) return { passed: false, error: "Missing cell with '99'." };
      return { passed: true };
    }
  },
  {
    id: 16,
    title: "Level 16",
    missionName: "Table Headers",
    description: "Tables need labels. Use `<th>` for header cells instead of `<td>` in the first row.",
    simpleExplanation: "`<th>` makes the text bold and centered, perfect for the top row of a table.",
    visualType: 'none',
    instruction: "Change the first row's cells to `<th>`.",
    exampleSnippet: "<tr>\n  <th>Name</th>\n  <th>Age</th>\n</tr>",
    initialCode: "<table>\n  <tr>\n    <td>Planet</td>\n    <td>Status</td>\n  </tr>\n  <tr>\n    <td>Mars</td>\n    <td>Habitable</td>\n  </tr>\n</table>",
    solutionExample: "<table><tr><th>Planet</th><th>Status</th></tr><tr><td>Mars</td><td>Habitable</td></tr></table>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<th>") || !clean.includes("planet")) return { passed: false, error: "'Planet' should be inside <th>." };
      if (!clean.includes("status")) return { passed: false, error: "'Status' should be inside <th>." };
      return { passed: true };
    }
  },
  {
    id: 17,
    title: "Level 17",
    missionName: "Data Entry",
    description: "A `<form>` wraps input elements to submit data.",
    simpleExplanation: "A `<form>` tells the browser 'The stuff inside here belongs together and should be sent to the server'.",
    visualType: 'none',
    instruction: "Wrap the input and button in a `<form>` tag.",
    exampleSnippet: "<form>\n  <input />\n  <button>Send</button>\n</form>",
    initialCode: "<input type='text' placeholder='Name'>\n<button>Submit</button>",
    solutionExample: "<form><input type='text' placeholder='Name'><button>Submit</button></form>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<form>")) return { passed: false, error: "Missing opening <form> tag." };
      if (!clean.includes("</form>")) return { passed: false, error: "Missing closing </form> tag." };
      const formContent = clean.split("<form>")[1].split("</form>")[0];
      if (!formContent.includes("<input") || !formContent.includes("<button")) return { passed: false, error: "Input and button must be inside form." };
      return { passed: true };
    }
  },
  {
    id: 18,
    title: "Level 18",
    missionName: "Checklist",
    description: "Sometimes we need multiple choices. Use `<input type='checkbox'>`.",
    simpleExplanation: "A checkbox lets you say 'Yes' or 'No' to multiple things.",
    visualType: 'none',
    instruction: "Create a checkbox with the label 'Systems Ready'. (Put text after the input).",
    exampleSnippet: "<input type='checkbox' /> Agree to Terms",
    initialCode: "<p>Pre-flight Check:</p>\n",
    solutionExample: "<p>Pre-flight Check:</p>\n<input type='checkbox'> Systems Ready",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("type='checkbox'") && !clean.includes('type="checkbox"')) return { passed: false, error: "Missing checkbox input." };
      if (!clean.includes("systems ready")) return { passed: false, error: "Missing text 'Systems Ready'." };
      return { passed: true };
    }
  },
  {
    id: 19,
    title: "Level 19",
    missionName: "Exclusive Choice",
    description: "For single choice options, use `<input type='radio'>`. Radios share a `name` attribute to group them.",
    simpleExplanation: "Radio buttons are like old car radios—you can only push one button at a time. The `name` ties them together.",
    visualType: 'none',
    instruction: "Create two radio inputs with `name='engine'`.",
    exampleSnippet: "<input type='radio' name='color' /> Red\n<input type='radio' name='color' /> Blue",
    initialCode: "<p>Select Engine Mode:</p>\n",
    solutionExample: "<input type='radio' name='engine'> Ion\n<input type='radio' name='engine'> Warp",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      const radios = clean.split("radio").length - 1;
      if (radios < 2) return { passed: false, error: "Need at least two radio inputs." };
      if (!clean.includes("name='engine'") && !clean.includes('name="engine"')) return { passed: false, error: "Missing name='engine' attribute." };
      return { passed: true };
    }
  },
  {
    id: 20,
    title: "Level 20",
    missionName: "Transmission Log",
    description: "For longer text, use `<textarea>`. It allows multi-line input.",
    simpleExplanation: "When you need to write a lot, like a message or a comment, use a `<textarea>`.",
    visualType: 'none',
    instruction: "Add a `<textarea>` with placeholder 'Enter log entry...'.",
    exampleSnippet: "<textarea>Default text</textarea>",
    initialCode: "<h2>Captain's Log</h2>\n",
    solutionExample: "<h2>Captain's Log</h2>\n<textarea placeholder='Enter log entry...'></textarea>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<textarea")) return { passed: false, error: "Missing <textarea> tag." };
      if (!clean.includes("enter log entry")) return { passed: false, error: "Placeholder text mismatch." };
      return { passed: true };
    }
  },
  {
    id: 21,
    title: "Level 21",
    missionName: "Dropdown Menu",
    description: "Save space with a dropdown. Use `<select>` with `<option>` tags inside.",
    simpleExplanation: "A dropdown is a compact list. The user clicks it to see the options.",
    visualType: 'none',
    instruction: "Create a `<select>` with options 'Earth' and 'Mars'.",
    exampleSnippet: "<select>\n  <option>A</option>\n  <option>B</option>\n</select>",
    initialCode: "<p>Destination:</p>\n",
    solutionExample: "<select><option>Earth</option><option>Mars</option></select>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<select>")) return { passed: false, error: "Missing <select> tag." };
      if (!clean.includes("</select>")) return { passed: false, error: "Missing closing </select> tag." };
      if (!clean.includes("<option>") || !clean.includes("earth")) return { passed: false, error: "Missing Earth option." };
      if (!clean.includes("mars")) return { passed: false, error: "Missing Mars option." };
      return { passed: true };
    }
  },
  {
    id: 22,
    title: "Level 22",
    missionName: "Clickable Labels",
    description: "Make inputs easier to select. Wrap text and input in a `<label>` tag.",
    simpleExplanation: "Labels allow you to click the text to select the input. It makes the site easier to use.",
    visualType: 'none',
    instruction: "Wrap the checkbox and text 'Auto-Pilot' in a `<label>` tag.",
    exampleSnippet: "<label><input type='checkbox' /> Remember Me</label>",
    initialCode: "<input type='checkbox'> Auto-Pilot",
    solutionExample: "<label><input type='checkbox'> Auto-Pilot</label>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<label>")) return { passed: false, error: "Missing opening <label> tag." };
      if (!clean.includes("</label>")) return { passed: false, error: "Missing closing </label> tag." };
      // Check content inside label
      const labelContent = clean.split("<label>")[1].split("</label>")[0];
      if (!labelContent.includes("checkbox")) return { passed: false, error: "Checkbox must be inside label." };
      if (!labelContent.includes("auto-pilot")) return { passed: false, error: "Text 'Auto-Pilot' must be inside label." };
      return { passed: true };
    }
  },
  {
    id: 23,
    title: "Level 23",
    missionName: "Semantics: Header/Footer",
    description: "Use semantic tags for page structure. `<header>` for top content, `<footer>` for bottom.",
    simpleExplanation: "These tags don't change how things look, but they tell search engines what part of the page is the top (header) and what is the bottom (footer).",
    visualType: 'none',
    instruction: "Create a `<header>` with 'Site Title' and a `<footer>` with 'Copyright'.",
    exampleSnippet: "<header>Logo</header>\n<main>...</main>\n<footer>Info</footer>",
    initialCode: "<!-- Page Structure -->\n",
    solutionExample: "<header>Site Title</header><footer>Copyright</footer>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<header>")) return { passed: false, error: "Missing <header> tag." };
      if (!clean.includes("<footer>")) return { passed: false, error: "Missing <footer> tag." };
      return { passed: true };
    }
  },
  {
    id: 24,
    title: "Level 24",
    missionName: "Semantics: Nav/Main",
    description: "More semantics. `<nav>` for navigation links, `<main>` for primary content.",
    simpleExplanation: "`<nav>` is for your menu links, and `<main>` is for the unique content of that page.",
    visualType: 'none',
    instruction: "Add a `<nav>` with a link, and a `<main>` with a paragraph.",
    exampleSnippet: "<nav><a href='#'>Home</a></nav>\n<main><p>Content</p></main>",
    initialCode: "<header>My Site</header>\n",
    solutionExample: "<header>My Site</header><nav><a href='#'>Link</a></nav><main><p>Content</p></main>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<nav>")) return { passed: false, error: "Missing <nav> tag." };
      if (!clean.includes("<main>")) return { passed: false, error: "Missing <main> tag." };
      return { passed: true };
    }
  },
  {
    id: 25,
    title: "Level 25",
    missionName: "Final Assembly",
    description: "Put it all together cadet. Build a mini profile card.",
    simpleExplanation: "Combine everything you learned! Use a div to group, h1 for title, img for picture, and p for text.",
    visualType: 'none',
    instruction: "Create a `<div>` containing an `<h1>` (Name), an `<img>` (Avatar), and a `<p>` (Bio).",
    exampleSnippet: "<div>\n  <h1>My Name</h1>\n  <img src='...' />\n  <p>Bio...</p>\n</div>",
    initialCode: "<!-- Build your profile card -->\n",
    solutionExample: "<div><h1>Name</h1><img src='avatar.png'><p>Bio</p></div>",
    validation: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (!clean.includes("<div>")) return { passed: false, error: "Missing container <div>." };
      // Check for children inside div
      const content = clean.split("<div>")[1]?.split("</div>")[0] || "";
      if (!content.includes("<h1>")) return { passed: false, error: "Missing <h1> inside div." };
      if (!content.includes("<img")) return { passed: false, error: "Missing <img> inside div." };
      if (!content.includes("<p>")) return { passed: false, error: "Missing <p> inside div." };
      return { passed: true };
    }
  }
];
