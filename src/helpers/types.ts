/** All fields of T are optional, except for the fields defined in KRequired
 * @example
 *  type Person = { id: string, name: string, age: number };
 *  const John: PartialWithRequired<Person, 'id'> = { id: "abc" }; // passes
 *  const Simone: PartialWithRequired<Person, 'id'> = { id: "abc", name: "Simone Giertz" }; // passes
 *  const Tomas: PartialWithRequired<Person, 'id'> = { name: "Tomas B" }; // fails
 *
 * @see https://github.com/Microsoft/TypeScript/issues/25760#issuecomment-1250630403
 * @author Jacopo Marrone <https://github.com/tresorama>
 */
export type PartialWithReq<T, KRequired extends keyof T> = Pick<T, KRequired> &
  Partial<T>;

/** All fields of T are required, except for the fields defined in KOptional
 *
 * @example
 *  type Person = { id: string, name: string, age: number };
 *  const John: WithOptional<Person, 'age'> = { id: "abc", name: "John Smith" }; // passes
 *  const Simone: WithOptional<Person, 'age'> = { id: "abc", name: "Simone Giertz", age: 28 }; // passes
 *  const Tomas: WithOptional<Person, 'age'> = { name: "Tomas B" }; // fails
 *
 * @see https://github.com/Microsoft/TypeScript/issues/25760#issuecomment-1250630403
 * @author Jacopo Marrone <https://github.com/tresorama>
 */
export type WithOptional<T, KOptional extends keyof T> = Omit<T, KOptional> &
  Partial<T>;
