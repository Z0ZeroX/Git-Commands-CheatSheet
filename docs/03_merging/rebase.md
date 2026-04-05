---
title: git rebase
description: Git Merging & Rebasing - git rebase command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/03_merging/">Merging</a> › 
  <span>git rebase</span>
</div>

# git rebase


**Description:**  
Reapply commits from one branch onto another base. Creates a linear history by moving commits to a new base.

**Syntax:**
```bash
git rebase <branch-name>
git rebase -i <commit>
git rebase --continue
git rebase --abort
```

**Examples:**
```bash
# Rebase current branch onto main
git rebase main

# Interactive rebase (edit last 3 commits)
git rebase -i HEAD~3

# Continue after resolving conflicts
git rebase --continue

# Skip current commit during rebase
git rebase --skip

# Cancel rebase operation
git rebase --abort

# Rebase and preserve merge commits
git rebase --preserve-merges main
```

**Detailed Explanation:**
- **Rewrites history:** Moves commits to a new base, creating new commit hashes
- **Linear history:** Creates a straight line of commits without merge commits
- **Interactive mode:** `-i` allows editing, squashing, reordering, or dropping commits
- **Cleaner history:** Makes project timeline easier to follow and understand

**Common Errors:**
- `CONFLICT (content): Merge conflict in <file>` → **Solution:** Resolve conflicts, `git add <file>`, then `git rebase --continue`
- `fatal: Needed a single revision` → **Solution:** Check branch name spelling
- `error: cannot rebase: You have unstaged changes` → **Solution:** Commit or stash changes before rebasing
- `fatal: refusing to merge unrelated histories` → **Solution:** Add `--allow-unrelated-histories` or use `git merge` instead

**Pro Tips:**
- **Golden Rule:** Never rebase commits that have been pushed to a shared branch (rewrites history).
- Use interactive rebase to clean up commits before pushing: `git rebase -i HEAD~5`
- Squash commits in interactive rebase: change `pick` to `squash` or `s`
- Update feature branch with latest main: `git rebase main` (cleaner than merging main into feature)
- Reword commit messages: Use `reword` or `r` in interactive rebase
- **Warning:** Rebase changes commit hashes; causes problems if commits are already shared

**Related Commands:**
- [`git merge`](/02_branching/merge) – Alternative integration method (preserves history)
- [`git cherry-pick`](/03_merging/cherry-pick) – Apply specific commits
- [`git reflog`](/05_advanced/reflog) – Recover from rebase mistakes
- [`git push --force-with-lease`](/04_remote/push) – Safely push rebased branches

---
