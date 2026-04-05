---
title: git submodule
description: Git Remote Operations - git submodule command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/04_remote/">Remote</a> › 
  <span>git submodule</span>
</div>

# git submodule


**Description:**  
Initialize, update, or inspect submodules. Submodules allow you to keep a Git repository as a subdirectory of another Git repository.

**Syntax:**
```bash
git submodule add <url> <path>
git submodule init
git submodule update
git submodule update --remote
git submodule foreach <command>
```

**Examples:**
```bash
# Add a submodule
git submodule add https://github.com/user/lib.git libs/mylib

# Initialize submodules (after cloning)
git submodule init
git submodule update

# Or do both in one command
git submodule update --init --recursive

# Update submodules to latest commit
git submodule update --remote

# Run command in all submodules
git submodule foreach git pull origin main

# Clone repository with submodules
git clone --recurse-submodules https://github.com/user/project.git
```

**Detailed Explanation:**
- **Separate repository** - Each submodule is a full Git repository
- **Fixed commit** - Parent repo references specific commit of submodule
- **`.gitmodules` file** - Stores submodule configuration
- **Use cases** - External libraries, shared components, vendored dependencies

**Submodule Workflow:**
```bash
# 1. Add submodule
git submodule add https://github.com/lib/utils.git vendor/utils

# 2. Commit the submodule
git commit -m "Add utils submodule"

# 3. Others clone and update
git clone <repo>
git submodule update --init --recursive
```

**Common Errors:**
- `fatal: No url found for submodule` → **Solution:** Run `git submodule init`
- `fatal: Needed a single revision` → **Solution:** Initialize and update submodules
- Submodule in "detached HEAD" → **Expected behavior:** Submodules don't track branches by default

**Pro Tips:**
- Use `git clone --recurse-submodules` to clone with all submodules
- Use `git config submodule.recurse true` to auto-update submodules
- Remove submodule: Delete from `.gitmodules`, `.git/config`, and directory
- Submodules add complexity - consider alternatives like package managers
- Use `git submodule status` to see current commit of each submodule

**Related Commands:**
- [`git clone`](/01_basics/clone) – Clone with submodules
- [`git pull`](/04_remote/pull) – Update including submodules
- [`git remote`](/04_remote/remote) – Manage remote repositories

---

## Common Remote Workflows

### Forking Workflow
```bash
# 1. Fork on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/repo.git
cd repo

# 2. Add upstream remote
git remote add upstream https://github.com/ORIGINAL-OWNER/repo.git

# 3. Create feature branch
git checkout -b feature/new-feature

# 4. Make changes and commit
git add .
git commit -m "Add new feature"

# 5. Push to your fork
git push origin feature/new-feature

# 6. Create Pull Request on GitHub

# 7. Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### Team Collaboration Workflow
```bash
# 1. Clone team repository
git clone https://github.com/team/project.git
cd project

# 2. Always pull before starting work
git pull

# 3. Create feature branch
git checkout -b feature/user-auth

# 4. Work and commit regularly
git add .
git commit -m "Implement login form"

# 5. Pull latest changes before pushing
git pull origin main
# Resolve any conflicts

# 6. Push your branch
git push -u origin feature/user-auth

# 7. Create Pull Request for team review
```

### Keeping Forks Updated
```bash
# Sync your fork with upstream
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

---

## See Also

- [Git Branching →](/02_branching/)
- [Git Workflows Guide →](/guides/workflows)
- [Git FAQ →](/guides/faq)
- [Quick Reference →](/quick-reference)

---
