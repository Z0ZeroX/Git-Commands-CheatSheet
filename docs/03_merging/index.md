---
title: Git Merging & Rebasing
description: Advanced techniques for integrating changes between branches
---

<div class="breadcrumb">
  <a href="/">Home</a> › 
  <span>Merging</span>
</div>

# Merging and Rebasing

Advanced techniques for integrating changes between branches and maintaining clean history.

---

## git merge

**Description:**  
Combine changes from one branch into another. Creates a merge commit that preserves the complete history of both branches.

**Syntax:**
```bash
git merge <branch-name>
git merge --no-ff <branch-name>
git merge --squash <branch-name>
git merge --abort
```

**Examples:**
```bash
# Standard merge
git merge feature/payment-gateway

# Force creation of merge commit (no fast-forward)
git merge --no-ff feature/user-dashboard

# Combine all commits into one
git merge --squash feature/minor-fixes

# Abort a problematic merge
git merge --abort

# Merge with custom commit message
git merge feature/api -m "Integrate new API endpoints"
```

**Detailed Explanation:**
- **Fast-forward merge:** If no divergent commits, simply moves the branch pointer forward
- **Three-way merge:** If branches diverged, creates a new commit with two parent commits
- **Preserves history:** Maintains the complete branch history including all commits
- **Merge commit:** Shows when and where branches were integrated

**Common Errors:**
- `CONFLICT (content): Merge conflict in <file>` → **Solution:** Edit file to resolve conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), then `git add <file>` and `git commit`
- `fatal: You have not concluded your merge (MERGE_HEAD exists)` → **Solution:** Complete merge with `git commit` or abort with `git merge --abort`
- `error: Merging is not possible because you have unmerged files` → **Solution:** Resolve all conflicts first
- `fatal: refusing to merge unrelated histories` → **Solution:** Add `--allow-unrelated-histories` (only for combining separate projects)

**Pro Tips:**
- Use `--no-ff` to preserve feature branch context in history (recommended for feature branches)
- Use `--squash` for cleanup: combines multiple commits into one before merging
- Preview merge: `git diff <current-branch>...<target-branch>` shows changes before merging
- See merge history: `git log --merges` lists only merge commits
- Set up merge tool: `git config --global merge.tool <tool-name>` for visual conflict resolution
- **Warning:** Always test your code after resolving merge conflicts

**Related Commands:**
- [`git rebase`](/03_merging/rebase) – Alternative integration method (linear history)
- [`git cherry-pick`](/03_merging/cherry-pick) – Apply specific commits
- `git mergetool` – Launch visual merge tool
- [`git log --graph`](/01_basics/log) – Visualize merge history

---

## Commands in This Section

- [git rebase](./rebase.md)
- [git cherry-pick](./cherry-pick.md)
- [git revert](./revert.md)

---
