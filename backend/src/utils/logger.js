const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
};

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

const getColor = (level) => {
  switch (level) {
    case LOG_LEVELS.ERROR:
      return colors.red;
    case LOG_LEVELS.WARN:
      return colors.yellow;
    case LOG_LEVELS.INFO:
      return colors.blue;
    case LOG_LEVELS.DEBUG:
      return colors.gray;
    default:
      return colors.reset;
  }
};

export const logger = {
  log: (level, message, data = null) => {
    const timestamp = new Date().toISOString();
    const color = getColor(level);
    const prefix = `${color}[${timestamp}] ${level}${colors.reset}`;

    if (data) {
      console.log(`${prefix}:`, message, data);
    } else {
      console.log(`${prefix}:`, message);
    }
  },

  error: (message, error = null) => {
    logger.log(LOG_LEVELS.ERROR, message, error);
  },

  warn: (message, data = null) => {
    logger.log(LOG_LEVELS.WARN, message, data);
  },

  info: (message, data = null) => {
    logger.log(LOG_LEVELS.INFO, message, data);
  },

  debug: (message, data = null) => {
    if (process.env.NODE_ENV === 'development') {
      logger.log(LOG_LEVELS.DEBUG, message, data);
    }
  },
};
