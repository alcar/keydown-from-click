# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.0.4] - 2022-12-30

### Removed

- Travis CI integration.

## [4.0.3] - 2022-12-30

### Added

- Disclaimer to README about the project no longer being maintained.

### Removed

- Example CodeSandbox from README.

## [4.0.2] - 2022-05-31

### Fixed

- `options` parameter types.

## [4.0.1] - 2022-05-31

### Changed

- Refactor tests;
- Refactor types;
- Improve README to make it clearer when to use this package.

## [4.0.0] - 2022-05-31

### Changed

- **[BREAKING]** Set `react`'s minimum version to 18.0.0 in peer dependencies;
- **[BREAKING]** Add `react-dom` to peer dependencies;
- Bump all dev dependencies related to React to their respective latest majors.

### Removed

- Unnecessary files from npm package.

### Fixed

- Remove extra links from the bottom of the changelog.

## [3.1.5] - 2022-05-31

### Security

- Upgrade all upgradable dependencies;
- Start using exact versions in `package.json`.

## [3.1.4] - 2021-08-01

### Security

- Upgrade all upgradable dependencies.

## [3.1.3] - 2021-03-27

### Changed

- Bump webpack to major 5.

### Security

- Upgrade all upgradable dependencies.

## [3.1.2] - 2021-02-21

### Removed

- `@types/testing-library__react`, since `@testing-library/react` provides its own type definitions.

### Security

- Upgrade `axios`, `ini`, `node-notifier`, and all other upgradable dependencies.

## [3.1.1] - 2020-07-20

### Changed

- Update some configuration files.

### Security

- Upgrade `lodash` and all other upgradable dependencies.

## [3.1.0] - 2020-04-01

### Added

- `detail` and `view` properties to the artificial click event;
- `@types/react` and `@types/react-dom` as dev dependencies.

### Changed

- Set `tsconfig.json`'s `skipLibCheck` to `true`;
- Make minor improvements to the README;
- Upgrade dependencies.

## [3.0.1] - 2020-03-29

### Fixed

- WCAG link from README's "Motivation" section.

## [3.0.0] - 2020-03-29

### Added

- **[BREAKING]** Space as one of the default keys.

### Changed

- **[BREAKING]** The artificial click event now attempts to simulate a click in the center of the element;
- Restructure tests folder;
- Mention React in the project description;
- Improve README's "Motivation" section;
- Reorder README's "Development" section's subsections;
- Upgrade dependencies.

### Removed

- Unnecessary repetitions of the validation of global modifiers;
- Duplicated general tests.

## [2.1.1] - 2020-03-24

### Security

- Upgrade "minimist" and all other upgradable dependencies.

## [2.1.0] - 2020-03-09

### Added

- `shouldPropagate` option, which controls whether the event should propagate; it defaults to `true`.

## [2.0.0] - 2020-03-06

### Changed

- **[BREAKING]** Replace `FullEventHandler` with the event handlers from React for seamless integration, and make the necessary changes to the click handler call.

### Removed

- **[BREAKING]** `FullEventHandler` type.

## [1.1.8] - 2020-03-06

### Fixed

- Use the same generic type from `useKeydownFromClick` in `createKeydownFromClick`.

## [1.1.7] - 2020-03-02

### Fixed

- API functions' types, which were not behaving as generic ones.

## [1.1.6] - 2020-01-08

### Security

- Upgrade "handlebars" and "serialize-javascript", and all other upgradable packages.

## [1.1.5] - 2019-08-30

### Added

- `release`, `prereleasy` and `postreleasy` scripts;
- Subsection on releasing and publishing to README;
- "Watch mode" to the README's subsection on testing;
- `_releasy.json`.

### Changed

- Make Travis CI run most scripts in parallel;
- Rename `checkTypes` script to `checkTyping`;
- Rename `format` script to `checkFormatting`.

### Removed

- `prepublishOnly` script.

## [1.1.4] - 2019-08-30

### Added

- New scripts to README;
- `keywords` to `package.json`.

### Fixed

- README's subsection on type checking.

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
