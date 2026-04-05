---
title: git commit
description: Git Basics - git commit command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/01_basics/">Basics</a> › 
  <span>git commit</span>
</div>

# git commit


**Description:**  
Save staged changes to the repository history with a descriptive message. Creates a new commit (snapshot) in the Git timeline.

**Syntax:**
```bash
git commit -m "message"
git commit -am "message"
git commit --amend
```

**Examples:**
```bash
# Commit with a message
git commit -m "Add user authentication feature"

# Stage all tracked files and commit in one step
git commit -am "Fix navigation bug"

# Amend the last commit (change message or add files)
git commit --amend -m "Updated commit message"

# Commit with a detailed message using editor
git commit
```

**Detailed Explanation:**
- **Permanent snapshot:** Creates an immutable record of your changes in the repository history
- **Requires staging:** Only files in the staging area (via `git add`) are included
- **Author information:** Records your name, email, and timestamp automatically
- **Unique hash:** Each commit gets a unique SHA-1 hash for identification

**Common Errors:**
- `nothing to commit, working tree clean` → **Solution:** No staged changes; use `git add` first
- `Aborting commit due to empty commit message` → **Solution:** Provide a message with `-m` or don't exit editor without saving
- `Please tell me who you are` → **Solution:** Configure `git config user.name` and `git config user.email`

**Pro Tips:**
- Write clear, imperative commit messages: "Add feature" not "Added feature" or "Adding feature"
- Use `git commit --amend` to fix the last commit (don't do this after pushing)
- For detailed messages, skip `-m` and use your default editor for multi-line messages
- Commit early, commit often – small, focused commits are better than large ones
- Follow the format: `Type: Short description` (e.g., "Fix: resolve login timeout issue")

**Related Commands:**
- [`git add`](/01_basics/add) – Stage files before committing
- [`git status`](/01_basics/status) – Check what will be committed
- [`git log`](/01_basics/log) – View commit history
- [`git push`](/04_remote/push) – Upload commits to remote

---
