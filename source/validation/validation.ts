export function isOfClass<T>(
    x: unknown,
    y: T,
    options = { print: false, obj_name: "x", add_missing_fields: false }
): boolean {
    if (x == null) {  // handles both undefined and null
        if (x === y) return true;  // check strict equality
        if (options.print) {
            console.warn("WARNING: ", options.obj_name, "Failed the type check");
        }
        return false;
    }

    if (typeof x !== "object" || x === null) {
        if (typeof x === typeof y) return true;
        if (options.print) {
            console.warn("WARNING: ", options.obj_name, "Failed the type check");
        }
        return false;
    }

    // Shallow comparison of keys
    for (const key of Object.keys(y as any)) {
        if (!(key in x)) {
            if (options.print) {
                console.warn("WARNING: ", options.obj_name, "Failed the type check");
                if (options.add_missing_fields) {
                    console.warn("WARNING: Creating new field", key, "in", options.obj_name);
                    (x as any)[key] = (y as any)[key];
                    return true;
                }
            }
            return false;
        }
    }
    return true;
}

export function isOfClassDeep<T>(
    x: unknown,
    y: T,
    options = { print: false, obj_name: "x", add_missing_fields: false }
): boolean {
    if (x == null) {  // handles both undefined and null
        if (x === y) return true;  // check strict equality
        if (options.print) {
            console.warn("WARNING: ", options.obj_name, "Failed the type check");
        }
        return false;
    }

    if (typeof x !== "object" || x === null) {
        if (typeof x === typeof y) return true;
        if (options.print) {
            console.warn("WARNING: ", options.obj_name, "Failed the type check");
        }
        return false;
    }

    for (const key of Object.keys(y as any)) {
        if (!(key in x)) {
            if (options.print) {
                console.warn("WARNING: ", options.obj_name, "Failed the type check");
                if (options.add_missing_fields) {
                    if (options.print)
                        console.warn("WARNING: Creating new field", key, "in", options.obj_name);
                    (x as any)[key] = (y as any)[key];
                    continue;
                }
            }
            return false;
        }

        // Deep check for nested objects
        if (!isOfClassDeep((x as any)[key], (y as any)[key], {
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
