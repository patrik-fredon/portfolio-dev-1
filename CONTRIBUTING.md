# Contributing to Modern Portfolio Website

First off, thank you for considering contributing to this project! 🎉 

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
  - [Issues](#issues)
  - [Pull Requests](#pull-requests)
- [Development Process](#development-process)
- [Style Guide](#style-guide)
- [Commit Messages](#commit-messages)
- [Testing](#testing)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Issues

- Check if the issue already exists
- Use the issue template when creating a new issue
- Be clear and descriptive in your issue description
- Include steps to reproduce for bugs
- Add labels appropriately

#### Issue Types

- 🐛 Bug Report: Something isn't working
- 💡 Feature Request: New functionality
- 📝 Documentation: Improvements or additions to documentation
- 🎨 Design: UI/UX improvements
- ⚡ Performance: Performance improvements

### Pull Requests

1. Fork the repo
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (if applicable)
5. Commit your changes
6. Push to the branch
7. Open a Pull Request

## Development Process

1. Pick an issue to work on
2. Create a branch
3. Develop
4. Test
5. Submit PR
6. Code Review
7. Merge

### Branch Naming Convention

- Feature: `feature/description`
- Bug Fix: `fix/description`
- Documentation: `docs/description`
- Performance: `perf/description`

## Style Guide

### JavaScript/TypeScript

- Use ES6+ features
- Follow the existing code style
- Use meaningful variable names
- Document complex logic with comments

### CSS/Tailwind

- Follow BEM methodology for custom CSS
- Use Tailwind's utility classes when possible
- Keep components responsive
- Maintain dark/light theme support

### Component Structure

```jsx
// Imports
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Component
const ComponentName = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState();

  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // Handlers
  const handleEvent = () => {
    // Handler logic
  };

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

// PropTypes
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

export default ComponentName;
```

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Formatting, missing semi colons, etc
- refactor: Code changes that neither fixes a bug or adds a feature
- perf: Performance improvements
- test: Adding missing tests
- chore: Changes to build process or auxiliary tools

## Testing

- Write tests for new features
- Update tests when modifying existing features
- Ensure all tests pass before submitting PR
- Include both unit and integration tests where applicable

## Directory Structure

When adding new files, follow the existing project structure:

```
├── app/
│   ├── components/     # React components
│   │   ├── ui/        # Reusable UI components
│   │   └── features/  # Feature-specific components
│   ├── contexts/      # React contexts
│   ├── hooks/         # Custom hooks
│   └── utils/         # Utility functions
├── public/           # Static assets
└── styles/          # Global styles
```

## Questions?

Don't hesitate to ask questions in:
- GitHub Issues
- Pull Request comments
- Project discussions

Thank you for contributing! 🙏
