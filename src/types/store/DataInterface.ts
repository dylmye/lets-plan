/**
 * Define the shape of the import/export from each provider for the feature.
 * @param A The actions interface
 * @param S the selectors interface
 */
type DataInterface<A, S> = {
  actions: A;
  selectors: S;
};

export default DataInterface;
