// this declaration is an adaptation of https://github.com/DavidWells/analytics/issues/99
// (c) Georgios Markou, Dylan Myers

// this declaration applies to browser only, not node

declare module "@analytics/simple-analytics" {
  interface SimpleAnalyticsOptions {
    /** Custom domain for simple analytics script. https://docs.simpleanalytics.com/script */
    customDomain?: string;
    /** Allow overwriting domain name https://docs.simpleanalytics.com/overwrite-domain-name */
    hostname?: string;
    /** Allow collecting DNT visitors https://docs.simpleanalytics.com/dnt */
    collectDnt?: boolean;
    /** Allow hash mode https://docs.simpleanalytics.com/hash-mode */
    mode?: "hash";
    /** Add ignore pages https://docs.simpleanalytics.com/ignore-pages */
    ignorePages?: string;
    /** Overwrite SA global for events https://docs.simpleanalytics.com/events#the-variable-sa_event-is-already-used */
    saGlobal?: string;
    /** Overwrite SA global for events https://docs.simpleanalytics.com/trigger-custom-page-views#use-custom-collection-anyway */
    autoCollect?: boolean;
    /** Allow onload callback https://docs.simpleanalytics.com/trigger-custom-page-views#use-custom-collection-anyway */
    onloadCallback?: string;
  }

  // import { AnalyticsPlugin } from "analytics";
  type AnalyticsPlugin = {
    name: string;
    EVENTS?: any;
    config?: any;
    initialize?: (...params: any[]) => any;
    page?: (...params: any[]) => any;
    track?: (...params: any[]) => any;
    identify?: (...params: any[]) => any;
    loaded?: (...params: any[]) => any;
    ready?: (...params: any[]) => any;
  };

  function simpleAnalyticsPlugin(
    pluginConfig?: SimpleAnalyticsOptions
  ): AnalyticsPlugin;

  export default simpleAnalyticsPlugin;
}
