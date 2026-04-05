---
title: git cherry-pick
description: Git Merging & Rebasing - git cherry-pick command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/03_merging/">Merging</a> › 
  <span>git cherry-pick</span>
</div>

# git cherry-pick


**Description:**  
Apply changes from specific commits to your current branch. Useful for selectively bringing changes without merging entire branches.

**Syntax:**
```bash
git cherry-pick <commit-hash>
git cherry-pick <commit1> <commit2>
git cherry-pick --continue
git cherry-pick --abort
```

**Examples:**
```bash
# Apply a single commit
git cherry-pick abc1234

# Apply multiple commits
git cherry-pick abc1234 def5678 ghi9012

# Apply a range of commits
git cherry-pick abc1234..def5678

# Cherry-pick without committing (stage only)
git cherry-pick -n abc1234

# Continue after resolving conflicts
git cherry-pick --continue

# Abort cherry-pick operation
git cherry-pick --abort
```

**Detailed Explanation:**
- **Selective picking:** Takes specific commits and applies them to current branch
- **New commit hash:** Creates a new commit with the same changes but different hash
- **Preserves author:** Keeps original author information
- **Independent of branch:** Doesn't require merging the entire source branch

**Common Errors:**
- `error: could not apply <commit>` → **Solution:** Resolve conflicts, `git add`, then `git cherry-pick --continue`
- `fatal: bad revision '<commit>'` → **Solution:** Check commit hash spelling with `git log`
- `error: your local changes would be overwritten` → **Solution:** Commit or stash changes first
- `hint: after resolving conflicts, mark corrected paths with 'git add'` → **Solution:** Fix conflicts, stage files, continue

**Pro Tips:**
- Use for hotfixes: cherry-pick a fix from development to production branch
- Find commit hash: `git log --oneline` in the source branch
- Use `-x` to append source commit info: `git cherry-pick -x abc1234`
- Edit commit message: `git cherry-pick -e abc1234`
- Cherry-pick merge commit: `git cherry-pick -m 1 <merge-commit>` (specify parent)
- **Warning:** Can create duplicate commits if both branches are eventually merged

**Related Commands:**
- [`git merge`](/02_branching/merge) – Integrate entire branches
- [`git rebase`](/03_merging/rebase) – Reapply series of commits
- [`git revert`](/03_merging/revert) – Undo a commit
- [`git log`](/01_basics/log) – Find commits to cherry-pick

---
