# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.3]

## Changed

- Fix type definitions for ESM and formally remove cjs support
- Updated all dev dependencies and tooling

## [0.4.2]

## Changed

- Fixed export paths for production build

## [0.4.1] - 10-23-22

## Added

- Prettier code formatting

## Changed

- useAutosave will not fire the `onSave` callback if the definition of `onSave` changes

## [0.4.0] - 5-15-22

## Added

- A toggle to cancel saving on unmount `saveOnUnmount`
- The ability to save falsy values
- Dev page using vite to preview current build
- React 18 support

## Changed

- Package builds using vite
- Switched to PNPM
- Test run using vitest
- All dependencies bumped to latest version

## [0.3.1] - 12-21-21

## Added

- A tool-versions file to track node version with asdf

### Changed

- Bumped the project to node 16.13.0
- Fixed "Main" and "Module" path in package.json to prevent warnings in node 16

## [0.3.0] - 10-16-21

### Added

- Linting and format checking.

### Changed

- Hook and component both fire on unmount with current, not debounced, value.

## [0.2.2] - 5-18-21

### Added

- Test coverage report.

### Removed

- lodash dependency.

## [0.2.0] - 5-16-21

### Added

- `useAutosave` hook.

## [0.1.5] - 10-10-20

### Added

- `<Autosave>` component.
- Readme.
