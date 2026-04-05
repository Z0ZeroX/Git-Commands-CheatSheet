---
title: git checkout
description: Git Branching - git checkout command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/02_branching/">Branching</a> › 
  <span>git checkout</span>
</div>

# git checkout


**Description:**  
Switch between branches or restore files from commits. This is Git's Swiss Army knife command with multiple uses.

**Syntax:**
```bash
git checkout <branch-name>
git checkout -b <new-branch>
git checkout <commit-hash>
git checkout -- <file>
```

**Examples:**
```bash
# Switch to existing branch
git checkout develop

# Create and switch to new branch in one command
git checkout -b feature/shopping-cart

# Switch to a specific commit (detached HEAD state)
git checkout abc1234

# Create branch from specific commit
git checkout -b bugfix/issue-42 abc1234

# Discard changes to a file (restore from last commit)
git checkout -- index.html

# Restore all files in directory
git checkout -- .

# Switch to previous branch
git checkout -

# Checkout specific file from another branch
git checkout main -- config.json
```

**Detailed Explanation:**
- **Multi-purpose command:** Can switch branches, restore files, or view old commits
- **Updates working directory:** Changes files in your working directory to match the target branch/commit
- **Detached HEAD:** Checking out a commit (not a branch) puts you in "detached HEAD" state
- **Being replaced:** Newer Git versions introduce `git switch` and `git restore` to separate these functions

**Common Errors:**
- `error: pathspec 'branch' did not match any file(s)` → **Solution:** Branch doesn't exist; use `git branch` to verify or create it
- `error: Your local changes would be overwritten` → **Solution:** Commit, stash, or discard your changes first
- `You are in 'detached HEAD' state` → **Solution:** This is a warning; create a branch if you want to keep work: `git checkout -b new-branch`
- `fatal: reference is not a tree` → **Solution:** Invalid commit hash; check with `git log`

**Pro Tips:**
- Use `git switch` instead of `git checkout` for switching branches (clearer intent)
- Use `git restore` instead of `git checkout --` for restoring files (more explicit)
- Save time: `git checkout -` switches to the previous branch (like `cd -`)
- Checkout remote branch: `git checkout -b local-name origin/remote-branch`
- **Warning:** `git checkout -- file` discards all changes permanently; use with caution.

**Related Commands:**
- [`git switch`](/02_branching/switch) – Modern alternative for switching branches
- `git restore` – Modern alternative for restoring files
- [`git branch`](/02_branching/) – List or create branches
- [`git stash`](/05_advanced/stash) – Temporarily save changes before switching

---
