---
title: git reflog
description: Advanced Git Techniques - git reflog command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/05_advanced/">Advanced</a> › 
  <span>git reflog</span>
</div>

# git reflog


**Description:**  
Show reference logs - a record of where your HEAD and branch references have been. Essential for recovering lost commits.

**Syntax:**
```bash
git reflog
git reflog show <ref>
git reflog expire
```

**Examples:**
```bash
# Show all reflog entries
git reflog

# Show reflog for specific branch
git reflog show main

# Show last 10 entries
git reflog -10

# Show with dates
git reflog --date=relative

# Recover deleted branch/commit
git reflog
# Find commit hash, then:
git checkout -b recovered-branch abc123

# Undo a reset
git reflog
git reset --hard HEAD@{2}
```

**Detailed Explanation:**
- **Local only** - Reflog is not pushed to remotes
- **Safety net** - Records every change to HEAD
- **Temporary** - Entries expire after 90 days by default (30 for unreachable objects)
- **Recovery tool** - Can recover "lost" commits after reset or rebase

**Reflog Output:**
```bash
abc123 (HEAD -> main) HEAD@{0}: commit: Add new feature
def456 HEAD@{1}: commit: Fix bug
ghi789 HEAD@{2}: checkout: moving from develop to main
jkl012 HEAD@{3}: reset: moving to HEAD~1
```

**Recovery Scenarios:**

**Scenario 1: Recover deleted branch**
```bash
# Accidentally deleted branch
git branch -D feature-branch

# Find commit in reflog
git reflog
# Output: abc123 HEAD@{2}: commit: Last feature commit

# Recreate branch
git branch feature-branch abc123
```

**Scenario 2: Undo hard reset**
```bash
# Oops! Reset too far back
git reset --hard HEAD~3

# Find correct position
git reflog
# Output: def456 HEAD@{1}: commit: Good commit

# Restore to correct position
git reset --hard def456
```

**Scenario 3: Find lost commits**
```bash
# After rebasing, find old commits
git reflog

# Create branch from old commit
git branch old-version abc123
```

**Advanced Usage:**
```bash
# Show reflog as graph
git log --graph --oneline --all $(git reflog | cut -c1-7)

# Expire old reflog entries
git reflog expire --expire=30.days --all

# Prune unreachable objects
git gc --prune=now
```

**Pro Tips:**
- Reflog is your safety net - check it before panicking about lost work
- Use `HEAD@{n}` to reference previous positions
- Reflog survives most Git operations (except `git gc --prune`)
- Use reflog immediately after realizing a mistake
- Reflog is local - can't recover work from other machines

**Related Commands:**
- `git reset` – Move branch pointer
- [`git checkout`](/02_branching/checkout) – Switch branches/commits
- [`git log`](/01_basics/log) – View commit history

---
