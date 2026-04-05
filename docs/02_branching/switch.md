---
title: git switch
description: Git Branching - git switch command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/02_branching/">Branching</a> › 
  <span>git switch</span>
</div>

# git switch


**Description:**  
Switch between branches. Introduced in Git 2.23 as a clearer alternative to `git checkout` for branch switching.

**Syntax:**
```bash
git switch <branch-name>
git switch -c <new-branch>
git switch -
```

**Examples:**
```bash
# Switch to existing branch
git switch develop

# Create and switch to new branch
git switch -c feature/authentication

# Create branch from specific starting point
git switch -c hotfix/bug origin/main

# Switch to previous branch
git switch -

# Switch to remote branch (creates local tracking branch)
git switch feature/api-integration
```

**Detailed Explanation:**
- **Branch-focused:** Unlike `git checkout`, this command only switches branches (more focused purpose)
- **Clearer intent:** Makes code more readable and reduces confusion about what the command does
- **Automatic tracking:** When switching to a remote branch, automatically creates a local tracking branch
- **Safer:** Less chance of accidentally modifying files or entering detached HEAD state

**Common Errors:**
- `fatal: invalid reference: <branch>` → **Solution:** Branch doesn't exist; use `git switch -c` to create it
- `error: Your local changes would be overwritten` → **Solution:** Commit, stash, or discard changes first
- `fatal: a branch is expected, got commit` → **Solution:** Use `git checkout` for commits; `git switch` is for branches only

**Pro Tips:**
- Prefer `git switch` over `git checkout` for branch operations (clearer and safer)
- Use `--discard-changes` to force switch even with uncommitted changes: `git switch --discard-changes main`
- Quick branch creation: `git switch -c` is shorter than `git checkout -b`
- Use tab completion to avoid typos in branch names
- Combine with `git branch -a` to see available branches before switching

**Related Commands:**
- [`git checkout`](/02_branching/checkout) – Legacy command with multiple purposes
- [`git branch`](/02_branching/) – List or create branches
- `git restore` – Restore files (separate from branch switching)
- [`git merge`](/02_branching/merge) – Combine branches after switching

---
