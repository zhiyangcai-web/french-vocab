# French Vocabulary Flashcards

This repository hosts the mobile DELF B2 active-vocabulary flashcards:

https://zhiyangcai-web.github.io/french-vocab/

Study export links:

https://zhiyangcai-web.github.io/french-vocab/exports.html

Listening hub:

https://zhiyangcai-web.github.io/french-vocab/listening.html

## Files

- `index.html`: mobile flashcard app.
- `listening.html`: mobile DELF B2 listening practice hub.
- `vocab.json`: source data used by the web app. Each card has its own `date`, `batch`, `theme`, and `tags`.
- `listening.json`: source data for listening materials. The app stores only source links and short study notes, not hosted audio.
- `LISTENING_SOURCE_GUIDE.md`: source selection rules for TV5MONDE-first + RFI backup.
- `LISTENING_UPDATE_INSTRUCTION.md`: update workflow for future listening links and transcripts.
- `listening_log.md`: listening-material update log.
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
2. Classify every new card individually. Reuse an existing DELF B2 theme when it fits, and add specific semantic `tags`.
3. Run `npm run export`.
4. Update Word/PDF exports when the study source changes.
5. Run `npm run validate`.
6. Commit and push to `main`.
7. Verify the GitHub Pages link.

Keep existing `date`, `theme`, and `expression` values stable for old cards because the mobile app uses them to preserve local review status.

Do not use a generic `Mixte` theme unless the user explicitly asks for it. If a daily batch contains mixed vocabulary, classify each card with its own theme and tags.
