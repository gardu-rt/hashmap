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

    if (this.capacity / this.size >= this.loadFactor) {
      this.size *= 2;
    }
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

    for (let i = 0; i < bucket.length; i++) {
      if (key === bucket[i][0]) {
        return bucket.splice(i, 1);
      }
    }
  }
}

const map = new HashMap();
map.set("cat", 4);
map.set("tac", 5);
map.set("cat", 10);

console.log(map.remove("tac"));
console.log(map);
