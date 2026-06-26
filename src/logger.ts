import { Logger } from '@aws-lambda-powertools/logger';
import { Metrics, MetricUnit } from '@aws-lambda-powertools/metrics';
import { LogItemExtraInput } from '@aws-lambda-powertools/logger/types';
import type { Context } from 'aws-lambda';

export class DataLogger<TLogEvents extends string = string> extends Logger {
  public readonly metrics: Metrics;

  constructor(serviceName: string, namespace?: string) {
    super({ serviceName });
    this.metrics = new Metrics({ serviceName, namespace });
  }

  initialise(context: Context): void {
    this.addContext(context);
    this.refreshSampleRateCalculation();
  }

  infoWithMetrics(
    message: string,
    metric: TLogEvents,
    ...extra: LogItemExtraInput
  ): void {
    this.info(message, ...extra);
    this.metrics.addMetric(metric, MetricUnit.Count, 1);
  }

  warnWithMetrics(
    message: string,
    metric: TLogEvents,
    ...extra: LogItemExtraInput
  ): void {
    this.warn(message, ...extra);
    this.metrics.addMetric(metric, MetricUnit.Count, 1);
  }

  errorWithMetrics(
    message: string,
    metric: TLogEvents,
    ...extra: LogItemExtraInput
  ): void {
    this.error(message, ...extra);
    this.metrics.addMetric(metric, MetricUnit.Count, 1);
  }
}
