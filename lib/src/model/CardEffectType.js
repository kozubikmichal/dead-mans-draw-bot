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
* Enum class CardEffectType.
* @enum {}
* @readonly
*/
export default class CardEffectType {
    
        /**
         * value: "Oracle"
         * @const
         */
        "Oracle" = "Oracle";

    
        /**
         * value: "Hook"
         * @const
         */
        "Hook" = "Hook";

    
        /**
         * value: "Cannon"
         * @const
         */
        "Cannon" = "Cannon";

    
        /**
         * value: "Sword"
         * @const
         */
        "Sword" = "Sword";

    
        /**
         * value: "Map"
         * @const
         */
        "Map" = "Map";

    
        /**
         * value: "Kraken"
         * @const
         */
        "Kraken" = "Kraken";

    

    /**
    * Returns a <code>CardEffectType</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/CardEffectType} The enum <code>CardEffectType</code> value.
    */
    static constructFromObject(object) {
        return object;
    }
}

