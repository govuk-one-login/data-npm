import { Logger } from '@aws-lambda-powertools/logger';
import { Metrics, MetricUnit } from '@aws-lambda-powertools/metrics';
import { Tracer } from '@aws-lambda-powertools/tracer';
import { LogItemExtraInput } from '@aws-lambda-powertools/logger/types';

export const dataTracer = new Tracer();

export class DataLogger<TLogEvents extends string = string> extends Logger {
  public metrics: Metrics;
  
  constructor(serviceName: string, namespace?: string) {
    super();
    this.metrics = new Metrics({
      serviceName: serviceName,
      namespace: namespace,
    });
  }
  
  debugWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    super.debug(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, 1);
  };
  
  infoWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    super.info(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, 1);
  };
  
  warnWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    super.warn(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, 1);
  };
  
  errorWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    super.error(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, 1);
  };
  
  criticalWithMetrics = (
    input: string,
    metric: TLogEvents,
    ...extraInput: LogItemExtraInput
  ): void => {
    super.critical(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnit.Count, 1);
  };
}
