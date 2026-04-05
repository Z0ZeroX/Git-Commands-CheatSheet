---
title: git log
description: Git Basics - git log command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/01_basics/">Basics</a> › 
  <span>git log</span>
</div>

# git log


**Description:**  
Show the commit history of the repository. Displays commits in reverse chronological order (newest first).

**Syntax:**
```bash
git log
git log --oneline
git log --graph
git log -n <number>
git log --author="name"
```

**Examples:**
```bash
# View full commit history
git log

# Compact one-line format
git log --oneline

# Visual branch graph
git log --oneline --graph --all

# Show last 5 commits
git log -5

# Filter by author
git log --author="John Doe"

# Show commits for specific file
git log -- path/to/file.txt

# Pretty format with graph
git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'
```

**Detailed Explanation:**
- **Commit details:** Shows hash, author, date, and commit message
- **Chronological order:** Most recent commits appear first
- **Exit viewer:** Press `q` to exit the log viewer (uses `less` pager)
- **Navigation:** Use arrow keys, space, or `j`/`k` to scroll through history

**Common Errors:**
- `fatal: your current branch 'main' does not have any commits yet` → **Solution:** No commits exist yet; create your first commit
- No errors typically occur – this is a read-only command

**Pro Tips:**
- Use `git log --oneline --graph --all --decorate` for a clear visual history
- Create an alias for your favorite log format: `git config --global alias.lg "log --oneline --graph"`
- Use `git log -p` to see the actual code changes in each commit
- Filter by date: `git log --since="2 weeks ago" --until="yesterday"`
- Search commit messages: `git log --grep="bug fix"`

**Related Commands:**
- `git show` – Display details of a specific commit
- [`git diff`](/01_basics/diff) – Compare commits
- [`git reflog`](/05_advanced/reflog) – Show reference log (includes reset commits)
- [`git log --follow <file>`](/01_basics/log) – Track file history even through renames

---
