# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] — 2026-11-17

### Added

- shadcn interop: the library now follows shadcn's document-level `.dark` class in
  addition to `.sg-dark` and `[data-sg-theme="dark"]`.
- A **Foundations → Using with shadcn** guide with load-order advice, a complete
  token bridge, and the mappings that should stay library-specific.

### Changed

- Formatting helpers memoize `Intl` formatters instead of constructing them per
  history row or message, and the phone formatter reuses its chunk patterns.
- The README and Storybook integration guide document measured tree-shaken bundle
  sizes and named-import guidance.

## [0.1.0] — 2026-11-17

The first public foundation.

### Added

- **Primitives** — `Button`, `Input`, `Textarea`, `Label`, `Badge`, `Card`,
  `Avatar`, `Tabs`, `Switch`, `Tooltip`, `Dialog`, `Spinner`, `Skeleton`,
  `Separator`, `EmptyState`, `CopyButton`, `PageHeader`.
- **Communication** — `CommunicationBadge`, `CommunicationIcon`, `PhoneNumber`,
  `CallTimer`.
- **Calls** — `ActiveCallCard`, `CallHistoryItem`, `CallHistoryList`.
- **Messaging** — `SmsComposer`, `SmsBubble`, `SmsThread`, `VoicemailPlayer`.
- **Directory** — `ContactListItem`, `DeviceCard`, `DeviceStatusBadge`,
  `AccountBalance`, `ConnectionStatus`.
- **Utilities** — German-first phone formatting with international fallbacks,
  GSM-7/UCS-2 segment analysis, duration/date/currency formatting, initials and
  avatar tones, `useClipboard`, `useCallDuration`.
- **Design system** — prefixed `--sg-*` tokens, scoped reset, light and dark
  themes, three-font stack, Storybook documentation and a cockpit example.
- **Quality** — TypeScript declarations, unit tests for formatting, SMS
  segmentation and key components, accessibility notes and keyboard maps.

### Fixed

- Phone numbers written with a national trunk prefix after the country code
  (`+49 (0) 30…`, `0049 (0) 30…`), repeated plus signs and Italian leading
  zeros now normalise correctly.
- Type declarations no longer rely on the internal `@/` path alias, so the
  package typechecks in a consumer without extra `paths` configuration.
- The published stylesheet no longer emits Tailwind's global `--spacing`
  variable (or any other generic theme variable).
- Portalled dialogs and tooltips are documented to follow the document-level
  dark theme; the example now themes `<html>` and the dialog follows it.
- History lists no longer inherit browser list markers or indentation.
- The SMS composer shows a focus ring and exposes its keyboard shortcut; a
  loading button keeps its width instead of jumping.
- An outgoing ringing call offers a single cancel action instead of
  answer/decline, and history notes no longer squeeze the channel label.

[0.1.0]: https://github.com/mheers/sipgate-ui-components/releases/tag/v0.1.0
[0.1.1]: https://github.com/mheers/sipgate-ui-components/releases/tag/v0.1.1
