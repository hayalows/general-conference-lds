# General Conference Countdown

A lightweight, independent countdown helper for the **October 3–4, 2026 General Conference** of The Church of Jesus Christ of Latter-day Saints.

## What it does

- Counts down to the next conference session in real time.
- Converts all four sessions to the visitor's device timezone.
- Shows when a session is live and switches to replay/study links after conference.
- Lets visitors select their country and see verified official ways to watch or listen.
- Shows country or regional viewing options only where they can be traced to an official Church source.
- Generates `.ics` calendar files for each session.
- Works without a framework, API key, analytics script, or location permission.

## Official schedule used

The October 2026 conference has four two-hour sessions:

- Saturday, October 3: 10:00 a.m. MDT
- Saturday, October 3: 2:00 p.m. MDT
- Sunday, October 4: 10:00 a.m. MDT
- Sunday, October 4: 2:00 p.m. MDT

These correspond to `16:00 UTC` and `20:00 UTC` on both days.

Primary official sources:

- https://newsroom.churchofjesuschrist.org/event/october-2026-general-conference
- https://www.churchofjesuschrist.org/learn/ways-to-watch-general-conference?lang=eng
- https://www.churchofjesuschrist.org/media/broadcasts/?lang=eng
- https://www.churchofjesuschrist.org/my-home/areas/africa-south/general-conference-africa-south?lang=eng

## Product design choices

This site follows the repository's Product Design OS principles:

- **Primary job first:** the countdown and local time appear before supporting information.
- **Recognition over recall:** all four converted times stay visible together.
- **System carries the complexity:** the browser handles timezone conversion instead of making the user calculate MDT offsets.
- **Progressive disclosure:** country-specific viewing detail follows the core schedule.
- **Trust over false completeness:** unverified local broadcast methods are not shown as facts.
- **Responsive from the smallest viewport:** the experience reflows to one-column cards on narrow screens.
- **Accessible controls:** semantic links/buttons, visible focus, skip link, 44px+ targets, reduced-motion support, live status text.

## Run locally

Because the site is static, any local server works:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy

The repository is designed to deploy as a static site on Vercel with no build command required.

## Disclaimer

This project is independent and is **not an official website** of The Church of Jesus Christ of Latter-day Saints. It links to official Church sources for schedule and viewing information.
