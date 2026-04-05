---
title: git remote
description: Git Remote Operations - git remote command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/04_remote/">Remote</a> › 
  <span>git remote</span>
</div>

# git remote


**Description:**  
Manage set of tracked repositories. Remote repositories are versions of your project hosted on the internet or network.

**Syntax:**
```bash
git remote
git remote -v
git remote add <name> <url>
git remote remove <name>
git remote rename <old> <new>
git remote set-url <name> <new-url>
```

**Examples:**
```bash
# List all remotes
git remote
# Output: origin

# List remotes with URLs
git remote -v
# Output:
# origin  https://github.com/user/repo.git (fetch)
# origin  https://github.com/user/repo.git (push)

# Add a new remote
git remote add upstream https://github.com/original/repo.git

# Remove a remote
git remote remove upstream

# Rename a remote
git remote rename origin github

# Change remote URL
git remote set-url origin https://github.com/user/new-repo.git
```

**Detailed Explanation:**
- **origin** - Default name for the primary remote repository
- **upstream** - Commonly used for the original repository when working with forks
- **Multiple remotes** - You can have multiple remotes for different purposes (origin, backup, production)
- **SSH vs HTTPS** - Remotes can use SSH (`git@github.com:user/repo.git`) or HTTPS URLs

**Common Errors:**
- `fatal: remote origin already exists` → **Solution:** Remove the existing remote first: `git remote remove origin`
- `fatal: No such remote 'name'` → **Solution:** Check remote names with `git remote -v`
- `Permission denied (publickey)` → **Solution:** Set up SSH keys or use HTTPS with credentials

**Pro Tips:**
- Use `git remote show origin` to see detailed information about a remote
- Convention: `origin` for your fork, `upstream` for the original repository
- Use `git remote prune origin` to clean up deleted remote branches
- Changing remote URLs doesn't affect your local commits

**Related Commands:**
- [`git fetch`](/04_remote/fetch) – Download objects from remote
- [`git pull`](/04_remote/pull) – Fetch and merge
- [`git push`](/04_remote/push) – Upload commits

---
