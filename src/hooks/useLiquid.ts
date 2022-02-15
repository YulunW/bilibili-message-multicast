/**
 * Credit to react-liquid https://github.com/aquibm/react-liquid
 */
// Todo: Figure out how to add mit licenses into the packaged windows program.

import { useEffect, useState } from 'react';

import { Liquid } from 'liquidjs';
import { isObject } from '../helpers/typeHelpers';

const engine = new Liquid();

export enum RenderStatus {
  Idle = 'idle',
  RenderFailed = 'render failed',
  Rendering = 'rendering',
}

export const useLiquid = (template: string, data: Record<string, unknown>) => {
  // Used so the react could correctly compare what data is the same. Gross.
  const dataComparator = JSON.stringify(data);
  const [state, setState] = useState({
    status: RenderStatus.Idle,
    result: '',
  });

  useEffect(() => {
    const parseAndRender = async () => {
      setState({
        ...state,
        status: RenderStatus.Rendering,
      });

      if (!template) {
        setState({
          status: RenderStatus.Idle,
          result: '',
        });

        return;
      }

      try {
        const markup = await engine.parseAndRender(template, data);
        setState({
          status: RenderStatus.Idle,
          result: markup,
        });
      } catch (error) {
        setState({
          status: RenderStatus.RenderFailed,
          result: isObject(error) ? error.toString() : '',
        });
      }
    };

    parseAndRender();
    // We are using the comparator to prevent React from infinitely calling this hook.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template, dataComparator]);

  return state;
};
