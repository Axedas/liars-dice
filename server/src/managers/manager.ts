export interface Manager<T> {
  /**
   * Map maintaining managed ID -> value.
   */
  values: Record<string, T>;

  /**
   * Creates an ID for a managed instance.
   */
  createId(): string;

  /**
   * Creates an instance and returns it.
   */
  create(...args: any[]): T;

  /**
   * Gets the instance at ID.
   * @param id ID of the instance to get.
   * @returns {T} the instance with ID.
   */
  getById(id: string): T;

  /**
   * Remove an instance by ID.
   * @param id The ID of the instance to remove
   * @returns {T} the removed instance
   */
  removeById(id: string): T;
}
