"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOfClass = isOfClass;
exports.isOfClassDeep = isOfClassDeep;
function isOfClass(x, y, options = { print: false, obj_name: "x", add_missing_fields: false }) {
    if (x == null) { // handles both undefined and null
        if (x === y)
            return true; // check strict equality
        if (options.print) {
            console.warn("WARNING: ", options.obj_name, "Failed the type check");
        }
        return false;
    }
    if (typeof x !== "object" || x === null) {
        if (typeof x === typeof y)
            return true;
        if (options.print) {
            console.warn("WARNING: ", options.obj_name, "Failed the type check");
        }
        return false;
    }
    // Shallow comparison of keys
    for (const key of Object.keys(y)) {
        if (!(key in x)) {
            if (options.print) {
                console.warn("WARNING: ", options.obj_name, "Failed the type check");
                if (options.add_missing_fields) {
                    console.warn("WARNING: Creating new field", key, "in", options.obj_name);
                    x[key] = y[key];
                    return true;
                }
            }
            return false;
        }
    }
    return true;
}
function isOfClassDeep(x, y, options = { print: false, obj_name: "x", add_missing_fields: false }) {
    if (x == null) { // handles both undefined and null
        if (x === y)
            return true; // check strict equality
        if (options.print) {
            console.warn("WARNING: ", options.obj_name, "Failed the type check");
        }
        return false;
    }
    if (typeof x !== "object" || x === null) {
        if (typeof x === typeof y)
            return true;
        if (options.print) {
            console.warn("WARNING: ", options.obj_name, "Failed the type check");
        }
        return false;
    }
    for (const key of Object.keys(y)) {
        if (!(key in x)) {
            if (options.print) {
                console.warn("WARNING: ", options.obj_name, "Failed the type check");
                if (options.add_missing_fields) {
                    if (options.print)
                        console.warn("WARNING: Creating new field", key, "in", options.obj_name);
                    x[key] = y[key];
                    continue;
                }
            }
            return false;
        }
        // Deep check for nested objects
        if (!isOfClassDeep(x[key], y[key], {
            print: options.print,
            obj_name: options.obj_name + "." + key,
            add_missing_fields: options.add_missing_fields,
        })) {
            if (options.print) {
                console.warn("WARNING: ", options.obj_name, "Failed");
            }
            return false;
        }
    }
    return true;
}
