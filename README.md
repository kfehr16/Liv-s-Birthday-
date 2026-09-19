# for-liv

A small, private birthday website. Plain HTML/CSS/JS, no build tools, no backend. All the content lives in `content.json` — the code just renders whatever is in there.

## Running it locally

Because the site loads `content.json` with `fetch()`, opening `index.html` directly from the filesystem won't work in most browsers (CORS blocks local file fetches). Instead, run a tiny local server from this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Adding new content

Everything is edited in `content.json`. No HTML or JS changes needed. After editing, commit and push — GitHub Pages updates automatically within a minute or two.

### Add an "open when" card

Add a new object to the `openWhen` array:

```json
{
  "id": "unique-id-for-this-card",
  "label": "Open when you're bored",
  "message": "The note text that appears when the card is opened.",
  "image": null,
  "link": null
}
```

- `image` is optional — set it to a path like `"images/your-photo.jpg"` or leave it `null`.
- `link` is optional — set it to a URL (e.g. a song) or leave it `null`.

### Add a memory

Add a new object to the `memories` array:

```json
{
  "date": "2024-07-04",
  "caption": "What was happening in this photo",
  "image": "images/your-photo.jpg"
}
```

Put the actual photo file in the `images/` folder first, then reference its filename here.

### Edit the "Happy Birthday" note

Change the `birthdayNote` field at the top of `content.json`:

```json
"birthdayNote": "The message text that appears in the Happy Birthday card."
```

### Updating the "last updated" date

Change the `lastUpdated` field at the top of `content.json` (format: `"YYYY-MM-DD"`).

## Hosting on GitHub Pages

1. Push this repo to GitHub (public repo, since GitHub Pages is free for public repos).
2. In the repo, go to **Settings → Pages**.
3. Under **Source**, choose the `main` branch and the `/ (root)` folder.
4. GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/`.
5. Don't link the URL anywhere public — just share it directly.
