# Security Policy

## Supported versions

The latest `0.x` release receives security fixes. Older versions may be asked to
upgrade.

## Reporting a vulnerability

Email **marcel@heers.it** with:

- what the issue is and where it lives,
- a reproduction or proof of concept,
- the affected version and, if known, the fix you would suggest.

Please do not open a public GitHub issue for security problems. You will get an
acknowledgement within a few days and a coordinated disclosure timeline.

## Scope

This package renders UI. It does not ship credentials, network clients or server
code. The relevant risks are:

- unsafe rendering of user-controlled strings (the library never uses `v-html`),
- clipboard behaviour in `CopyButton`,
- `tel:` links generated from untrusted input.

Phone numbers are sanitised before they become `tel:` hrefs. If you find a way to
inject a scheme or markup through a number, a message body or a callback payload,
that is in scope and we want to hear about it.
