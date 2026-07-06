# Contributing to Vidal Pro Portfolio

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## Development Setup

### Prerequisites
- Node.js 18+ (recommended: 20 LTS)
- npm, yarn, or pnpm
- Git

### Getting Started
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/vidal-pro-portfolio.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
5. Start development server:
   ```bash
   npm run dev
   ```

## Development Workflow

### Code Style
- **TypeScript**: Strict mode enabled, no `any` types
- **Formatting**: Prettier with Tailwind CSS plugin
- **Linting**: ESLint with Next.js core web vitals
- **EditorConfig**: Consistent coding styles across editors

### Git Workflow
1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Run linting and type checking:
   ```bash
   npm run lint
   npm run typecheck
   ```
4. Commit with conventional commits:
   ```bash
   git commit -m "feat: add new feature"
   ```
5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Create a Pull Request

### Commit Convention
We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `style:` code style changes (formatting, etc.)
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

### Code Review
All submissions require review before merging. We use GitHub Pull Requests for this process.

## Project Structure

```
vidal-pro-portfolio/
├── app/                    # Next.js App Router
│   ├── [locale]/          # i18n routes
│   ├── api/               # API routes
│   └── components/        # App components
├── components/            # Reusable components
│   ├── sections/          # Page sections
│   ├── ui/                # UI primitives
│   └── web3/              # Web3 components
├── lib/                   # Utilities and helpers
├── messages/              # i18n translation files
├── public/                # Static assets
├── tests/                 # Test files
└── docs/                  # Documentation
```

## Testing

### E2E Tests
Run Playwright E2E tests:
```bash
npm run test:e2e
```

### Linting
Run ESLint:
```bash
npm run lint
```

### Type Checking
Run TypeScript type checking:
```bash
npm run typecheck
```

## Documentation

### README Updates
- Keep README.md up-to-date with latest changes
- Update API documentation for new endpoints
- Add badges for new features or integrations

### Architecture Decision Records (ADR)
For significant architectural decisions, create an ADR in the `docs/adr/` directory.

## Deployment

### Vercel Deployment
- All pushes to `main` branch trigger automatic deployment
- Pull requests create preview deployments
- Manual approval required for production deployments

### Environment Variables
- Never commit `.env.local` or any environment files
- Use Vercel environment variables for production
- Use `.env.example` as reference for required variables

## Security

### Reporting Vulnerabilities
If you discover a security vulnerability, please report it responsibly:
1. Email: vidalrenao.lab@outlook.com
2. Do not create public GitHub issues for security vulnerabilities
3. Allow time for assessment and patching

### Security Guidelines
- Validate all inputs at API boundaries
- Use parameterized queries
- Sanitize user inputs
- Never commit secrets or API keys
- Use environment variables for configuration

## License

This project is proprietary software. All rights reserved.

## Questions?

If you have questions about contributing, please reach out to:
- Email: vidalrenao.lab@outlook.com
- LinkedIn: [Vidal Reñao](https://linkedin.com/in/vidalrenao)
