export const helpers = {
  generateId: () => Math.random().toString(36).substr(2, 9),

  slugify: (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, ''),

  truncate: (text, length = 100, suffix = '...') => {
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + suffix;
  },

  capitalize: (text) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),

  titleCase: (text) =>
    text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),

  debounce: (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  throttle: (func, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  deepClone: (obj) => JSON.parse(JSON.stringify(obj)),

  isEmpty: (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  },

  getQueryParams: (search = window.location.search) => {
    const params = new URLSearchParams(search);
    const result = {};
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  },

  buildQueryString: (params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          value.forEach((v) => searchParams.append(key, v));
        } else {
          searchParams.set(key, value);
        }
      }
    });
    return searchParams.toString();
  },

  formatBytes: (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },

  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  classNames: (...classes) => classes.filter(Boolean).join(' '),
};