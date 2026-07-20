/**
 * Configuration options for calculating exponential backoff.
 */
interface BackoffOptions {
  /**
   * The current retry attempt, typically starting at 0.
   * @default 0
   */
  attempt?: number;

  /**
   * The base delay in milliseconds for the first retry.
   * @default 100
   */
  baseDelay?: number;

  /**
   * The absolute maximum delay in milliseconds allowed, regardless of the attempt number.
   * @default 10000 (10 seconds)
   */
  maxDelay?: number;

  /**
   * The exponential multiplier used to increase the delay.
   * @default 2
   */
  factor?: number;

  /**
   * Whether to apply "Full Jitter" to the calculated delay.
   * Randomizes the delay between 0 and the calculated exponential maximum to prevent thundering herds.
   * @default true
   */
  jitter?: boolean;
}

/**
 * Calculates the delay time for a retry operation using exponential backoff and jitter.
 *
 * @param {BackoffOptions} [options={}] - Configuration options for the calculation.
 * @returns {number} The calculated delay in milliseconds before the next retry.
 */
export function calculateBackoff(options: BackoffOptions = {}): number {
  // Destructure with sensible defaults
  const { attempt = 0, baseDelay = 100, maxDelay = 10000, factor = 2, jitter = true } = options;

  // Calculate the raw exponential backoff: baseDelay * (factor ^ attempt)
  const exponentialDelay = baseDelay * Math.pow(factor, attempt);

  // Cap the delay so it never exceeds the maxDelay
  const cappedDelay = Math.min(exponentialDelay, maxDelay);

  // Apply Full Jitter: A random number between 0 and the capped delay
  if (jitter) {
    // NOSONAR: Math.random() is safe here. Used only for timing jitter, not cryptography.
    return Math.floor(Math.random() * cappedDelay);
  }

  // Return pure backoff if jitter is explicitly disabled
  return Math.floor(cappedDelay);
}
