# 🧠 Obsidian Memory System

This folder contains the project memory system designed for use with Obsidian.

## 🚀 Quick Start

1. **Install Obsidian** from [obsidian.md](https://obsidian.md)
2. **Open Vault**: File → Open Vault → Select this `.obsidian-memory/` folder
3. **Navigate**: Use the `MEMORY-INDEX.md` as your dashboard

## 📁 Folder Structure

```
.obsidian-memory/
├── MEMORY-INDEX.md          ← Main dashboard
├── README.md                ← This file
├── projects/                ← Project documentation
│   └── current-project.md
├── logs/                    ← Daily work logs
│   └── YYYY-MM-DD.md
└── knowledge-base/          ← Reference material
    ├── tech-stack.md
    └── project-overview.md
```

## 📝 How to Add Memory

### New Project
```bash
# Create a new project file
touch .obsidian-memory/projects/[project-name].md
```

### Daily Log
```bash
# Create a new daily log
touch .obsidian-memory/logs/$(date +%Y-%m-%d).md
```

### Knowledge Base
```bash
# Add a new knowledge base entry
touch .obsidian-memory/knowledge-base/[topic].md
```

## 🔗 Obsidian Features

- **Backlinks**: See where files reference each other
- **Graph View**: Visualize connections between notes
- **Search**: Full-text search across all notes
- **Tags**: Add `#tags` for categorization
- **Templates**: Create reusable note templates

## 📋 File Naming Convention

- Projects: `kebab-case.md` (e.g., `current-project.md`)
- Logs: `YYYY-MM-DD.md` (e.g., `2026-08-22.md`)
- Knowledge: `kebab-case.md` (e.g., `tech-stack.md`)

---

*Memory system created by Codebuff Agent*
*Date: August 22, 2026*
