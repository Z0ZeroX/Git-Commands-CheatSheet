---
title: git revert
description: Git Merging & Rebasing - git revert command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/03_merging/">Merging</a> › 
  <span>git revert</span>
</div>

# git revert


**Description:**  
Create a new commit that undoes changes from a previous commit. Safe way to undo changes without rewriting history.

**Syntax:**
```bash
git revert <commit-hash>
git revert -n <commit-hash>
git revert --continue
git revert --abort
```

**Examples:**
```bash
# Revert a single commit
git revert abc1234

# Revert without auto-committing
git revert -n abc1234

# Revert multiple commits
git revert abc1234 def5678

# Revert a range of commits (oldest to newest)
git revert abc1234..def5678

# Revert a merge commit (specify parent)
git revert -m 1 merge-commit-hash

# Continue after resolving conflicts
git revert --continue

# Abort revert operation
git revert --abort
```

**Detailed Explanation:**
- **Creates new commit:** Doesn't delete history; adds a commit that inverts previous changes
- **Safe for shared branches:** Unlike reset, it doesn't rewrite history
- **Preserves timeline:** Shows both the original change and its reversal
- **Merge commits:** Requires specifying which parent to revert to with `-m`

**Common Errors:**
- `error: revert is already in progress` → **Solution:** Complete with `git revert --continue` or abort with `git revert --abort`
- `error: commit <hash> is a merge but no -m option was given` → **Solution:** Use `git revert -m 1 <hash>` (1 = first parent, 2 = second)
- `CONFLICT (content): Merge conflict in <file>` → **Solution:** Resolve conflicts, stage files, then `git revert --continue`

**Pro Tips:**
- Revert recent commit: `git revert HEAD` (undo last commit)
- Use `--no-commit` or `-n` to revert multiple commits then commit once
- For merge commits: `-m 1` keeps main branch changes, `-m 2` keeps merged branch changes
- See what will be reverted: `git show <commit>` before reverting
- Revert a revert to restore original changes: `git revert <revert-commit>`
- **Warning:** Reverting merge commits can be tricky; understand parent relationships first

**Related Commands:**
- `git reset` – Undo commits by moving branch pointer (rewrites history)
- [`git cherry-pick`](/03_merging/cherry-pick) – Apply specific commits
- `git show` – View commit details before reverting
- [`git reflog`](/05_advanced/reflog) – Find commits to revert

---

## Quick Reference

| Command | Description | History Impact |
|---------|-------------|----------------|
| `git merge <branch>` | Combine branches | Preserves history |
| `git rebase <branch>` | Reapply commits | Rewrites history |
| `git cherry-pick <commit>` | Copy specific commit | Adds new commit |
| `git revert <commit>` | Undo a commit | Adds inverse commit |

---

## When to Use Each Command

### Use `git merge` when:
- Working on shared/public branches
- Want to preserve complete history
- Collaborating with others
- Creating release branches

### Use `git rebase` when:
- Cleaning up local commits before pushing
- Want linear project history
- Updating feature branch with main branch changes
- Avoid on public/shared branches

### Use `git cherry-pick` when:
- Need specific commit from another branch
- Applying hotfix to multiple branches
- Selectively choosing commits
- Recovering specific changes

### Use `git revert` when:
- Need to undo pushed commits
- Working on shared branches
- Want to preserve history
- Safely removing problematic changes

---

## Merge vs Rebase Comparison

```bash
# MERGE approach (preserves history)
git checkout feature
git merge main
# Result: Merge commit created, branching history visible

# REBASE approach (linear history)
git checkout feature
git rebase main
# Result: Commits reapplied, straight line history
```

---
