# Listening Update Instruction

Chaque mise a jour de supports d'ecoute doit suivre ce protocole.

## Workflow obligatoire

1. Lire ce fichier avant toute modification.
2. Lire `LISTENING_SOURCE_GUIDE.md` et appliquer le mode TV5MONDE-first + RFI backup.
3. Evaluer si le support est adapte au niveau actuel DELF B2.
4. Si le support est trop difficile, le marquer B2+ ou C1- et reduire les taches.
5. Si le support est trop facile, le marquer B1+ et ajouter une tache de reformulation ou d'extraction d'expressions.
6. Mettre a jour `listening.json`.
7. Mettre a jour `listening_log.md`.
8. Pour les expressions a forte valeur, proposer seulement un ajout a `vocab.json`; ne pas les ajouter automatiquement sauf demande explicite.
9. Lancer `npm run validate`.
10. Commit.
11. Push.
12. Verifier GitHub Pages:
    - https://zhiyangcai-web.github.io/french-vocab/listening.html
    - https://zhiyangcai-web.github.io/french-vocab/listening.json

## Regles de donnees

Chaque support dans `listening.json` doit au minimum contenir:

```json
{
  "id": "2026-05-20-001",
  "date": "2026-05-20",
  "title": "...",
  "sourceUrl": "...",
  "transcriptUrl": "...",
  "sourceName": "TV5MONDE / RFI",
  "sourceType": "video / podcast / exercise",
  "level": "B1+ / B2 / B2+ / C1-",
  "theme": "...",
  "status": "new",
  "comprehension": null,
  "tasks": [],
  "keyExpressions": [],
  "hardSentences": [],
  "difficultyNotes": [],
  "reviewPlan": {}
}
```

## Statuts

- `new`: nouveau support.
- `extensive`: ecoute extensive faite.
- `intensive`: ecoute intensive faite.
- `reviewed`: support revu.

Les statuts modifies sur mobile sont stockes dans `localStorage`; `listening.json` garde le statut source.
