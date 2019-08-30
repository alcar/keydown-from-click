# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- New scripts to README;
- `keywords` to `package.json`.

### Fixed

- README's subsection about type checking.

## [1.1.3] - 2019-08-29

### Fixed

- Changelog.

## [1.1.2] - 2019-08-29

### Added

- JSON files now also get formatted during pre-commit;
- `format` and `lint` scripts;
- The pre-publish process now also lints all files and checks if they're properly formatted;
- Travis CI now also lints all files, and checks if they're properly formatted and the project is built without errors;
- React version setting to the ESLint configuration;
- `.prettierignore`.

### Changed

- Rename `typecheck` script to `checkTypes`.

### Removed

- Travis CI notification emails;
- Automatic Travis CI builds for the `wip` branch.

### Security

- Upgrade `eslint-utils`, since the previous version had a security vulnerability.

## [1.1.1] - 2019-08-20

### Fixed

- Typo in file name.

## [1.1.0] - 2019-08-20

### Added

- Support to inline modifiers;
- Pass `React.SyntheticEvent`'s properties to the click handler when the keydown handler is triggered.

### Changed

- Optimize functions by moving some steps out of the keydown handler.

## [1.0.1] - 2019-08-17

### Changed

- Update CodeSandbox example link.

## [1.0.0] - 2019-08-17

### Added

- Initial files.
