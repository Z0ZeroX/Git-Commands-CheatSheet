---
title: git push
description: Git Remote Operations - git push command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/04_remote/">Remote</a> › 
  <span>git push</span>
</div>

# git push


**Description:**  
Update remote refs along with associated objects. Uploads your local commits to the remote repository.

**Syntax:**
```bash
git push
git push <remote> <branch>
git push -u <remote> <branch>
git push --all
git push --tags
git push --force
git push --delete <remote> <branch>
```

**Examples:**
```bash
# Push to default remote/branch
git push

# Push to specific remote and branch
git push origin feature/new-feature

# Push and set upstream (first time)
git push -u origin main

# Push all branches
git push --all

# Push all tags
git push --tags

# Force push (dangerous!)
git push --force

# Delete remote branch
git push origin --delete old-feature
```

**Detailed Explanation:**
- **Upload commits** - Sends your local commits to the remote
- **Requires permission** - You must have write access to the remote repository
- **Fast-forward** - Remote must be able to fast-forward (or use `--force`)
- **Tags** - By default, tags are not pushed (use `--tags` or `--follow-tags`)

**First Push:**
```bash
# Set upstream tracking for new branches
git push -u origin feature/login
# Now you can use just: git push
```

**Force Push (Dangerous):**
```bash
# Overwrites remote history - use with caution!
git push --force

# Safer alternative (fails if remote has new commits)
git push --force-with-lease
```

**Common Errors:**
- `error: failed to push some refs` → **Solution:** Pull first to integrate remote changes
- `error: src refspec main does not match any` → **Solution:** Branch doesn't exist or has no commits
- `fatal: The current branch has no upstream branch` → **Solution:** Use `git push -u origin branch-name`
- `Permission denied` → **Solution:** Check authentication or repository permissions

**Pro Tips:**
- Use `git push -u` once, then just `git push` for subsequent pushes
- `git push --dry-run` shows what would be pushed without doing it
- Use `git push --force-with-lease` instead of `--force` for safer rewrites
- **Warning:** Never force-push to shared branches (main, develop)
- Push tags separately: `git push origin v1.0.0` or `git push --tags`

**Related Commands:**
- [`git fetch`](/04_remote/fetch) – Download from remote
- [`git pull`](/04_remote/pull) – Fetch and merge
- [`git remote`](/04_remote/remote) – Manage remotes

---
