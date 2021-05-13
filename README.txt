[h1]Markdown-to-Steam[/h1]

GitHub Action to automatically parse README.md into Steam BB code text file.

[h3]Workflow setup[/h3]

Create a workflow file [code].github/workflows/md2steam.yaml[/code].

[code][/code][code]yaml
[h1]=================[/h1]
[h1]MARKDOWN-TO-STEAM[/h1]
[h1]=================[/h1]

[h1]This workflow parses the repo's README.md file and creates/updates a text file for the steam workshop description[/h1]

name: Markdown-to-Steam

[h1]Activation Events[/h1]
[h1]=================[/h1]

on:
  # When README.md is updated
  push:
    paths:
      - README.md

  # When a workflow event is dispatched manually
  workflow_dispatch:

[h1]Jobs[/h1]
[h1]====[/h1]

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
        uses: HunterGhost27/Markdown-to-Steam@v1.0.0
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
          GITHUB[i]TOKEN: ${{ secrets.GITHUB[/i]TOKEN }} # Needed to make use of the GitHub API
[/code][code][/code]

[h2]Permissions[/h2]

This action needs the [code]GITHUB_TOKEN[/code] secret to make use of the GitHub API.