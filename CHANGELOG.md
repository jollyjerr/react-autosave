# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
