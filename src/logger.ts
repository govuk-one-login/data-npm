import type { LogItemExtraInput } from "@aws-lambda-powertools/logger/types";
import { Logger } from "@aws-lambda-powertools/logger";
import { MetricUnit, Metrics } from "@aws-lambda-powertools/metrics";
import { Tracer } from "@aws-lambda-powertools/tracer";

const METRIC_COUNT = 1;

const dataTracer = new Tracer();

class DataLogger<TLogEvents extends string = string> extends Logger {
  public metrics: Metrics;

  public constructor(serviceName: string, namespace?: string) {
    super();
    this.metrics = new Metrics(
      namespace ? { namespace, serviceName } : { serviceName },
    );
  }

  public debugWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    this.debug(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, METRIC_COUNT);
  };

  public infoWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    this.info(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, METRIC_COUNT);
  };

  public warnWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    this.warn(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, METRIC_COUNT);
  };

  public errorWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    this.error(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, METRIC_COUNT);
  };

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
