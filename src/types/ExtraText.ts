export default interface ExtraText {
  /** The MUI Material icon to display for the row */
  iconName: string;
  /** The tooltip text to show for the icon (optional) */
  iconHint?: string;
  /** The component or text to show for the row */
  body: React.ReactChild | string;
  /** Advanced use: for rendering items that cannot descent from p tag, use div instead (optional) */
  parentComponentIsDiv?: boolean;
}
