---
title: git merge
description: Git Branching - git merge command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/02_branching/">Branching</a> › 
  <span>git merge</span>
</div>

# git merge


**Description:**  
Integrate changes from one branch into another. Combines the history of two branches into one.

**Syntax:**
```bash
git merge <branch-name>
git merge --no-ff <branch-name>
git merge --squash <branch-name>
```

**Examples:**
```bash
# Merge feature branch into current branch
git merge feature/login

# Merge with a merge commit (no fast-forward)
git merge --no-ff feature/payment

# Squash all commits into one before merging
git merge --squash feature/ui-updates

# Abort a merge in progress
git merge --abort

# Continue merge after resolving conflicts
git merge --continue
```

**Detailed Explanation:**
- **Two merge types:** Fast-forward (linear history) or three-way merge (creates merge commit)
- **Fast-forward:** If no divergent changes, just moves branch pointer forward
- **Merge commit:** If branches diverged, creates a new commit with two parents
- **Conflict resolution:** If same lines changed in both branches, manual resolution is required

**Common Errors:**
- `CONFLICT (content): Merge conflict in <file>` → **Solution:** Open file, resolve conflicts, `git add`, then `git commit`
- `error: You have not concluded your merge` → **Solution:** Finish current merge with `git commit` or abort with `git merge --abort`
- `fatal: refusing to merge unrelated histories` → **Solution:** Add `--allow-unrelated-histories` flag (rare cases only)

**Pro Tips:**
- Always commit or stash changes before merging
- Use `--no-ff` to preserve feature branch history (creates merge commit even if fast-forward possible)
- Use `--squash` to clean up many small commits before merging into main branch
- Preview merge before doing it: `git log ..feature-branch`
- Use `git mergetool` to resolve conflicts with visual tools
- **Warning:** Test thoroughly after merge; conflicts might break functionality

**Related Commands:**
- [`git rebase`](/03_merging/rebase) – Alternative way to integrate changes (linear history)
- [`git cherry-pick`](/03_merging/cherry-pick) – Apply specific commits from another branch
- [`git diff`](/01_basics/diff) – Compare branches before merging
- [`git log`](/01_basics/log) – View branch history

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `git branch` | List branches |
| `git branch <name>` | Create new branch |
| `git branch -d <name>` | Delete merged branch |
| `git checkout <branch>` | Switch to branch (old way) |
| `git switch <branch>` | Switch to branch (new way) |
| `git switch -c <name>` | Create and switch to new branch |
| `git merge <branch>` | Merge branch into current |

---

## Branch Workflow Example

```bash
# Start a new feature
git switch -c feature/user-auth

# Work on the feature (make changes, commit)
git add .
git commit -m "Add login form"

# Switch back to main branch
git switch main

# Merge the feature
git merge feature/user-auth

# Delete the feature branch (optional)
git branch -d feature/user-auth

# Push changes to remote
git push origin main
```

---
