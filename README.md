# Project.md

[![Version](https://img.shields.io/badge/version-0.0.2-blue.svg)](https://github.com/daviguides/project-md/releases)
[![VSCode](https://img.shields.io/badge/VSCode-%5E1.104.0-007ACC.svg)](https://code.visualstudio.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

**Transform your Markdown files into interactive project navigation hubs.**

Project.md is a VSCode extension that makes file references in Markdown documents clickable, navigable, and intelligent. Designed specifically to enhance workflows for developers using code assistants like Claude Code, Gemini CLI, and Codex CLI.

---

## ✨ Features

### 🔗 Intelligent Path Detection

Automatically detects and enhances file paths in three formats:

**Markdown Links**
```markdown
[Configuration](./config/settings.ts)
[Database](@./src/db/connection.ts)
```

**Inline Code References**
```markdown
Check `./src/utils/validation.ts` for implementation details.
```

**Bare Path References**
```markdown
See ./docs/architecture.md for system overview.
```

### 🎯 Click-to-Navigate

**Cmd/Ctrl + Click** on any detected path to:
- **Open existing files** instantly in the editor
- **Create non-existent files** automatically (with parent directories)
- **Reveal directories** in VSCode Explorer or system file manager

### ⚡ Go to Definition Support

Press **F12** or **Cmd+Click** on file paths to:
- Jump directly to existing files
- Leverage VSCode's native navigation features
- Works seamlessly with peek definition (**Alt+F12**)

### 🛠️ Auto-Creation Workflow

Document your project structure before writing code:

```markdown
## Project Structure

- Entry point: `./src/index.ts`
- Configuration: `./src/config/app.ts`
- Database models: `./src/models/user.ts`
- API routes: `./src/routes/api.ts`
```

Click any path → extension creates the file structure → start coding immediately.

### 🤖 Code Assistant Optimization

**Perfect for AI-powered development workflows:**

- **Claude Code**: Reference project files in prompts with clickable paths
- **Gemini CLI**: Document code structure with navigable references
- **Codex CLI**: Create interactive project maps for context

**Example workflow:**
```markdown
# Task: Implement User Authentication

Context files:
- Main app: `./src/app.ts`
- Auth module: `./src/auth/index.ts`
- User model: `./src/models/user.ts`
- Auth routes: `./src/routes/auth.ts`

[Click paths to create structure, then prompt your code assistant]
```

---

## 📦 Installation

### Via VSCode Marketplace (Coming Soon)

1. Open VSCode
2. Go to Extensions (`Cmd+Shift+X`)
3. Search for "Project.md"
4. Click **Install**

### Manual Installation (Current)

1. Download `project-md-0.0.1.vsix` from [Releases](https://github.com/daviguides/project-md/releases)
2. Open VSCode
3. Press `Cmd+Shift+P` → "Extensions: Install from VSIX..."
4. Select the downloaded `.vsix` file
5. Reload VSCode

---

## 🚀 Usage

### Quick Start (30 seconds)

1. **Create a Markdown file** (e.g., `PROJECT.md`)
2. **Add file references:**
   ```markdown
   # My Project

   Check out `./src/main.ts` for the entry point.
   ```
3. **Cmd+Click** the path → file opens (or gets created if it doesn't exist)

That's it! No configuration needed.

### Common Use Cases

#### Use Case 1: Project Documentation

```markdown
# Project Architecture

## Core Modules
- Application entry: [src/index.ts](./src/index.ts)
- Configuration: [src/config/app.config.ts](./src/config/app.config.ts)
- Database connection: [src/db/connection.ts](./src/db/connection.ts)

## Features
- User authentication: `./src/features/auth/`
- Data validation: `./src/features/validation/`
```

**Benefit:** Every path is clickable - instant navigation to relevant code.

#### Use Case 2: Code Assistant Context Files

```markdown
# Context for Claude Code

## Files to Review
- @./src/services/user.service.ts
- @./src/controllers/user.controller.ts
- @./tests/user.test.ts

## Related Documentation
- [API Spec](./docs/api-spec.md)
- [Database Schema](./docs/schema.md)
```

**Benefit:** Quickly access files mentioned in prompts; `@` prefix supported.

#### Use Case 3: Feature Planning

```markdown
# Feature: Email Notifications

## Implementation Plan
1. Create email service: `./src/services/email.service.ts`
2. Add email templates: `./src/templates/welcome.html`
3. Configure SMTP: `./src/config/email.config.ts`
4. Write tests: `./tests/email.test.ts`

[Click each path to scaffold the file structure]
```

**Benefit:** Document-driven development - structure before implementation.

#### Use Case 4: Onboarding Documentation

```markdown
# Welcome to the Project!

## Key Files to Understand
- Start here: [src/index.ts](./src/index.ts) - Application entry point
- Core logic: [src/core/engine.ts](./src/core/engine.ts) - Main processing
- Configuration: [config/default.json](./config/default.json) - Settings

## Development Workflow
1. Check `./CONTRIBUTING.md` for guidelines
2. Review `./docs/architecture.md` for system design
3. Run tests with `./scripts/test.sh`
```

**Benefit:** New developers can navigate codebase directly from docs.

---

## 🔧 Path Detection Rules

### Supported Path Formats

| Format | Example | Description |
|--------|---------|-------------|
| **Relative** | `./src/file.ts` | Relative to current Markdown file |
| **Parent** | `../config/app.ts` | Navigate up directory tree |
| **Absolute** | `/usr/local/config.ts` | Absolute filesystem path |
| **@ Prefix** | `@./src/utils.ts` | Custom prefix (treated as `./`) |

### Detection Patterns

**✅ Detected:**
```markdown
[Link](./path/file.ts)              ← Markdown link
`./path/file.ts`                     ← Inline code
./path/file.ts                       ← Bare reference
See ./src/app.ts for details         ← In text
```

**❌ Not Detected:**
```markdown
src/file.ts                          ← Missing ./ prefix
~/projects/file.ts                   ← Tilde expansion not supported
file.ts                              ← No path prefix
```

### File vs Directory Behavior

| Target Type | Click Behavior | F12 Behavior |
|-------------|----------------|--------------|
| **Existing File** | Opens in editor | Jumps to file (line 0) |
| **Non-existent File** | Creates file + opens | No action |
| **Directory** | Reveals in Explorer | No action |

---

## ⚙️ Configuration

**v0.0.1** has no configuration options - works out of the box!

**Coming in future versions:**
```json
{
  "project-md.autoCreate": true,
  "project-md.atPrefixAlias": "./",
  "project-md.highlightPaths": true,
  "project-md.validatePaths": "warning"
}
```

---

## 🤖 For Code Assistants

### Why This Extension?

When working with AI code assistants, you often:
1. Reference multiple files in prompts
2. Document project structure in Markdown
3. Create context files with file paths

**Problem:** Paths are plain text - no navigation, no validation.

**Solution:** Project.md makes those paths actionable.

### Integration Examples

#### Claude Code Integration

Create a `CLAUDE.md` file in your project:

```markdown
# Claude Code Context

## Core Application Files
- Entry point: `./src/index.ts`
- Main router: `./src/router.ts`
- Database config: `./src/config/db.ts`

## Current Task Files
- Feature implementation: `./src/features/export.ts`
- Feature tests: `./tests/export.test.ts`
- Type definitions: `./src/types/export.types.ts`

[All paths are clickable - navigate instantly while chatting with Claude]
```

#### Gemini CLI Integration

Structure your `.geminirc` documentation:

```markdown
# Gemini Project Context

## Tool Configurations
- Gemini config: `./.geminirc`
- Custom tools: `./tools/custom-analyzer.js`

## Context Files
- Project overview: `./docs/overview.md`
- API documentation: `./docs/api.md`
```

#### General Workflow

1. **Document** your project structure in Markdown
2. **Navigate** files by clicking paths
3. **Create** missing files automatically
4. **Prompt** your code assistant with context-aware instructions

---

## 🗺️ Roadmap

### v0.1.0 - Syntax Highlighting
- [ ] Visual highlighting for file paths in Markdown
- [ ] Different colors for existing vs non-existent files
- [ ] Customizable theme integration

### v0.2.0 - Path Validation
- [ ] Real-time validation of file references
- [ ] Warning indicators for broken paths
- [ ] Quick fix: "Create file" code action

### v0.3.0 - Assistant-Specific Features
- [ ] Claude Code: Auto-detect `CLAUDE.md` and enhance navigation
- [ ] Gemini CLI: Support for `.geminirc` path conventions
- [ ] Codex CLI: Validate context file references

### v0.4.0 - Workspace & Configuration
- [ ] Multi-root workspace support
- [ ] Workspace-relative path resolution
- [ ] Configuration options for auto-creation behavior
- [ ] Custom @ prefix aliasing

### Future Considerations
- Markdown table of contents generation from file structure
- File tree visualization in Markdown preview
- Integration with VSCode breadcrumbs
- Support for URL-style paths (e.g., `project://src/file.ts`)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/daviguides/project-md.git
   cd project-md
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development:**
   ```bash
   npm run watch
   ```

4. **Launch Extension Development Host:**
   - Press `F5` in VSCode
   - Test changes in the new VSCode window

### Contribution Guidelines

- **Code Style:** Follow existing TypeScript conventions
- **Testing:** Add tests for new features (see `src/test/`)
- **Documentation:** Update `README.md` and `CHANGELOG.md`
- **Commits:** Use clear, descriptive commit messages
- **Pull Requests:** Include description of changes and testing performed

### Areas for Contribution

- 🐛 **Bug fixes** (especially edge cases in path detection)
- ✨ **New features** (see Roadmap above)
- 📖 **Documentation** improvements
- 🧪 **Test coverage** expansion
- 🎨 **UX enhancements** (better error messages, tooltips)

---

## 📝 Technical Details

### Built With

- **TypeScript** - Type-safe extension development
- **VSCode Extension API** - Document providers and commands
- **esbuild** - Fast bundling for production
- **Node.js fs/path** - File system operations

### Extension Architecture

```
┌─────────────────────────────────────┐
│   Markdown Document (*.md)          │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  Path Detection (3 Regex Patterns)  │
│  - Markdown links: [text](path)     │
│  - Inline code: `path`              │
│  - Bare references: path            │
└─────────────────┬───────────────────┘
                  │
        ┌─────────┴──────────┐
        ▼                    ▼
┌──────────────┐    ┌────────────────┐
│ Link Provider│    │Definition Prov.│
│ (Click)      │    │ (F12)          │
└──────┬───────┘    └────────┬───────┘
       │                     │
       ▼                     ▼
┌──────────────────────────────────────┐
│   Command: markdownLinks.open        │
│   - Check if file/directory exists   │
│   - Create file if missing           │
│   - Open in editor or reveal         │
└──────────────────────────────────────┘
```

### Performance

- **Activation:** Lazy (only on Markdown files)
- **Regex Execution:** O(n) per document
- **Memory Footprint:** <500KB bundled
- **Typical Overhead:** <5ms per document scan

For detailed technical documentation, see [CLAUDE.md](./CLAUDE.md).

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

### MIT License Summary

- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

---

## 🙏 Acknowledgments

- **VSCode Extension API** - Excellent documentation and tooling
- **Code Assistant Community** - Inspiration for AI-enhanced development workflows
- **Markdown Ecosystem** - Foundation for documentation-driven development

---

## 📬 Support & Feedback

### Need Help?

- 📖 **Documentation:** Check [CLAUDE.md](./CLAUDE.md) for technical details
- 🐛 **Bug Reports:** [Open an issue](https://github.com/daviguides/project-md/issues/new?template=bug_report.md)
- 💡 **Feature Requests:** [Suggest a feature](https://github.com/daviguides/project-md/issues/new?template=feature_request.md)
- 💬 **Discussions:** [Join the conversation](https://github.com/daviguides/project-md/discussions)

### Stay Updated

- ⭐ **Star** this repo to show support
- 👀 **Watch** for updates and new releases
- 🔔 **Subscribe** to release notifications

---

## 🔗 Links

- **GitHub Repository:** [github.com/daviguides/project-md](https://github.com/daviguides/project-md)
- **VSCode Marketplace:** Coming soon
- **Changelog:** [CHANGELOG.md](./CHANGELOG.md)
- **Technical Docs:** [CLAUDE.md](./CLAUDE.md)

---

**Made with ❤️ for developers working with code assistants**

*Transforming Markdown from documentation to navigation.*
