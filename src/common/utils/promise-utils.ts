export async function promise_tuplify<T>(
  promise: Promise<T>,
): Promise<[T, Error]> {
  try {
    const res = await promise;

    return [res, null];
  } catch (error) {
    return [null, error];
  }
}
