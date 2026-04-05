---
title: Git Branching
description: Work with branches to develop features, fix bugs, and experiment safely
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <span>Branching</span>
</div>

# Branching Commands

Work with branches to develop features, fix bugs, and experiment safely without affecting the main codebase.

---

## git branch

**Description:**  
List, create, or delete branches in your repository. Branches allow you to develop features in isolation from the main codebase.

**Syntax:**
```bash
git branch
git branch <branch-name>
git branch -d <branch-name>
git branch -D <branch-name>
git branch -m <old-name> <new-name>
```

**Examples:**
```bash
# List all local branches
git branch

# List all branches (local and remote)
git branch -a

# Create a new branch (but don't switch to it)
git branch feature/user-profile

# Delete a merged branch
git branch -d old-feature

# Force delete an unmerged branch
git branch -D experimental-feature

# Rename current branch
git branch -m new-branch-name

# Rename a different branch
git branch -m old-name new-name

# Show last commit on each branch
git branch -v

# Show tracking branches
git branch -vv
```

**Detailed Explanation:**
- **Lightweight pointers:** Branches are just movable pointers to commits, not copies of files
- **Doesn't switch:** `git branch <name>` creates a branch but keeps you on the current branch
- **Safe deletion:** `-d` only deletes if branch is fully merged; `-D` forces deletion
- **Branch tracking:** Shows which remote branch your local branch is tracking with `-vv`

**Common Errors:**
- `error: branch 'name' not found` → **Solution:** Check spelling; use `git branch` to list existing branches
- `error: The branch 'name' is not fully merged` → **Solution:** Use `-D` to force delete, or merge the branch first
- `error: Cannot delete branch 'main' checked out at...` → **Solution:** Switch to another branch before deleting
- `fatal: A branch named 'name' already exists` → **Solution:** Choose a different name or delete the existing branch first

**Pro Tips:**
- Use descriptive names: `feature/login`, `bugfix/header-alignment`, `hotfix/critical-security`
- See merged branches: `git branch --merged` (safe to delete)
- See unmerged branches: `git branch --no-merged` (check before deleting)
- Quickly list remote branches: `git branch -r`
- Clean up remote-tracking references: `git fetch --prune`
- **Warning:** `-D` permanently deletes unmerged work; make sure you don't need it.

**Related Commands:**
- [`git checkout`](/02_branching/checkout) – Switch to a branch
- [`git switch`](/02_branching/switch) – Modern way to switch branches
- [`git merge`](/02_branching/merge) – Combine branches
- [`git push`](/04_remote/push) – Push branch to remote

---

## Commands in This Section

- [git checkout](./checkout.md)
- [git switch](./switch.md)
- [git merge](./merge.md)

---
