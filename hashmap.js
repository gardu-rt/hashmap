class HashMap {
  constructor() {
    this.size = 16;
    this.array = Array.from({ length: this.size }, () => []);
    this.capacity = 0;
    this.loadFactor = 0.75;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
    }

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);
    const bucket = this.array[hashCode];

    if (bucket.length === 0) {
      bucket.push([key, value]);
      this.capacity++;
      return;
    }

    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.capacity++;
    if (this.capacity / this.size > this.loadFactor) this.growth();
  }

  get(key) {
    const hashCode = this.hash(key);
    const bucket = this.array[hashCode];

    for (const [keyy, value] of bucket) {
      if (key === keyy) return value;
    }

    return null;
  }

  has(key) {
    const hashCode = this.hash(key);
    const bucket = this.array[hashCode];

    for (const pair of bucket) {
      if (key === pair[0]) return true;
    }

    return false;
  }

  remove(key) {
    const hashCode = this.hash(key);
    const bucket = this.array[hashCode];
    let newSize = this.size;
    if (this.size > 16) newSize = this.size / 2;

    for (let i = 0; i < bucket.length; i++) {
      if (key === bucket[i][0]) {
        bucket.splice(i, 1);
        this.capacity--;
        if (this.capacity / newSize <= this.loadFactor) {
          this.shrink();
        }
      }
    }
  }

  clear() {
    this.array = Array.from({ length: 16 }, () => []);
  }

  keys() {
    const result = [];

    for (const [key, _] of this.entries()) {
      result.push(key);
    }

    return result;
  }

  entries() {
    const result = [];

    for (const bucket of this.array) {
      if (bucket.length > 0) {
        for (const pair of bucket) {
          result.push(pair);
        }
      }
    }

    return result;
  }

  values() {
    const result = [];

    for (const [_, values] of this.entries()) {
      result.push(values);
    }

    return result;
  }

  growth() {
    const newEntries = this.entries();
    this.size *= 2;
    this.array = Array.from({ length: this.size }, () => []);

    for (const [key, value] of newEntries) {
      const hashCode = this.hash(key);
      const bucket = this.array[hashCode];
      bucket.push([key, value]);
    }
  }

  shrink() {
    const newEntries = this.entries();
    this.size = this.size / 2;
    this.array = Array.from({ length: this.size }, () => []);

    for (const [key, value] of newEntries) {
      const hashCode = this.hash(key);
      const bucket = this.array[hashCode];
      bucket.push([key, value]);
    }
  }
}

const test = new HashMap(); // or HashMap() if using a factory

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");

test.remove("ice cream");
console.log(test);
// console.log(test.entries());
// console.log(test.keys());
// console.log(test.values());
