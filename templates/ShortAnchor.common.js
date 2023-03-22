// Copyright (c) MazeXP. All rights reserved. Licensed under the MIT license. See LICENSE file in the project root for full license information.
const common = require("./common.js");

exports.generateId = generateId;

/**
 * Generates the ID based on the UID.
 * Steps:
 *  - Strip FullName from UID
 *  - Hash signature
 * @param {*} perNameCounter Dictionary containing previous index if method name has occured.
 * @param {*} uid The UID of the item
 * @param {*} fullName The fullname of the model.
 * @returns The generated ID.
 */
function generateId(perNameCounter, uid, fullName) {
    if (!uid) {
        return "";
    }

    let normalized = uid.replace(fullName + ".", "");

    const braceStart = normalized.indexOf("(");
    if (braceStart === -1) {
        return common.getHtmlId(normalized);
    }

    const name = normalized.substring(0, braceStart);
    
    let index = 0;
    if (name in perNameCounter) {
        index = perNameCounter[name];
    }

    index++;
    perNameCounter[name] = index;

    return common.getHtmlId(name) + "_" + index;
}
