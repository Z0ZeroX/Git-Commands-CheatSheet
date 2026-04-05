import { stat } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const docsRoot = fileURLToPath(new URL('..', import.meta.url))

export default defineConfig({
  title: 'Git Commands Cheat Sheet',
  description: 'Comprehensive Git command reference for developers',
  lang: 'en-US',
  base: '/Git-Commands-CheatSheet/',
  ignoreDeadLinks: false,
  async transformPageData(pageData) {
    if (pageData.frontmatter?.lastUpdated === false || pageData.lastUpdated) {
      return
    }

    try {
      const pageFilePath = resolve(docsRoot, pageData.filePath)
      const pageStats = await stat(pageFilePath)

      return {
        lastUpdated: Math.trunc(pageStats.mtimeMs)
      }
    } catch {
      return
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/Git-Commands-CheatSheet/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#f05032' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'Git Commands Cheat Sheet' }],
    ['meta', { name: 'og:description', content: 'Comprehensive Git command reference' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quick Reference', link: '/quick-reference' },
      { text: 'Guides', link: '/guides/' },
      { text: 'GitHub', link: 'https://github.com/DTan084/Git-Commands-CheatSheet' }
    ],

    sidebar: [
      {
        text: 'Basics',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/01_basics/' },
          { text: 'git init', link: '/01_basics/init' },
          { text: 'git clone', link: '/01_basics/clone' },
          { text: 'git add', link: '/01_basics/add' },
          { text: 'git commit', link: '/01_basics/commit' },
          { text: 'git status', link: '/01_basics/status' },
          { text: 'git log', link: '/01_basics/log' },
          { text: 'git diff', link: '/01_basics/diff' }
        ]
      },
      {
        text: 'Branching',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/02_branching/' },
          { text: 'git checkout', link: '/02_branching/checkout' },
          { text: 'git switch', link: '/02_branching/switch' },
          { text: 'git merge', link: '/02_branching/merge' }
        ]
      },
      {
        text: 'Merging & Rebasing',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/03_merging/' },
          { text: 'git merge', link: '/02_branching/merge' },
          { text: 'git rebase', link: '/03_merging/rebase' },
          { text: 'git cherry-pick', link: '/03_merging/cherry-pick' },
          { text: 'git revert', link: '/03_merging/revert' }
        ]
      },
      {
        text: 'Remote Operations',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/04_remote/' },
          { text: 'git remote', link: '/04_remote/remote' },
          { text: 'git fetch', link: '/04_remote/fetch' },
          { text: 'git pull', link: '/04_remote/pull' },
          { text: 'git push', link: '/04_remote/push' },
          { text: 'git submodule', link: '/04_remote/submodule' }
        ]
      },
      {
        text: 'Advanced',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/05_advanced/' },
          { text: 'git stash', link: '/05_advanced/stash' },
          { text: 'git bisect', link: '/05_advanced/bisect' },
          { text: 'git reflog', link: '/05_advanced/reflog' },
          { text: 'git worktree', link: '/05_advanced/worktree' },
          { text: 'git hooks', link: '/05_advanced/hooks' }
        ]
      },
      {
        text: 'Troubleshooting',
        collapsed: true,
        items: [
          { text: 'Common Issues', link: '/06_troubleshooting/' }
        ]
      },
      {
        text: 'Guides',
        collapsed: false,
        items: [
          { text: 'Git Workflows', link: '/guides/workflows' },
          { text: '.gitignore Guide', link: '/guides/gitignore' },
          { text: 'FAQ', link: '/guides/faq' }
        ]
      },
      {
        text: 'Reference',
        collapsed: false,
        items: [
          { text: 'Quick Reference', link: '/quick-reference' },
          { text: 'Glossary', link: '/glossary' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Z0ZeroX/git-commands-cheatsheet' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Git Commands Cheat Sheet Contributors'
    },

    search: {
      provider: 'local',
      options: {
        placeholder: 'Search Git commands...',
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search'
          },
          modal: {
            displayDetails: 'Display detailed list',
            resetButtonTitle: 'Reset search',
            backButtonTitle: 'Close search',
            noResultsText: 'No results for',
            footer: {
              selectText: 'to select',
              selectKeyAriaLabel: 'enter',
              navigateText: 'to navigate',
              navigateUpKeyAriaLabel: 'up arrow',
              navigateDownKeyAriaLabel: 'down arrow',
              closeText: 'to close',
              closeKeyAriaLabel: 'escape'
            }
          }
        }
      }
    },

    editLink: {
      pattern: 'https://github.com/Z0ZeroX/git-commands-cheatsheet/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  }
})
