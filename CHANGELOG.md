# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[0.1.0]: https://github.com/mheers/sipgate-ui-components/releases/tag/v0.1.0
