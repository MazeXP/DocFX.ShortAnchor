// Copyright (c) MazeXP. All rights reserved. Licensed under the MIT license. See LICENSE file in the project root for full license information.
const shortAnchorCommon = require("./ShortAnchor.common.js");

/**
 * Transforms every children of the model by generating
 * an ID used for anchors.
 * 
 * @param {*} model 
 * @returns 
 */
exports.preTransform = function (model) {
    const perNameCounter = {};

    model.children.forEach(function (item) {
        item.anchor_id = shortAnchorCommon.generateId(perNameCounter, item.uid, model.uid);

        if (item.overload && item.overload.uid) {
            item.overload.anchor_id = shortAnchorCommon.generateId(item.overload.uid, model.uid);
        }
    });

    return model;
}

/**
 * Transform children of children of the models to shorten the generated ID
 * used for xrefs/bookmarks/anchors.
 * @param {*} model The ManagedReference model.
 * @returns The transformed ManagedReference model.
 */
exports.postTransform = function (model) {
    if (!model.children) {
        return model;
    }

    for (let category of model.children) {
        if (!category.children) {
            continue;
        }

        for (let item of category.children) {
            item.id = item.anchor_id;
    
            if (item.overload && item.overload.anchor_id) {
                item.overload.id = item.overload.anchor_id;
            }
        }
    }

    return model;
}
