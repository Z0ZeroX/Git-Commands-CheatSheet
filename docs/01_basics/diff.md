---
title: git diff
description: Git Basics - git diff command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/01_basics/">Basics</a> › 
  <span>git diff</span>
</div>

# git diff


**Description:**  
Show differences between commits, branches, working directory, and staging area. Essential for reviewing changes before committing.

**Syntax:**
```bash
git diff
git diff --staged
git diff <commit> <commit>
git diff <branch> <branch>
```

**Examples:**
```bash
# Show unstaged changes
git diff

# Show staged changes (what will be committed)
git diff --staged
# or
git diff --cached

# Compare two commits
git diff abc123 def456

# Compare current branch with another branch
git diff main feature/login

# Show changes for specific file
git diff path/to/file.txt

# Compare with remote branch
git diff origin/main
```

**Detailed Explanation:**
- **Line-by-line comparison:** Shows exactly what changed, with `+` for additions and `-` for deletions
- **Three comparison modes:** Working directory vs staging, staging vs last commit, or any two commits
- **Context lines:** Shows a few unchanged lines around changes for context
- **Color coding:** Green for additions, red for deletions (if colors are enabled)

**Common Errors:**
- `fatal: ambiguous argument` → **Solution:** Check branch/commit names for typos
- No output from `git diff` → **Solution:** No changes in working directory; try `git diff --staged`

**Pro Tips:**
- Use `git diff --word-diff` for word-by-word comparison instead of line-by-line
- Use `git diff --stat` for a summary of changed files without details
- Review before committing: `git diff --staged` shows exactly what will be committed
- Use `git diff HEAD` to see all changes since last commit (staged + unstaged)
- Compare specific file between branches: `git diff branch1 branch2 -- file.txt`

**Related Commands:**
- [`git status`](/01_basics/status) – See which files changed
- [`git add`](/01_basics/add) – Stage changes
- [`git commit`](/01_basics/commit) – Save changes
- `git show` – View changes in a specific commit

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `git init` | Initialize new repository |
| `git clone <url>` | Copy remote repository |
| `git add <file>` | Stage changes |
| `git commit -m "msg"` | Save staged changes |
| `git status` | Check repository state |
| `git log` | View commit history |
| `git diff` | Show changes |

---
