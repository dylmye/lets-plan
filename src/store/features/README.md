Every feature folder should be made up of:

* a definition file for each data provider
* index.tsx - hooks for getting/setting that use providers based on logged in status, redux reducer + state interface
* interface.ts - definitions for the actions and selectors and hooks

Every feature folder should export from index.tsx:

* Selector hooks
* Action hooks
