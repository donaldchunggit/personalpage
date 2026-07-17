<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Text files are UTF-8

Never create a text file with PowerShell `>` or `Out-File` without
`-Encoding utf8`. PS 5.1 defaults to UTF-16LE with a BOM, and editors then
preserve that encoding while dropping the BOM — leaving BOM-less UTF-16 that
GitHub renders as mojibake and `file` reports as `data`. The original README
was created this way and had to be converted back. Every tracked file is
UTF-8 today; keep it that way.

# The site deploys from the repo root

The Next.js app is at the root on purpose. See README's Deploy section before
moving it into a subdirectory — Vercel's Root Directory setting is unset, and
a nested app silently deploys as unbuilt static files.
