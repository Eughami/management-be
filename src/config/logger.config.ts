import { getValue } from 'express-ctx';
import { Params } from 'nestjs-pino';
import { PrettyOptions } from 'pino-pretty';
import { nanoid } from 'nanoid';
import { IncomingMessage, ServerResponse } from 'http';
import { RequestContextData } from 'src/interfaces';

const pinoPrettyPrintConfig: PrettyOptions = {
  colorize: true,
  levelFirst: false,
  translateTime: 'hh:MM:ss dd/m/yyyy',
};
export const LoggerConfig: Params = {
  pinoHttp: {
    //level: 'error',
    stream: {
      write(msg: string) {
        console.log(msg);
      },
    },
    autoLogging: {
      ignore: (req) => {
        return req.url === req['baseUrl'];
      },
    },
    transport:
      process.env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: pinoPrettyPrintConfig,
          }
        : undefined,
    customLogLevel: function (
      req: IncomingMessage,
      res: ServerResponse,
      err: Error,
    ) {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return 'warn';
      } else if (res.statusCode >= 500 || err) {
        return 'error';
      }
      return 'info';
    },
    serializers: {
      req: (req) => ({
        id: req.id,
        method: req.method,
        url: req.url,
        remoteAddress: req.remoteAddress,
      }),
      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },
    genReqId: () => {
      const reqContext: RequestContextData = getValue('req');
      return reqContext?.requestId || nanoid(10);
    },
  },
};
