---
title: git fetch
description: Git Remote Operations - git fetch command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/04_remote/">Remote</a> › 
  <span>git fetch</span>
</div>

# git fetch


**Description:**  
Download objects and refs from another repository without merging. Updates your remote-tracking branches.

**Syntax:**
```bash
git fetch
git fetch <remote>
git fetch <remote> <branch>
git fetch --all
git fetch --prune
```

**Examples:**
```bash
# Fetch from default remote (origin)
git fetch

# Fetch from specific remote
git fetch upstream

# Fetch specific branch
git fetch origin main

# Fetch from all remotes
git fetch --all

# Fetch and remove deleted branches
git fetch --prune
```

**Detailed Explanation:**
- **Safe operation** - Doesn't modify your working directory or current branch
- **Updates remote branches** - Like `origin/main`, `upstream/develop`
- **Review before merge** - You can inspect changes before integrating
- **Bandwidth efficient** - Only downloads new commits

**Comparison with git pull:**

| `git fetch` | `git pull` |
|-------------|------------|
| Downloads only | Downloads + Merges |
| Safe, non-destructive | Modifies working directory |
| Review first | Automatic merge |
| Use when: checking updates | Use when: ready to integrate |

**Common Errors:**
- `fatal: couldn't find remote ref` → **Solution:** Branch doesn't exist on remote
- `Permission denied` → **Solution:** Check authentication (SSH keys or credentials)

**Pro Tips:**
- Use `git fetch origin main:main` to update local `main` without checking it out
- Run `git fetch` regularly to stay updated with remote changes
- Combine with `git log origin/main..HEAD` to see commits you haven't pushed
- Use `git fetch --dry-run` to see what would be fetched

**Related Commands:**
- [`git pull`](/04_remote/pull) – Fetch + merge in one command
- [`git remote`](/04_remote/remote) – Manage remote connections
- [`git merge`](/02_branching/merge) – Integrate fetched changes

---
