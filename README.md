# Product Spotlight pages

Each team member has a personalized copy of the product spotlight deck, live at:

`https://mmiller-hmc.github.io/ProductSpotlight/<Slug>/`

## How this works

- `template.html` is the single source of truth for all shared content (slides,
  copy, products, styling). It contains `{{PLACEHOLDER}}` tokens in the two
  contact-card sections and in the page `<title>`.
- `roster.csv` lists every team member and their contact info (name, title,
  NMLS#, phone, email, headshot URL).
- `generate.py` reads `template.html` + `roster.csv` and writes
  `<Slug>/index.html` for every row in the roster.

`OtmaneLaassel/index.html` is maintained by hand (not generated) and is not
listed in `roster.csv`.

## To update shared content (e.g. add/remove a product)

1. Edit `template.html` — keep the `{{PLACEHOLDER}}` tokens in the contact
   card sections and `<title>` intact.
2. Run:
   ```
   python3 generate.py
   ```
3. Commit and push. Every team member's page updates at once.

## To add, remove, or update a team member

1. Edit `roster.csv` (add/remove/edit a row — name, title, nmls, phone,
   email, photo).
2. Run `python3 generate.py`.
3. Commit and push.
