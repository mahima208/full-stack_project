# Contributing to Digital Library

## Welcome! 👋

Thank you for your interest in contributing to Digital Library. This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

Before creating a bug report, check the issue list to avoid duplicates.

**When creating a bug report, include:**
- Clear title and description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Your environment (OS, browser, Node version)

### Suggesting Enhancements

**When suggesting features, include:**
- Clear title and description
- Use case and benefits
- Possible implementation approach
- Examples from other projects if applicable

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test your changes
5. Commit with clear messages: `git commit -m "Add your feature"`
6. Push to your branch: `git push origin feature/your-feature`
7. Open a Pull Request

## Code Style

### General
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Backend (Node.js)
- Use async/await instead of callbacks
- Follow Express.js conventions
- Write error handling for all async operations
- Validate user input

### Frontend (React)
- Use functional components and hooks
- Keep components focused and reusable
- Use meaningful component names
- Add PropTypes for type checking

### Commits
- Write clear, descriptive commit messages
- Reference issue numbers: "Fix #123"
- Keep commits atomic (one feature per commit)

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Maintain or improve code coverage
- Test edge cases

## Documentation

- Update README.md if adding features
- Add code comments for complex logic
- Update API documentation for new endpoints
- Include examples for new features

## Project Setup

See [SETUP_GUIDE.md](docs/SETUP_GUIDE.md) for installation instructions.

## Questions?

- Check existing documentation
- Review closed issues for similar questions
- Ask in pull requests or issues
- Contact maintainers

Thank you for contributing! 🎉
