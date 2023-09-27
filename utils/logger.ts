import { log } from 'next-axiom';

export enum LogLevel {
    INFO = 'info',
    DEBUG = 'debug',
    WARN = 'warn',
    ERROR = 'error',
}

class customLogger {
    private logLevel: LogLevel;

    constructor(logLevel: LogLevel = LogLevel.INFO){
        this.logLevel = logLevel;
    }

   info(message: string, data?: any) {
    if (this.logLevel <= LogLevel.INFO) {
        this.log(LogLevel.INFO, message, data);
    }
   }

   debug(message: string, data?: any) {
    if (this.logLevel <= LogLevel.DEBUG) {
        this.log(LogLevel.DEBUG, message, data);
    }
   }

   warn(message: string, data?: any) {
    if (this.logLevel <= LogLevel.WARN) {
        this.log(LogLevel.WARN, message, data);
    }
   }

   error(message: string, data?: any) {
    if (this.logLevel <= LogLevel.ERROR) {
        this.log(LogLevel.ERROR, message, data);
    }
   }

   private log(level: LogLevel, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        level,
        message,
        data,
    };
    log[level](JSON.stringify(logEntry));
   }
}

// Export a single instance with a default INFO log level
export const logger = new customLogger(LogLevel.INFO);