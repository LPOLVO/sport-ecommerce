# Contributing to SportHub

Thank you for your interest in contributing to the SportHub e-commerce platform! This guide will help you get started.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- GitHub account

### Setup Development Environment

1. **Fork the repository**
   - Click the "Fork" button on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/sports-ecommerce.git
   cd sports-ecommerce
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/original-owner/sports-ecommerce.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Code Style

We follow these conventions:

**TypeScript:**
- Use strict mode (enabled in tsconfig.json)
- Add type annotations for function parameters and returns
- Use interfaces for object types

**React:**
- Use functional components with hooks
- Add 'use client' directive for interactive components
- Keep components under 300 lines (extract sub-components if larger)

**Tailwind CSS:**
- Use existing utility classes
- Avoid inline styles
- Use responsive prefixes (md:, lg:)
- Reference custom utilities in globals.css

**Naming:**
- Use camelCase for variables and functions
- Use PascalCase for components and types
- Use kebab-case for file names (except components)

### Before Committing

1. **Run linter**
   ```bash
   npm run lint
   ```

2. **Type check**
   ```bash
   npm run type-check
   ```

3. **Test your changes**
   ```bash
   npm test
   ```

4. **Build production**
   ```bash
   npm run build
   ```

### Committing Code

```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/your-feature-name
```

**Commit message format:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code refactoring
- `perf:` Performance improvement
- `test:` Adding tests

## Pull Request Process

1. **Update main branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request on GitHub**
   - Provide clear title and description
   - Link related issues
   - Add screenshots for UI changes
   - Reference commits if applicable

4. **PR Checklist**
   - [ ] Tests pass (`npm test`)
   - [ ] Lint passes (`npm run lint`)
   - [ ] Type check passes (`npm run type-check`)
   - [ ] Build succeeds (`npm run build`)
   - [ ] No console errors/warnings
   - [ ] Responsive on mobile
   - [ ] Documentation updated

## Common Tasks

### Adding a New Page

1. Create file in `app/` directory:
   ```typescript
   'use client';
   
   import Header from '@/components/Header';
   import Footer from '@/components/Footer';
   
   export default function NewPage() {
     return (
       <>
         <Header />
         <main className="min-h-screen bg-gray-50">
           {/* Your content */}
         </main>
         <Footer />
       </>
     );
   }
   ```

2. Update Header navigation if needed
3. Add to README documentation
4. Test on mobile

### Adding a New Component

1. Create in `components/` directory:
   ```typescript
   'use client';
   
   interface ComponentProps {
     // Define props
   }
   
   export default function Component({ }: ComponentProps) {
     return (
       <div>
         {/* Component JSX */}
       </div>
     );
   }
   ```

2. Use existing Tailwind utilities
3. Add TypeScript types
4. Create story/test if significant

### Adding a New Type

1. Update `lib/types.ts`:
   ```typescript
   export interface NewType {
     id: string;
     name: string;
     // Add fields
   }
   ```

2. Use in components with proper typing

### Adding Mock Data

1. Update `lib/mockData.ts`:
   ```typescript
   export const NEW_DATA: NewType[] = [
     // Your mock data
   ];
   ```

2. Export from file
3. Import where needed

## Testing

### Running Tests
```bash
npm test                  # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

### Writing Tests

```typescript
import { render, screen } from '@testing-library/react';
import Component from '@/components/Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected')).toBeInTheDocument();
  });
});
```

## Reporting Issues

### Bug Report Template
```markdown
## Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable

## Environment
- Browser: Chrome/Firefox/Safari
- OS: Windows/Mac/Linux
- Version: [version]
```

### Feature Request Template
```markdown
## Description
What feature would you like?

## Use Case
Why do you need this?

## Proposed Solution
How should it work?

## Alternatives
Other approaches?
```

## Questions?

- Check existing issues and PRs
- Review documentation in README.md and CLAUDE.md
- Ask in PR comments
- Open a discussion on GitHub

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Welcome diverse perspectives
- Report inappropriate behavior

## Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

Thank you for contributing! 🙏
