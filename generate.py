#!/usr/bin/env python3
"""
Regenerates every personalized Product Spotlight page from template.html + roster.csv.

To update shared content (products, copy, slides): edit template.html, keeping the
{{PLACEHOLDER}} tokens in the two contact-card sections intact, then rerun this script.

To add/remove/update a team member: edit roster.csv, then rerun this script.

Usage: python3 generate.py
"""
import csv
import html
import re
from pathlib import Path

HERE = Path(__file__).parent
TEMPLATE_PATH = HERE / "template.html"
ROSTER_PATH = HERE / "roster.csv"


def slugify(name: str) -> str:
    return re.sub(r"[^A-Za-z0-9]", "", name)


def format_phone(raw: str) -> tuple[str, str]:
    digits = re.sub(r"\D", "", raw)
    display = ".".join([digits[0:3], digits[3:6], digits[6:10]]) if len(digits) == 10 else raw
    return display, digits


def main():
    template = TEMPLATE_PATH.read_text(encoding="utf-8")

    with ROSTER_PATH.open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    for row in rows:
        name = row["name"].strip()
        title = row["title"].strip()
        nmls = row["nmls"].strip()
        email = row["email"].strip()
        photo = row["photo"].strip()
        phone_display, phone_tel = format_phone(row["phone"].strip())
        slug = slugify(name)

        page = template
        page = page.replace("{{PAGE_TITLE}}", html.escape(f"{name} | Homespire Mortgage"))
        page = page.replace("{{PHOTO_URL}}", photo)
        page = page.replace("{{FULL_NAME}}", name)
        page = page.replace("{{JOB_TITLE}}", title)
        page = page.replace("{{NMLS}}", nmls)
        page = page.replace("{{PHONE_DISPLAY}}", phone_display)
        page = page.replace("{{PHONE_TEL}}", phone_tel)
        page = page.replace("{{EMAIL}}", email)

        out_dir = HERE / slug
        out_dir.mkdir(parents=True, exist_ok=True)
        (out_dir / "index.html").write_text(page, encoding="utf-8")
        print(f"wrote {slug}/index.html")


if __name__ == "__main__":
    main()
