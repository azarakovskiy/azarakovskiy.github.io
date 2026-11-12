# Portfolio

A static portfolio and blog built with HTML, CSS, and native JavaScript for
color themes and contact links. This repository, `azarakovskiy/azarakovskiy.github.io`,
serves the portfolio at <https://azarakovskiy.com/> directly from the root
`index.html`, without a redirect. AI Workflow lives at `/ai-workflow/`, the
résumé stays in `resume/`, and the blog lives at `/blog/`.

The blog publisher uses only the Python standard library and requires Python 3.9
or newer. Generated pages are committed, so the deployed site needs neither
Python nor a build service.

`favicon.svg` uses the same lowercase `az/` paths as the header for the portfolio,
résumé, and generated blog pages. Its ink follows the browser's light or dark
color preference so it stays visible without a background.

## AI Workflow

`ai-workflow/index.html` is the AI adoption page. Its menu link appears
before Projects in the shared header. It reuses the site's typography, responsive
header, light/dark themes, and contact links; the opening sentence is its heading.
A Get in touch button below the copy uses the shared contact-button style and
interaction-revealed email link, with the portfolio contact section as fallback.
An accessible ordered-list diagram shows Design → Planning → Implementation →
Review → Retrospective beside the text. Flexible connectors align its first and
last stages with the text column, including the contact button, without stretching
the labels. It follows the shared theme colors and stacks below the copy at
widths of 880px and smaller.

The page's stylesheet URL includes the first 12 characters of the SHA-256 hash
of `styles.css`. Refresh its `?v=` value after stylesheet changes (use
`shasum -a 256 styles.css`) so cached SVG-era styles cannot render the diagram
as a plain numbered list.

Edit its main content directly. The publisher refreshes only its site header from
the root `index.html`, including relative navigation, the current-page marker,
and Blog visibility. Rerun the publisher after shared navigation changes; it
preserves the page's authored content.

## Portfolio layout

Keep employer and project entries in their current timeline order, with matching
horizontal rules between employers. Use the sections specified in the approved
draft. Prose fills its content column and
uses native `text-wrap: pretty` to reduce single-word last lines. Headings use
`balance` where needed. The AI tools group spans the full stack-grid width.
It lists OMP, Herdr, Hermes, Copilot, Claude, Cursor, and Codex.

Copy edits must preserve facts in the approved draft, including figures, their
qualifiers, team ownership, technical decisions, and named clients. Apply its
merge and removal instructions without reintroducing older content.
Omit leading "a" and "an" from titles and short subtitles; keep body prose grammatical.

The introduction positions the work as AI engineering and infrastructure
consulting. Its two paragraphs cover backend systems, AI infrastructure and
tooling, and helping teams integrate AI-assisted development. Preserve paragraph
spacing. Keep the root page title and search description aligned.

The Prosus/Toqan entry uses the role title "AI Infrastructure & Process Development
Consultant" and ownership copy covering Go-based AI platform and infrastructure
development, implemented agent workflows and context handling, and handled MCP
OAuth integrations. Keep this ownership copy in one paragraph with each sentence
starting on a new line, without paragraph gaps.

Toptal uses the same company/project layout as the other recent engagements,
including the role title "Engineering Consultant & Team Lead", shared project
typography, metadata, and technology tags. Its description covers backend and
AI engineering, infrastructure, automation, and team leadership for clients
through Toptal. Keep the compact layout for earlier experience only.

The portfolio and blog share a lowercase `az/` SVG header mark at every screen
size. Its paths preserve the original mobile Helvetica Neue Bold glyphs at 22px
with -0.375px letter spacing, without requiring that font on the device. The SVG
fits the visible paths tightly and aligns with the main title's left edge, while
the link keeps a 44px minimum target and the full name as its accessible label.
The mark stays the same size on scroll and does not show a role. Section routes
still appear at the sticky header border as their sections scroll into view.

## Color themes

The portfolio and blog use [Gruvbox Medium Light and Dark](https://github.com/morhetz/gruvbox).
`styles.css` owns both palettes. The synchronous `theme.js` runs before page
content paints and follows the browser's color preference until a mode is chosen.
The header's sun/moon button saves that choice as `localStorage["site-theme"]`
(`light` or `dark`) across pages and reloads. If storage is unavailable, the
button still works for the current page. Without JavaScript, the site stays light.
The résumé has its own stylesheet, loads no theme script, and stays light.

The sticky header paints a one-pixel background gap below its border so a
scrolling section rule cannot join it into a thicker band.

The comparison prototype is archived on branch `prototype/dark-mode-palettes`
at commit `36e52df`. It records the Medium selection and keeps the six
Light/Dark × Soft/Medium/Hard comparisons outside production.


## Contact links

`contact-links.js` stores destinations as XOR-masked character codes, not
plaintext or recognizable Base64 strings. Pages use `data-contact="email"`,
`data-contact="github"`, or `data-contact="linkedin"` instead of direct targets.
Regular page loads leave those targets out of the DOM. A browser-trusted
pointer, keyboard, click, or context-menu event reveals only the selected
link, preserving native navigation, touch, keyboard use, and link menus.
Synthetic events and scripted `.click()` calls do not reveal contacts.
Add `data-contact-text` when the visible text must show the revealed address
or URL. The script removes `data-contact` after revealing that link.

To update a destination, generate its numeric array in a browser console and
paste the result into the matching entry in `contact-links.js`:

```js
Array.from("DESTINATION", (character, index) => character.charCodeAt(0) ^ (index + 17))
```

This is best-effort static deterrence, not encryption or access control.
There is no measured percentage of bots blocked. A targeted bot can reverse
the code, automate real browser input, or invoke native printing. Old contacts
remain in Git history, caches, and copies. Public project URLs also identify
the GitHub account.
Without JavaScript, fallback links lead to the portfolio contact section,
which explains that JavaScript is required. There is no plaintext fallback.
GitHub Pages serves these files directly; `.nojekyll` disables Jekyll processing.

Use the same attributes for contact links in article bodies. For example:

```html
<a href="../../index.html#contact" data-contact="email">Email</a>
```

Keep plain email addresses and personal-profile URLs out of post bodies,
metadata, and publicly served assets. The publisher copies trusted post bodies
unchanged; it does not obfuscate contacts automatically. Ordinary project and
repository links stay unchanged.

The résumé's **Print / Save as PDF** button opens the browser print dialog.
The visitor selects a PDF destination and filename. It uses the existing print
layout with decoded email and personal-profile links, not a website contact
link. No prepared PDF is committed or served, and no PDF library or backend is
required. Generated copies are local to the visitor.

Use A4 at 100% scale with browser headers and footers off. Confirm that the
output remains two pages, its text is selectable, and all three contact links
work. Pagination can vary with browser settings and engines.
The native `beforeprint` event reveals all remaining contacts before rendering.
This also preserves the `resume/index.html?download=true` print flow; if the
browser blocks an automatic dialog, use the button. A synthetic `beforeprint`
event does not reveal contacts.

After changes, check the portfolio, résumé, blog listing, and a nested article
in the browser at the site root. Check pointer, keyboard, and touch activation,
link menus, and the no-JavaScript notice.
Print an untouched résumé and verify all three contact targets in the PDF.
On a fresh portfolio page, this console check must leave the link unrevealed:

```js
const link = document.querySelector("a[data-contact]");
const fallback = link.getAttribute("href");
link.click();
dispatchEvent(new Event("beforeprint"));
console.assert(
  link.hasAttribute("data-contact") && link.getAttribute("href") === fallback,
  "Synthetic interaction revealed a contact"
);
```

## Blog layout

The selected B design gives the newest post a mint feature panel and places
supporting posts in two columns with shared content tracks. Titles are plain
headings with separate, right-aligned "Read post" links. Article pages use a
full-width mint title band above a centered, narrow reading column. The layout
collapses to one column on smaller screens and uses native HTML and CSS without
layout JavaScript or sample content.

The final prototype archive exists only in the retired local `portfolio`
repository, on branch `prototype/blog-featured-final-f3c5c1ba` at commit
`1b2242363c694788562def185f3aff9d6327a1cc`. It is not part of this repository
or available as a branch here. Preserve the retired repository's complete
`.git` directory to retain that archive and its other local-only prototype refs.

## Write a post

Create `posts/<slug>.html`. Use lowercase letters and numbers separated by single
hyphens, for example `notes-on-static-publishing`. The slug `index` is reserved.
Only `.html` files directly inside `posts/` are published.

Start the file with an HTML comment containing a JSON object, then write the
article as an HTML fragment. This example is illustrative documentation, not a
published article:

```html
<!--
{
  "title": "Illustrative post title (replace before publishing)",
  "date": "2026-10-18",
  "tags": ["Python", "Static sites"],
  "summary": "Replace this sentence with a short, factual description of the article."
}
-->
<p>Write the article introduction here.</p>
<h2>A descriptive section heading</h2>
<p>Use semantic HTML for the article body.</p>
<pre tabindex="0" aria-label="Python example"><code class="language-python">if value &lt; 2:
    print("Escape &lt;, &gt;, and &amp; in code examples.")
</code></pre>
```

All four metadata fields are required. `title` and `summary` must be nonblank
strings. `date` must be a real calendar date in `YYYY-MM-DD` form. `tags` must
contain at least one nonblank string. The body must not be blank.

The publisher supplies the article's `h1`, date, tags, and summary. Start body
sections at `h2`, then use `h3` for subsections. Use paragraphs, lists,
blockquotes, figures with descriptive image alternatives, and links as
appropriate. Escape literal `<`, `>`, and `&` inside code examples as `&lt;`,
`&gt;`, and `&amp;`. The publisher escapes metadata but deliberately copies body
HTML unchanged. Write trusted repository-authored HTML; it does not sanitize
content or parse Markdown.
Give wide code blocks `tabindex="0"` and a descriptive `aria-label` so keyboard
readers can focus and scroll them.

Wrap wide tables in a labelled, keyboard-focusable scrolling region:

```html
<div class="table-scroll" tabindex="0" role="region" aria-label="Example comparison">
  <table>
    <caption>Example comparison</caption>
    <thead><tr><th scope="col">Approach</th><th scope="col">Trade-off</th></tr></thead>
    <tbody><tr><th scope="row">Static HTML</th><td>Regenerate after edits</td></tr></tbody>
  </table>
</div>
```

Asset links resolve from the generated article URL, not from `posts/`. For an
image committed at `assets/blog/<slug>/diagram.svg`, use
`src="../../assets/blog/<slug>/diagram.svg"` in the article. Link to another
article with `href="../other-slug/"`. The publisher does not copy assets or
rewrite body links.

Keep unpublished drafts outside `posts/`. Dates control display and ordering,
not scheduling: a future-dated source is published as soon as the publisher
runs. With no sources, the portfolio has no blog preview and the Blog navigation
link is hidden across the site. The direct `/blog/` URL still shows an empty
listing. Publishing the first source restores the preview and link; deleting
the last source and republishing hides them again.

## Publish and preview

Run from the repository root:

```sh
python3 scripts/publish_blog.py
python3 -m unittest discover -s scripts -p 'test_*.py'
python3 -m http.server 4187 --bind 127.0.0.1
```

The publisher creates `blog/index.html` and `blog/<slug>/index.html`, updates
the region between `blog-preview:start` and `blog-preview:end` in the root
`index.html`, and sets or removes `hidden` on the header's Blog link.
It also refreshes the header in `ai-workflow/index.html` when that page exists,
without changing its main content.
Keep the preview markers and the `href="blog/"` header anchor intact.
The listing shows every post, newest date first, with ascending slug order for
matching dates. The portfolio shows the latest three. Each article has a
permanent URL at `blog/<slug>/`. The publisher never reads or writes `resume/`.

Validation errors name the source file and the invalid field or content, then
exit with a nonzero status before changing output. Fix the source and rerun.
The publisher also refuses to overwrite a blog output file that lacks its
generated-file marker.

Preview these pages after generation:

- Portfolio: <http://127.0.0.1:4187/> opens directly, without a redirect.
- AI Workflow: <http://127.0.0.1:4187/ai-workflow/>
- Résumé and Print / Save as PDF: <http://127.0.0.1:4187/resume/index.html>
- Listing: <http://127.0.0.1:4187/blog/>
- Each article directly: `http://127.0.0.1:4187/blog/<slug>/`

Résumé links use the explicit `resume/index.html` file so they also work when
opening the portfolio directly from disk, without a web server.

Check desktop and mobile layouts, including 390px and 320px widths. Check title
and tag wrapping, code and table scrolling, image sizing, metadata, and all
links. Navigate with the keyboard to check focus, the skip link, and scrollable
tables. Reload an article's direct URL rather than relying only on navigation
from the listing. With no sources, check that the portfolio has no blog section
and the Blog link is hidden on both the portfolio and listing. Check that the
first published source restores the preview and navigation, and removing the
last source hides them again. Confirm that the root opens the portfolio directly
and that the résumé's print button and `?download=true` path include decoded
contact details. Confirm that the former static PDF URL is no longer served.

Check automatic Light/Dark changes with no saved `site-theme`, then use the
header button and confirm the choice survives reloads and navigation between
the portfolio, listing, and nested articles. Check keyboard use, blocked storage,
and a cold dark-mode load. Scroll section rules past the sticky header border
at normal and fractional pixel scales; its separator must not become a thick
band. Open and print the résumé while the site is dark; its colors stay light.

After editing or deleting a source, rerun the publisher and repeat the checks.
Keep a published filename stable: renaming it changes its URL and does not
create a redirect. Removing a source removes only its marked generated
`index.html`; the publisher removes its directory only when empty and leaves
assets and unrelated files alone.

Do not edit generated blog HTML or the generated portfolio preview by hand.
Edit article sources instead. The publisher reads the shared site header from
the root `index.html`, so rerun it after changing header navigation. It manages
the Blog link's visibility and the AI Workflow header; other portfolio content,
AI Workflow content, and `resume/` are outside its output.

Commit the sources, publisher and tests, documentation, any article assets,
updated root `index.html`, AI Workflow page, and generated `blog/` output together.

## Deploy to GitHub Pages

The production repository is `azarakovskiy/azarakovskiy.github.io`, and the
production URL is <https://azarakovskiy.com/>. In the destination repository's
**Settings → Pages**, use **Deploy from a branch**, branch **master**, folder
**/ (root)**. Publish the committed static files; Pages does not run the blog
publisher, and this site needs no Jekyll or dependency build.

Keep `CNAME` with the value `azarakovskiy.com` and keep the root `.nojekyll`
file. Do not copy the retired repository's `.git` directory into this repository.
The relative links work from the root; no `/portfolio/` prefix is needed.
The local preview commands and root URLs above use the same directory layout.

The migration changes local files only. It does not commit, push, change DNS,
configure Pages, or enforce HTTPS. Before release, confirm the destination
Pages branch and folder, custom domain, HTTPS setting, DNS, and successful
publication of the intended commit. The preserved `CNAME` is not proof that
those external settings are correct.

## Migration and retired URLs

The portfolio, résumé, blog listing, post sources, and publisher moved from
`azarakovskiy/portfolio` to this repository at the same relative paths.
The old Jekyll homepage, configuration, Ruby dependencies, layouts, styles,
assets, icons, web manifest, and prepared PDFs were removed.

The current URLs are:

- Portfolio: <https://azarakovskiy.com/>
- Résumé: <https://azarakovskiy.com/resume/index.html>
- Print flow: <https://azarakovskiy.com/resume/index.html?download=true>
- Blog listing: <https://azarakovskiy.com/blog/>
- Published articles: `https://azarakovskiy.com/blog/<slug>/`

There are no redirect shims. `/resume.pdf` and `/cv_old.pdf` are no longer
served. Removing the old `404.html` also removes its `/cv.pdf` redirect to
`/portfolio/resume?download=true`; use the current résumé or print-flow URL
instead. Removed icon and manifest URLs are no longer served.

The old `/portfolio/` project site is a separate Pages deployment. Moving files
here does not unpublish it, and archiving its repository is not a substitute
for unpublishing Pages. After the destination is live, separately unpublish
the source Pages site and archive the source repository. Once unpublished,
old `/portfolio/`, `/portfolio/resume`, `/portfolio/resume/index.html`, and
other `/portfolio/...` bookmarks stop working; they do not redirect to this
site. Old files and contact details can remain in Git history, caches, and
copies.
