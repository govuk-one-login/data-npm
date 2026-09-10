/**
 * Generic log event names emitted alongside metrics via a logger's
 * `*WithMetrics` methods.
 *
 * @deprecated Use the log events from `txma-shared-signals` instead.
 * @see {@link txma-shared-signals/common/sharedServices/logger.ts}
 */
export enum LogEvents {
  StartedProcessing = "Started Processing",
  SuccessfullyProcessed = "Successfully Processed",
  ErrorProcessing = "Error Processing",
}
