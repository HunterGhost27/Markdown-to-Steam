[h1]Markdown-to-Steam[/h1]

GitHub Action to automatically parse README.md into a Steam BB-code text file.

[h3]Workflow setup[/h3]

Create a workflow file `.github/workflows/md2steam.yaml`.

[code]
[h1]=================[/h1]
[h1]MARKDOWN-TO-STEAM[/h1]
[h1]=================[/h1]

[h1]This workflow converts the repo's README.md into steam bb-code[/h1]

name: Markdown-to-Steam

[h1]Activation Events[/h1]
[h1]=================[/h1]

on:
  # When README.md is updated
  push:
    paths:
[list]
[*] README.md
[/list]

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
[list]
[*] name: Checkout
[/list]
        uses: actions/checkout@v2

      # Execute Markdown-to-Steam Action
      # ================================

[list]
[*] name: Markdown-to-Steam
[/list]
        uses: HunterGhost27/Markdown-to-Steam@main
        id: Markdown-to-Steam

        # Config Parameters
        # -----------------

        with:
          # The file to change
          file: "README.md"
          
          # Target directory
          target: "README.txt"

          # Commit Message
          commitMessage: "Update Steam BB-Content"

        # Environment Variables
        # ---------------------

        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # Needed to make use of the GitHub API

[/code]

[h2]Permissions[/h2]

This action needs the `GITHUB_TOKEN` secret to make use of the GitHub API.
