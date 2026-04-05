---
title: git add
description: Git Basics - git add command
---

# git add


**Description:**  
Add file contents to the staging area (index), preparing them for the next commit. This tells Git which changes you want to include.

**Syntax:**
```bash
git add <file>
git add <directory>
git add .
git add -A
git add -p
```

**Examples:**
```bash
# Add a specific file
git add index.html

# Add all files in a directory
git add src/

# Add all changes in current directory and subdirectories
git add .

# Add all changes in entire repository
git add -A

# Interactively choose which changes to add
git add -p style.css
```

**Detailed Explanation:**
- **Staging area:** `git add` moves changes to the staging area, a middle ground between working directory and repository
- **Snapshot:** Creates a snapshot of the current file content that will be committed
- **Selective adding:** You can add only specific files or even specific lines within files (`-p`)
- **Doesn't commit:** Files added are not yet saved to history until you run `git commit`

**Common Errors:**
- `fatal: pathspec 'file' did not match any files` → **Solution:** Check file path spelling or if file exists
- `warning: LF will be replaced by CRLF` → **Solution:** This is line-ending normalization, usually safe to ignore
- Nothing happens after `git add` → **Solution:** This is normal; use `git status` to verify files are staged

**Pro Tips:**
- Use `git add -p` for interactive staging (great for committing only parts of a file)
- Use `git add -u` to stage only modified and deleted files (not new files)
- Use `.gitignore` to prevent accidentally adding unwanted files
- Review staged changes with `git diff --staged` before committing
- **Warning:** `git add .` adds everything in current directory; double-check with `git status` first

**Related Commands:**
- [`git status`](/01_basics/status) – See what's staged and unstaged
- [`git commit`](/01_basics/commit) – Save staged changes to history
- `git reset` – Unstage files
- [`git diff`](/01_basics/diff) – See what changes are staged

---

[← Back to Git Basics](./index.md)
