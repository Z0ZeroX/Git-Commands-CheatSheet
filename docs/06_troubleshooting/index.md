---
title: Git Troubleshooting
description: Common Git issues, error messages, and their solutions
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <span>Troubleshooting</span>
</div>

# Troubleshooting

Common Git issues, error messages, and step-by-step solutions to get you back on track.

---

## Commit Issues

### Error: "fatal: not a git repository"

**Problem:** Git can't find the `.git` directory.

**Causes:**
- Not in a Git repository
- `.git` directory was deleted
- Running command in wrong directory

**Solutions:**
```bash
# Check if you're in a Git repository
ls -la | grep .git

# Navigate to repository root
cd /path/to/your/repository

# If .git is missing, reinitialize (WARNING: loses history)
git init
```

**Prevention:**
- Always run `pwd` to verify current directory
- Use `git status` to confirm you're in a repository

---

### Error: "nothing added to commit but untracked files present"

**Problem:** Files exist but haven't been staged for commit.

**Solution:**
```bash
# Stage all files
git add .

# Or stage specific files
git add file1.txt file2.txt

# Then commit
git commit -m "Your message"
```

**One-liner:**
```bash
# Stage and commit in one command
git commit -am "Your message"  # Only works for modified files, not new files
```

---

### Error: "Please tell me who you are"

**Problem:** Git doesn't know your identity for commits.

**Solution:**
```bash
# Set globally (for all repositories)
git config --global user.name "ZenT"
git config --global user.email "your.email@example.com"

# Or set for current repository only
git config user.name "ZenT"
git config user.email "your.email@example.com"

# Verify configuration
git config --list
```

---

### Error: "Your branch is ahead of 'origin/main' by X commits"

**Problem:** You have local commits that haven't been pushed to remote.

**Solution:**
```bash
# Push your commits to remote
git push origin main

# If remote has changes you don't have
git pull --rebase origin main
git push origin main
```

---

### Undo Last Commit (Keep Changes)

**Problem:** Committed too early, want to modify commit.

**Solution:**
```bash
# Undo commit, keep changes staged
git reset --soft HEAD~1

# Undo commit, keep changes unstaged
git reset HEAD~1

# Make more changes, then commit again
git add .
git commit -m "Better commit message"
```

---

### Undo Last Commit (Discard Changes)

**Problem:** Committed wrong changes, want to completely remove commit.

**Solution:**
```bash
# WARNING: This permanently deletes changes
git reset --hard HEAD~1

# Safer alternative: Create new commit that undoes changes
git revert HEAD
```

---

### Change Last Commit Message

**Problem:** Typo in commit message or need to improve it.

**Solution:**
```bash
# Amend last commit message
git commit --amend -m "Corrected commit message"

# If already pushed (requires force push)
git commit --amend -m "Corrected message"
git push --force-with-lease origin main
```

**Warning:** Only amend commits that haven't been pushed, or coordinate with team if force-pushing.

---

## 🔀 Merge Conflicts

### What is a Merge Conflict?

**Occurs when:** Git can't automatically merge changes because the same lines were modified differently in two branches.

**Conflict Markers:**
```
Incoming changes from other branch
```

---

### Resolving Merge Conflicts (Step-by-Step)

**Step 1: Identify conflicted files**
```bash
git status
# Files with conflicts are listed under "Unmerged paths"
```

**Step 2: Open and edit conflicted files**
```bash
# Remove conflict markers and choose correct code
# Edit the file to keep what you want

# Before:
<<<<<<< HEAD
console.log("Hello from main");
=======
console.log("Hello from feature");
>>>>>>> feature-branch

# After resolving:
console.log("Hello from main");
```

**Step 3: Mark as resolved**
```bash
git add resolved-file.txt
```

**Step 4: Complete merge**
```bash
git commit -m "Resolve merge conflict"
```

---

### Abort a Problematic Merge

**Problem:** Merge conflicts are too complex, want to start over.

**Solution:**
```bash
# Cancel merge and return to pre-merge state
git merge --abort

# Alternative: reset to before merge
git reset --hard HEAD
```

---

### Using Merge Tools

**Setup merge tool:**
```bash
# Configure VS Code as merge tool
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'

# Configure other tools
git config --global merge.tool meld
git config --global merge.tool kdiff3
```

**Use merge tool:**
```bash
# Launch configured merge tool
git mergetool

# After resolving, commit
git commit
```

---

### Common Merge Conflict Scenarios

**Scenario 1: Same line edited differently**
```bash
# Main branch:
username = "admin"

# Feature branch:
username = "root"

# Resolution: Choose one or combine
username = "admin"  # Or "root", depending on requirement
```

**Scenario 2: File deleted in one branch, modified in another**
```bash
# Git will ask if you want to keep or delete
git rm file.txt  # Delete
# or
git add file.txt  # Keep
```

**Scenario 3: Multiple conflicts in same file**
```bash
# Resolve each conflict marker one by one
# Work from top to bottom of the file
```

---

## Push/Pull Problems

### Error: "failed to push some refs"

**Problem:** Remote has commits you don't have locally.

**Causes:**
- Someone else pushed to the branch
- You're working on outdated code

**Solution:**
```bash
# Option 1: Pull and merge
git pull origin main
git push origin main

# Option 2: Pull and rebase (cleaner history)
git pull --rebase origin main
git push origin main

# Option 3: Force push (dangerous, use with caution)
git push --force-with-lease origin main
```

**Warning:** Never force-push to shared branches without team coordination.

---

### Error: "Permission denied (publickey)"

**Problem:** Can't authenticate with remote repository.

**Causes:**
- SSH key not set up
- SSH key not added to GitHub/GitLab
- Using wrong remote URL

**Solutions:**

**Check remote URL:**
```bash
git remote -v

# If using HTTPS, switch to SSH (or vice versa)
git remote set-url origin git@github.com:user/repo.git
```

**Set up SSH key:**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Start SSH agent
eval "$(ssh-agent -s)"

# Add key to agent
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub
# Add to GitHub: Settings → SSH keys → New SSH key
```

**Test SSH connection:**
```bash
ssh -T git@github.com
# Should output: "Hi username! You've successfully authenticated..."
```

---

### Error: "The current branch has no upstream branch"

**Problem:** Local branch isn't tracking a remote branch.

**Solution:**
```bash
# Set upstream and push
git push -u origin branch-name

# Or set upstream without pushing
git branch --set-upstream-to=origin/branch-name
```

---

### Error: "Your local changes would be overwritten by merge"

**Problem:** You have uncommitted changes that conflict with incoming changes.

**Solutions:**

**Option 1: Commit your changes**
```bash
git add .
git commit -m "WIP: save work in progress"
git pull
```

**Option 2: Stash your changes**
```bash
git stash
git pull
git stash pop
```

**Option 3: Discard your changes (permanent)**
```bash
git reset --hard
git pull
```

---

### Error: "fatal: refusing to merge unrelated histories"

**Problem:** Trying to merge two repositories with no common ancestor.

**Cause:** Usually when pulling from a new remote that has different initial commit.

**Solution:**
```bash
# Allow merging unrelated histories
git pull origin main --allow-unrelated-histories

# Resolve any conflicts, then commit
git commit -m "Merge unrelated histories"
```

---

## Branch Issues

### Error: "pathspec 'branch-name' did not match any file(s)"

**Problem:** Branch doesn't exist locally.

**Solutions:**

**Check available branches:**
```bash
# List local branches
git branch

# List all branches (including remote)
git branch -a
```

**Create branch:**
```bash
# Create new branch
git branch branch-name

# Or create and checkout
git checkout -b branch-name
```

**Fetch and checkout remote branch:**
```bash
# Fetch all remote branches
git fetch

# Checkout remote branch
git checkout branch-name
```

---

### Can't Delete Branch: "error: branch 'name' not found"

**Problem:** Branch doesn't exist or wrong name.

**Solution:**
```bash
# List all branches
git branch -a

# Delete local branch (correct name)
git branch -d correct-branch-name

# Force delete (if not merged)
git branch -D branch-name

# Delete remote branch
git push origin --delete branch-name
```

---

### Switched to Wrong Branch, Made Commits

**Problem:** Committed to wrong branch.

**Solution:**

**Move commits to new branch:**
```bash
# Create new branch from current position
git branch correct-branch

# Move back original branch
git reset --hard HEAD~3  # Number of commits to undo

# Switch to correct branch
git checkout correct-branch
```

**Move commits to existing branch:**
```bash
# Note the commit hash
git log  # Copy hash of commit to move

# Switch to target branch
git checkout target-branch

# Cherry-pick the commit
git cherry-pick abc123

# Switch back and remove from wrong branch
git checkout wrong-branch
git reset --hard HEAD~1
```

---

### Accidentally Deleted Branch

**Problem:** Deleted branch with unmerged work.

**Solution:**
```bash
# Find commit in reflog
git reflog
# Look for: abc123 HEAD@{2}: commit: Last commit on deleted branch

# Recreate branch
git branch recovered-branch abc123

# Or checkout directly
git checkout -b recovered-branch abc123
```

---

## Repository Problems

### Repository Corrupted: "fatal: loose object is corrupt"

**Problem:** Git database corruption (rare).

**Solutions:**

**Try to recover:**
```bash
# Remove corrupt object
rm .git/objects/ab/cd1234...

# Fetch to restore from remote
git fetch origin

# Run garbage collection
git gc --prune=now
```

**Last resort - reclone:**
```bash
# Backup your work
cp -r project-directory project-backup

# Clone fresh copy
git clone <repository-url> project-new

# Copy your uncommitted work
cp project-backup/file.txt project-new/
```

---

### ".git" Folder Too Large

**Problem:** Repository size growing too large.

**Causes:**
- Large binary files in history
- Many old branches and tags
- Uncommitted large files

**Solutions:**

**Clean up:**
```bash
# Remove deleted files from history
git gc --aggressive --prune=now

# See largest files
git rev-list --objects --all |
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' |
  sed -n 's/^blob //p' |
  sort --numeric-sort --key=2 |
  tail -n 10
```

**Remove file from all history (rewrites history):**
```bash
# Install git-filter-repo
pip install git-filter-repo

# Remove file
git filter-repo --path large-file.bin --invert-paths

# Force push
git push origin --force --all
```

---

### Accidentally Committed Sensitive Data

**Problem:** Committed passwords, API keys, or secrets.

**Immediate Steps:**

1. **Rotate the secret** - Change passwords/keys immediately
2. **Remove from history** - Don't just delete in new commit

**Solution:**
```bash
# Remove file from all commits
git filter-repo --path .env --invert-paths

# Force push (coordinate with team!)
git push origin --force --all

# Everyone must reclone or:
git fetch origin
git reset --hard origin/main
```

**Prevention:**
```bash
# Add to .gitignore
echo ".env" >> .gitignore
echo "*.key" >> .gitignore
echo "secrets/" >> .gitignore

# Commit .gitignore
git add .gitignore
git commit -m "Add .gitignore"
```

---

### Detached HEAD State

**Problem:** Not on any branch (HEAD points directly to commit).

**What happened:**
```bash
git checkout abc123  # Checking out specific commit
# You are in 'detached HEAD' state
```

**Solution:**

**If you made commits:**
```bash
# Create branch from current position
git branch new-branch-name
git checkout new-branch-name
```

**If no commits were made:**
```bash
# Just checkout a branch
git checkout main
```

---

## General Troubleshooting Steps

### Step 1: Check Status
```bash
# See current state
git status

# See commit history
git log --oneline -10

# See what changed
git diff
```

### Step 2: Check Configuration
```bash
# List all settings
git config --list

# Check specific setting
git config user.name
git config remote.origin.url
```

### Step 3: Check Remote Connection
```bash
# Verify remote URL
git remote -v

# Test connection
git fetch origin --dry-run
```

### Step 4: Get Help
```bash
# Git command help
git help <command>
git <command> --help

# Example
git help commit
```

---

## Emergency Recovery

### Lost Commits? Check Reflog!
```bash
# Show recent HEAD movements
git reflog

# Find lost commit
git reflog | grep "commit message"

# Recover
git checkout abc123
git branch recovered-work
```

### Everything Broken? Start Over
```bash
# Backup your work
cp -r project project-backup

# Reclone repository
git clone <url> project-new

# Copy your uncommitted work
cp project-backup/*.txt project-new/
```

---

## Preventive Best Practices

### Do's

- **Commit often** - Small, frequent commits are easier to manage
- **Pull before push** - Stay synchronized with remote
- **Use branches** - Keep main branch stable
- **Write clear messages** - "Fix login bug" > "Fixed stuff"
- **Use .gitignore** - Prevent committing unwanted files
- **Test before push** - Ensure code works
- **Review before commit** - Use `git diff` to check changes

### Don'ts

- **Don't force push** - to shared branches
- **Don't commit secrets** - Use environment variables
- **Don't commit generated files** - node_modules, .pyc, etc.
- **Don't work directly on main** - Use feature branches
- **Don't ignore conflicts** - Resolve them properly
- **Don't delete .git folder** - You'll lose all history

---

## Additional Resources

- [Git FAQ →](/guides/faq)
- [Git Workflows →](/guides/workflows)
- [Git Basics →](/01_basics/)
- [Advanced Techniques →](/05_advanced/)
- [Quick Reference →](/quick-reference)
- [Official Git Documentation](https://git-scm.com/doc)
- [GitHub Help](https://help.github.com)

---

## Still Stuck?

If you're still having issues:

1. **Search Stack Overflow** - Most problems have been solved
2. **Check Git documentation** - `git help <command>`
3. **Ask for help** - Include:
   - Full error message
   - Commands you ran
   - Git version (`git --version`)
   - What you were trying to do

**Common support channels:**
- Stack Overflow: [git tag](https://stackoverflow.com/questions/tagged/git)
- GitHub Community: [discussions](https://github.com/community)
- Git mailing list: git@vger.kernel.org
