---
title: Git FAQ
description: Frequently asked questions about Git
---

# Git FAQ - Frequently Asked Questions

Quick answers to common Git questions.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Basic Operations](#basic-operations)
- [Branching](#branching)
- [Remote Operations](#remote-operations)
- [Undoing Changes](#undoing-changes)
- [Advanced Topics](#advanced-topics)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

### Q: How do I install Git?

**A:** 
- **Windows:** Download from [git-scm.com](https://git-scm.com/)
- **macOS:** `brew install git` or Xcode Command Line Tools
- **Linux:** `sudo apt install git` (Ubuntu/Debian) or `sudo yum install git` (CentOS/Fedora)

### Q: How do I configure Git for the first time?

**A:**
```bash
git config --global user.name "ZenT"
git config --global user.email "your.email@example.com"
git config --global init.defaultBranch main
```

### Q: What's the difference between Git and GitHub?

**A:**
- **Git:** Version control system (software on your computer)
- **GitHub:** Web hosting service for Git repositories (website/platform)

---

## Basic Operations

### Q: How do I check the status of my repository?

**A:**
```bash
git status
```

### Q: How do I stage specific files?

**A:**
```bash
# Stage single file
git add filename.txt

# Stage multiple files
git add file1.txt file2.txt

# Stage all changes
git add .

# Stage interactively (choose parts)
git add -p
```

### Q: How do I undo staging a file?

**A:**
```bash
# Unstage file
git restore --staged filename.txt

# Or using reset
git reset HEAD filename.txt
```

### Q: How do I write good commit messages?

**A:**
```bash
# Format: <type>: <subject>

# Good examples:
git commit -m "feat: Add user authentication"
git commit -m "fix: Resolve memory leak in parser"
git commit -m "docs: Update installation guide"

# Types: feat, fix, docs, style, refactor, test, chore
```

---

## Branching

### Q: How do I create and switch to a new branch?

**A:**
```bash
# Old way (still works)
git checkout -b feature/new-feature

# New way (Git 2.23+)
git switch -c feature/new-feature
```

### Q: How do I delete a branch?

**A:**
```bash
# Delete local branch (must be merged)
git branch -d branch-name

# Force delete (even if not merged)
git branch -D branch-name

# Delete remote branch
git push origin --delete branch-name
```

### Q: How do I see all branches?

**A:**
```bash
# Local branches only
git branch

# All branches (local + remote)
git branch -a

# With last commit info
git branch -v
```

### Q: How do I rename a branch?

**A:**
```bash
# Rename current branch
git branch -m new-name

# Rename specific branch
git branch -m old-name new-name

# Update on remote
git push origin -u new-name
git push origin --delete old-name
```

---

## Remote Operations

### Q: How do I clone a repository?

**A:**
```bash
# HTTPS
git clone https://github.com/username/repo.git

# SSH
git clone git@github.com:username/repo.git

# Clone into specific directory
git clone https://github.com/username/repo.git my-folder
```

### Q: What's the difference between `fetch` and `pull`?

**A:**
- **`git fetch`:** Downloads changes but doesn't merge them
- **`git pull`:** Downloads AND merges changes (= `fetch` + `merge`)

```bash
# Fetch only
git fetch origin

# Pull (fetch + merge)
git pull origin main

# Pull with rebase
git pull --rebase origin main
```

### Q: How do I push to a remote repository?

**A:**
```bash
# First time (set upstream)
git push -u origin main

# After that
git push

# Specific branch
git push origin feature-branch

# All branches
git push --all

# Include tags
git push --tags
```

### Q: How do I add a remote repository?

**A:**
```bash
# Add remote
git remote add origin https://github.com/username/repo.git

# View remotes
git remote -v

# Change remote URL
git remote set-url origin new-url

# Remove remote
git remote remove origin
```

---

## Undoing Changes

### Q: How do I undo changes to a file?

**A:**
```bash
# Discard unstaged changes
git restore filename.txt

# Discard all unstaged changes
git restore .

# Or using checkout (old way)
git checkout -- filename.txt
```

### Q: How do I undo the last commit?

**A:**
```bash
# Undo commit, keep changes staged
git reset --soft HEAD~1

# Undo commit, keep changes unstaged
git reset HEAD~1

# Undo commit, discard changes
git reset --hard HEAD~1
```

### Q: How do I change my last commit?

**A:**
```bash
# Change commit message only
git commit --amend -m "New message"

# Add forgotten files
git add forgotten-file.txt
git commit --amend --no-edit

# Don't amend pushed commits!
```

### Q: How do I revert a commit that's already pushed?

**A:**
```bash
# Safe way (creates new commit)
git revert <commit-hash>

# Revert multiple commits
git revert <oldest-commit>..<newest-commit>
```

---

## Advanced Topics

### Q: What is rebasing and when should I use it?

**A:**
Rebasing moves your commits to a new base. Use it to:
- Clean up local commit history before pushing
- Keep linear history
- Update feature branch with latest main

```bash
# Rebase onto main
git checkout feature-branch
git rebase main

# Interactive rebase (clean up commits)
git rebase -i HEAD~5

# Never rebase pushed commits!
```

### Q: What's the difference between `merge` and `rebase`?

**A:**
- **Merge:** Combines branches, preserves history, creates merge commit
- **Rebase:** Rewrites history, creates linear timeline, no merge commit

```bash
# Merge (preserves history)
git merge feature-branch

# Rebase (linear history)
git rebase main
```

### Q: How do I resolve merge conflicts?

**A:**
1. Open conflicted files
2. Look for conflict markers:
```
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name
```
3. Edit file to resolve
4. Stage resolved files:
```bash
git add resolved-file.txt
```
5. Complete merge/rebase:
```bash
git commit  # for merge
git rebase --continue  # for rebase
```

### Q: How do I cherry-pick a commit?

**A:**
```bash
# Apply specific commit
git cherry-pick <commit-hash>

# Cherry-pick multiple commits
git cherry-pick <commit1> <commit2>

# Cherry-pick range
git cherry-pick <start-commit>..<end-commit>
```

---

## Troubleshooting

### Q: I accidentally committed to main instead of a feature branch!

**A:**
```bash
# 1. Create branch with current changes
git branch feature-branch

# 2. Reset main to before your commits
git reset --hard origin/main

# 3. Switch to feature branch
git checkout feature-branch
```

### Q: I made a mistake in my last commit, how do I fix it?

**A:**
```bash
# If not yet pushed:
git commit --amend

# If already pushed, create new commit:
git revert HEAD
```

### Q: My `git pull` says "diverged branches"!

**A:**
```bash
# Option 1: Merge
git pull origin main

# Option 2: Rebase (cleaner)
git pull --rebase origin main

# If conflicts, resolve them then:
git rebase --continue
```

### Q: How do I recover a deleted branch?

**A:**
```bash
# Find the commit
git reflog

# Recreate branch
git checkout -b recovered-branch <commit-hash>
```

### Q: How do I recover deleted commits?

**A:**
```bash
# View reflog
git reflog

# Find your lost commit
# Restore it
git checkout <commit-hash>
git checkout -b recovery-branch
```

### Q: My repository is too large, how do I reduce it?

**A:**
```bash
# Remove large files from history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/large/file" \
  --prune-empty --tag-name-filter cat -- --all

# Modern alternative
git filter-repo --path path/to/large/file --invert-paths

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

### Q: How do I ignore files that are already tracked?

**A:**
```bash
# Remove from tracking (keep local file)
git rm --cached filename

# For directories
git rm -r --cached directory/

# Commit the change
git commit -m "Stop tracking file"

# Now add to .gitignore
echo "filename" >> .gitignore
```

---

## Quick Tips

### Q: Show me the most useful Git aliases!

**A:**
```bash
# Setup aliases
git config --global alias.st "status -s"
git config --global alias.co "checkout"
git config --global alias.br "branch"
git config --global alias.ci "commit"
git config --global alias.unstage "restore --staged"
git config --global alias.last "log -1 HEAD"
git config --global alias.lg "log --oneline --graph --all"
git config --global alias.undo "reset --soft HEAD~1"

# Use them
git st        # git status -s
git co main   # git checkout main
git lg        # pretty log
```

### Q: How do I see what changed in a commit?

**A:**
```bash
# Show last commit
git show

# Show specific commit
git show <commit-hash>

# Show changes in file
git show <commit-hash>:path/to/file
```

### Q: How do I search for a string in commit history?

**A:**
```bash
# Search commit messages
git log --grep="bug fix"

# Search code changes
git log -S "function name"

# Search by author
git log --author="John"

# Search by date
git log --since="2 weeks ago" --until="yesterday"
```

---

## Still Have Questions?

- [Official Git Documentation](https://git-scm.com/doc)
- [Pro Git Book](https://git-scm.com/book/en/v2)
- [Stack Overflow [git]](https://stackoverflow.com/questions/tagged/git)
- [GitHub Community](https://github.community/)
- [Guides](/guides/) - Comprehensive tutorials
- [Quick Reference](/quick-reference) - Command cheat sheet