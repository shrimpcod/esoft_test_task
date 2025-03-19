function deepCopy(obj, hash = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj;

    if(obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if(hash.has(obj)) return hash.get(obj);

    if (obj instanceof Map){
        const result = new Map();
        hash.set(obj, result);
        obj.forEach((value, key) => {
            result.set(key, deepCopy(value, hash));
        });
        return result;
    }

    if (obj instanceof Set){
        const result = new Set();
        hash.set(obj, result);
        obj.forEach(value => {
            result.add(deepCopy(value, hash));
        });
        return result;
    }

    if (Array.isArray(obj)) {
        const result = new Array();
        hash.set(obj, result);
        obj.forEach((item, index) => {
            result[index] = deepCopy(item, hash);
        })
        return result;
    }

    const result = Object.create(Object.getPrototypeOf(obj));
    hash.set(obj, result);
    Reflect.ownKeys(obj).forEach(key => {
        result[key] = deepCopy(obj[key], hash);
    })
    return result;
}

/*
const kitchenSink = {
    set: new Set([1, 3, 3]),
    map: new Map([[1, 2]]),
    regex: /foo/,
    error: new Error('Hello!')
}
const copyObj = deepCopy(kitchenSink);

console.log(kitchenSink);
console.log(copyObj);

copyObj.map = new Map([[1, 4], [2, 1]] );

console.log(kitchenSink);
console.log(copyObj);*/
