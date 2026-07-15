import type { LogItemExtraInput } from "@aws-lambda-powertools/logger/types";
import { Logger } from "@aws-lambda-powertools/logger";
import { MetricUnit, Metrics } from "@aws-lambda-powertools/metrics";
import { Tracer } from "@aws-lambda-powertools/tracer";

export const dataTracer = new Tracer();

export class DataLogger<TLogEvents extends string = string> extends Logger {
  public metrics: Metrics;

  public constructor(serviceName: string, namespace?: string) {
    super();
    this.metrics = new Metrics({
      serviceName,
      ...(namespace !== undefined && { namespace }),
    });
  }

  public debugWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    this.debug(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, 1);
  };

  public infoWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    this.info(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, 1);
  };

  public warnWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    this.warn(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, 1);
  };

  public errorWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    this.error(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, 1);
  };

  public criticalWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    this.critical(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, 1);
  };
}
