# Contributing to Ved UI

Thank you for your interest in contributing to Ved UI! This guide will help you get started.

## Project Structure

Ved UI consists of:

- `/src/*` - Core component source files
  - `/components/*` - React components
  - `/lib/*` - Utility functions and shared code
  - `/styles/*` - CSS and styling files
- `/test/*` - Test files
- `/docs/*` - Documentation

## Development Setup

1. Fork the repository

2. Clone your fork:

   ```bash
   git clone https://github.com/azacdev/ved-ui.git
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm run dev
   ```

## Contributing Guidelines

### Creating a New Package

1. Create a new directory in `registry/ui` with your component name
2. Initialize the package with required files:

   - `package.json`
   - `README.md`
   - `tsconfig.json`
   - `tsup.config.ts`
   - `src/` directory

### Package Structure Example

```text
components/ui/your-component/
├── src/
│   ├── index.ts
│   ├── your-component.tsx

```

### Write Documentation

- Navigate to the `/docs` directory
- Place new documentation in the appropriate directory under `/content/docs/`
- Use MDX format for documentation files
- Include proper frontmatter with title, description, and other metadata
- Follow the existing documentation style and structure

#### TypeScript

- Use TypeScript for all components
- Export proper type definitions
- Use interfaces over types where appropriate
- Provide comprehensive type documentation

#### React Patterns

- Use functional components
- Implement proper prop types and defaults
- Use React Server Components where possible
- Follow the compound component pattern when appropriate

#### Code Examples

- Include working examples for components and features
- Use TypeScript for all code examples
- Ensure examples are accessible and follow best practices
- Test examples locally before submitting

## Submitting Changes

1. Create a new branch for your changes
2. Make your changes following the guidelines above
3. Test your changes locally
4. Submit a pull request with:
   - Clear description of changes
   - Screenshots/videos if UI changes
   - Updated tests
   - Documentation updates

## Need Help?

If you need help or have questions:

- Open an issue for component or documentation-related questions
- Join our community discussions
- Review existing components and documentation for examples
