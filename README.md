# Git Commands Cheat Sheet

[![GitHub Pages](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://Z0ZeroX.github.io/git-commands-cheatsheet/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Contributing](https://img.shields.io/badge/Contributions-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Issues](https://img.shields.io/badge/Issues-open-orange.svg)](https://github.com/Z0ZeroX/git-commands-cheatsheet/issues)
[![Contributors](https://img.shields.io/github/contributors/Z0ZeroX/git-commands-cheatsheet?color=brightgreen)](https://github.com/Z0ZeroX/git-commands-cheatsheet/graphs/contributors)

A community-maintained Git reference site with command explanations, examples, troubleshooting notes, and a printable quick reference.

---

## What this project is

This repository powers a VitePress documentation site for learning and using Git more effectively.

It is designed to be:

- **Easy to scan** for common commands
- **Practical** with examples and real-world workflows
- **Helpful when things go wrong** with troubleshooting guidance
- **Friendly to contributors** with clear writing and open-source workflows

---

## What’s included

- **Basics** – `init`, `clone`, `add`, `commit`, `status`, `log`, `diff`
- **Branching** – `checkout`, `switch`, `merge`
- **Merging and history rewriting** – `rebase`, `cherry-pick`, `revert`
- **Remote workflows** – `push`, `pull`, `fetch`, `remote`, `submodule`
- **Advanced topics** – `stash`, `reflog`, `bisect`, `worktree`, `hooks`
- **Troubleshooting** – common Git problems and fixes
- **Guides** – workflows, `.gitignore`, and FAQ
- **Glossary** – short definitions for Git terms
- **Quick Reference** – a compact page and printable PDF

---

## Documentation layout

```text
docs/
├── 01_basics/
├── 02_branching/
├── 03_merging/
├── 04_remote/
├── 05_advanced/
├── 06_troubleshooting/
├── guides/
├── glossary.md
├── index.md
└── quick-reference.md
```

Each folder contains focused pages so readers can jump directly to the topic they need.

---

## Quick start

### Read online

Open the live site here: [Z0ZeroX.github.io/git-commands-cheatsheet](https://Z0ZeroX.github.io/git-commands-cheatsheet/)

### Run locally

```bash
git clone https://github.com/Z0ZeroX/git-commands-cheatsheet.git
cd git-commands-cheatsheet
npm install
npm run docs:dev
```

Then open the local site shown in the terminal, usually `http://localhost:5173`.

### Build the site

```bash
npm run docs:build
```

### Download the PDF

Use the printable quick reference here: [Git Commands Quick Reference PDF](https://Z0ZeroX.github.io/git-commands-cheatsheet/downloads/git-commands-quick-reference.pdf)

---

## Development requirements

- Node.js 18+
- npm
- Git installed locally

If you are only reading the docs, you do not need any local dependencies.

---

## Contributing

Contributions are welcome.

You can help by:

- improving command explanations
- fixing typos or broken links
- adding examples or edge cases
- improving troubleshooting content
- translating the site into more languages

Before submitting a pull request:

1. Read [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Create a feature branch
3. Make your changes
4. Preview the docs locally
5. Run a production build to catch broken links or formatting issues

---

## Open-source notes

- **License:** MIT — see [LICENSE](./LICENSE)
- **Issues:** use GitHub Issues for bugs, ideas, and content fixes
- **Discussions:** use GitHub Discussions for broader questions and suggestions
- **Code of conduct:** contributor expectations are documented in [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## Support

If this project helps you, a star on GitHub is always appreciated.

- [Report an issue](https://github.com/Z0ZeroX/git-commands-cheatsheet/issues)
- [Start a discussion](https://github.com/Z0ZeroX/git-commands-cheatsheet/discussions)
- [Read the FAQ](./docs/guides/faq.md)

---

## Acknowledgments

Thanks to everyone who contributes documentation, feedback, fixes, and ideas.

---

## Learn more

- [Official Git documentation](https://git-scm.com/doc)

