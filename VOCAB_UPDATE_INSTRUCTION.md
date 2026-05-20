# Vocabulary Update Instruction

This file is the required operating instruction for future Codex work on this repository.

Before processing any new French word, expression, topic, article excerpt, or vocabulary request from the user, Codex must read this file first and follow it.

## Goal

Maintain this GitHub repository as the only source of truth for the user's DELF B2 active vocabulary flashcards.

The user should only need to send new words, expressions, or a theme. Codex must handle the full update workflow without asking the user to edit files manually.

## Card Standard

Every new vocabulary item must be turned into a DELF B2 active-expression card, not just a dictionary entry.

Each card in `vocab.json` must contain:

- `date`
- `batch`
- `theme`
- `tags`
- `expression`
- `zh`
- `collocations`
- `example`
- `useCase`

The card should be useful for DELF B2 writing, speaking, reading, or listening comprehension. Prefer expressions that can be reused directly in an argument, a personal example, a summary, or an opinion.

## Classification Rules

Classification is per card, not per daily batch. The user may send mixed vocabulary in one message.

- `batch` records the update batch. If no separate batch name is needed, use the card date.
- `theme` is the main DELF B2 topic for that specific card.
- `tags` are finer semantic labels. A card may have several tags.
- Prefer an existing theme when it fits the new expression.
- Create a new theme only when no existing theme is appropriate.
- Do not create a `Mixte` theme unless the user explicitly asks for it.

Recommended DELF B2 theme names include:

- Services publics et démarches administratives
- Travail et organisation professionnelle
- Éducation et inégalités
- Santé et accès aux soins
- Environnement et transition écologique
- Numérique et société
- Logement et conditions de vie
- Consommation et pouvoir d'achat
- Médias et information
- Culture et vie sociale

## Stable IDs

The mobile app uses this stable ID to preserve known-word status in browser localStorage:

```text
date::theme::expression
```

Do not change `date`, `theme`, or `expression` for existing cards unless the user explicitly asks to replace that card. Changing any of these values can reset the user's known-word status on the phone.

## Required Workflow For New Vocabulary

When the user sends new vocabulary, Codex must do all of the following by default:

1. Pull or verify the latest `main` before editing.
2. Read `VOCAB_UPDATE_INSTRUCTION.md`.
3. Read `vocab.json` and inspect existing themes and card style.
4. Convert the user's input into one or more DELF B2 active-expression cards.
5. Classify every card individually with `batch`, `theme`, and `tags`.
6. Add the new cards to `vocab.json`.
7. Update the top-level `updated` date in `vocab.json` to the current date.
8. Run:

```bash
npm run export
npm run validate
```

9. Confirm generated study files are updated:

- `daily_active_vocabulary_log.md`
- `active_vocabulary_cards.md`
- `active_vocabulary_table.md`
- `active_vocabulary_cards.docx`
- `active_vocabulary_cards.pdf`
- `active_vocabulary_table.docx`
- `active_vocabulary_table.pdf`
- public export aliases such as `cards.md`, `cards.docx`, `cards.pdf`, `table.md`, `table.docx`, `table.pdf`, and `log.md` if the export script manages them.

10. Check for common encoding or mojibake risks with `npm run validate`.
11. Commit all changed source and generated files.
12. Push to `main`.
13. Verify GitHub Pages or raw GitHub after push.

## Commit And Push

Use a concise commit message that describes the vocabulary update, for example:

```text
Add environment vocabulary flashcards
```

After pushing, verify at minimum:

- `https://zhiyangcai-web.github.io/french-vocab/` returns HTTP 200.
- Online `vocab.json` has the expected card count and updated date.
- At least one generated export file is accessible online.

## User-Facing Final Reply

After a successful update, the final reply to the user should be brief and only include:

- how many cards were added
- the theme or themes
- whether GitHub Pages updated successfully
- any real problem or limitation, if one occurred

Do not give the user manual editing steps unless the environment lacks file access or GitHub write permission.

## When To Ask Questions

Do not stop to ask questions for normal vocabulary additions. Make reasonable DELF B2 choices for theme, expression, collocations, example, and use case.

Ask the user only if the input is too ambiguous to turn into useful cards, or if access to the repository, npm, export tools, or GitHub push is blocked.
