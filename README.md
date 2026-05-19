# French Vocabulary Flashcards

This repository hosts the mobile DELF B2 active-vocabulary flashcards:

https://zhiyangcai-web.github.io/french-vocab/

## Files

- `index.html`: mobile flashcard app.
- `vocab.json`: source data used by the web app.
- `daily_active_vocabulary_log.md`: daily learning log.
- `active_vocabulary_cards.md`: card-style study source.
- `active_vocabulary_table.md`: compact table source.
- `active_vocabulary_cards.docx/.pdf`: card-style exports.
- `active_vocabulary_table.docx/.pdf`: table exports.
- `cards.md/.docx/.pdf`, `table.md/.docx/.pdf`, `log.md`: GitHub Pages-friendly public aliases for the same study exports.
- `scripts/export_active_vocabulary.mjs`: export and validation helper.

## Commands

```bash
npm run export
npm run validate
```

`npm run export` regenerates the Markdown study files from `vocab.json`.
`npm run validate` checks JSON shape, required files, PDF headers, and common mojibake markers.

## Update Workflow

1. Add new DELF B2 active expressions to `vocab.json`.
2. Run `npm run export`.
3. Update Word/PDF exports when the study source changes.
4. Run `npm run validate`.
5. Commit and push to `main`.
6. Verify the GitHub Pages link.

Keep existing `date`, `theme`, and `expression` values stable for old cards because the mobile app uses them to preserve local review status.
