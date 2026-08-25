#!/usr/bin/env python3
"""
Regenerate the minified twins of styles.css and main.js.

    python3 docs/tools/minify_assets.py

Local, on-demand only - never invoked from CI or the Azure deploy pipeline
(see .github/workflows/*.yml, which only zips whatever is already committed
and never runs a build). Run it, review the size delta it prints, and commit
styles.min.css / main.min.js alongside the source edit that prompted them -
the same relationship build_docs.py maintains between docs/*.md and
docs/upload/*.docx: the hand-edited file is the single source of truth, the
generated file is committed like any other asset so it's obtainable without
re-running anything.

Every HTML page loads the .min files, not styles.css/main.js directly, so a
source edit is NOT visible in a browser until this script is rerun and the
"?v=" query string on every page's <link>/<script> tag is bumped to match
(see the comment above those tags, and the checklist on self-audit.html).
That is a real, disclosed narrowing of this site's otherwise-strict
no-build-step rule - see optimization.html's "One tradeoff, disclosed
rather than hidden" - accepted because it's confined to one command run
right before a push, not to every edit-and-refresh cycle.

Uses real minifiers via npx rather than a hand-rolled regex pass, the same
"npx already means npm never gets a persistent devDependency" pattern the
accessibility CI job already relies on for pa11y-ci/wait-on. --compress
only, no --mangle, on the JS side: Lighthouse's unminified-javascript audit
is driven by removable whitespace/comments, not identifier length, and
skipping mangle keeps the shipped file's variable names readable in
devtools without needing a source map.

Dependencies: Node.js + npx (fetches csso-cli/terser into npx's own cache
on first run; nothing is added to this repo or to a package.json, because
there isn't one).
"""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent

ASSETS = [
    {
        "src": "styles.css",
        "out": "styles.min.css",
        "cmd": lambda src, out: ["npx", "--yes", "csso-cli", str(src), "--output", str(out)],
    },
    {
        "src": "main.js",
        "out": "main.min.js",
        "cmd": lambda src, out: ["npx", "--yes", "terser", str(src), "--compress", "-o", str(out)],
    },
]


def main():
    for asset in ASSETS:
        src = ROOT / asset["src"]
        out = ROOT / asset["out"]
        if not src.exists():
            print(f"  skip {asset['src']}: not found at {src}", file=sys.stderr)
            sys.exit(1)

        before = src.stat().st_size
        subprocess.run(asset["cmd"](src, out), check=True, cwd=ROOT)
        after = out.stat().st_size

        pct = round((1 - after / before) * 100, 1) if before else 0
        print(f"  {asset['src']} -> {asset['out']}  ({before:,} -> {after:,} bytes, {pct}% smaller)")


if __name__ == "__main__":
    main()
