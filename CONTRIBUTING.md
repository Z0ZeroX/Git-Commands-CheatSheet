# Contributing to Git Commands Cheat Sheet

First off, thank you for considering contributing to this project.

This project aims to be a comprehensive, community-driven resource for Git commands. Whether you're fixing a typo, adding a new command, or translating content, your contribution is valuable and appreciated.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Content Guidelines](#content-guidelines)
- [Content Template](#content-template)
- [Style Guide](#style-guide)
- [Development Setup](#development-setup)
- [Submitting Changes](#submitting-changes)
- [Translations](#translations)

---

## Code of Conduct

This project adheres to a code of conduct that all contributors are expected to follow:

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

---

## How Can I Contribute?

### 1. Reporting Issues

Found a problem? Please [open an issue](https://github.com/Z0ZeroX/Git-Commands-CheatSheet/issues/new) and include:

- A clear, descriptive title
- Detailed description of the issue
- Steps to reproduce (if applicable)
- Expected vs actual behavior
- Screenshots (if relevant)

### 2. Suggesting Enhancements

Have an idea? We'd love to hear it! Open an issue with:

- Clear description of the enhancement
- Why it would be useful
- Examples of how it would work

### 3. Adding New Commands

Want to document a Git command? Great! Follow these steps:

1. Check if the command already exists
2. Choose the appropriate category file (see [File Organization](#file-organization))
3. Use our [Content Template](#content-template)
4. Submit a Pull Request

### 4. Improving Documentation

Help make existing documentation better:

- Fix typos and grammar
- Add clearer examples
- Expand explanations
- Add missing edge cases
- Update outdated information

### 5. Translations

Help make this resource accessible in other languages! See [Translations](#translations) section.

---

## File Organization

Commands are organized by folders under `docs/`:

| Folder/File | Content |
|------|---------|
| `docs/01_basics/` | `init`, `clone`, `add`, `commit`, `status`, `log`, `diff` |
| `docs/02_branching/` | `checkout`, `switch`, `merge` |
| `docs/03_merging/` | `rebase`, `cherry-pick`, `revert` |
| `docs/04_remote/` | `push`, `pull`, `fetch`, `remote`, `submodule` |
| `docs/05_advanced/` | `stash`, `reflog`, `bisect`, `hooks`, `worktree` |
| `docs/06_troubleshooting/` | troubleshooting scenarios and fixes |
| `docs/guides/` | practical guides (`faq`, `gitignore`, `workflows`) |
| `docs/glossary.md` | Git terminology and definitions |

---

## Content Template

**Every Git command MUST follow this structure:**

```markdown
## git command-name

**Description:**  
A clear, concise explanation of what the command does (1-2 sentences).

**Syntax:**
```bash
git command-name [options] [arguments]
git command-name --option value
```

**Examples:**
```bash
# Example 1: Basic usage
git command-name

# Example 2: With options
git command-name --option value

# Example 3: Real-world scenario
git command-name --flag argument
```

**Detailed Explanation:**
- **Point 1:** Explain key concept
- **Point 2:** How it works internally
- **Point 3:** When to use it
- **Point 4:** What happens after execution

**Common Errors:**
- `error: message here` → **Solution:** Explanation of cause and how to fix
- `fatal: another error` → **Solution:** Step-by-step resolution
- `warning: potential issue` → **Solution:** What this means and what to do

**Pro Tips:**
- **Tip 1:** Useful shortcut or best practice
- **Tip 2:** Advanced usage or performance tip
- **Tip 3:** Integration with other commands
- **Warning:** Common pitfalls to avoid

**Related Commands:**
- [`git related-command`](#git-related-command) – Brief description
- [`git another-command`](#git-another-command) – Brief description

**See Also:**
- [External resource](https://example.com)
- [Official documentation](https://git-scm.com/docs/git-command)

---
```

---

## Style Guide

### Markdown Formatting

- Use `##` for command headings (e.g., `## git commit`)
- Use `**bold**` for emphasis on important terms
- Use `` `backticks` `` for command names, options, and code
- Use `bash` code blocks for all command examples
- Do not use emoji in headings or list items

### Writing Style

- **Be clear and concise** – Avoid unnecessary jargon
- **Use active voice** – "This command does X" not "X is done by this command"
- **Provide context** – Explain WHY someone would use this command
- **Include real examples** – Show actual use cases, not just syntax
- **Be accurate** – Test all commands before documenting

### Code Examples

- Always use `bash` language identifier
- Add comments to explain complex commands
- Show both basic and advanced usage
- Use realistic file/branch names (not just "file.txt" or "branch1")

Example:
```bash
# Good: Realistic, explained example
git checkout -b feature/user-authentication

# Avoid: Generic, unexplained example
git checkout -b branch1
```

### Command Options

- List most common options first
- Explain what each option does
- Show both short (`-m`) and long (`--message`) forms when available

---

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git installed locally
- Basic knowledge of Markdown

### Local Setup

1. **Fork the repository**
   
   Click the "Fork" button at the top right of the repository page.

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Git-Commands-CheatSheet.git
   cd Git-Commands-CheatSheet
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/Z0ZeroX/Git-Commands-CheatSheet.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm run docs:dev
   ```

6. **Open in browser**
   
   Navigate to `http://localhost:5173`

### Testing Your Changes

Before submitting:

1. **Preview locally** – Run `npm run docs:dev` and check your changes
2. **Build test** – Run `npm run docs:build` to ensure no build errors
3. **Check links** – Verify all internal links work correctly
4. **Test code examples** – Ensure all Git commands actually work

---

## Submitting Changes

### Pull Request Process

1. **Create a new branch**
   ```bash
   git checkout -b feature/add-git-reflog
   ```

2. **Make your changes**
   - Follow the [Content Template](#content-template)
   - Follow the [Style Guide](#style-guide)
   - Test your changes locally

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: git reflog command documentation"
   ```

   **Commit message format:**
   - `Add: ...` – New content
   - `Fix: ...` – Bug fixes or corrections
   - `Update: ...` – Improvements to existing content
   - `Docs: ...` – Documentation changes
   - `Style: ...` – Formatting changes

4. **Push to your fork**
   ```bash
   git push origin feature/add-git-reflog
   ```

5. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

### Pull Request Checklist

Before submitting, ensure:

- [ ] Changes follow the content template
- [ ] All examples are tested and working
- [ ] No typos or grammatical errors
- [ ] Links are working correctly
- [ ] Code blocks have proper syntax highlighting
- [ ] Commit messages follow the format
- [ ] PR description clearly explains changes
- [ ] Local build succeeds (`npm run docs:build`)

---

## Repository CI/CD Policy

This repository uses three workflows:

- `CI - Validate Docs` (`.github/workflows/ci.yml`)
- `Generate PDF from Quick Reference` (`.github/workflows/generate-pdf.yml`)
- `Deploy VitePress Site to GitHub Pages` (`.github/workflows/deploy.yml`)

### Expected behavior

- On **pull request to `main`**:
   - CI build must pass.
   - PDF workflow validates and uploads artifact (no repository write on PR).
- On **push/merge to `main`**:
   - CI runs again.
   - Deploy workflow publishes GitHub Pages.
   - PDF workflow may commit updated PDF to `downloads/`.

### Branch protection checklist (recommended)

Configure branch protection for `main` in repository settings:

- [ ] Require a pull request before merging
- [ ] Require at least 1 approval
- [ ] Dismiss stale approvals when new commits are pushed
- [ ] Require branches to be up to date before merging
- [ ] Require status checks to pass before merging
- [ ] Add required check: `CI - Validate Docs / docs-build`
- [ ] (Optional) Require conversation resolution before merge
- [ ] (Optional) Restrict who can push directly to `main`

### Maintainer note

After changing workflow files, run a PR test first. Do not merge workflow changes directly without at least one successful workflow run.

---

## Translations

Want to translate the documentation?

### Translation Guidelines

1. Create a new folder: `docs/[language-code]/`
   - Example: `docs/vi/` for Vietnamese, `docs/es/` for Spanish

2. Copy the structure from `docs/`

3. Translate file by file, maintaining the same structure

4. Update VitePress config to add language selector

5. Submit a PR with your translation

### Translation Checklist

- [ ] All files translated
- [ ] Technical terms kept in English (when appropriate)
- [ ] Examples adapted for target audience
- [ ] Links updated to translated versions
- [ ] Language selector added to config

---

## Questions?

If you have any questions:

- [Start a discussion](https://github.com/Z0ZeroX/Git-Commands-CheatSheet/discussions)
- [Open an issue](https://github.com/Z0ZeroX/Git-Commands-CheatSheet/issues)
- Contact maintainers (see README)

---

## Thank You

Every contribution, no matter how small, makes this project better for everyone. We appreciate your time and effort!

**Happy contributing.**
