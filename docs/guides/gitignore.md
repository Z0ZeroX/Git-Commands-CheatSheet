---
title: .gitignore Guide
description: Learn how to use .gitignore to exclude files
---

# .gitignore Guide

Learn how to use `.gitignore` to tell Git which files to ignore.

---

## What is .gitignore?

The `.gitignore` file specifies intentionally untracked files that Git should ignore. Files already tracked by Git are not affected.

### Why Use .gitignore?

**Avoid committing:**
- Build artifacts and compiled code
- Dependencies (`node_modules/`, `vendor/`)
- IDE and editor files (`.vscode/`, `.idea/`)
- OS-generated files (`.DS_Store`, `Thumbs.db`)
- Secrets and credentials (`.env`, API keys)
- Large binary files
- Temporary files

---

## Basic Syntax

### Simple Patterns

```txt
# Ignore a specific file
secret.txt

# Ignore all files with extension
*.log

# Ignore entire directory
build/
node_modules/

# Ignore directory at root only
/config

# Ignore files in any directory
**/logs
```

### Pattern Rules

| Pattern | Matches |
|---------|---------|
| `file.txt` | Specific file in root |
| `*.log` | All files ending in `.log` |
| `dir/` | Directory and its contents |
| `dir/*` | Contents of directory only |
| `/dir` | Only root directory |
| `**/dir` | Directory anywhere |
| `*.py[cod]` | `.pyc`, `.pyo`, `.pyd` files |
| `file[0-9].txt` | `file0.txt` through `file9.txt` |

---

## Common .gitignore Templates

### Node.js Project

```txt
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json
yarn.lock

# Build output
dist/
build/
.next/
out/

# Environment variables
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Testing
coverage/
.nyc_output/

# Logs
logs/
*.log
```

### Python Project

```txt
# Byte-compiled / optimized
__pycache__/
*.py[cod]
*$py.class

# Virtual environment
venv/
env/
ENV/
.venv

# Distribution / packaging
dist/
build/
*.egg-info/
.eggs/

# Testing
.pytest_cache/
.coverage
htmlcov/
.tox/

# IDE
.vscode/
.idea/
*.swp

# Jupyter Notebook
.ipynb_checkpoints/

# Environment
.env
.env.local
```

### Java Project

```txt
# Compiled class files
*.class

# Package Files
*.jar
*.war
*.ear
*.zip
*.tar.gz
*.rar

# Maven
target/
pom.xml.tag
pom.xml.releaseBackup

# Gradle
.gradle/
build/

# IDE
.idea/
*.iml
.classpath
.project
.settings/
*.swp

# Logs
*.log
```

### Web Project (HTML/CSS/JS)

```txt
# Dependencies
node_modules/
bower_components/

# Build
dist/
build/
*.min.js
*.min.css

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Environment
.env
```

---

## Complete .gitignore Example

```txt
#################
# IDE & Editors #
#################

# VS Code
.vscode/
*.code-workspace

# IntelliJ IDEA
.idea/
*.iml
*.iws
*.ipr

# Sublime Text
*.sublime-project
*.sublime-workspace

# Vim
*.swp
*.swo
*~

#############
# OS Files  #
#############

# macOS
.DS_Store
.AppleDouble
.LSOverride
._*

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/

# Linux
*~
.directory
.Trash-*

##############
# Languages  #
##############

# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnp/
.pnp.js

# Python
__pycache__/
*.py[cod]
*$py.class
venv/
.Python

# Java
*.class
*.jar
*.war
target/

# C/C++
*.o
*.so
*.exe
*.out
*.app

#############
# Build     #
#############

dist/
build/
out/
*.min.js
*.min.css

#################
# Environment   #
#################

.env
.env.local
.env.*.local
secrets.yml
config.local.js

##########
# Logs   #
##########

logs/
*.log
npm-debug.log*

############
# Testing  #
############

coverage/
.nyc_output/
.pytest_cache/

##########
# Misc   #
##########

.cache/
.temp/
tmp/
*.tmp
*.bak
```

---

## Advanced Usage

### Negation (Whitelist Files)

```txt
# Ignore all .env files
*.env

# But don't ignore .env.example
!.env.example

# Ignore entire folder except one file
logs/
!logs/.gitkeep
```

### Comments and Blank Lines

```txt
# This is a comment

# Blank lines are ignored

*.log    # Comments after patterns work too
```

### Escape Special Characters

```txt
# Ignore file named #hashtag
\#hashtag

# Ignore file with space
file\ with\ space.txt
```

---

## Best Practices

### 1. Use Global .gitignore

For personal preferences (IDE, OS files):

```bash
# Set global gitignore
git config --global core.excludesfile ~/.gitignore_global

# Create file
echo ".DS_Store" >> ~/.gitignore_global
echo ".vscode/" >> ~/.gitignore_global
```

### 2. Use Template Generators

- **[gitignore.io](https://www.toptal.com/developers/gitignore)** - Generate templates
- **[GitHub gitignore repo](https://github.com/github/gitignore)** - Official templates

### 3. Commit .gitignore Early

```bash
# Create .gitignore first
touch .gitignore

# Add your patterns
echo "node_modules/" >> .gitignore

# Commit it
git add .gitignore
git commit -m "Add .gitignore"
```

### 4. Keep It Updated

```bash
# Test what files would be ignored
git status --ignored

# Check if file is ignored
git check-ignore -v <file>
```

---

## Troubleshooting

### File Already Tracked

If a file is already tracked, `.gitignore` won't affect it:

```bash
# Remove from tracking (keep file locally)
git rm --cached <file>

# Or remove directory
git rm -r --cached <directory>/

# Commit the change
git commit -m "Stop tracking file"
```

### Check What's Being Ignored

```bash
# Show ignored files
git status --ignored

# Show why file is ignored
git check-ignore -v <file>

# List all ignored files
git ls-files --others --ignored --exclude-standard
```

### Debug .gitignore Rules

```bash
# Check if specific file is ignored
git check-ignore -v path/to/file

# Output shows:
# .gitignore:12:*.log    path/to/file.log
# (file:line:pattern matched file)
```

---

## Common Patterns by Technology

### React

```txt
node_modules/
build/
.env
.env.local
npm-debug.log*
.DS_Store
```

### Vue.js

```txt
node_modules/
dist/
.env.local
.DS_Store
npm-debug.log*
```

### Angular

```txt
node_modules/
dist/
.angular/
.env
npm-debug.log*
```

### Docker

```txt
# Don't ignore Dockerfile
!Dockerfile
!docker-compose.yml

# Ignore build context
.dockerignore
```

### WordPress

```txt
wp-config-local.php
.htaccess
wp-content/uploads/
wp-content/cache/
```

---

## Templates and Resources

### Official Templates

- [GitHub gitignore templates](https://github.com/github/gitignore)
- [gitignore.io](https://www.toptal.com/developers/gitignore)

### Language-Specific

- [Node](https://github.com/github/gitignore/blob/main/Node.gitignore)
- [Python](https://github.com/github/gitignore/blob/main/Python.gitignore)
- [Java](https://github.com/github/gitignore/blob/main/Java.gitignore)
- [Go](https://github.com/github/gitignore/blob/main/Go.gitignore)
- [Ruby](https://github.com/github/gitignore/blob/main/Ruby.gitignore)

---

## Quick Commands

```bash
# Create .gitignore
touch .gitignore

# Generate template (using gitignore.io API)
curl -L https://www.toptal.com/developers/gitignore/api/node,macos,windows,linux,vscode > .gitignore

# Check what's ignored
git status --ignored

# Test pattern
git check-ignore -v <file>

# Remove tracked file
git rm --cached <file>

# Force add ignored file
git add -f <file>
```

---

## See Also

- [Git FAQ](/guides/faq) - Common Git troubleshooting and tips
- [Quick Reference](/quick-reference) - Fast command lookup
- [Workflows](/guides/workflows) - Team workflows