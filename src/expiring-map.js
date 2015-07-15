export default class ExpiringMap {
  constructor(timeoutInMillis, expirationCallback) {
    this._timeoutInMillis = timeoutInMillis;
    this._expirationCallback = expirationCallback;

    this._map = new Map();
  }

  set(key, value) {
    this._map.set(key, value);
    setTimeout(() => {
      const nowValue = this._map.get(key);

      if (!nowValue || nowValue != value) {
        return;
      }

      if (this._expirationCallback) {
        this._expirationCallback(nowValue);
      }
    }, this._timeoutInMillis);
  }

  remove(key) {
    const value = this._map.get(key);
    if (value) {
      this._map.delete(key);
    }
    return value;
  }

  removeAll() {
    const values = new Set(this.map.values());
    this._map.clear();
    return values;
  }
}