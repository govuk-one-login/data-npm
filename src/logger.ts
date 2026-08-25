import type { LogItemExtraInput } from "@aws-lambda-powertools/logger/types";
import { Logger } from "@aws-lambda-powertools/logger";
import { MetricUnit, Metrics } from "@aws-lambda-powertools/metrics";
import { Tracer } from "@aws-lambda-powertools/tracer";

const METRIC_COUNT = 1;

const dataTracer = new Tracer();

/**
 * A logger that combines AWS Lambda Powertools structured logging with CloudWatch custom metrics.
 * Each log method has a paired `WithMetrics` variant that emits a metric alongside the log.
 */
class DataLogger<TLogEvents extends string = string> extends Logger {
  public metrics: Metrics;

  /**
   * @param serviceName - The service name used for logging and metrics.
   * @param namespace - Optional CloudWatch metrics namespace.
   */
  public constructor(serviceName: string, namespace?: string) {
    super();
    this.metrics = new Metrics(namespace ? { namespace, serviceName } : { serviceName });
  }

  /** Logs at debug level and emits a metric. */
  public debugWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    this.debug(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, METRIC_COUNT);
  };

  /** Logs at info level and emits a metric. */
  public infoWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    this.info(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, METRIC_COUNT);
  };

  /** Logs at warn level and emits a metric. */
  public warnWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    this.warn(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, METRIC_COUNT);
  };

  /** Logs at error level and emits a metric. */
  public errorWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    this.error(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, METRIC_COUNT);
  };

  /** Logs at critical level and emits a metric. */
  public criticalWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    this.critical(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, METRIC_COUNT);
  };
}

export { DataLogger, dataTracer };
