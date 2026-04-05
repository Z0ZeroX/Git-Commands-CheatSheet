---
title: git status
description: Git Basics - git status command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/01_basics/">Basics</a> › 
  <span>git status</span>
</div>

# git status


**Description:**  
Display the state of the working directory and staging area. Shows which files are modified, staged, untracked, or deleted.

**Syntax:**
```bash
git status
git status -s
git status --short
```

**Examples:**
```bash
# Full status output
git status

# Short format (condensed output)
git status -s

# Show branch and tracking info
git status -sb
```

**Detailed Explanation:**
- **Three states:** Files can be untracked, modified (unstaged), or staged
- **Branch info:** Shows current branch and commits ahead/behind remote
- **Safe command:** This only reads information; it never changes anything
- **Helpful hints:** Provides suggestions for next steps (e.g., how to stage or unstage files)

**Common Errors:**
- `fatal: not a git repository` → **Solution:** You're not in a Git repository; run `git init` or `cd` into one
- No errors typically occur with `git status` – it's a read-only command

**Pro Tips:**
- Use `git status -s` for a cleaner, more compact view
- Run `git status` frequently to understand your repository state
- Output legend: `??` = untracked, `M` = modified, `A` = added, `D` = deleted
- `git status` is your friend – use it before and after most Git commands

**Related Commands:**
- [`git add`](/01_basics/add) – Stage changes shown in status
- [`git diff`](/01_basics/diff) – See detailed changes
- [`git log`](/01_basics/log) – View commit history
- [`git commit`](/01_basics/commit) – Commit staged changes

---
