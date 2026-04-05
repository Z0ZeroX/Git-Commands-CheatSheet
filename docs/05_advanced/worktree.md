---
title: git worktree
description: Advanced Git Techniques - git worktree command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/05_advanced/">Advanced</a> › 
  <span>git worktree</span>
</div>

# git worktree


**Description:**  
Manage multiple working trees attached to the same repository. Work on multiple branches simultaneously without cloning.

**Syntax:**
```bash
git worktree add <path> <branch>
git worktree list
git worktree remove <path>
git worktree prune
```

**Examples:**
```bash
# Create new worktree for feature branch
git worktree add ../project-feature feature/new-ui

# Create worktree with new branch
git worktree add ../project-hotfix -b hotfix/urgent-fix

# List all worktrees
git worktree list
# Output:
# /home/user/project        abc123 [main]
# /home/user/project-feature def456 [feature/new-ui]
# /home/user/project-hotfix  ghi789 [hotfix/urgent-fix]

# Remove worktree
git worktree remove ../project-hotfix

# Clean up deleted worktree references
git worktree prune
```

**Detailed Explanation:**
- **Multiple checkouts** - Different directories, same repository
- **Shared .git** - All worktrees share the same Git database
- **Branch restrictions** - Can't checkout same branch in multiple worktrees
- **Use cases** - Code review, parallel development, building multiple versions

**Typical Workflow:**

```bash
# Main project
cd ~/projects/myapp

# Review PR while continuing work
git worktree add ../myapp-pr-review feature/pr-123
cd ../myapp-pr-review
# Review and test changes

# Back to main work
cd ~/projects/myapp
# Original work still intact

# Clean up when done
git worktree remove ../myapp-pr-review
```

**Advanced Usage:**
```bash
# Create worktree for specific commit
git worktree add ../project-debug abc123

# Create worktree with detached HEAD
git worktree add --detach ../project-build v1.0

# Lock worktree (prevent pruning)
git worktree lock ../important-worktree

# Unlock worktree
git worktree unlock ../important-worktree

# Move worktree
git worktree move ../old-path ../new-path
```

**Common Scenarios:**

**Scenario 1: Emergency hotfix during feature work**
```bash
# Working on feature
cd ~/project

# Urgent hotfix needed
git worktree add ../project-hotfix main
cd ../project-hotfix
# Fix bug, test, commit, push

# Remove hotfix worktree
cd ~/project
git worktree remove ../project-hotfix
```

**Scenario 2: Code review without stashing**
```bash
# No need to stash or commit unfinished work
git worktree add ../review-pr-42 pr/42
cd ../review-pr-42
# Review, test, comment
cd -
git worktree remove ../review-pr-42
```

**Common Errors:**
- `fatal: '<branch>' is already checked out at` → **Solution:** Can't checkout same branch twice; use different branch
- `fatal: '<path>' already exists` → **Solution:** Choose different path or remove existing directory

**Pro Tips:**
- Use absolute paths or paths relative to original repository
- Worktrees share the same `.git/config` and hooks
- Useful for running multiple builds simultaneously
- Use `git worktree list` to track all worktrees
- Don't delete worktree directories manually; use `git worktree remove`

**Related Commands:**
- [`git clone`](/01_basics/clone) – Alternative: separate repository copies
- [`git stash`](/05_advanced/stash) – Alternative: temporarily save work
- [`git branch`](/02_branching/) – Manage branches

---
