// Copyright (c) MazeXP. All rights reserved. Licensed under the MIT license. See LICENSE file in the project root for full license information.
const shortAnchorCommon = require("./ShortAnchor.common.js");

/**
 * Build a dictionary to map UIDs to ID anchors.
 * @param {*} model The ManagedReference model.
 * @returns The build dictionary of bookmarks.
 */
function getBookmarks(model) {
    if (!model || !model.type || model.type.toLowerCase() === "namespace") {
        return null;
    }

    const perNameCounter = {};

    const bookmarks = {};

    if (model.children) {
        model.children.forEach(function (item) {
            bookmarks[item.uid] = shortAnchorCommon.generateId(perNameCounter, item.uid, model.uid);

            if (item.overload && item.overload.uid) {
                bookmarks[item.overload.uid] = shortAnchorCommon.generateId(perNameCounter, item.overload.uid, model.uid);
            }
        });
    }

    // Reference's first level bookmark should have no anchor
    bookmarks[model.uid] = "";

    return bookmarks;
}

exports.getOptions = function (model) {
    return {
        bookmarks: getBookmarks(model),
    };
};
