# Markdown-to-Steam

GitHub Action to automatically parse README.md into a Steam BB-code text file.

### Workflow setup

Create a workflow file `.github/workflows/md2steam.yaml`.

```yaml
# =================
# MARKDOWN-TO-STEAM
# =================

# This workflow converts the repo's README.md into steam bb-code

name: Markdown-to-Steam

# Activation Events
# =================

on:
  # When README.md is updated
  push:
    paths:
      - README.md

  # When a workflow event is dispatched manually
  workflow_dispatch:

# Jobs
# ====

jobs:
  Markdown-to-Steam:
    runs-on: ubuntu-latest

    name: Markdown-to-Steam
    steps:
      # Actions/Checkout
      # ================

      # Required for GITHUB_WORKSPACE
      - name: Checkout
        uses: actions/checkout@v2

      # Execute Markdown-to-Steam Action
      # ================================

      - name: Markdown-to-Steam
        uses: HunterGhost27/Markdown-to-Steam@main
        id: Markdown-to-Steam

        # Config Parameters
        # -----------------

        with:
          # The file to change
          file: "README.md"

          # Target directory
          outDir: "."

        # Environment Variables
        # ---------------------

        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # Needed to make use of the GitHub API
```

## Permissions

This action needs the `GITHUB_TOKEN` secret to make use of the GitHub API.