/**
 * SLCEE-2023-PC Arena
 * **SAP Labs CEE Hub Programming Competition 2023 Arena server**.  You can find more information about the game and the competititon rules at [github/SLCEE-2023-PC-public](https://github.com/afarago/SLCEE-2023-PC-public).   For a test run, you can use the crash test dummy user `000000000000000000000000/dummypass`.   *Note: All the APIs expect and return application/json*.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: DL SLCEE 2023 PC <DL_637A3F6466D808029A65636A@global.corp.sap>
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The DeleteMatchRequest model module.
 * @module model/DeleteMatchRequest
 * @version 1.0.0
 */
class DeleteMatchRequest {
    /**
     * Constructs a new <code>DeleteMatchRequest</code>.
     * @alias module:model/DeleteMatchRequest
     * @param winnerId {String} Stringified Object Id.
     */
    constructor(winnerId) { 
        
        DeleteMatchRequest.initialize(this, winnerId);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, winnerId) { 
        obj['winnerId'] = winnerId;
    }

    /**
     * Constructs a <code>DeleteMatchRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DeleteMatchRequest} obj Optional instance to populate.
     * @return {module:model/DeleteMatchRequest} The populated <code>DeleteMatchRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DeleteMatchRequest();

            if (data.hasOwnProperty('comment')) {
                obj['comment'] = ApiClient.convertToType(data['comment'], 'String');
            }
            if (data.hasOwnProperty('winnerId')) {
                obj['winnerId'] = ApiClient.convertToType(data['winnerId'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>DeleteMatchRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>DeleteMatchRequest</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of DeleteMatchRequest.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['comment'] && !(typeof data['comment'] === 'string' || data['comment'] instanceof String)) {
            throw new Error("Expected the field `comment` to be a primitive type in the JSON string but got " + data['comment']);
        }
        // ensure the json data is a string
        if (data['winnerId'] && !(typeof data['winnerId'] === 'string' || data['winnerId'] instanceof String)) {
            throw new Error("Expected the field `winnerId` to be a primitive type in the JSON string but got " + data['winnerId']);
        }

        return true;
    }


}

DeleteMatchRequest.RequiredProperties = ["winnerId"];

/**
 * @member {String} comment
 */
DeleteMatchRequest.prototype['comment'] = undefined;

/**
 * Stringified Object Id.
 * @member {String} winnerId
 */
DeleteMatchRequest.prototype['winnerId'] = undefined;






export default DeleteMatchRequest;

