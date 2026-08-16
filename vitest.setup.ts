// ResizeObserver polyfill for jsdom (required by Recharts ResponsiveContainer)
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// localStorage mock for tests
interface LocalStorageMock {
  _store: Record<string, string>;
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
  _getStore(): Record<string, string>;
}

const localStorageMock: LocalStorageMock = {
  _store: {},
  getItem(key: string) {
    return this._store[key] || null;
  },
  setItem(key: string, value: string) {
    this._store[key] = value.toString();
  },
  removeItem(key: string) {
    delete this._store[key];
  },
  clear() {
    this._store = {};
  },
  _getStore() {
    return this._store;
  },
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

export { localStorageMock };