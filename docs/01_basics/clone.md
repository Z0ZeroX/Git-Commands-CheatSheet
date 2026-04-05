---
title: git clone
description: Git Basics - git clone command
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <a href="/01_basics/">Basics</a> › 
  <span>git clone</span>
</div>

# git clone


**Description:**  
Create a local copy of a remote repository. This downloads the entire repository history and sets up a connection to the remote.

**Syntax:**
```bash
git clone <repository-url>
git clone <repository-url> <directory>
git clone --depth <number> <repository-url>
```

**Examples:**
```bash
# Clone a repository from GitHub
git clone https://github.com/username/repository.git

# Clone into a specific directory
git clone https://github.com/username/repository.git my-folder

# Shallow clone (only recent history, faster)
git clone --depth 1 https://github.com/username/large-repo.git

# Clone a specific branch
git clone --branch develop https://github.com/username/repository.git
```

**Detailed Explanation:**
- **Full copy:** Downloads all commits, branches, and tags from the remote repository
- **Automatic remote:** Sets up `origin` as the default remote pointing to the source repository
- **Working directory:** Creates a working directory with the latest commit checked out
- **Tracking branches:** Automatically sets up tracking for all remote branches

**Common Errors:**
- `fatal: repository 'URL' not found` → **Solution:** Check the URL spelling, repository permissions, or network connection
- `fatal: destination path 'folder' already exists` → **Solution:** Delete the existing folder or clone into a different directory
- `Permission denied (publickey)` → **Solution:** Set up SSH keys or use HTTPS instead of SSH URL

**Pro Tips:**
- Use `--depth 1` for faster cloning of large repositories (shallow clone)
- Use `git clone --mirror` to create a bare copy including all refs (for backups)
- For large repos, consider using `git clone --filter=blob:none` to clone without large files initially
- Use `git clone --recursive` to also clone submodules

**Related Commands:**
- [`git init`](/01_basics/init) – Create a new repository from scratch
- [`git remote`](/04_remote/remote) – Manage remote connections
- [`git fetch`](/04_remote/fetch) – Download updates from remote

---
