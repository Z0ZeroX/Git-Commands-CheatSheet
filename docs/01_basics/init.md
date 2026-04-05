---
title: git init
description: Git Basics - git init command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/01_basics/">Basics</a> › 
  <span>git init</span>
</div>

# git init


**Description:**  
Initialize a new Git repository in the current directory. This creates a `.git` subdirectory that contains all the necessary repository metadata.

**Syntax:**
```bash
git init
git init [directory]
git init --bare
```

**Examples:**
```bash
# Initialize Git in current directory
git init

# Create a new directory and initialize Git
git init my-project

# Create a bare repository (for servers)
git init --bare repo.git
```

**Detailed Explanation:**
- **Creates `.git` folder:** This hidden folder stores all Git metadata, commit history, and configuration
- **Not tracked yet:** Files in the directory are not automatically tracked after `git init`
- **Local only:** This command only affects your local machine; nothing is pushed to remote servers
- **Safe to run:** Running `git init` in an existing repository is safe and won't overwrite existing history

**Common Errors:**
- `Reinitialized existing Git repository` → **Solution:** This is just a warning, not an error. Your existing repository is fine.
- `fatal: not a git repository` (after deleting `.git` folder) → **Solution:** Run `git init` again to recreate the repository structure.

**Pro Tips:**
- Use `git init --initial-branch=main` to set the default branch name to "main" instead of "master"
- The `.git` folder is hidden by default. Use `ls -la` (Unix) or `dir /a` (Windows) to see it
- Never manually edit files inside `.git/` unless you know exactly what you're doing
- **Warning:** Deleting the `.git` folder removes all Git history permanently

**Related Commands:**
- [`git clone`](/01_basics/clone) – Copy an existing repository
- [`git add`](/01_basics/add) – Start tracking files
- [`git commit`](/01_basics/commit) – Save changes to history

---
