---
title: git stash
description: Advanced Git Techniques - git stash command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/05_advanced/">Advanced</a> › 
  <span>git stash</span>
</div>

# git stash


**Description:**  
Temporarily save changes without committing. Useful when you need to switch branches but aren't ready to commit your work.

**Syntax:**
```bash
git stash
git stash save "message"
git stash list
git stash apply
git stash pop
git stash drop
git stash clear
git stash show
```

**Examples:**
```bash
# Save current changes
git stash

# Save with descriptive message
git stash save "WIP: implementing login feature"

# List all stashes
git stash list
# Output:
# stash@{0}: WIP on main: abc123 Update README
# stash@{1}: WIP on feature: def456 Add login form

# Apply most recent stash (keeps stash)
git stash apply

# Apply and remove stash
git stash pop

# Apply specific stash
git stash apply stash@{2}

# Show stash contents
git stash show stash@{0}

# Show detailed diff
git stash show -p

# Delete specific stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
```

**Advanced Stashing:**
```bash
# Stash including untracked files
git stash -u
# or
git stash --include-untracked

# Stash only unstaged changes
git stash --keep-index

# Create branch from stash
git stash branch feature/new-branch stash@{0}

# Stash specific files
git stash push -m "message" path/to/file
```

**Detailed Explanation:**
- **Stack structure** - Stashes are stored in a stack (LIFO - Last In, First Out)
- **Safe switching** - Switch branches without losing uncommitted work
- **Non-destructive** - `apply` keeps stash, `pop` removes it
- **Multiple stashes** - Can have many stashes, referenced by `stash@{n}`

**Common Scenarios:**

**Scenario 1: Emergency bug fix**
```bash
# Working on feature, urgent bug appears
git stash save "WIP: feature work"
git checkout main
# Fix bug, commit, push
git checkout feature-branch
git stash pop
```

**Scenario 2: Wrong branch**
```bash
# Started work on wrong branch
git stash
git checkout correct-branch
git stash pop
```

**Common Errors:**
- `error: Your local changes would be overwritten` → **Solution:** Stash conflicts with current state; resolve manually
- `Cannot apply to a dirty working tree` → **Solution:** Commit or stash current changes first

**Pro Tips:**
- Use descriptive messages: `git stash save "WIP: user authentication"`
- Stash untracked files: `git stash -u`
- Create a branch directly from stash instead of applying
- Don't rely on stash long-term - commit work properly
- Use `git stash show -p` to review stashed changes before applying

**Related Commands:**
- `git reset` – Alternative for discarding changes
- [`git worktree`](/05_advanced/worktree) – Work on multiple branches simultaneously

---
