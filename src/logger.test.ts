import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DataLogger } from './logger.js';
import { LogEvents } from './log-events.js';
import { MetricUnit } from '@aws-lambda-powertools/metrics';

describe('DataLogger', () => {
  let logger: DataLogger<LogEvents>;

  beforeEach(() => {
    logger = new DataLogger('test-service', 'test-namespace');
  });

  it('exposes a metrics instance', () => {
    expect(logger.metrics).toBeDefined();
  });

  it('infoWithMetrics calls info and addMetric', () => {
    const infoSpy = vi.spyOn(logger, 'info').mockImplementation(() => {});
    const metricSpy = vi
      .spyOn(logger.metrics, 'addMetric')
      .mockImplementation(() => {});

    logger.infoWithMetrics('msg', LogEvents.StartedProcessing);

    expect(infoSpy).toHaveBeenCalledWith('msg');
    expect(metricSpy).toHaveBeenCalledWith(
      LogEvents.StartedProcessing,
      MetricUnit.Count,
      1
    );
  });

  it('warnWithMetrics calls warn and addMetric', () => {
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {});
    const metricSpy = vi
      .spyOn(logger.metrics, 'addMetric')
      .mockImplementation(() => {});

    logger.warnWithMetrics('msg', LogEvents.ErrorProcessing);

    expect(warnSpy).toHaveBeenCalledWith('msg');
    expect(metricSpy).toHaveBeenCalledWith(
      LogEvents.ErrorProcessing,
      MetricUnit.Count,
      1
    );
  });

  it('errorWithMetrics calls error and addMetric', () => {
    const errorSpy = vi.spyOn(logger, 'error').mockImplementation(() => {});
    const metricSpy = vi
      .spyOn(logger.metrics, 'addMetric')
      .mockImplementation(() => {});

    logger.errorWithMetrics('msg', LogEvents.ErrorProcessing);

    expect(errorSpy).toHaveBeenCalledWith('msg');
    expect(metricSpy).toHaveBeenCalledWith(
      LogEvents.ErrorProcessing,
      MetricUnit.Count,
      1
    );
  });
});
