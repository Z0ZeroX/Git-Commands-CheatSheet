---
title: git pull
description: Git Remote Operations - git pull command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/04_remote/">Remote</a> › 
  <span>git pull</span>
</div>

# git pull


**Description:**  
Fetch from and integrate with another repository or local branch. Equivalent to `git fetch` followed by `git merge`.

**Syntax:**
```bash
git pull
git pull <remote> <branch>
git pull --rebase
git pull --no-commit
git pull --ff-only
```

**Examples:**
```bash
# Pull from default remote/branch
git pull

# Pull from specific remote and branch
git pull origin develop

# Pull and rebase instead of merge
git pull --rebase

# Pull but don't commit the merge
git pull --no-commit

# Only allow fast-forward merges
git pull --ff-only
```

**Detailed Explanation:**
- **Two-step operation:** `git fetch` + `git merge FETCH_HEAD`
- **Fast-forward** - If possible, moves branch pointer without creating merge commit
- **Merge conflicts** - Can occur if remote and local changes conflict
- **Current branch** - Pulls into the branch you currently have checked out

**Pull vs Fetch + Merge:**

```bash
# These are equivalent:
git pull origin main

# Is the same as:
git fetch origin
git merge origin/main
```

**Common Errors:**
- `error: Your local changes would be overwritten` → **Solution:** Commit or stash your changes first
- `CONFLICT: Merge conflict` → **Solution:** Resolve conflicts, then `git commit`
- `fatal: refusing to merge unrelated histories` → **Solution:** Use `git pull --allow-unrelated-histories`

**Pro Tips:**
- Use `git pull --rebase` for a cleaner history without merge commits
- Configure default behavior: `git config pull.rebase true`
- Before pulling: commit or stash your work to avoid conflicts
- Pull often to minimize merge conflicts
- Use `git pull --ff-only` to fail if a merge commit would be created

**Related Commands:**
- [`git fetch`](/04_remote/fetch) – Download without merging
- [`git merge`](/02_branching/merge) – Integrate changes
- [`git rebase`](/03_merging/rebase) – Alternative integration method

---
