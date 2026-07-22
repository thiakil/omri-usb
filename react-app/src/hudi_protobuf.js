/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
const $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $TypeError = $util.global.TypeError, $String = $util.global.String, $Array = $util.global.Array, $Boolean = $util.global.Boolean;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const hudiy = $root.hudiy = (() => {

    /**
     * Namespace hudiy.
     * @exports hudiy
     * @namespace
     */
    const hudiy = {};

    hudiy.app = (function() {

        /**
         * Namespace app.
         * @memberof hudiy
         * @namespace
         */
        const app = {};

        app.api = (function() {

            /**
             * Namespace api.
             * @memberof hudiy.app
             * @namespace
             */
            const api = {};

            /**
             * Constants enum.
             * @name hudiy.app.api.Constants
             * @enum {number}
             * @property {number} API_MAJOR_VERSION=1 API_MAJOR_VERSION value
             * @property {number} API_MINOR_VERSION=3 API_MINOR_VERSION value
             */
            api.Constants = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[1] = "API_MAJOR_VERSION"] = 1;
                values[valuesById[3] = "API_MINOR_VERSION"] = 3;
                return values;
            })();

            /**
             * MessageType enum.
             * @name hudiy.app.api.MessageType
             * @enum {number}
             * @property {number} MESSAGE_INVALID_ID=0 MESSAGE_INVALID_ID value
             * @property {number} MESSAGE_HELLO_REQUEST=1 MESSAGE_HELLO_REQUEST value
             * @property {number} MESSAGE_HELLO_RESPONSE=2 MESSAGE_HELLO_RESPONSE value
             * @property {number} MESSAGE_SET_STATUS_SUBSCRIPTIONS=3 MESSAGE_SET_STATUS_SUBSCRIPTIONS value
             * @property {number} MESSAGE_SET_REVERSE_CAMERA_STATUS=4 MESSAGE_SET_REVERSE_CAMERA_STATUS value
             * @property {number} MESSAGE_PROJECTION_STATUS=5 MESSAGE_PROJECTION_STATUS value
             * @property {number} MESSAGE_MEDIA_STATUS=6 MESSAGE_MEDIA_STATUS value
             * @property {number} MESSAGE_MEDIA_METADATA=7 MESSAGE_MEDIA_METADATA value
             * @property {number} MESSAGE_NAVIGATION_STATUS=8 MESSAGE_NAVIGATION_STATUS value
             * @property {number} MESSAGE_NAVIGATION_MANEUVER_DETAILS=9 MESSAGE_NAVIGATION_MANEUVER_DETAILS value
             * @property {number} MESSAGE_NAVIGATION_MANEUVER_DISTANCE=10 MESSAGE_NAVIGATION_MANEUVER_DISTANCE value
             * @property {number} MESSAGE_REGISTER_STATUS_ICON_REQUEST=11 MESSAGE_REGISTER_STATUS_ICON_REQUEST value
             * @property {number} MESSAGE_REGISTER_STATUS_ICON_RESPONSE=12 MESSAGE_REGISTER_STATUS_ICON_RESPONSE value
             * @property {number} MESSAGE_UNREGISTER_STATUS_ICON=13 MESSAGE_UNREGISTER_STATUS_ICON value
             * @property {number} MESSAGE_CHANGE_STATUS_ICON_STATE=14 MESSAGE_CHANGE_STATUS_ICON_STATE value
             * @property {number} MESSAGE_REGISTER_NOTIFICATION_CHANNEL_REQUEST=15 MESSAGE_REGISTER_NOTIFICATION_CHANNEL_REQUEST value
             * @property {number} MESSAGE_REGISTER_NOTIFICATION_CHANNEL_RESPONSE=16 MESSAGE_REGISTER_NOTIFICATION_CHANNEL_RESPONSE value
             * @property {number} MESSAGE_UNREGISTER_NOTIFICATION_CHANNEL=17 MESSAGE_UNREGISTER_NOTIFICATION_CHANNEL value
             * @property {number} MESSAGE_SHOW_NOTIFICATION=18 MESSAGE_SHOW_NOTIFICATION value
             * @property {number} MESSAGE_REGISTER_TOAST_CHANNEL_REQUEST=19 MESSAGE_REGISTER_TOAST_CHANNEL_REQUEST value
             * @property {number} MESSAGE_REGISTER_TOAST_CHANNEL_RESPONSE=20 MESSAGE_REGISTER_TOAST_CHANNEL_RESPONSE value
             * @property {number} MESSAGE_UNREGISTER_TOAST_CHANNEL=21 MESSAGE_UNREGISTER_TOAST_CHANNEL value
             * @property {number} MESSAGE_SHOW_TOAST=22 MESSAGE_SHOW_TOAST value
             * @property {number} MESSAGE_OBD_CONNECTION_STATUS=23 MESSAGE_OBD_CONNECTION_STATUS value
             * @property {number} MESSAGE_QUERY_OBD_DEVICE_REQUEST=24 MESSAGE_QUERY_OBD_DEVICE_REQUEST value
             * @property {number} MESSAGE_QUERY_OBD_DEVICE_RESPONSE=25 MESSAGE_QUERY_OBD_DEVICE_RESPONSE value
             * @property {number} MESSAGE_REGISTER_AUDIO_FOCUS_RECEIVER_REQUEST=26 MESSAGE_REGISTER_AUDIO_FOCUS_RECEIVER_REQUEST value
             * @property {number} MESSAGE_REGISTER_AUDIO_FOCUS_RECEIVER_RESPONSE=27 MESSAGE_REGISTER_AUDIO_FOCUS_RECEIVER_RESPONSE value
             * @property {number} MESSAGE_UNREGISTER_AUDIO_FOCUS_RECEIVER=28 MESSAGE_UNREGISTER_AUDIO_FOCUS_RECEIVER value
             * @property {number} MESSAGE_AUDIO_FOCUS_CHANGE_REQUEST=29 MESSAGE_AUDIO_FOCUS_CHANGE_REQUEST value
             * @property {number} MESSAGE_AUDIO_FOCUS_CHANGE_RESPONSE=30 MESSAGE_AUDIO_FOCUS_CHANGE_RESPONSE value
             * @property {number} MESSAGE_AUDIO_FOCUS_ACTION=31 MESSAGE_AUDIO_FOCUS_ACTION value
             * @property {number} MESSAGE_AUDIO_FOCUS_MEDIA_KEY=32 MESSAGE_AUDIO_FOCUS_MEDIA_KEY value
             * @property {number} MESSAGE_PHONE_CONNECTION_STATUS=33 MESSAGE_PHONE_CONNECTION_STATUS value
             * @property {number} MESSAGE_PHONE_VOICE_CALL_STATUS=34 MESSAGE_PHONE_VOICE_CALL_STATUS value
             * @property {number} MESSAGE_PHONE_LEVELS_STATUS=35 MESSAGE_PHONE_LEVELS_STATUS value
             * @property {number} MESSAGE_KEY_EVENT=36 MESSAGE_KEY_EVENT value
             * @property {number} MESSAGE_SET_DARK_MODE=37 MESSAGE_SET_DARK_MODE value
             * @property {number} MESSAGE_SET_CUSTOM_OVERLAY_VISIBILITY=38 MESSAGE_SET_CUSTOM_OVERLAY_VISIBILITY value
             * @property {number} MESSAGE_SET_NAVIGATION_OVERLAY_VISIBILITY=39 MESSAGE_SET_NAVIGATION_OVERLAY_VISIBILITY value
             * @property {number} MESSAGE_SET_VOLUME_OVERLAY_VISIBILITY=40 MESSAGE_SET_VOLUME_OVERLAY_VISIBILITY value
             * @property {number} MESSAGE_REGISTER_ACTION_REQUEST=41 MESSAGE_REGISTER_ACTION_REQUEST value
             * @property {number} MESSAGE_REGISTER_ACTION_RESPONSE=42 MESSAGE_REGISTER_ACTION_RESPONSE value
             * @property {number} MESSAGE_DISPATCH_ACTION=43 MESSAGE_DISPATCH_ACTION value
             * @property {number} MESSAGE_SET_EQUALIZER_PRESET=44 MESSAGE_SET_EQUALIZER_PRESET value
             * @property {number} MESSAGE_COVERART_REQUEST=45 MESSAGE_COVERART_REQUEST value
             * @property {number} MESSAGE_COVERART_RESPONSE=46 MESSAGE_COVERART_RESPONSE value
             * @property {number} MESSAGE_PING=47 MESSAGE_PING value
             * @property {number} MESSAGE_PONG=48 MESSAGE_PONG value
             * @property {number} MESSAGE_BYEBYE=49 MESSAGE_BYEBYE value
             * @property {number} MESSAGE_SET_ANDROID_AUTO_DAY_NIGHT_MODE=50 MESSAGE_SET_ANDROID_AUTO_DAY_NIGHT_MODE value
             * @property {number} MESSAGE_SET_AUTOBOX_DAY_NIGHT_MODE=51 MESSAGE_SET_AUTOBOX_DAY_NIGHT_MODE value
             * @property {number} MESSAGE_CURRENT_MENU_ACTION=52 MESSAGE_CURRENT_MENU_ACTION value
             * @property {number} MESSAGE_SET_BASS_TREBLE_BOOST=53 MESSAGE_SET_BASS_TREBLE_BOOST value
             */
            api.MessageType = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "MESSAGE_INVALID_ID"] = 0;
                values[valuesById[1] = "MESSAGE_HELLO_REQUEST"] = 1;
                values[valuesById[2] = "MESSAGE_HELLO_RESPONSE"] = 2;
                values[valuesById[3] = "MESSAGE_SET_STATUS_SUBSCRIPTIONS"] = 3;
                values[valuesById[4] = "MESSAGE_SET_REVERSE_CAMERA_STATUS"] = 4;
                values[valuesById[5] = "MESSAGE_PROJECTION_STATUS"] = 5;
                values[valuesById[6] = "MESSAGE_MEDIA_STATUS"] = 6;
                values[valuesById[7] = "MESSAGE_MEDIA_METADATA"] = 7;
                values[valuesById[8] = "MESSAGE_NAVIGATION_STATUS"] = 8;
                values[valuesById[9] = "MESSAGE_NAVIGATION_MANEUVER_DETAILS"] = 9;
                values[valuesById[10] = "MESSAGE_NAVIGATION_MANEUVER_DISTANCE"] = 10;
                values[valuesById[11] = "MESSAGE_REGISTER_STATUS_ICON_REQUEST"] = 11;
                values[valuesById[12] = "MESSAGE_REGISTER_STATUS_ICON_RESPONSE"] = 12;
                values[valuesById[13] = "MESSAGE_UNREGISTER_STATUS_ICON"] = 13;
                values[valuesById[14] = "MESSAGE_CHANGE_STATUS_ICON_STATE"] = 14;
                values[valuesById[15] = "MESSAGE_REGISTER_NOTIFICATION_CHANNEL_REQUEST"] = 15;
                values[valuesById[16] = "MESSAGE_REGISTER_NOTIFICATION_CHANNEL_RESPONSE"] = 16;
                values[valuesById[17] = "MESSAGE_UNREGISTER_NOTIFICATION_CHANNEL"] = 17;
                values[valuesById[18] = "MESSAGE_SHOW_NOTIFICATION"] = 18;
                values[valuesById[19] = "MESSAGE_REGISTER_TOAST_CHANNEL_REQUEST"] = 19;
                values[valuesById[20] = "MESSAGE_REGISTER_TOAST_CHANNEL_RESPONSE"] = 20;
                values[valuesById[21] = "MESSAGE_UNREGISTER_TOAST_CHANNEL"] = 21;
                values[valuesById[22] = "MESSAGE_SHOW_TOAST"] = 22;
                values[valuesById[23] = "MESSAGE_OBD_CONNECTION_STATUS"] = 23;
                values[valuesById[24] = "MESSAGE_QUERY_OBD_DEVICE_REQUEST"] = 24;
                values[valuesById[25] = "MESSAGE_QUERY_OBD_DEVICE_RESPONSE"] = 25;
                values[valuesById[26] = "MESSAGE_REGISTER_AUDIO_FOCUS_RECEIVER_REQUEST"] = 26;
                values[valuesById[27] = "MESSAGE_REGISTER_AUDIO_FOCUS_RECEIVER_RESPONSE"] = 27;
                values[valuesById[28] = "MESSAGE_UNREGISTER_AUDIO_FOCUS_RECEIVER"] = 28;
                values[valuesById[29] = "MESSAGE_AUDIO_FOCUS_CHANGE_REQUEST"] = 29;
                values[valuesById[30] = "MESSAGE_AUDIO_FOCUS_CHANGE_RESPONSE"] = 30;
                values[valuesById[31] = "MESSAGE_AUDIO_FOCUS_ACTION"] = 31;
                values[valuesById[32] = "MESSAGE_AUDIO_FOCUS_MEDIA_KEY"] = 32;
                values[valuesById[33] = "MESSAGE_PHONE_CONNECTION_STATUS"] = 33;
                values[valuesById[34] = "MESSAGE_PHONE_VOICE_CALL_STATUS"] = 34;
                values[valuesById[35] = "MESSAGE_PHONE_LEVELS_STATUS"] = 35;
                values[valuesById[36] = "MESSAGE_KEY_EVENT"] = 36;
                values[valuesById[37] = "MESSAGE_SET_DARK_MODE"] = 37;
                values[valuesById[38] = "MESSAGE_SET_CUSTOM_OVERLAY_VISIBILITY"] = 38;
                values[valuesById[39] = "MESSAGE_SET_NAVIGATION_OVERLAY_VISIBILITY"] = 39;
                values[valuesById[40] = "MESSAGE_SET_VOLUME_OVERLAY_VISIBILITY"] = 40;
                values[valuesById[41] = "MESSAGE_REGISTER_ACTION_REQUEST"] = 41;
                values[valuesById[42] = "MESSAGE_REGISTER_ACTION_RESPONSE"] = 42;
                values[valuesById[43] = "MESSAGE_DISPATCH_ACTION"] = 43;
                values[valuesById[44] = "MESSAGE_SET_EQUALIZER_PRESET"] = 44;
                values[valuesById[45] = "MESSAGE_COVERART_REQUEST"] = 45;
                values[valuesById[46] = "MESSAGE_COVERART_RESPONSE"] = 46;
                values[valuesById[47] = "MESSAGE_PING"] = 47;
                values[valuesById[48] = "MESSAGE_PONG"] = 48;
                values[valuesById[49] = "MESSAGE_BYEBYE"] = 49;
                values[valuesById[50] = "MESSAGE_SET_ANDROID_AUTO_DAY_NIGHT_MODE"] = 50;
                values[valuesById[51] = "MESSAGE_SET_AUTOBOX_DAY_NIGHT_MODE"] = 51;
                values[valuesById[52] = "MESSAGE_CURRENT_MENU_ACTION"] = 52;
                values[valuesById[53] = "MESSAGE_SET_BASS_TREBLE_BOOST"] = 53;
                return values;
            })();

            api.Version = (function() {

                /**
                 * Properties of a Version.
                 * @typedef {Object} hudiy.app.api.Version.$Properties
                 * @property {number} major Version major
                 * @property {number} minor Version minor
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a Version.
                 * @memberof hudiy.app.api
                 * @interface IVersion
                 * @augments hudiy.app.api.Version.$Properties
                 * @deprecated Use hudiy.app.api.Version.$Properties instead.
                 */

                /**
                 * Shape of a Version.
                 * @typedef {hudiy.app.api.Version.$Properties} hudiy.app.api.Version.$Shape
                 */

                /**
                 * Constructs a new Version.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a Version.
                 * @constructor
                 * @param {hudiy.app.api.Version.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const Version = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * Version major.
                 * @member {number} major
                 * @memberof hudiy.app.api.Version
                 * @instance
                 */
                Version.prototype.major = 0;

                /**
                 * Version minor.
                 * @member {number} minor
                 * @memberof hudiy.app.api.Version
                 * @instance
                 */
                Version.prototype.minor = 0;

                /**
                 * Creates a new Version instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.Version
                 * @static
                 * @param {hudiy.app.api.Version.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.Version} Version instance
                 * @type {{
                 *   (properties: hudiy.app.api.Version.$Shape): hudiy.app.api.Version & hudiy.app.api.Version.$Shape;
                 *   (properties?: hudiy.app.api.Version.$Properties): hudiy.app.api.Version;
                 * }}
                 */
                Version.create = function(properties) {
                    return new Version(properties);
                };

                /**
                 * Encodes the specified Version message. Does not implicitly {@link hudiy.app.api.Version.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.Version
                 * @static
                 * @param {hudiy.app.api.Version.$Properties} message Version message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Version.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.major);
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.minor);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified Version message, length delimited. Does not implicitly {@link hudiy.app.api.Version.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.Version
                 * @static
                 * @param {hudiy.app.api.Version.$Properties} message Version message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Version.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a Version message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.Version
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.Version & hudiy.app.api.Version.$Shape} Version
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Version.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.Version();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.major = reader.int32();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                message.minor = reader.int32();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "major"))
                        throw $util.ProtocolError("missing required 'major'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "minor"))
                        throw $util.ProtocolError("missing required 'minor'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a Version message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.Version
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.Version & hudiy.app.api.Version.$Shape} Version
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Version.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Version message.
                 * @function verify
                 * @memberof hudiy.app.api.Version
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Version.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isInteger(message.major))
                        return "major: integer expected";
                    if (!$util.isInteger(message.minor))
                        return "minor: integer expected";
                    return null;
                };

                /**
                 * Creates a Version message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.Version
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.Version} Version
                 */
                Version.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.Version)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.Version: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.Version();
                    if (object.major != null)
                        message.major = object.major | 0;
                    if (object.minor != null)
                        message.minor = object.minor | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a Version message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.Version
                 * @static
                 * @param {hudiy.app.api.Version} message Version
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Version.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.major = 0;
                        object.minor = 0;
                    }
                    if (message.major != null && $Object.hasOwnProperty.call(message, "major"))
                        object.major = message.major;
                    if (message.minor != null && $Object.hasOwnProperty.call(message, "minor"))
                        object.minor = message.minor;
                    return object;
                };

                /**
                 * Converts this Version to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.Version
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Version.prototype.toJSON = function() {
                    return Version.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for Version
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.Version
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                Version.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.Version";
                };

                return Version;
            })();

            api.HelloRequest = (function() {

                /**
                 * Properties of a HelloRequest.
                 * @typedef {Object} hudiy.app.api.HelloRequest.$Properties
                 * @property {string} name HelloRequest name
                 * @property {hudiy.app.api.Version.$Properties} apiVersion HelloRequest apiVersion
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a HelloRequest.
                 * @memberof hudiy.app.api
                 * @interface IHelloRequest
                 * @augments hudiy.app.api.HelloRequest.$Properties
                 * @deprecated Use hudiy.app.api.HelloRequest.$Properties instead.
                 */

                /**
                 * Shape of a HelloRequest.
                 * @typedef {hudiy.app.api.HelloRequest.$Properties} hudiy.app.api.HelloRequest.$Shape
                 */

                /**
                 * Constructs a new HelloRequest.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a HelloRequest.
                 * @constructor
                 * @param {hudiy.app.api.HelloRequest.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const HelloRequest = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * HelloRequest name.
                 * @member {string} name
                 * @memberof hudiy.app.api.HelloRequest
                 * @instance
                 */
                HelloRequest.prototype.name = "";

                /**
                 * HelloRequest apiVersion.
                 * @member {hudiy.app.api.Version.$Properties} apiVersion
                 * @memberof hudiy.app.api.HelloRequest
                 * @instance
                 */
                HelloRequest.prototype.apiVersion = null;

                /**
                 * Creates a new HelloRequest instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.HelloRequest
                 * @static
                 * @param {hudiy.app.api.HelloRequest.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.HelloRequest} HelloRequest instance
                 * @type {{
                 *   (properties: hudiy.app.api.HelloRequest.$Shape): hudiy.app.api.HelloRequest & hudiy.app.api.HelloRequest.$Shape;
                 *   (properties?: hudiy.app.api.HelloRequest.$Properties): hudiy.app.api.HelloRequest;
                 * }}
                 */
                HelloRequest.create = function(properties) {
                    return new HelloRequest(properties);
                };

                /**
                 * Encodes the specified HelloRequest message. Does not implicitly {@link hudiy.app.api.HelloRequest.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.HelloRequest
                 * @static
                 * @param {hudiy.app.api.HelloRequest.$Properties} message HelloRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HelloRequest.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                    $root.hudiy.app.api.Version.encode(message.apiVersion, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified HelloRequest message, length delimited. Does not implicitly {@link hudiy.app.api.HelloRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.HelloRequest
                 * @static
                 * @param {hudiy.app.api.HelloRequest.$Properties} message HelloRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HelloRequest.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a HelloRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.HelloRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.HelloRequest & hudiy.app.api.HelloRequest.$Shape} HelloRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HelloRequest.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.HelloRequest();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                message.name = reader.string();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                message.apiVersion = $root.hudiy.app.api.Version.decode(reader, reader.uint32(), $undefined, _depth + 1, message.apiVersion);
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "name"))
                        throw $util.ProtocolError("missing required 'name'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "apiVersion"))
                        throw $util.ProtocolError("missing required 'apiVersion'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a HelloRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.HelloRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.HelloRequest & hudiy.app.api.HelloRequest.$Shape} HelloRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HelloRequest.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a HelloRequest message.
                 * @function verify
                 * @memberof hudiy.app.api.HelloRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                HelloRequest.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isString(message.name))
                        return "name: string expected";
                    {
                        let error = $root.hudiy.app.api.Version.verify(message.apiVersion, _depth + 1);
                        if (error)
                            return "apiVersion." + error;
                    }
                    return null;
                };

                /**
                 * Creates a HelloRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.HelloRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.HelloRequest} HelloRequest
                 */
                HelloRequest.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.HelloRequest)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.HelloRequest: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.HelloRequest();
                    if (object.name != null)
                        message.name = $String(object.name);
                    if (object.apiVersion != null) {
                        if (!$util.isObject(object.apiVersion))
                            throw $TypeError(".hudiy.app.api.HelloRequest.apiVersion: object expected");
                        message.apiVersion = $root.hudiy.app.api.Version.fromObject(object.apiVersion, _depth + 1);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a HelloRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.HelloRequest
                 * @static
                 * @param {hudiy.app.api.HelloRequest} message HelloRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                HelloRequest.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.name = "";
                        object.apiVersion = null;
                    }
                    if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                        object.name = message.name;
                    if (message.apiVersion != null && $Object.hasOwnProperty.call(message, "apiVersion"))
                        object.apiVersion = $root.hudiy.app.api.Version.toObject(message.apiVersion, options, _depth + 1);
                    return object;
                };

                /**
                 * Converts this HelloRequest to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.HelloRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                HelloRequest.prototype.toJSON = function() {
                    return HelloRequest.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for HelloRequest
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.HelloRequest
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                HelloRequest.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.HelloRequest";
                };

                return HelloRequest;
            })();

            api.HelloResponse = (function() {

                /**
                 * Properties of a HelloResponse.
                 * @typedef {Object} hudiy.app.api.HelloResponse.$Properties
                 * @property {hudiy.app.api.Version.$Properties} appVersion HelloResponse appVersion
                 * @property {hudiy.app.api.Version.$Properties} apiVersion HelloResponse apiVersion
                 * @property {hudiy.app.api.HelloResponse.HelloResponseResult} result HelloResponse result
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a HelloResponse.
                 * @memberof hudiy.app.api
                 * @interface IHelloResponse
                 * @augments hudiy.app.api.HelloResponse.$Properties
                 * @deprecated Use hudiy.app.api.HelloResponse.$Properties instead.
                 */

                /**
                 * Shape of a HelloResponse.
                 * @typedef {hudiy.app.api.HelloResponse.$Properties} hudiy.app.api.HelloResponse.$Shape
                 */

                /**
                 * Constructs a new HelloResponse.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a HelloResponse.
                 * @constructor
                 * @param {hudiy.app.api.HelloResponse.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const HelloResponse = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * HelloResponse appVersion.
                 * @member {hudiy.app.api.Version.$Properties} appVersion
                 * @memberof hudiy.app.api.HelloResponse
                 * @instance
                 */
                HelloResponse.prototype.appVersion = null;

                /**
                 * HelloResponse apiVersion.
                 * @member {hudiy.app.api.Version.$Properties} apiVersion
                 * @memberof hudiy.app.api.HelloResponse
                 * @instance
                 */
                HelloResponse.prototype.apiVersion = null;

                /**
                 * HelloResponse result.
                 * @member {hudiy.app.api.HelloResponse.HelloResponseResult} result
                 * @memberof hudiy.app.api.HelloResponse
                 * @instance
                 */
                HelloResponse.prototype.result = 1;

                /**
                 * Creates a new HelloResponse instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.HelloResponse
                 * @static
                 * @param {hudiy.app.api.HelloResponse.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.HelloResponse} HelloResponse instance
                 * @type {{
                 *   (properties: hudiy.app.api.HelloResponse.$Shape): hudiy.app.api.HelloResponse & hudiy.app.api.HelloResponse.$Shape;
                 *   (properties?: hudiy.app.api.HelloResponse.$Properties): hudiy.app.api.HelloResponse;
                 * }}
                 */
                HelloResponse.create = function(properties) {
                    return new HelloResponse(properties);
                };

                /**
                 * Encodes the specified HelloResponse message. Does not implicitly {@link hudiy.app.api.HelloResponse.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.HelloResponse
                 * @static
                 * @param {hudiy.app.api.HelloResponse.$Properties} message HelloResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HelloResponse.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    $root.hudiy.app.api.Version.encode(message.appVersion, writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
                    $root.hudiy.app.api.Version.encode(message.apiVersion, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.result);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified HelloResponse message, length delimited. Does not implicitly {@link hudiy.app.api.HelloResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.HelloResponse
                 * @static
                 * @param {hudiy.app.api.HelloResponse.$Properties} message HelloResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HelloResponse.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a HelloResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.HelloResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.HelloResponse & hudiy.app.api.HelloResponse.$Shape} HelloResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HelloResponse.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.HelloResponse(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                message.appVersion = $root.hudiy.app.api.Version.decode(reader, reader.uint32(), $undefined, _depth + 1, message.appVersion);
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                message.apiVersion = $root.hudiy.app.api.Version.decode(reader, reader.uint32(), $undefined, _depth + 1, message.apiVersion);
                                continue;
                            }
                        case 3: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.HelloResponse.HelloResponseResult[value] !== $undefined)
                                    message.result = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "appVersion"))
                        throw $util.ProtocolError("missing required 'appVersion'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "apiVersion"))
                        throw $util.ProtocolError("missing required 'apiVersion'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "result"))
                        throw $util.ProtocolError("missing required 'result'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a HelloResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.HelloResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.HelloResponse & hudiy.app.api.HelloResponse.$Shape} HelloResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HelloResponse.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a HelloResponse message.
                 * @function verify
                 * @memberof hudiy.app.api.HelloResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                HelloResponse.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    {
                        let error = $root.hudiy.app.api.Version.verify(message.appVersion, _depth + 1);
                        if (error)
                            return "appVersion." + error;
                    }
                    {
                        let error = $root.hudiy.app.api.Version.verify(message.apiVersion, _depth + 1);
                        if (error)
                            return "apiVersion." + error;
                    }
                    switch (message.result) {
                    default:
                        return "result: enum value expected";
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                    return null;
                };

                /**
                 * Creates a HelloResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.HelloResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.HelloResponse} HelloResponse
                 */
                HelloResponse.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.HelloResponse)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.HelloResponse: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.HelloResponse();
                    if (object.appVersion != null) {
                        if (!$util.isObject(object.appVersion))
                            throw $TypeError(".hudiy.app.api.HelloResponse.appVersion: object expected");
                        message.appVersion = $root.hudiy.app.api.Version.fromObject(object.appVersion, _depth + 1);
                    }
                    if (object.apiVersion != null) {
                        if (!$util.isObject(object.apiVersion))
                            throw $TypeError(".hudiy.app.api.HelloResponse.apiVersion: object expected");
                        message.apiVersion = $root.hudiy.app.api.Version.fromObject(object.apiVersion, _depth + 1);
                    }
                    switch (object.result) {
                    case "HELLO_RESPONSE_RESULT_OK":
                    case 1:
                        message.result = 1;
                        break;
                    case "HELLO_RESPONSE_RESULT_VERSION_MISMATCH":
                    case 2:
                        message.result = 2;
                        break;
                    case "HELLO_RESPONSE_RESULT_UNKNOWN_ERROR":
                    case 3:
                        message.result = 3;
                        break;
                    default:
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a HelloResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.HelloResponse
                 * @static
                 * @param {hudiy.app.api.HelloResponse} message HelloResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                HelloResponse.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.appVersion = null;
                        object.apiVersion = null;
                        object.result = options.enums === $String ? "HELLO_RESPONSE_RESULT_OK" : 1;
                    }
                    if (message.appVersion != null && $Object.hasOwnProperty.call(message, "appVersion"))
                        object.appVersion = $root.hudiy.app.api.Version.toObject(message.appVersion, options, _depth + 1);
                    if (message.apiVersion != null && $Object.hasOwnProperty.call(message, "apiVersion"))
                        object.apiVersion = $root.hudiy.app.api.Version.toObject(message.apiVersion, options, _depth + 1);
                    if (message.result != null && $Object.hasOwnProperty.call(message, "result"))
                        object.result = options.enums === $String ? $root.hudiy.app.api.HelloResponse.HelloResponseResult[message.result] === $undefined ? message.result : $root.hudiy.app.api.HelloResponse.HelloResponseResult[message.result] : message.result;
                    return object;
                };

                /**
                 * Converts this HelloResponse to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.HelloResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                HelloResponse.prototype.toJSON = function() {
                    return HelloResponse.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for HelloResponse
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.HelloResponse
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                HelloResponse.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.HelloResponse";
                };

                /**
                 * HelloResponseResult enum.
                 * @name hudiy.app.api.HelloResponse.HelloResponseResult
                 * @enum {number}
                 * @property {number} HELLO_RESPONSE_RESULT_OK=1 HELLO_RESPONSE_RESULT_OK value
                 * @property {number} HELLO_RESPONSE_RESULT_VERSION_MISMATCH=2 HELLO_RESPONSE_RESULT_VERSION_MISMATCH value
                 * @property {number} HELLO_RESPONSE_RESULT_UNKNOWN_ERROR=3 HELLO_RESPONSE_RESULT_UNKNOWN_ERROR value
                 */
                HelloResponse.HelloResponseResult = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "HELLO_RESPONSE_RESULT_OK"] = 1;
                    values[valuesById[2] = "HELLO_RESPONSE_RESULT_VERSION_MISMATCH"] = 2;
                    values[valuesById[3] = "HELLO_RESPONSE_RESULT_UNKNOWN_ERROR"] = 3;
                    return values;
                })();

                return HelloResponse;
            })();

            api.SetStatusSubscriptions = (function() {

                /**
                 * Properties of a SetStatusSubscriptions.
                 * @typedef {Object} hudiy.app.api.SetStatusSubscriptions.$Properties
                 * @property {Array.<hudiy.app.api.SetStatusSubscriptions.Subscription>|null} [subscriptions] SetStatusSubscriptions subscriptions
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a SetStatusSubscriptions.
                 * @memberof hudiy.app.api
                 * @interface ISetStatusSubscriptions
                 * @augments hudiy.app.api.SetStatusSubscriptions.$Properties
                 * @deprecated Use hudiy.app.api.SetStatusSubscriptions.$Properties instead.
                 */

                /**
                 * Shape of a SetStatusSubscriptions.
                 * @typedef {hudiy.app.api.SetStatusSubscriptions.$Properties} hudiy.app.api.SetStatusSubscriptions.$Shape
                 */

                /**
                 * Constructs a new SetStatusSubscriptions.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a SetStatusSubscriptions.
                 * @constructor
                 * @param {hudiy.app.api.SetStatusSubscriptions.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const SetStatusSubscriptions = function (properties) {
                    this.subscriptions = [];
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * SetStatusSubscriptions subscriptions.
                 * @member {Array.<hudiy.app.api.SetStatusSubscriptions.Subscription>} subscriptions
                 * @memberof hudiy.app.api.SetStatusSubscriptions
                 * @instance
                 */
                SetStatusSubscriptions.prototype.subscriptions = $util.emptyArray;

                /**
                 * Creates a new SetStatusSubscriptions instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.SetStatusSubscriptions
                 * @static
                 * @param {hudiy.app.api.SetStatusSubscriptions.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.SetStatusSubscriptions} SetStatusSubscriptions instance
                 * @type {{
                 *   (properties: hudiy.app.api.SetStatusSubscriptions.$Shape): hudiy.app.api.SetStatusSubscriptions & hudiy.app.api.SetStatusSubscriptions.$Shape;
                 *   (properties?: hudiy.app.api.SetStatusSubscriptions.$Properties): hudiy.app.api.SetStatusSubscriptions;
                 * }}
                 */
                SetStatusSubscriptions.create = function(properties) {
                    return new SetStatusSubscriptions(properties);
                };

                /**
                 * Encodes the specified SetStatusSubscriptions message. Does not implicitly {@link hudiy.app.api.SetStatusSubscriptions.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.SetStatusSubscriptions
                 * @static
                 * @param {hudiy.app.api.SetStatusSubscriptions.$Properties} message SetStatusSubscriptions message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetStatusSubscriptions.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    if (message.subscriptions != null && message.subscriptions.length)
                        for (let i = 0; i < message.subscriptions.length; ++i)
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.subscriptions[i]);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified SetStatusSubscriptions message, length delimited. Does not implicitly {@link hudiy.app.api.SetStatusSubscriptions.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.SetStatusSubscriptions
                 * @static
                 * @param {hudiy.app.api.SetStatusSubscriptions.$Properties} message SetStatusSubscriptions message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetStatusSubscriptions.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a SetStatusSubscriptions message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.SetStatusSubscriptions
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetStatusSubscriptions & hudiy.app.api.SetStatusSubscriptions.$Shape} SetStatusSubscriptions
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetStatusSubscriptions.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.SetStatusSubscriptions(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType === 2) {
                                    let end2 = reader.uint32() + reader.pos;
                                    while (reader.pos < end2) {
                                        start = reader.pos;
                                        value = reader.int32();
                                        if ($root.hudiy.app.api.SetStatusSubscriptions.Subscription[value] !== $undefined) {
                                            if (!(message.subscriptions && message.subscriptions.length))
                                                message.subscriptions = [];
                                            message.subscriptions.push(value);
                                        } else if (!reader.discardUnknown) {
                                            $util.makeProp(message, "$unknowns", false);
                                            (message.$unknowns || (message.$unknowns = [])).push($util.rawField(1, 0, reader.raw(start, reader.pos)));
                                        }
                                    }
                                    continue;
                                }
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.SetStatusSubscriptions.Subscription[value] !== $undefined) {
                                    if (!(message.subscriptions && message.subscriptions.length))
                                        message.subscriptions = [];
                                    message.subscriptions.push(value);
                                } else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    return message;
                };

                /**
                 * Decodes a SetStatusSubscriptions message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.SetStatusSubscriptions
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetStatusSubscriptions & hudiy.app.api.SetStatusSubscriptions.$Shape} SetStatusSubscriptions
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetStatusSubscriptions.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SetStatusSubscriptions message.
                 * @function verify
                 * @memberof hudiy.app.api.SetStatusSubscriptions
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SetStatusSubscriptions.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.subscriptions != null && $Object.hasOwnProperty.call(message, "subscriptions")) {
                        if (!$Array.isArray(message.subscriptions))
                            return "subscriptions: array expected";
                        for (let i = 0; i < message.subscriptions.length; ++i)
                            switch (message.subscriptions[i]) {
                            default:
                                return "subscriptions: enum value[] expected";
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                                break;
                            }
                    }
                    return null;
                };

                /**
                 * Creates a SetStatusSubscriptions message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.SetStatusSubscriptions
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.SetStatusSubscriptions} SetStatusSubscriptions
                 */
                SetStatusSubscriptions.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.SetStatusSubscriptions)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.SetStatusSubscriptions: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.SetStatusSubscriptions();
                    if (object.subscriptions) {
                        if (!$Array.isArray(object.subscriptions))
                            throw $TypeError(".hudiy.app.api.SetStatusSubscriptions.subscriptions: array expected");
                        message.subscriptions = [];
                        for (let i = 0; i < object.subscriptions.length; ++i)
                            switch (object.subscriptions[i]) {
                            case "PROJECTION":
                            case 1:
                                message.subscriptions[message.subscriptions.length] = 1;
                                break;
                            case "MEDIA":
                            case 2:
                                message.subscriptions[message.subscriptions.length] = 2;
                                break;
                            case "NAVIGATION":
                            case 3:
                                message.subscriptions[message.subscriptions.length] = 3;
                                break;
                            case "OBD":
                            case 4:
                                message.subscriptions[message.subscriptions.length] = 4;
                                break;
                            case "PHONE":
                            case 5:
                                message.subscriptions[message.subscriptions.length] = 5;
                                break;
                            case "COVERARTS":
                            case 6:
                                message.subscriptions[message.subscriptions.length] = 6;
                                break;
                            case "CURRENT_MENU_ACTION":
                            case 7:
                                message.subscriptions[message.subscriptions.length] = 7;
                                break;
                            default:
                            }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a SetStatusSubscriptions message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.SetStatusSubscriptions
                 * @static
                 * @param {hudiy.app.api.SetStatusSubscriptions} message SetStatusSubscriptions
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SetStatusSubscriptions.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.subscriptions = [];
                    if (message.subscriptions && message.subscriptions.length) {
                        object.subscriptions = $Array(message.subscriptions.length);
                        for (let j = 0; j < message.subscriptions.length; ++j)
                            object.subscriptions[j] = options.enums === $String ? $root.hudiy.app.api.SetStatusSubscriptions.Subscription[message.subscriptions[j]] === $undefined ? message.subscriptions[j] : $root.hudiy.app.api.SetStatusSubscriptions.Subscription[message.subscriptions[j]] : message.subscriptions[j];
                    }
                    return object;
                };

                /**
                 * Converts this SetStatusSubscriptions to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.SetStatusSubscriptions
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SetStatusSubscriptions.prototype.toJSON = function() {
                    return SetStatusSubscriptions.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for SetStatusSubscriptions
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.SetStatusSubscriptions
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                SetStatusSubscriptions.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.SetStatusSubscriptions";
                };

                /**
                 * Subscription enum.
                 * @name hudiy.app.api.SetStatusSubscriptions.Subscription
                 * @enum {number}
                 * @property {number} PROJECTION=1 PROJECTION value
                 * @property {number} MEDIA=2 MEDIA value
                 * @property {number} NAVIGATION=3 NAVIGATION value
                 * @property {number} OBD=4 OBD value
                 * @property {number} PHONE=5 PHONE value
                 * @property {number} COVERARTS=6 COVERARTS value
                 * @property {number} CURRENT_MENU_ACTION=7 CURRENT_MENU_ACTION value
                 */
                SetStatusSubscriptions.Subscription = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "PROJECTION"] = 1;
                    values[valuesById[2] = "MEDIA"] = 2;
                    values[valuesById[3] = "NAVIGATION"] = 3;
                    values[valuesById[4] = "OBD"] = 4;
                    values[valuesById[5] = "PHONE"] = 5;
                    values[valuesById[6] = "COVERARTS"] = 6;
                    values[valuesById[7] = "CURRENT_MENU_ACTION"] = 7;
                    return values;
                })();

                return SetStatusSubscriptions;
            })();

            api.SetReverseCameraStatus = (function() {

                /**
                 * Properties of a SetReverseCameraStatus.
                 * @typedef {Object} hudiy.app.api.SetReverseCameraStatus.$Properties
                 * @property {boolean} visible SetReverseCameraStatus visible
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a SetReverseCameraStatus.
                 * @memberof hudiy.app.api
                 * @interface ISetReverseCameraStatus
                 * @augments hudiy.app.api.SetReverseCameraStatus.$Properties
                 * @deprecated Use hudiy.app.api.SetReverseCameraStatus.$Properties instead.
                 */

                /**
                 * Shape of a SetReverseCameraStatus.
                 * @typedef {hudiy.app.api.SetReverseCameraStatus.$Properties} hudiy.app.api.SetReverseCameraStatus.$Shape
                 */

                /**
                 * Constructs a new SetReverseCameraStatus.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a SetReverseCameraStatus.
                 * @constructor
                 * @param {hudiy.app.api.SetReverseCameraStatus.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const SetReverseCameraStatus = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * SetReverseCameraStatus visible.
                 * @member {boolean} visible
                 * @memberof hudiy.app.api.SetReverseCameraStatus
                 * @instance
                 */
                SetReverseCameraStatus.prototype.visible = false;

                /**
                 * Creates a new SetReverseCameraStatus instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.SetReverseCameraStatus
                 * @static
                 * @param {hudiy.app.api.SetReverseCameraStatus.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.SetReverseCameraStatus} SetReverseCameraStatus instance
                 * @type {{
                 *   (properties: hudiy.app.api.SetReverseCameraStatus.$Shape): hudiy.app.api.SetReverseCameraStatus & hudiy.app.api.SetReverseCameraStatus.$Shape;
                 *   (properties?: hudiy.app.api.SetReverseCameraStatus.$Properties): hudiy.app.api.SetReverseCameraStatus;
                 * }}
                 */
                SetReverseCameraStatus.create = function(properties) {
                    return new SetReverseCameraStatus(properties);
                };

                /**
                 * Encodes the specified SetReverseCameraStatus message. Does not implicitly {@link hudiy.app.api.SetReverseCameraStatus.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.SetReverseCameraStatus
                 * @static
                 * @param {hudiy.app.api.SetReverseCameraStatus.$Properties} message SetReverseCameraStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetReverseCameraStatus.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.visible);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified SetReverseCameraStatus message, length delimited. Does not implicitly {@link hudiy.app.api.SetReverseCameraStatus.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.SetReverseCameraStatus
                 * @static
                 * @param {hudiy.app.api.SetReverseCameraStatus.$Properties} message SetReverseCameraStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetReverseCameraStatus.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a SetReverseCameraStatus message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.SetReverseCameraStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetReverseCameraStatus & hudiy.app.api.SetReverseCameraStatus.$Shape} SetReverseCameraStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetReverseCameraStatus.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.SetReverseCameraStatus();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.visible = reader.bool();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "visible"))
                        throw $util.ProtocolError("missing required 'visible'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a SetReverseCameraStatus message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.SetReverseCameraStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetReverseCameraStatus & hudiy.app.api.SetReverseCameraStatus.$Shape} SetReverseCameraStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetReverseCameraStatus.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SetReverseCameraStatus message.
                 * @function verify
                 * @memberof hudiy.app.api.SetReverseCameraStatus
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SetReverseCameraStatus.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (typeof message.visible !== "boolean")
                        return "visible: boolean expected";
                    return null;
                };

                /**
                 * Creates a SetReverseCameraStatus message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.SetReverseCameraStatus
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.SetReverseCameraStatus} SetReverseCameraStatus
                 */
                SetReverseCameraStatus.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.SetReverseCameraStatus)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.SetReverseCameraStatus: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.SetReverseCameraStatus();
                    if (object.visible != null)
                        message.visible = $Boolean(object.visible);
                    return message;
                };

                /**
                 * Creates a plain object from a SetReverseCameraStatus message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.SetReverseCameraStatus
                 * @static
                 * @param {hudiy.app.api.SetReverseCameraStatus} message SetReverseCameraStatus
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SetReverseCameraStatus.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        object.visible = false;
                    if (message.visible != null && $Object.hasOwnProperty.call(message, "visible"))
                        object.visible = message.visible;
                    return object;
                };

                /**
                 * Converts this SetReverseCameraStatus to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.SetReverseCameraStatus
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SetReverseCameraStatus.prototype.toJSON = function() {
                    return SetReverseCameraStatus.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for SetReverseCameraStatus
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.SetReverseCameraStatus
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                SetReverseCameraStatus.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.SetReverseCameraStatus";
                };

                return SetReverseCameraStatus;
            })();

            api.ProjectionStatus = (function() {

                /**
                 * Properties of a ProjectionStatus.
                 * @typedef {Object} hudiy.app.api.ProjectionStatus.$Properties
                 * @property {boolean} active ProjectionStatus active
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a ProjectionStatus.
                 * @memberof hudiy.app.api
                 * @interface IProjectionStatus
                 * @augments hudiy.app.api.ProjectionStatus.$Properties
                 * @deprecated Use hudiy.app.api.ProjectionStatus.$Properties instead.
                 */

                /**
                 * Shape of a ProjectionStatus.
                 * @typedef {hudiy.app.api.ProjectionStatus.$Properties} hudiy.app.api.ProjectionStatus.$Shape
                 */

                /**
                 * Constructs a new ProjectionStatus.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a ProjectionStatus.
                 * @constructor
                 * @param {hudiy.app.api.ProjectionStatus.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const ProjectionStatus = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * ProjectionStatus active.
                 * @member {boolean} active
                 * @memberof hudiy.app.api.ProjectionStatus
                 * @instance
                 */
                ProjectionStatus.prototype.active = false;

                /**
                 * Creates a new ProjectionStatus instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.ProjectionStatus
                 * @static
                 * @param {hudiy.app.api.ProjectionStatus.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.ProjectionStatus} ProjectionStatus instance
                 * @type {{
                 *   (properties: hudiy.app.api.ProjectionStatus.$Shape): hudiy.app.api.ProjectionStatus & hudiy.app.api.ProjectionStatus.$Shape;
                 *   (properties?: hudiy.app.api.ProjectionStatus.$Properties): hudiy.app.api.ProjectionStatus;
                 * }}
                 */
                ProjectionStatus.create = function(properties) {
                    return new ProjectionStatus(properties);
                };

                /**
                 * Encodes the specified ProjectionStatus message. Does not implicitly {@link hudiy.app.api.ProjectionStatus.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.ProjectionStatus
                 * @static
                 * @param {hudiy.app.api.ProjectionStatus.$Properties} message ProjectionStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ProjectionStatus.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.active);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified ProjectionStatus message, length delimited. Does not implicitly {@link hudiy.app.api.ProjectionStatus.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.ProjectionStatus
                 * @static
                 * @param {hudiy.app.api.ProjectionStatus.$Properties} message ProjectionStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ProjectionStatus.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a ProjectionStatus message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.ProjectionStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.ProjectionStatus & hudiy.app.api.ProjectionStatus.$Shape} ProjectionStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ProjectionStatus.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.ProjectionStatus();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.active = reader.bool();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "active"))
                        throw $util.ProtocolError("missing required 'active'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a ProjectionStatus message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.ProjectionStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.ProjectionStatus & hudiy.app.api.ProjectionStatus.$Shape} ProjectionStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ProjectionStatus.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ProjectionStatus message.
                 * @function verify
                 * @memberof hudiy.app.api.ProjectionStatus
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ProjectionStatus.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (typeof message.active !== "boolean")
                        return "active: boolean expected";
                    return null;
                };

                /**
                 * Creates a ProjectionStatus message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.ProjectionStatus
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.ProjectionStatus} ProjectionStatus
                 */
                ProjectionStatus.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.ProjectionStatus)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.ProjectionStatus: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.ProjectionStatus();
                    if (object.active != null)
                        message.active = $Boolean(object.active);
                    return message;
                };

                /**
                 * Creates a plain object from a ProjectionStatus message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.ProjectionStatus
                 * @static
                 * @param {hudiy.app.api.ProjectionStatus} message ProjectionStatus
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ProjectionStatus.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        object.active = false;
                    if (message.active != null && $Object.hasOwnProperty.call(message, "active"))
                        object.active = message.active;
                    return object;
                };

                /**
                 * Converts this ProjectionStatus to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.ProjectionStatus
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ProjectionStatus.prototype.toJSON = function() {
                    return ProjectionStatus.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for ProjectionStatus
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.ProjectionStatus
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                ProjectionStatus.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.ProjectionStatus";
                };

                return ProjectionStatus;
            })();

            /**
             * MediaSource enum.
             * @name hudiy.app.api.MediaSource
             * @enum {number}
             * @property {number} MEDIA_SOURCE_NONE=0 MEDIA_SOURCE_NONE value
             * @property {number} MEDIA_SOURCE_ANDROID_AUTO=1 MEDIA_SOURCE_ANDROID_AUTO value
             * @property {number} MEDIA_SOURCE_AUTOBOX=2 MEDIA_SOURCE_AUTOBOX value
             * @property {number} MEDIA_SOURCE_A2DP=3 MEDIA_SOURCE_A2DP value
             * @property {number} MEDIA_SOURCE_STORAGE=4 MEDIA_SOURCE_STORAGE value
             * @property {number} MEDIA_SOURCE_FM_RADIO=5 MEDIA_SOURCE_FM_RADIO value
             * @property {number} MEDIA_SOURCE_WEB=6 MEDIA_SOURCE_WEB value
             */
            api.MediaSource = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "MEDIA_SOURCE_NONE"] = 0;
                values[valuesById[1] = "MEDIA_SOURCE_ANDROID_AUTO"] = 1;
                values[valuesById[2] = "MEDIA_SOURCE_AUTOBOX"] = 2;
                values[valuesById[3] = "MEDIA_SOURCE_A2DP"] = 3;
                values[valuesById[4] = "MEDIA_SOURCE_STORAGE"] = 4;
                values[valuesById[5] = "MEDIA_SOURCE_FM_RADIO"] = 5;
                values[valuesById[6] = "MEDIA_SOURCE_WEB"] = 6;
                return values;
            })();

            api.MediaStatus = (function() {

                /**
                 * Properties of a MediaStatus.
                 * @typedef {Object} hudiy.app.api.MediaStatus.$Properties
                 * @property {string} positionLabel MediaStatus positionLabel
                 * @property {boolean} isPlaying MediaStatus isPlaying
                 * @property {hudiy.app.api.MediaSource} source MediaStatus source
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a MediaStatus.
                 * @memberof hudiy.app.api
                 * @interface IMediaStatus
                 * @augments hudiy.app.api.MediaStatus.$Properties
                 * @deprecated Use hudiy.app.api.MediaStatus.$Properties instead.
                 */

                /**
                 * Shape of a MediaStatus.
                 * @typedef {hudiy.app.api.MediaStatus.$Properties} hudiy.app.api.MediaStatus.$Shape
                 */

                /**
                 * Constructs a new MediaStatus.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a MediaStatus.
                 * @constructor
                 * @param {hudiy.app.api.MediaStatus.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const MediaStatus = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * MediaStatus positionLabel.
                 * @member {string} positionLabel
                 * @memberof hudiy.app.api.MediaStatus
                 * @instance
                 */
                MediaStatus.prototype.positionLabel = "";

                /**
                 * MediaStatus isPlaying.
                 * @member {boolean} isPlaying
                 * @memberof hudiy.app.api.MediaStatus
                 * @instance
                 */
                MediaStatus.prototype.isPlaying = false;

                /**
                 * MediaStatus source.
                 * @member {hudiy.app.api.MediaSource} source
                 * @memberof hudiy.app.api.MediaStatus
                 * @instance
                 */
                MediaStatus.prototype.source = 0;

                /**
                 * Creates a new MediaStatus instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.MediaStatus
                 * @static
                 * @param {hudiy.app.api.MediaStatus.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.MediaStatus} MediaStatus instance
                 * @type {{
                 *   (properties: hudiy.app.api.MediaStatus.$Shape): hudiy.app.api.MediaStatus & hudiy.app.api.MediaStatus.$Shape;
                 *   (properties?: hudiy.app.api.MediaStatus.$Properties): hudiy.app.api.MediaStatus;
                 * }}
                 */
                MediaStatus.create = function(properties) {
                    return new MediaStatus(properties);
                };

                /**
                 * Encodes the specified MediaStatus message. Does not implicitly {@link hudiy.app.api.MediaStatus.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.MediaStatus
                 * @static
                 * @param {hudiy.app.api.MediaStatus.$Properties} message MediaStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                MediaStatus.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.positionLabel);
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isPlaying);
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.source);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified MediaStatus message, length delimited. Does not implicitly {@link hudiy.app.api.MediaStatus.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.MediaStatus
                 * @static
                 * @param {hudiy.app.api.MediaStatus.$Properties} message MediaStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                MediaStatus.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a MediaStatus message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.MediaStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.MediaStatus & hudiy.app.api.MediaStatus.$Shape} MediaStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MediaStatus.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.MediaStatus(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                message.positionLabel = reader.string();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                message.isPlaying = reader.bool();
                                continue;
                            }
                        case 3: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.MediaSource[value] !== $undefined)
                                    message.source = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "positionLabel"))
                        throw $util.ProtocolError("missing required 'positionLabel'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "isPlaying"))
                        throw $util.ProtocolError("missing required 'isPlaying'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "source"))
                        throw $util.ProtocolError("missing required 'source'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a MediaStatus message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.MediaStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.MediaStatus & hudiy.app.api.MediaStatus.$Shape} MediaStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MediaStatus.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a MediaStatus message.
                 * @function verify
                 * @memberof hudiy.app.api.MediaStatus
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                MediaStatus.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isString(message.positionLabel))
                        return "positionLabel: string expected";
                    if (typeof message.isPlaying !== "boolean")
                        return "isPlaying: boolean expected";
                    switch (message.source) {
                    default:
                        return "source: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        break;
                    }
                    return null;
                };

                /**
                 * Creates a MediaStatus message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.MediaStatus
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.MediaStatus} MediaStatus
                 */
                MediaStatus.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.MediaStatus)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.MediaStatus: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.MediaStatus();
                    if (object.positionLabel != null)
                        message.positionLabel = $String(object.positionLabel);
                    if (object.isPlaying != null)
                        message.isPlaying = $Boolean(object.isPlaying);
                    switch (object.source) {
                    case "MEDIA_SOURCE_NONE":
                    case 0:
                        message.source = 0;
                        break;
                    case "MEDIA_SOURCE_ANDROID_AUTO":
                    case 1:
                        message.source = 1;
                        break;
                    case "MEDIA_SOURCE_AUTOBOX":
                    case 2:
                        message.source = 2;
                        break;
                    case "MEDIA_SOURCE_A2DP":
                    case 3:
                        message.source = 3;
                        break;
                    case "MEDIA_SOURCE_STORAGE":
                    case 4:
                        message.source = 4;
                        break;
                    case "MEDIA_SOURCE_FM_RADIO":
                    case 5:
                        message.source = 5;
                        break;
                    case "MEDIA_SOURCE_WEB":
                    case 6:
                        message.source = 6;
                        break;
                    default:
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a MediaStatus message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.MediaStatus
                 * @static
                 * @param {hudiy.app.api.MediaStatus} message MediaStatus
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                MediaStatus.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.positionLabel = "";
                        object.isPlaying = false;
                        object.source = options.enums === $String ? "MEDIA_SOURCE_NONE" : 0;
                    }
                    if (message.positionLabel != null && $Object.hasOwnProperty.call(message, "positionLabel"))
                        object.positionLabel = message.positionLabel;
                    if (message.isPlaying != null && $Object.hasOwnProperty.call(message, "isPlaying"))
                        object.isPlaying = message.isPlaying;
                    if (message.source != null && $Object.hasOwnProperty.call(message, "source"))
                        object.source = options.enums === $String ? $root.hudiy.app.api.MediaSource[message.source] === $undefined ? message.source : $root.hudiy.app.api.MediaSource[message.source] : message.source;
                    return object;
                };

                /**
                 * Converts this MediaStatus to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.MediaStatus
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                MediaStatus.prototype.toJSON = function() {
                    return MediaStatus.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for MediaStatus
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.MediaStatus
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                MediaStatus.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.MediaStatus";
                };

                return MediaStatus;
            })();

            api.MediaMetadata = (function() {

                /**
                 * Properties of a MediaMetadata.
                 * @typedef {Object} hudiy.app.api.MediaMetadata.$Properties
                 * @property {string} album MediaMetadata album
                 * @property {string} artist MediaMetadata artist
                 * @property {string} title MediaMetadata title
                 * @property {string} durationLabel MediaMetadata durationLabel
                 * @property {Uint8Array} coverart MediaMetadata coverart
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a MediaMetadata.
                 * @memberof hudiy.app.api
                 * @interface IMediaMetadata
                 * @augments hudiy.app.api.MediaMetadata.$Properties
                 * @deprecated Use hudiy.app.api.MediaMetadata.$Properties instead.
                 */

                /**
                 * Shape of a MediaMetadata.
                 * @typedef {hudiy.app.api.MediaMetadata.$Properties} hudiy.app.api.MediaMetadata.$Shape
                 */

                /**
                 * Constructs a new MediaMetadata.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a MediaMetadata.
                 * @constructor
                 * @param {hudiy.app.api.MediaMetadata.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const MediaMetadata = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * MediaMetadata album.
                 * @member {string} album
                 * @memberof hudiy.app.api.MediaMetadata
                 * @instance
                 */
                MediaMetadata.prototype.album = "";

                /**
                 * MediaMetadata artist.
                 * @member {string} artist
                 * @memberof hudiy.app.api.MediaMetadata
                 * @instance
                 */
                MediaMetadata.prototype.artist = "";

                /**
                 * MediaMetadata title.
                 * @member {string} title
                 * @memberof hudiy.app.api.MediaMetadata
                 * @instance
                 */
                MediaMetadata.prototype.title = "";

                /**
                 * MediaMetadata durationLabel.
                 * @member {string} durationLabel
                 * @memberof hudiy.app.api.MediaMetadata
                 * @instance
                 */
                MediaMetadata.prototype.durationLabel = "";

                /**
                 * MediaMetadata coverart.
                 * @member {Uint8Array} coverart
                 * @memberof hudiy.app.api.MediaMetadata
                 * @instance
                 */
                MediaMetadata.prototype.coverart = $util.newBuffer([]);

                /**
                 * Creates a new MediaMetadata instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.MediaMetadata
                 * @static
                 * @param {hudiy.app.api.MediaMetadata.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.MediaMetadata} MediaMetadata instance
                 * @type {{
                 *   (properties: hudiy.app.api.MediaMetadata.$Shape): hudiy.app.api.MediaMetadata & hudiy.app.api.MediaMetadata.$Shape;
                 *   (properties?: hudiy.app.api.MediaMetadata.$Properties): hudiy.app.api.MediaMetadata;
                 * }}
                 */
                MediaMetadata.create = function(properties) {
                    return new MediaMetadata(properties);
                };

                /**
                 * Encodes the specified MediaMetadata message. Does not implicitly {@link hudiy.app.api.MediaMetadata.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.MediaMetadata
                 * @static
                 * @param {hudiy.app.api.MediaMetadata.$Properties} message MediaMetadata message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                MediaMetadata.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.album);
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.artist);
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.title);
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.durationLabel);
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.coverart);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified MediaMetadata message, length delimited. Does not implicitly {@link hudiy.app.api.MediaMetadata.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.MediaMetadata
                 * @static
                 * @param {hudiy.app.api.MediaMetadata.$Properties} message MediaMetadata message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                MediaMetadata.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a MediaMetadata message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.MediaMetadata
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.MediaMetadata & hudiy.app.api.MediaMetadata.$Shape} MediaMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MediaMetadata.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.MediaMetadata();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                message.album = reader.string();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                message.artist = reader.string();
                                continue;
                            }
                        case 3: {
                                if (wireType !== 2)
                                    break;
                                message.title = reader.string();
                                continue;
                            }
                        case 4: {
                                if (wireType !== 2)
                                    break;
                                message.durationLabel = reader.string();
                                continue;
                            }
                        case 5: {
                                if (wireType !== 2)
                                    break;
                                message.coverart = reader.bytes();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "album"))
                        throw $util.ProtocolError("missing required 'album'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "artist"))
                        throw $util.ProtocolError("missing required 'artist'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "title"))
                        throw $util.ProtocolError("missing required 'title'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "durationLabel"))
                        throw $util.ProtocolError("missing required 'durationLabel'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "coverart"))
                        throw $util.ProtocolError("missing required 'coverart'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a MediaMetadata message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.MediaMetadata
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.MediaMetadata & hudiy.app.api.MediaMetadata.$Shape} MediaMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MediaMetadata.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a MediaMetadata message.
                 * @function verify
                 * @memberof hudiy.app.api.MediaMetadata
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                MediaMetadata.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isString(message.album))
                        return "album: string expected";
                    if (!$util.isString(message.artist))
                        return "artist: string expected";
                    if (!$util.isString(message.title))
                        return "title: string expected";
                    if (!$util.isString(message.durationLabel))
                        return "durationLabel: string expected";
                    if (!(message.coverart && typeof message.coverart.length === "number" || $util.isString(message.coverart)))
                        return "coverart: buffer expected";
                    return null;
                };

                /**
                 * Creates a MediaMetadata message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.MediaMetadata
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.MediaMetadata} MediaMetadata
                 */
                MediaMetadata.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.MediaMetadata)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.MediaMetadata: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.MediaMetadata();
                    if (object.album != null)
                        message.album = $String(object.album);
                    if (object.artist != null)
                        message.artist = $String(object.artist);
                    if (object.title != null)
                        message.title = $String(object.title);
                    if (object.durationLabel != null)
                        message.durationLabel = $String(object.durationLabel);
                    if (object.coverart != null)
                        if (typeof object.coverart === "string")
                            $util.base64.decode(object.coverart, message.coverart = $util.newBuffer($util.base64.length(object.coverart)), 0);
                        else if (object.coverart.length >= 0)
                            message.coverart = object.coverart;
                    return message;
                };

                /**
                 * Creates a plain object from a MediaMetadata message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.MediaMetadata
                 * @static
                 * @param {hudiy.app.api.MediaMetadata} message MediaMetadata
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                MediaMetadata.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.album = "";
                        object.artist = "";
                        object.title = "";
                        object.durationLabel = "";
                        if (options.bytes === $String)
                            object.coverart = "";
                        else {
                            object.coverart = [];
                            if (options.bytes !== $Array)
                                object.coverart = $util.newBuffer(object.coverart);
                        }
                    }
                    if (message.album != null && $Object.hasOwnProperty.call(message, "album"))
                        object.album = message.album;
                    if (message.artist != null && $Object.hasOwnProperty.call(message, "artist"))
                        object.artist = message.artist;
                    if (message.title != null && $Object.hasOwnProperty.call(message, "title"))
                        object.title = message.title;
                    if (message.durationLabel != null && $Object.hasOwnProperty.call(message, "durationLabel"))
                        object.durationLabel = message.durationLabel;
                    if (message.coverart != null && $Object.hasOwnProperty.call(message, "coverart"))
                        object.coverart = options.bytes === $String ? $util.base64.encode(message.coverart, 0, message.coverart.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.coverart) : message.coverart;
                    return object;
                };

                /**
                 * Converts this MediaMetadata to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.MediaMetadata
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                MediaMetadata.prototype.toJSON = function() {
                    return MediaMetadata.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for MediaMetadata
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.MediaMetadata
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                MediaMetadata.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.MediaMetadata";
                };

                return MediaMetadata;
            })();

            api.NavigationStatus = (function() {

                /**
                 * Properties of a NavigationStatus.
                 * @typedef {Object} hudiy.app.api.NavigationStatus.$Properties
                 * @property {hudiy.app.api.NavigationStatus.NavigationSource} source NavigationStatus source
                 * @property {hudiy.app.api.NavigationStatus.NavigationState} state NavigationStatus state
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a NavigationStatus.
                 * @memberof hudiy.app.api
                 * @interface INavigationStatus
                 * @augments hudiy.app.api.NavigationStatus.$Properties
                 * @deprecated Use hudiy.app.api.NavigationStatus.$Properties instead.
                 */

                /**
                 * Shape of a NavigationStatus.
                 * @typedef {hudiy.app.api.NavigationStatus.$Properties} hudiy.app.api.NavigationStatus.$Shape
                 */

                /**
                 * Constructs a new NavigationStatus.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a NavigationStatus.
                 * @constructor
                 * @param {hudiy.app.api.NavigationStatus.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const NavigationStatus = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * NavigationStatus source.
                 * @member {hudiy.app.api.NavigationStatus.NavigationSource} source
                 * @memberof hudiy.app.api.NavigationStatus
                 * @instance
                 */
                NavigationStatus.prototype.source = 0;

                /**
                 * NavigationStatus state.
                 * @member {hudiy.app.api.NavigationStatus.NavigationState} state
                 * @memberof hudiy.app.api.NavigationStatus
                 * @instance
                 */
                NavigationStatus.prototype.state = 1;

                /**
                 * Creates a new NavigationStatus instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.NavigationStatus
                 * @static
                 * @param {hudiy.app.api.NavigationStatus.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.NavigationStatus} NavigationStatus instance
                 * @type {{
                 *   (properties: hudiy.app.api.NavigationStatus.$Shape): hudiy.app.api.NavigationStatus & hudiy.app.api.NavigationStatus.$Shape;
                 *   (properties?: hudiy.app.api.NavigationStatus.$Properties): hudiy.app.api.NavigationStatus;
                 * }}
                 */
                NavigationStatus.create = function(properties) {
                    return new NavigationStatus(properties);
                };

                /**
                 * Encodes the specified NavigationStatus message. Does not implicitly {@link hudiy.app.api.NavigationStatus.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.NavigationStatus
                 * @static
                 * @param {hudiy.app.api.NavigationStatus.$Properties} message NavigationStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NavigationStatus.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.source);
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.state);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified NavigationStatus message, length delimited. Does not implicitly {@link hudiy.app.api.NavigationStatus.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.NavigationStatus
                 * @static
                 * @param {hudiy.app.api.NavigationStatus.$Properties} message NavigationStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NavigationStatus.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a NavigationStatus message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.NavigationStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.NavigationStatus & hudiy.app.api.NavigationStatus.$Shape} NavigationStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                NavigationStatus.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.NavigationStatus(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.NavigationStatus.NavigationSource[value] !== $undefined)
                                    message.source = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.NavigationStatus.NavigationState[value] !== $undefined)
                                    message.state = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "source"))
                        throw $util.ProtocolError("missing required 'source'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "state"))
                        throw $util.ProtocolError("missing required 'state'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a NavigationStatus message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.NavigationStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.NavigationStatus & hudiy.app.api.NavigationStatus.$Shape} NavigationStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                NavigationStatus.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a NavigationStatus message.
                 * @function verify
                 * @memberof hudiy.app.api.NavigationStatus
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                NavigationStatus.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    switch (message.source) {
                    default:
                        return "source: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                    switch (message.state) {
                    default:
                        return "state: enum value expected";
                    case 1:
                    case 2:
                        break;
                    }
                    return null;
                };

                /**
                 * Creates a NavigationStatus message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.NavigationStatus
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.NavigationStatus} NavigationStatus
                 */
                NavigationStatus.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.NavigationStatus)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.NavigationStatus: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.NavigationStatus();
                    switch (object.source) {
                    case "NAVIGATION_SOURCE_NONE":
                    case 0:
                        message.source = 0;
                        break;
                    case "NAVIGATION_SOURCE_ANDROID_AUTO":
                    case 1:
                        message.source = 1;
                        break;
                    case "NAVIGATION_SOURCE_AUTOBOX":
                    case 2:
                        message.source = 2;
                        break;
                    default:
                    }
                    switch (object.state) {
                    case "NAVIGATION_STATE_ACTIVE":
                    case 1:
                        message.state = 1;
                        break;
                    case "NAVIGATION_STATE_INACTIVE":
                    case 2:
                        message.state = 2;
                        break;
                    default:
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a NavigationStatus message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.NavigationStatus
                 * @static
                 * @param {hudiy.app.api.NavigationStatus} message NavigationStatus
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                NavigationStatus.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.source = options.enums === $String ? "NAVIGATION_SOURCE_NONE" : 0;
                        object.state = options.enums === $String ? "NAVIGATION_STATE_ACTIVE" : 1;
                    }
                    if (message.source != null && $Object.hasOwnProperty.call(message, "source"))
                        object.source = options.enums === $String ? $root.hudiy.app.api.NavigationStatus.NavigationSource[message.source] === $undefined ? message.source : $root.hudiy.app.api.NavigationStatus.NavigationSource[message.source] : message.source;
                    if (message.state != null && $Object.hasOwnProperty.call(message, "state"))
                        object.state = options.enums === $String ? $root.hudiy.app.api.NavigationStatus.NavigationState[message.state] === $undefined ? message.state : $root.hudiy.app.api.NavigationStatus.NavigationState[message.state] : message.state;
                    return object;
                };

                /**
                 * Converts this NavigationStatus to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.NavigationStatus
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                NavigationStatus.prototype.toJSON = function() {
                    return NavigationStatus.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for NavigationStatus
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.NavigationStatus
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                NavigationStatus.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.NavigationStatus";
                };

                /**
                 * NavigationSource enum.
                 * @name hudiy.app.api.NavigationStatus.NavigationSource
                 * @enum {number}
                 * @property {number} NAVIGATION_SOURCE_NONE=0 NAVIGATION_SOURCE_NONE value
                 * @property {number} NAVIGATION_SOURCE_ANDROID_AUTO=1 NAVIGATION_SOURCE_ANDROID_AUTO value
                 * @property {number} NAVIGATION_SOURCE_AUTOBOX=2 NAVIGATION_SOURCE_AUTOBOX value
                 */
                NavigationStatus.NavigationSource = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[0] = "NAVIGATION_SOURCE_NONE"] = 0;
                    values[valuesById[1] = "NAVIGATION_SOURCE_ANDROID_AUTO"] = 1;
                    values[valuesById[2] = "NAVIGATION_SOURCE_AUTOBOX"] = 2;
                    return values;
                })();

                /**
                 * NavigationState enum.
                 * @name hudiy.app.api.NavigationStatus.NavigationState
                 * @enum {number}
                 * @property {number} NAVIGATION_STATE_ACTIVE=1 NAVIGATION_STATE_ACTIVE value
                 * @property {number} NAVIGATION_STATE_INACTIVE=2 NAVIGATION_STATE_INACTIVE value
                 */
                NavigationStatus.NavigationState = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "NAVIGATION_STATE_ACTIVE"] = 1;
                    values[valuesById[2] = "NAVIGATION_STATE_INACTIVE"] = 2;
                    return values;
                })();

                return NavigationStatus;
            })();

            api.NavigationManeuverDetails = (function() {

                /**
                 * Properties of a NavigationManeuverDetails.
                 * @typedef {Object} hudiy.app.api.NavigationManeuverDetails.$Properties
                 * @property {string} description NavigationManeuverDetails description
                 * @property {Uint8Array} icon NavigationManeuverDetails icon
                 * @property {hudiy.app.api.NavigationManeuverDetails.NavigationManeuverSide|null} [maneuverSide] NavigationManeuverDetails maneuverSide
                 * @property {hudiy.app.api.NavigationManeuverDetails.NavigationManeuverType|null} [maneuverType] NavigationManeuverDetails maneuverType
                 * @property {number|null} [maneuverAngle] NavigationManeuverDetails maneuverAngle
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a NavigationManeuverDetails.
                 * @memberof hudiy.app.api
                 * @interface INavigationManeuverDetails
                 * @augments hudiy.app.api.NavigationManeuverDetails.$Properties
                 * @deprecated Use hudiy.app.api.NavigationManeuverDetails.$Properties instead.
                 */

                /**
                 * Shape of a NavigationManeuverDetails.
                 * @typedef {hudiy.app.api.NavigationManeuverDetails.$Properties} hudiy.app.api.NavigationManeuverDetails.$Shape
                 */

                /**
                 * Constructs a new NavigationManeuverDetails.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a NavigationManeuverDetails.
                 * @constructor
                 * @param {hudiy.app.api.NavigationManeuverDetails.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const NavigationManeuverDetails = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * NavigationManeuverDetails description.
                 * @member {string} description
                 * @memberof hudiy.app.api.NavigationManeuverDetails
                 * @instance
                 */
                NavigationManeuverDetails.prototype.description = "";

                /**
                 * NavigationManeuverDetails icon.
                 * @member {Uint8Array} icon
                 * @memberof hudiy.app.api.NavigationManeuverDetails
                 * @instance
                 */
                NavigationManeuverDetails.prototype.icon = $util.newBuffer([]);

                /**
                 * NavigationManeuverDetails maneuverSide.
                 * @member {hudiy.app.api.NavigationManeuverDetails.NavigationManeuverSide} maneuverSide
                 * @memberof hudiy.app.api.NavigationManeuverDetails
                 * @instance
                 */
                NavigationManeuverDetails.prototype.maneuverSide = 1;

                /**
                 * NavigationManeuverDetails maneuverType.
                 * @member {hudiy.app.api.NavigationManeuverDetails.NavigationManeuverType} maneuverType
                 * @memberof hudiy.app.api.NavigationManeuverDetails
                 * @instance
                 */
                NavigationManeuverDetails.prototype.maneuverType = 0;

                /**
                 * NavigationManeuverDetails maneuverAngle.
                 * @member {number} maneuverAngle
                 * @memberof hudiy.app.api.NavigationManeuverDetails
                 * @instance
                 */
                NavigationManeuverDetails.prototype.maneuverAngle = 0;

                /**
                 * Creates a new NavigationManeuverDetails instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.NavigationManeuverDetails
                 * @static
                 * @param {hudiy.app.api.NavigationManeuverDetails.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.NavigationManeuverDetails} NavigationManeuverDetails instance
                 * @type {{
                 *   (properties: hudiy.app.api.NavigationManeuverDetails.$Shape): hudiy.app.api.NavigationManeuverDetails & hudiy.app.api.NavigationManeuverDetails.$Shape;
                 *   (properties?: hudiy.app.api.NavigationManeuverDetails.$Properties): hudiy.app.api.NavigationManeuverDetails;
                 * }}
                 */
                NavigationManeuverDetails.create = function(properties) {
                    return new NavigationManeuverDetails(properties);
                };

                /**
                 * Encodes the specified NavigationManeuverDetails message. Does not implicitly {@link hudiy.app.api.NavigationManeuverDetails.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.NavigationManeuverDetails
                 * @static
                 * @param {hudiy.app.api.NavigationManeuverDetails.$Properties} message NavigationManeuverDetails message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NavigationManeuverDetails.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.description);
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.icon);
                    if (message.maneuverSide != null && $Object.hasOwnProperty.call(message, "maneuverSide"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.maneuverSide);
                    if (message.maneuverType != null && $Object.hasOwnProperty.call(message, "maneuverType"))
                        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.maneuverType);
                    if (message.maneuverAngle != null && $Object.hasOwnProperty.call(message, "maneuverAngle"))
                        writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.maneuverAngle);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified NavigationManeuverDetails message, length delimited. Does not implicitly {@link hudiy.app.api.NavigationManeuverDetails.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.NavigationManeuverDetails
                 * @static
                 * @param {hudiy.app.api.NavigationManeuverDetails.$Properties} message NavigationManeuverDetails message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NavigationManeuverDetails.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a NavigationManeuverDetails message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.NavigationManeuverDetails
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.NavigationManeuverDetails & hudiy.app.api.NavigationManeuverDetails.$Shape} NavigationManeuverDetails
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                NavigationManeuverDetails.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.NavigationManeuverDetails(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                message.description = reader.string();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                message.icon = reader.bytes();
                                continue;
                            }
                        case 3: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.NavigationManeuverDetails.NavigationManeuverSide[value] !== $undefined)
                                    message.maneuverSide = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        case 4: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.NavigationManeuverDetails.NavigationManeuverType[value] !== $undefined)
                                    message.maneuverType = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        case 5: {
                                if (wireType !== 0)
                                    break;
                                message.maneuverAngle = reader.uint32();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "description"))
                        throw $util.ProtocolError("missing required 'description'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "icon"))
                        throw $util.ProtocolError("missing required 'icon'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a NavigationManeuverDetails message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.NavigationManeuverDetails
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.NavigationManeuverDetails & hudiy.app.api.NavigationManeuverDetails.$Shape} NavigationManeuverDetails
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                NavigationManeuverDetails.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a NavigationManeuverDetails message.
                 * @function verify
                 * @memberof hudiy.app.api.NavigationManeuverDetails
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                NavigationManeuverDetails.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isString(message.description))
                        return "description: string expected";
                    if (!(message.icon && typeof message.icon.length === "number" || $util.isString(message.icon)))
                        return "icon: buffer expected";
                    if (message.maneuverSide != null && $Object.hasOwnProperty.call(message, "maneuverSide"))
                        switch (message.maneuverSide) {
                        default:
                            return "maneuverSide: enum value expected";
                        case 1:
                        case 2:
                        case 3:
                            break;
                        }
                    if (message.maneuverType != null && $Object.hasOwnProperty.call(message, "maneuverType"))
                        switch (message.maneuverType) {
                        default:
                            return "maneuverType: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 14:
                        case 16:
                        case 17:
                        case 19:
                            break;
                        }
                    if (message.maneuverAngle != null && $Object.hasOwnProperty.call(message, "maneuverAngle"))
                        if (!$util.isInteger(message.maneuverAngle))
                            return "maneuverAngle: integer expected";
                    return null;
                };

                /**
                 * Creates a NavigationManeuverDetails message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.NavigationManeuverDetails
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.NavigationManeuverDetails} NavigationManeuverDetails
                 */
                NavigationManeuverDetails.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.NavigationManeuverDetails)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.NavigationManeuverDetails: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.NavigationManeuverDetails();
                    if (object.description != null)
                        message.description = $String(object.description);
                    if (object.icon != null)
                        if (typeof object.icon === "string")
                            $util.base64.decode(object.icon, message.icon = $util.newBuffer($util.base64.length(object.icon)), 0);
                        else if (object.icon.length >= 0)
                            message.icon = object.icon;
                    switch (object.maneuverSide) {
                    case "LEFT":
                    case 1:
                        message.maneuverSide = 1;
                        break;
                    case "RIGHT":
                    case 2:
                        message.maneuverSide = 2;
                        break;
                    case "UNSPECIFIED":
                    case 3:
                        message.maneuverSide = 3;
                        break;
                    default:
                    }
                    switch (object.maneuverType) {
                    case "UNKNOWN":
                    case 0:
                        message.maneuverType = 0;
                        break;
                    case "DEPART":
                    case 1:
                        message.maneuverType = 1;
                        break;
                    case "NAME_CHANGE":
                    case 2:
                        message.maneuverType = 2;
                        break;
                    case "SLIGHT_TURN":
                    case 3:
                        message.maneuverType = 3;
                        break;
                    case "TURN":
                    case 4:
                        message.maneuverType = 4;
                        break;
                    case "SHARP_TURN":
                    case 5:
                        message.maneuverType = 5;
                        break;
                    case "U_TURN":
                    case 6:
                        message.maneuverType = 6;
                        break;
                    case "ON_RAMP":
                    case 7:
                        message.maneuverType = 7;
                        break;
                    case "OFF_RAMP":
                    case 8:
                        message.maneuverType = 8;
                        break;
                    case "FORK":
                    case 9:
                        message.maneuverType = 9;
                        break;
                    case "MERGE":
                    case 10:
                        message.maneuverType = 10;
                        break;
                    case "ROUNDABOUT_ENTER":
                    case 11:
                        message.maneuverType = 11;
                        break;
                    case "ROUNDABOUT_EXIT":
                    case 12:
                        message.maneuverType = 12;
                        break;
                    case "ROUNDABOUT_ENTER_AND_EXIT":
                    case 13:
                        message.maneuverType = 13;
                        break;
                    case "STRAIGHT":
                    case 14:
                        message.maneuverType = 14;
                        break;
                    case "FERRY_BOAT":
                    case 16:
                        message.maneuverType = 16;
                        break;
                    case "FERRY_TRAIN":
                    case 17:
                        message.maneuverType = 17;
                        break;
                    case "DESTINATION":
                    case 19:
                        message.maneuverType = 19;
                        break;
                    default:
                    }
                    if (object.maneuverAngle != null)
                        message.maneuverAngle = object.maneuverAngle >>> 0;
                    return message;
                };

                /**
                 * Creates a plain object from a NavigationManeuverDetails message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.NavigationManeuverDetails
                 * @static
                 * @param {hudiy.app.api.NavigationManeuverDetails} message NavigationManeuverDetails
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                NavigationManeuverDetails.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.description = "";
                        if (options.bytes === $String)
                            object.icon = "";
                        else {
                            object.icon = [];
                            if (options.bytes !== $Array)
                                object.icon = $util.newBuffer(object.icon);
                        }
                        object.maneuverSide = options.enums === $String ? "LEFT" : 1;
                        object.maneuverType = options.enums === $String ? "UNKNOWN" : 0;
                        object.maneuverAngle = 0;
                    }
                    if (message.description != null && $Object.hasOwnProperty.call(message, "description"))
                        object.description = message.description;
                    if (message.icon != null && $Object.hasOwnProperty.call(message, "icon"))
                        object.icon = options.bytes === $String ? $util.base64.encode(message.icon, 0, message.icon.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.icon) : message.icon;
                    if (message.maneuverSide != null && $Object.hasOwnProperty.call(message, "maneuverSide"))
                        object.maneuverSide = options.enums === $String ? $root.hudiy.app.api.NavigationManeuverDetails.NavigationManeuverSide[message.maneuverSide] === $undefined ? message.maneuverSide : $root.hudiy.app.api.NavigationManeuverDetails.NavigationManeuverSide[message.maneuverSide] : message.maneuverSide;
                    if (message.maneuverType != null && $Object.hasOwnProperty.call(message, "maneuverType"))
                        object.maneuverType = options.enums === $String ? $root.hudiy.app.api.NavigationManeuverDetails.NavigationManeuverType[message.maneuverType] === $undefined ? message.maneuverType : $root.hudiy.app.api.NavigationManeuverDetails.NavigationManeuverType[message.maneuverType] : message.maneuverType;
                    if (message.maneuverAngle != null && $Object.hasOwnProperty.call(message, "maneuverAngle"))
                        object.maneuverAngle = message.maneuverAngle;
                    return object;
                };

                /**
                 * Converts this NavigationManeuverDetails to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.NavigationManeuverDetails
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                NavigationManeuverDetails.prototype.toJSON = function() {
                    return NavigationManeuverDetails.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for NavigationManeuverDetails
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.NavigationManeuverDetails
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                NavigationManeuverDetails.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.NavigationManeuverDetails";
                };

                /**
                 * NavigationManeuverType enum.
                 * @name hudiy.app.api.NavigationManeuverDetails.NavigationManeuverType
                 * @enum {number}
                 * @property {number} UNKNOWN=0 UNKNOWN value
                 * @property {number} DEPART=1 DEPART value
                 * @property {number} NAME_CHANGE=2 NAME_CHANGE value
                 * @property {number} SLIGHT_TURN=3 SLIGHT_TURN value
                 * @property {number} TURN=4 TURN value
                 * @property {number} SHARP_TURN=5 SHARP_TURN value
                 * @property {number} U_TURN=6 U_TURN value
                 * @property {number} ON_RAMP=7 ON_RAMP value
                 * @property {number} OFF_RAMP=8 OFF_RAMP value
                 * @property {number} FORK=9 FORK value
                 * @property {number} MERGE=10 MERGE value
                 * @property {number} ROUNDABOUT_ENTER=11 ROUNDABOUT_ENTER value
                 * @property {number} ROUNDABOUT_EXIT=12 ROUNDABOUT_EXIT value
                 * @property {number} ROUNDABOUT_ENTER_AND_EXIT=13 ROUNDABOUT_ENTER_AND_EXIT value
                 * @property {number} STRAIGHT=14 STRAIGHT value
                 * @property {number} FERRY_BOAT=16 FERRY_BOAT value
                 * @property {number} FERRY_TRAIN=17 FERRY_TRAIN value
                 * @property {number} DESTINATION=19 DESTINATION value
                 */
                NavigationManeuverDetails.NavigationManeuverType = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[0] = "UNKNOWN"] = 0;
                    values[valuesById[1] = "DEPART"] = 1;
                    values[valuesById[2] = "NAME_CHANGE"] = 2;
                    values[valuesById[3] = "SLIGHT_TURN"] = 3;
                    values[valuesById[4] = "TURN"] = 4;
                    values[valuesById[5] = "SHARP_TURN"] = 5;
                    values[valuesById[6] = "U_TURN"] = 6;
                    values[valuesById[7] = "ON_RAMP"] = 7;
                    values[valuesById[8] = "OFF_RAMP"] = 8;
                    values[valuesById[9] = "FORK"] = 9;
                    values[valuesById[10] = "MERGE"] = 10;
                    values[valuesById[11] = "ROUNDABOUT_ENTER"] = 11;
                    values[valuesById[12] = "ROUNDABOUT_EXIT"] = 12;
                    values[valuesById[13] = "ROUNDABOUT_ENTER_AND_EXIT"] = 13;
                    values[valuesById[14] = "STRAIGHT"] = 14;
                    values[valuesById[16] = "FERRY_BOAT"] = 16;
                    values[valuesById[17] = "FERRY_TRAIN"] = 17;
                    values[valuesById[19] = "DESTINATION"] = 19;
                    return values;
                })();

                /**
                 * NavigationManeuverSide enum.
                 * @name hudiy.app.api.NavigationManeuverDetails.NavigationManeuverSide
                 * @enum {number}
                 * @property {number} LEFT=1 LEFT value
                 * @property {number} RIGHT=2 RIGHT value
                 * @property {number} UNSPECIFIED=3 UNSPECIFIED value
                 */
                NavigationManeuverDetails.NavigationManeuverSide = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "LEFT"] = 1;
                    values[valuesById[2] = "RIGHT"] = 2;
                    values[valuesById[3] = "UNSPECIFIED"] = 3;
                    return values;
                })();

                return NavigationManeuverDetails;
            })();

            api.NavigationManeuverDistance = (function() {

                /**
                 * Properties of a NavigationManeuverDistance.
                 * @typedef {Object} hudiy.app.api.NavigationManeuverDistance.$Properties
                 * @property {string} label NavigationManeuverDistance label
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a NavigationManeuverDistance.
                 * @memberof hudiy.app.api
                 * @interface INavigationManeuverDistance
                 * @augments hudiy.app.api.NavigationManeuverDistance.$Properties
                 * @deprecated Use hudiy.app.api.NavigationManeuverDistance.$Properties instead.
                 */

                /**
                 * Shape of a NavigationManeuverDistance.
                 * @typedef {hudiy.app.api.NavigationManeuverDistance.$Properties} hudiy.app.api.NavigationManeuverDistance.$Shape
                 */

                /**
                 * Constructs a new NavigationManeuverDistance.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a NavigationManeuverDistance.
                 * @constructor
                 * @param {hudiy.app.api.NavigationManeuverDistance.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const NavigationManeuverDistance = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * NavigationManeuverDistance label.
                 * @member {string} label
                 * @memberof hudiy.app.api.NavigationManeuverDistance
                 * @instance
                 */
                NavigationManeuverDistance.prototype.label = "";

                /**
                 * Creates a new NavigationManeuverDistance instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.NavigationManeuverDistance
                 * @static
                 * @param {hudiy.app.api.NavigationManeuverDistance.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.NavigationManeuverDistance} NavigationManeuverDistance instance
                 * @type {{
                 *   (properties: hudiy.app.api.NavigationManeuverDistance.$Shape): hudiy.app.api.NavigationManeuverDistance & hudiy.app.api.NavigationManeuverDistance.$Shape;
                 *   (properties?: hudiy.app.api.NavigationManeuverDistance.$Properties): hudiy.app.api.NavigationManeuverDistance;
                 * }}
                 */
                NavigationManeuverDistance.create = function(properties) {
                    return new NavigationManeuverDistance(properties);
                };

                /**
                 * Encodes the specified NavigationManeuverDistance message. Does not implicitly {@link hudiy.app.api.NavigationManeuverDistance.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.NavigationManeuverDistance
                 * @static
                 * @param {hudiy.app.api.NavigationManeuverDistance.$Properties} message NavigationManeuverDistance message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NavigationManeuverDistance.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.label);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified NavigationManeuverDistance message, length delimited. Does not implicitly {@link hudiy.app.api.NavigationManeuverDistance.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.NavigationManeuverDistance
                 * @static
                 * @param {hudiy.app.api.NavigationManeuverDistance.$Properties} message NavigationManeuverDistance message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                NavigationManeuverDistance.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a NavigationManeuverDistance message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.NavigationManeuverDistance
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.NavigationManeuverDistance & hudiy.app.api.NavigationManeuverDistance.$Shape} NavigationManeuverDistance
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                NavigationManeuverDistance.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.NavigationManeuverDistance();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                message.label = reader.string();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "label"))
                        throw $util.ProtocolError("missing required 'label'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a NavigationManeuverDistance message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.NavigationManeuverDistance
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.NavigationManeuverDistance & hudiy.app.api.NavigationManeuverDistance.$Shape} NavigationManeuverDistance
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                NavigationManeuverDistance.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a NavigationManeuverDistance message.
                 * @function verify
                 * @memberof hudiy.app.api.NavigationManeuverDistance
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                NavigationManeuverDistance.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isString(message.label))
                        return "label: string expected";
                    return null;
                };

                /**
                 * Creates a NavigationManeuverDistance message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.NavigationManeuverDistance
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.NavigationManeuverDistance} NavigationManeuverDistance
                 */
                NavigationManeuverDistance.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.NavigationManeuverDistance)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.NavigationManeuverDistance: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.NavigationManeuverDistance();
                    if (object.label != null)
                        message.label = $String(object.label);
                    return message;
                };

                /**
                 * Creates a plain object from a NavigationManeuverDistance message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.NavigationManeuverDistance
                 * @static
                 * @param {hudiy.app.api.NavigationManeuverDistance} message NavigationManeuverDistance
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                NavigationManeuverDistance.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        object.label = "";
                    if (message.label != null && $Object.hasOwnProperty.call(message, "label"))
                        object.label = message.label;
                    return object;
                };

                /**
                 * Converts this NavigationManeuverDistance to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.NavigationManeuverDistance
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                NavigationManeuverDistance.prototype.toJSON = function() {
                    return NavigationManeuverDistance.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for NavigationManeuverDistance
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.NavigationManeuverDistance
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                NavigationManeuverDistance.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.NavigationManeuverDistance";
                };

                return NavigationManeuverDistance;
            })();

            api.RegisterStatusIconRequest = (function() {

                /**
                 * Properties of a RegisterStatusIconRequest.
                 * @typedef {Object} hudiy.app.api.RegisterStatusIconRequest.$Properties
                 * @property {string} description RegisterStatusIconRequest description
                 * @property {string} iconFontFamily RegisterStatusIconRequest iconFontFamily
                 * @property {string} iconName RegisterStatusIconRequest iconName
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a RegisterStatusIconRequest.
                 * @memberof hudiy.app.api
                 * @interface IRegisterStatusIconRequest
                 * @augments hudiy.app.api.RegisterStatusIconRequest.$Properties
                 * @deprecated Use hudiy.app.api.RegisterStatusIconRequest.$Properties instead.
                 */

                /**
                 * Shape of a RegisterStatusIconRequest.
                 * @typedef {hudiy.app.api.RegisterStatusIconRequest.$Properties} hudiy.app.api.RegisterStatusIconRequest.$Shape
                 */

                /**
                 * Constructs a new RegisterStatusIconRequest.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a RegisterStatusIconRequest.
                 * @constructor
                 * @param {hudiy.app.api.RegisterStatusIconRequest.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const RegisterStatusIconRequest = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * RegisterStatusIconRequest description.
                 * @member {string} description
                 * @memberof hudiy.app.api.RegisterStatusIconRequest
                 * @instance
                 */
                RegisterStatusIconRequest.prototype.description = "";

                /**
                 * RegisterStatusIconRequest iconFontFamily.
                 * @member {string} iconFontFamily
                 * @memberof hudiy.app.api.RegisterStatusIconRequest
                 * @instance
                 */
                RegisterStatusIconRequest.prototype.iconFontFamily = "";

                /**
                 * RegisterStatusIconRequest iconName.
                 * @member {string} iconName
                 * @memberof hudiy.app.api.RegisterStatusIconRequest
                 * @instance
                 */
                RegisterStatusIconRequest.prototype.iconName = "";

                /**
                 * Creates a new RegisterStatusIconRequest instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.RegisterStatusIconRequest
                 * @static
                 * @param {hudiy.app.api.RegisterStatusIconRequest.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.RegisterStatusIconRequest} RegisterStatusIconRequest instance
                 * @type {{
                 *   (properties: hudiy.app.api.RegisterStatusIconRequest.$Shape): hudiy.app.api.RegisterStatusIconRequest & hudiy.app.api.RegisterStatusIconRequest.$Shape;
                 *   (properties?: hudiy.app.api.RegisterStatusIconRequest.$Properties): hudiy.app.api.RegisterStatusIconRequest;
                 * }}
                 */
                RegisterStatusIconRequest.create = function(properties) {
                    return new RegisterStatusIconRequest(properties);
                };

                /**
                 * Encodes the specified RegisterStatusIconRequest message. Does not implicitly {@link hudiy.app.api.RegisterStatusIconRequest.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.RegisterStatusIconRequest
                 * @static
                 * @param {hudiy.app.api.RegisterStatusIconRequest.$Properties} message RegisterStatusIconRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterStatusIconRequest.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.description);
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.iconFontFamily);
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.iconName);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified RegisterStatusIconRequest message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterStatusIconRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.RegisterStatusIconRequest
                 * @static
                 * @param {hudiy.app.api.RegisterStatusIconRequest.$Properties} message RegisterStatusIconRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterStatusIconRequest.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a RegisterStatusIconRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.RegisterStatusIconRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterStatusIconRequest & hudiy.app.api.RegisterStatusIconRequest.$Shape} RegisterStatusIconRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterStatusIconRequest.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.RegisterStatusIconRequest();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                message.description = reader.string();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                message.iconFontFamily = reader.string();
                                continue;
                            }
                        case 3: {
                                if (wireType !== 2)
                                    break;
                                message.iconName = reader.string();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "description"))
                        throw $util.ProtocolError("missing required 'description'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "iconFontFamily"))
                        throw $util.ProtocolError("missing required 'iconFontFamily'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "iconName"))
                        throw $util.ProtocolError("missing required 'iconName'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a RegisterStatusIconRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.RegisterStatusIconRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterStatusIconRequest & hudiy.app.api.RegisterStatusIconRequest.$Shape} RegisterStatusIconRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterStatusIconRequest.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RegisterStatusIconRequest message.
                 * @function verify
                 * @memberof hudiy.app.api.RegisterStatusIconRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RegisterStatusIconRequest.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isString(message.description))
                        return "description: string expected";
                    if (!$util.isString(message.iconFontFamily))
                        return "iconFontFamily: string expected";
                    if (!$util.isString(message.iconName))
                        return "iconName: string expected";
                    return null;
                };

                /**
                 * Creates a RegisterStatusIconRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.RegisterStatusIconRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.RegisterStatusIconRequest} RegisterStatusIconRequest
                 */
                RegisterStatusIconRequest.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.RegisterStatusIconRequest)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.RegisterStatusIconRequest: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.RegisterStatusIconRequest();
                    if (object.description != null)
                        message.description = $String(object.description);
                    if (object.iconFontFamily != null)
                        message.iconFontFamily = $String(object.iconFontFamily);
                    if (object.iconName != null)
                        message.iconName = $String(object.iconName);
                    return message;
                };

                /**
                 * Creates a plain object from a RegisterStatusIconRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.RegisterStatusIconRequest
                 * @static
                 * @param {hudiy.app.api.RegisterStatusIconRequest} message RegisterStatusIconRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RegisterStatusIconRequest.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.description = "";
                        object.iconFontFamily = "";
                        object.iconName = "";
                    }
                    if (message.description != null && $Object.hasOwnProperty.call(message, "description"))
                        object.description = message.description;
                    if (message.iconFontFamily != null && $Object.hasOwnProperty.call(message, "iconFontFamily"))
                        object.iconFontFamily = message.iconFontFamily;
                    if (message.iconName != null && $Object.hasOwnProperty.call(message, "iconName"))
                        object.iconName = message.iconName;
                    return object;
                };

                /**
                 * Converts this RegisterStatusIconRequest to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.RegisterStatusIconRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RegisterStatusIconRequest.prototype.toJSON = function() {
                    return RegisterStatusIconRequest.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for RegisterStatusIconRequest
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.RegisterStatusIconRequest
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                RegisterStatusIconRequest.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.RegisterStatusIconRequest";
                };

                return RegisterStatusIconRequest;
            })();

            api.RegisterStatusIconResponse = (function() {

                /**
                 * Properties of a RegisterStatusIconResponse.
                 * @typedef {Object} hudiy.app.api.RegisterStatusIconResponse.$Properties
                 * @property {hudiy.app.api.RegisterStatusIconResponse.RegisterStatusIconResult} result RegisterStatusIconResponse result
                 * @property {number|null} [id] RegisterStatusIconResponse id
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a RegisterStatusIconResponse.
                 * @memberof hudiy.app.api
                 * @interface IRegisterStatusIconResponse
                 * @augments hudiy.app.api.RegisterStatusIconResponse.$Properties
                 * @deprecated Use hudiy.app.api.RegisterStatusIconResponse.$Properties instead.
                 */

                /**
                 * Shape of a RegisterStatusIconResponse.
                 * @typedef {hudiy.app.api.RegisterStatusIconResponse.$Properties} hudiy.app.api.RegisterStatusIconResponse.$Shape
                 */

                /**
                 * Constructs a new RegisterStatusIconResponse.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a RegisterStatusIconResponse.
                 * @constructor
                 * @param {hudiy.app.api.RegisterStatusIconResponse.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const RegisterStatusIconResponse = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * RegisterStatusIconResponse result.
                 * @member {hudiy.app.api.RegisterStatusIconResponse.RegisterStatusIconResult} result
                 * @memberof hudiy.app.api.RegisterStatusIconResponse
                 * @instance
                 */
                RegisterStatusIconResponse.prototype.result = 1;

                /**
                 * RegisterStatusIconResponse id.
                 * @member {number} id
                 * @memberof hudiy.app.api.RegisterStatusIconResponse
                 * @instance
                 */
                RegisterStatusIconResponse.prototype.id = 0;

                /**
                 * Creates a new RegisterStatusIconResponse instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.RegisterStatusIconResponse
                 * @static
                 * @param {hudiy.app.api.RegisterStatusIconResponse.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.RegisterStatusIconResponse} RegisterStatusIconResponse instance
                 * @type {{
                 *   (properties: hudiy.app.api.RegisterStatusIconResponse.$Shape): hudiy.app.api.RegisterStatusIconResponse & hudiy.app.api.RegisterStatusIconResponse.$Shape;
                 *   (properties?: hudiy.app.api.RegisterStatusIconResponse.$Properties): hudiy.app.api.RegisterStatusIconResponse;
                 * }}
                 */
                RegisterStatusIconResponse.create = function(properties) {
                    return new RegisterStatusIconResponse(properties);
                };

                /**
                 * Encodes the specified RegisterStatusIconResponse message. Does not implicitly {@link hudiy.app.api.RegisterStatusIconResponse.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.RegisterStatusIconResponse
                 * @static
                 * @param {hudiy.app.api.RegisterStatusIconResponse.$Properties} message RegisterStatusIconResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterStatusIconResponse.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.id);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified RegisterStatusIconResponse message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterStatusIconResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.RegisterStatusIconResponse
                 * @static
                 * @param {hudiy.app.api.RegisterStatusIconResponse.$Properties} message RegisterStatusIconResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterStatusIconResponse.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a RegisterStatusIconResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.RegisterStatusIconResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterStatusIconResponse & hudiy.app.api.RegisterStatusIconResponse.$Shape} RegisterStatusIconResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterStatusIconResponse.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.RegisterStatusIconResponse(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.RegisterStatusIconResponse.RegisterStatusIconResult[value] !== $undefined)
                                    message.result = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                message.id = reader.int32();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "result"))
                        throw $util.ProtocolError("missing required 'result'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a RegisterStatusIconResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.RegisterStatusIconResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterStatusIconResponse & hudiy.app.api.RegisterStatusIconResponse.$Shape} RegisterStatusIconResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterStatusIconResponse.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RegisterStatusIconResponse message.
                 * @function verify
                 * @memberof hudiy.app.api.RegisterStatusIconResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RegisterStatusIconResponse.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    switch (message.result) {
                    default:
                        return "result: enum value expected";
                    case 1:
                    case 2:
                        break;
                    }
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        if (!$util.isInteger(message.id))
                            return "id: integer expected";
                    return null;
                };

                /**
                 * Creates a RegisterStatusIconResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.RegisterStatusIconResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.RegisterStatusIconResponse} RegisterStatusIconResponse
                 */
                RegisterStatusIconResponse.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.RegisterStatusIconResponse)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.RegisterStatusIconResponse: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.RegisterStatusIconResponse();
                    switch (object.result) {
                    case "REGISTER_STATUS_ICON_RESULT_OK":
                    case 1:
                        message.result = 1;
                        break;
                    case "REGISTER_STATUS_ICON_RESULT_FAILED":
                    case 2:
                        message.result = 2;
                        break;
                    default:
                    }
                    if (object.id != null)
                        message.id = object.id | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a RegisterStatusIconResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.RegisterStatusIconResponse
                 * @static
                 * @param {hudiy.app.api.RegisterStatusIconResponse} message RegisterStatusIconResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RegisterStatusIconResponse.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.result = options.enums === $String ? "REGISTER_STATUS_ICON_RESULT_OK" : 1;
                        object.id = 0;
                    }
                    if (message.result != null && $Object.hasOwnProperty.call(message, "result"))
                        object.result = options.enums === $String ? $root.hudiy.app.api.RegisterStatusIconResponse.RegisterStatusIconResult[message.result] === $undefined ? message.result : $root.hudiy.app.api.RegisterStatusIconResponse.RegisterStatusIconResult[message.result] : message.result;
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        object.id = message.id;
                    return object;
                };

                /**
                 * Converts this RegisterStatusIconResponse to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.RegisterStatusIconResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RegisterStatusIconResponse.prototype.toJSON = function() {
                    return RegisterStatusIconResponse.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for RegisterStatusIconResponse
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.RegisterStatusIconResponse
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                RegisterStatusIconResponse.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.RegisterStatusIconResponse";
                };

                /**
                 * RegisterStatusIconResult enum.
                 * @name hudiy.app.api.RegisterStatusIconResponse.RegisterStatusIconResult
                 * @enum {number}
                 * @property {number} REGISTER_STATUS_ICON_RESULT_OK=1 REGISTER_STATUS_ICON_RESULT_OK value
                 * @property {number} REGISTER_STATUS_ICON_RESULT_FAILED=2 REGISTER_STATUS_ICON_RESULT_FAILED value
                 */
                RegisterStatusIconResponse.RegisterStatusIconResult = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "REGISTER_STATUS_ICON_RESULT_OK"] = 1;
                    values[valuesById[2] = "REGISTER_STATUS_ICON_RESULT_FAILED"] = 2;
                    return values;
                })();

                return RegisterStatusIconResponse;
            })();

            api.UnregisterStatusIcon = (function() {

                /**
                 * Properties of an UnregisterStatusIcon.
                 * @typedef {Object} hudiy.app.api.UnregisterStatusIcon.$Properties
                 * @property {number} id UnregisterStatusIcon id
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of an UnregisterStatusIcon.
                 * @memberof hudiy.app.api
                 * @interface IUnregisterStatusIcon
                 * @augments hudiy.app.api.UnregisterStatusIcon.$Properties
                 * @deprecated Use hudiy.app.api.UnregisterStatusIcon.$Properties instead.
                 */

                /**
                 * Shape of an UnregisterStatusIcon.
                 * @typedef {hudiy.app.api.UnregisterStatusIcon.$Properties} hudiy.app.api.UnregisterStatusIcon.$Shape
                 */

                /**
                 * Constructs a new UnregisterStatusIcon.
                 * @memberof hudiy.app.api
                 * @classdesc Represents an UnregisterStatusIcon.
                 * @constructor
                 * @param {hudiy.app.api.UnregisterStatusIcon.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const UnregisterStatusIcon = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * UnregisterStatusIcon id.
                 * @member {number} id
                 * @memberof hudiy.app.api.UnregisterStatusIcon
                 * @instance
                 */
                UnregisterStatusIcon.prototype.id = 0;

                /**
                 * Creates a new UnregisterStatusIcon instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.UnregisterStatusIcon
                 * @static
                 * @param {hudiy.app.api.UnregisterStatusIcon.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.UnregisterStatusIcon} UnregisterStatusIcon instance
                 * @type {{
                 *   (properties: hudiy.app.api.UnregisterStatusIcon.$Shape): hudiy.app.api.UnregisterStatusIcon & hudiy.app.api.UnregisterStatusIcon.$Shape;
                 *   (properties?: hudiy.app.api.UnregisterStatusIcon.$Properties): hudiy.app.api.UnregisterStatusIcon;
                 * }}
                 */
                UnregisterStatusIcon.create = function(properties) {
                    return new UnregisterStatusIcon(properties);
                };

                /**
                 * Encodes the specified UnregisterStatusIcon message. Does not implicitly {@link hudiy.app.api.UnregisterStatusIcon.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.UnregisterStatusIcon
                 * @static
                 * @param {hudiy.app.api.UnregisterStatusIcon.$Properties} message UnregisterStatusIcon message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UnregisterStatusIcon.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified UnregisterStatusIcon message, length delimited. Does not implicitly {@link hudiy.app.api.UnregisterStatusIcon.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.UnregisterStatusIcon
                 * @static
                 * @param {hudiy.app.api.UnregisterStatusIcon.$Properties} message UnregisterStatusIcon message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UnregisterStatusIcon.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes an UnregisterStatusIcon message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.UnregisterStatusIcon
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.UnregisterStatusIcon & hudiy.app.api.UnregisterStatusIcon.$Shape} UnregisterStatusIcon
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UnregisterStatusIcon.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.UnregisterStatusIcon();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.id = reader.int32();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "id"))
                        throw $util.ProtocolError("missing required 'id'", { instance: message });
                    return message;
                };

                /**
                 * Decodes an UnregisterStatusIcon message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.UnregisterStatusIcon
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.UnregisterStatusIcon & hudiy.app.api.UnregisterStatusIcon.$Shape} UnregisterStatusIcon
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UnregisterStatusIcon.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an UnregisterStatusIcon message.
                 * @function verify
                 * @memberof hudiy.app.api.UnregisterStatusIcon
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                UnregisterStatusIcon.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                    return null;
                };

                /**
                 * Creates an UnregisterStatusIcon message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.UnregisterStatusIcon
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.UnregisterStatusIcon} UnregisterStatusIcon
                 */
                UnregisterStatusIcon.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.UnregisterStatusIcon)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.UnregisterStatusIcon: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.UnregisterStatusIcon();
                    if (object.id != null)
                        message.id = object.id | 0;
                    return message;
                };

                /**
                 * Creates a plain object from an UnregisterStatusIcon message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.UnregisterStatusIcon
                 * @static
                 * @param {hudiy.app.api.UnregisterStatusIcon} message UnregisterStatusIcon
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                UnregisterStatusIcon.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        object.id = 0;
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        object.id = message.id;
                    return object;
                };

                /**
                 * Converts this UnregisterStatusIcon to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.UnregisterStatusIcon
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                UnregisterStatusIcon.prototype.toJSON = function() {
                    return UnregisterStatusIcon.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for UnregisterStatusIcon
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.UnregisterStatusIcon
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                UnregisterStatusIcon.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.UnregisterStatusIcon";
                };

                return UnregisterStatusIcon;
            })();

            api.ChangeStatusIconState = (function() {

                /**
                 * Properties of a ChangeStatusIconState.
                 * @typedef {Object} hudiy.app.api.ChangeStatusIconState.$Properties
                 * @property {number} id ChangeStatusIconState id
                 * @property {boolean} visible ChangeStatusIconState visible
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a ChangeStatusIconState.
                 * @memberof hudiy.app.api
                 * @interface IChangeStatusIconState
                 * @augments hudiy.app.api.ChangeStatusIconState.$Properties
                 * @deprecated Use hudiy.app.api.ChangeStatusIconState.$Properties instead.
                 */

                /**
                 * Shape of a ChangeStatusIconState.
                 * @typedef {hudiy.app.api.ChangeStatusIconState.$Properties} hudiy.app.api.ChangeStatusIconState.$Shape
                 */

                /**
                 * Constructs a new ChangeStatusIconState.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a ChangeStatusIconState.
                 * @constructor
                 * @param {hudiy.app.api.ChangeStatusIconState.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const ChangeStatusIconState = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * ChangeStatusIconState id.
                 * @member {number} id
                 * @memberof hudiy.app.api.ChangeStatusIconState
                 * @instance
                 */
                ChangeStatusIconState.prototype.id = 0;

                /**
                 * ChangeStatusIconState visible.
                 * @member {boolean} visible
                 * @memberof hudiy.app.api.ChangeStatusIconState
                 * @instance
                 */
                ChangeStatusIconState.prototype.visible = false;

                /**
                 * Creates a new ChangeStatusIconState instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.ChangeStatusIconState
                 * @static
                 * @param {hudiy.app.api.ChangeStatusIconState.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.ChangeStatusIconState} ChangeStatusIconState instance
                 * @type {{
                 *   (properties: hudiy.app.api.ChangeStatusIconState.$Shape): hudiy.app.api.ChangeStatusIconState & hudiy.app.api.ChangeStatusIconState.$Shape;
                 *   (properties?: hudiy.app.api.ChangeStatusIconState.$Properties): hudiy.app.api.ChangeStatusIconState;
                 * }}
                 */
                ChangeStatusIconState.create = function(properties) {
                    return new ChangeStatusIconState(properties);
                };

                /**
                 * Encodes the specified ChangeStatusIconState message. Does not implicitly {@link hudiy.app.api.ChangeStatusIconState.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.ChangeStatusIconState
                 * @static
                 * @param {hudiy.app.api.ChangeStatusIconState.$Properties} message ChangeStatusIconState message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChangeStatusIconState.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.visible);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified ChangeStatusIconState message, length delimited. Does not implicitly {@link hudiy.app.api.ChangeStatusIconState.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.ChangeStatusIconState
                 * @static
                 * @param {hudiy.app.api.ChangeStatusIconState.$Properties} message ChangeStatusIconState message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChangeStatusIconState.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a ChangeStatusIconState message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.ChangeStatusIconState
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.ChangeStatusIconState & hudiy.app.api.ChangeStatusIconState.$Shape} ChangeStatusIconState
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChangeStatusIconState.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.ChangeStatusIconState();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.id = reader.int32();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                message.visible = reader.bool();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "id"))
                        throw $util.ProtocolError("missing required 'id'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "visible"))
                        throw $util.ProtocolError("missing required 'visible'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a ChangeStatusIconState message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.ChangeStatusIconState
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.ChangeStatusIconState & hudiy.app.api.ChangeStatusIconState.$Shape} ChangeStatusIconState
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChangeStatusIconState.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ChangeStatusIconState message.
                 * @function verify
                 * @memberof hudiy.app.api.ChangeStatusIconState
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ChangeStatusIconState.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                    if (typeof message.visible !== "boolean")
                        return "visible: boolean expected";
                    return null;
                };

                /**
                 * Creates a ChangeStatusIconState message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.ChangeStatusIconState
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.ChangeStatusIconState} ChangeStatusIconState
                 */
                ChangeStatusIconState.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.ChangeStatusIconState)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.ChangeStatusIconState: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.ChangeStatusIconState();
                    if (object.id != null)
                        message.id = object.id | 0;
                    if (object.visible != null)
                        message.visible = $Boolean(object.visible);
                    return message;
                };

                /**
                 * Creates a plain object from a ChangeStatusIconState message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.ChangeStatusIconState
                 * @static
                 * @param {hudiy.app.api.ChangeStatusIconState} message ChangeStatusIconState
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ChangeStatusIconState.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.id = 0;
                        object.visible = false;
                    }
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        object.id = message.id;
                    if (message.visible != null && $Object.hasOwnProperty.call(message, "visible"))
                        object.visible = message.visible;
                    return object;
                };

                /**
                 * Converts this ChangeStatusIconState to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.ChangeStatusIconState
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ChangeStatusIconState.prototype.toJSON = function() {
                    return ChangeStatusIconState.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for ChangeStatusIconState
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.ChangeStatusIconState
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                ChangeStatusIconState.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.ChangeStatusIconState";
                };

                return ChangeStatusIconState;
            })();

            api.RegisterNotificationChannelRequest = (function() {

                /**
                 * Properties of a RegisterNotificationChannelRequest.
                 * @typedef {Object} hudiy.app.api.RegisterNotificationChannelRequest.$Properties
                 * @property {string} name RegisterNotificationChannelRequest name
                 * @property {string} description RegisterNotificationChannelRequest description
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a RegisterNotificationChannelRequest.
                 * @memberof hudiy.app.api
                 * @interface IRegisterNotificationChannelRequest
                 * @augments hudiy.app.api.RegisterNotificationChannelRequest.$Properties
                 * @deprecated Use hudiy.app.api.RegisterNotificationChannelRequest.$Properties instead.
                 */

                /**
                 * Shape of a RegisterNotificationChannelRequest.
                 * @typedef {hudiy.app.api.RegisterNotificationChannelRequest.$Properties} hudiy.app.api.RegisterNotificationChannelRequest.$Shape
                 */

                /**
                 * Constructs a new RegisterNotificationChannelRequest.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a RegisterNotificationChannelRequest.
                 * @constructor
                 * @param {hudiy.app.api.RegisterNotificationChannelRequest.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const RegisterNotificationChannelRequest = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * RegisterNotificationChannelRequest name.
                 * @member {string} name
                 * @memberof hudiy.app.api.RegisterNotificationChannelRequest
                 * @instance
                 */
                RegisterNotificationChannelRequest.prototype.name = "";

                /**
                 * RegisterNotificationChannelRequest description.
                 * @member {string} description
                 * @memberof hudiy.app.api.RegisterNotificationChannelRequest
                 * @instance
                 */
                RegisterNotificationChannelRequest.prototype.description = "";

                /**
                 * Creates a new RegisterNotificationChannelRequest instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.RegisterNotificationChannelRequest
                 * @static
                 * @param {hudiy.app.api.RegisterNotificationChannelRequest.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.RegisterNotificationChannelRequest} RegisterNotificationChannelRequest instance
                 * @type {{
                 *   (properties: hudiy.app.api.RegisterNotificationChannelRequest.$Shape): hudiy.app.api.RegisterNotificationChannelRequest & hudiy.app.api.RegisterNotificationChannelRequest.$Shape;
                 *   (properties?: hudiy.app.api.RegisterNotificationChannelRequest.$Properties): hudiy.app.api.RegisterNotificationChannelRequest;
                 * }}
                 */
                RegisterNotificationChannelRequest.create = function(properties) {
                    return new RegisterNotificationChannelRequest(properties);
                };

                /**
                 * Encodes the specified RegisterNotificationChannelRequest message. Does not implicitly {@link hudiy.app.api.RegisterNotificationChannelRequest.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.RegisterNotificationChannelRequest
                 * @static
                 * @param {hudiy.app.api.RegisterNotificationChannelRequest.$Properties} message RegisterNotificationChannelRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterNotificationChannelRequest.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.description);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified RegisterNotificationChannelRequest message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterNotificationChannelRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.RegisterNotificationChannelRequest
                 * @static
                 * @param {hudiy.app.api.RegisterNotificationChannelRequest.$Properties} message RegisterNotificationChannelRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterNotificationChannelRequest.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a RegisterNotificationChannelRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.RegisterNotificationChannelRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterNotificationChannelRequest & hudiy.app.api.RegisterNotificationChannelRequest.$Shape} RegisterNotificationChannelRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterNotificationChannelRequest.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.RegisterNotificationChannelRequest();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                message.name = reader.string();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                message.description = reader.string();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "name"))
                        throw $util.ProtocolError("missing required 'name'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "description"))
                        throw $util.ProtocolError("missing required 'description'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a RegisterNotificationChannelRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.RegisterNotificationChannelRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterNotificationChannelRequest & hudiy.app.api.RegisterNotificationChannelRequest.$Shape} RegisterNotificationChannelRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterNotificationChannelRequest.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RegisterNotificationChannelRequest message.
                 * @function verify
                 * @memberof hudiy.app.api.RegisterNotificationChannelRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RegisterNotificationChannelRequest.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isString(message.name))
                        return "name: string expected";
                    if (!$util.isString(message.description))
                        return "description: string expected";
                    return null;
                };

                /**
                 * Creates a RegisterNotificationChannelRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.RegisterNotificationChannelRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.RegisterNotificationChannelRequest} RegisterNotificationChannelRequest
                 */
                RegisterNotificationChannelRequest.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.RegisterNotificationChannelRequest)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.RegisterNotificationChannelRequest: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.RegisterNotificationChannelRequest();
                    if (object.name != null)
                        message.name = $String(object.name);
                    if (object.description != null)
                        message.description = $String(object.description);
                    return message;
                };

                /**
                 * Creates a plain object from a RegisterNotificationChannelRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.RegisterNotificationChannelRequest
                 * @static
                 * @param {hudiy.app.api.RegisterNotificationChannelRequest} message RegisterNotificationChannelRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RegisterNotificationChannelRequest.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.name = "";
                        object.description = "";
                    }
                    if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                        object.name = message.name;
                    if (message.description != null && $Object.hasOwnProperty.call(message, "description"))
                        object.description = message.description;
                    return object;
                };

                /**
                 * Converts this RegisterNotificationChannelRequest to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.RegisterNotificationChannelRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RegisterNotificationChannelRequest.prototype.toJSON = function() {
                    return RegisterNotificationChannelRequest.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for RegisterNotificationChannelRequest
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.RegisterNotificationChannelRequest
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                RegisterNotificationChannelRequest.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.RegisterNotificationChannelRequest";
                };

                return RegisterNotificationChannelRequest;
            })();

            api.RegisterNotificationChannelResponse = (function() {

                /**
                 * Properties of a RegisterNotificationChannelResponse.
                 * @typedef {Object} hudiy.app.api.RegisterNotificationChannelResponse.$Properties
                 * @property {hudiy.app.api.RegisterNotificationChannelResponse.RegisterNotificationChannelResult} result RegisterNotificationChannelResponse result
                 * @property {number|null} [id] RegisterNotificationChannelResponse id
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a RegisterNotificationChannelResponse.
                 * @memberof hudiy.app.api
                 * @interface IRegisterNotificationChannelResponse
                 * @augments hudiy.app.api.RegisterNotificationChannelResponse.$Properties
                 * @deprecated Use hudiy.app.api.RegisterNotificationChannelResponse.$Properties instead.
                 */

                /**
                 * Shape of a RegisterNotificationChannelResponse.
                 * @typedef {hudiy.app.api.RegisterNotificationChannelResponse.$Properties} hudiy.app.api.RegisterNotificationChannelResponse.$Shape
                 */

                /**
                 * Constructs a new RegisterNotificationChannelResponse.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a RegisterNotificationChannelResponse.
                 * @constructor
                 * @param {hudiy.app.api.RegisterNotificationChannelResponse.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const RegisterNotificationChannelResponse = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * RegisterNotificationChannelResponse result.
                 * @member {hudiy.app.api.RegisterNotificationChannelResponse.RegisterNotificationChannelResult} result
                 * @memberof hudiy.app.api.RegisterNotificationChannelResponse
                 * @instance
                 */
                RegisterNotificationChannelResponse.prototype.result = 1;

                /**
                 * RegisterNotificationChannelResponse id.
                 * @member {number} id
                 * @memberof hudiy.app.api.RegisterNotificationChannelResponse
                 * @instance
                 */
                RegisterNotificationChannelResponse.prototype.id = 0;

                /**
                 * Creates a new RegisterNotificationChannelResponse instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.RegisterNotificationChannelResponse
                 * @static
                 * @param {hudiy.app.api.RegisterNotificationChannelResponse.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.RegisterNotificationChannelResponse} RegisterNotificationChannelResponse instance
                 * @type {{
                 *   (properties: hudiy.app.api.RegisterNotificationChannelResponse.$Shape): hudiy.app.api.RegisterNotificationChannelResponse & hudiy.app.api.RegisterNotificationChannelResponse.$Shape;
                 *   (properties?: hudiy.app.api.RegisterNotificationChannelResponse.$Properties): hudiy.app.api.RegisterNotificationChannelResponse;
                 * }}
                 */
                RegisterNotificationChannelResponse.create = function(properties) {
                    return new RegisterNotificationChannelResponse(properties);
                };

                /**
                 * Encodes the specified RegisterNotificationChannelResponse message. Does not implicitly {@link hudiy.app.api.RegisterNotificationChannelResponse.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.RegisterNotificationChannelResponse
                 * @static
                 * @param {hudiy.app.api.RegisterNotificationChannelResponse.$Properties} message RegisterNotificationChannelResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterNotificationChannelResponse.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.id);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified RegisterNotificationChannelResponse message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterNotificationChannelResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.RegisterNotificationChannelResponse
                 * @static
                 * @param {hudiy.app.api.RegisterNotificationChannelResponse.$Properties} message RegisterNotificationChannelResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterNotificationChannelResponse.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a RegisterNotificationChannelResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.RegisterNotificationChannelResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterNotificationChannelResponse & hudiy.app.api.RegisterNotificationChannelResponse.$Shape} RegisterNotificationChannelResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterNotificationChannelResponse.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.RegisterNotificationChannelResponse(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.RegisterNotificationChannelResponse.RegisterNotificationChannelResult[value] !== $undefined)
                                    message.result = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                message.id = reader.int32();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "result"))
                        throw $util.ProtocolError("missing required 'result'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a RegisterNotificationChannelResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.RegisterNotificationChannelResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterNotificationChannelResponse & hudiy.app.api.RegisterNotificationChannelResponse.$Shape} RegisterNotificationChannelResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterNotificationChannelResponse.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RegisterNotificationChannelResponse message.
                 * @function verify
                 * @memberof hudiy.app.api.RegisterNotificationChannelResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RegisterNotificationChannelResponse.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    switch (message.result) {
                    default:
                        return "result: enum value expected";
                    case 1:
                    case 2:
                        break;
                    }
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        if (!$util.isInteger(message.id))
                            return "id: integer expected";
                    return null;
                };

                /**
                 * Creates a RegisterNotificationChannelResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.RegisterNotificationChannelResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.RegisterNotificationChannelResponse} RegisterNotificationChannelResponse
                 */
                RegisterNotificationChannelResponse.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.RegisterNotificationChannelResponse)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.RegisterNotificationChannelResponse: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.RegisterNotificationChannelResponse();
                    switch (object.result) {
                    case "REGISTER_NOTIFICATION_CHANNEL_RESULT_OK":
                    case 1:
                        message.result = 1;
                        break;
                    case "REGISTER_NOTIFICATION_CHANNEL_RESULT_FAILED":
                    case 2:
                        message.result = 2;
                        break;
                    default:
                    }
                    if (object.id != null)
                        message.id = object.id | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a RegisterNotificationChannelResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.RegisterNotificationChannelResponse
                 * @static
                 * @param {hudiy.app.api.RegisterNotificationChannelResponse} message RegisterNotificationChannelResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RegisterNotificationChannelResponse.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.result = options.enums === $String ? "REGISTER_NOTIFICATION_CHANNEL_RESULT_OK" : 1;
                        object.id = 0;
                    }
                    if (message.result != null && $Object.hasOwnProperty.call(message, "result"))
                        object.result = options.enums === $String ? $root.hudiy.app.api.RegisterNotificationChannelResponse.RegisterNotificationChannelResult[message.result] === $undefined ? message.result : $root.hudiy.app.api.RegisterNotificationChannelResponse.RegisterNotificationChannelResult[message.result] : message.result;
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        object.id = message.id;
                    return object;
                };

                /**
                 * Converts this RegisterNotificationChannelResponse to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.RegisterNotificationChannelResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RegisterNotificationChannelResponse.prototype.toJSON = function() {
                    return RegisterNotificationChannelResponse.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for RegisterNotificationChannelResponse
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.RegisterNotificationChannelResponse
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                RegisterNotificationChannelResponse.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.RegisterNotificationChannelResponse";
                };

                /**
                 * RegisterNotificationChannelResult enum.
                 * @name hudiy.app.api.RegisterNotificationChannelResponse.RegisterNotificationChannelResult
                 * @enum {number}
                 * @property {number} REGISTER_NOTIFICATION_CHANNEL_RESULT_OK=1 REGISTER_NOTIFICATION_CHANNEL_RESULT_OK value
                 * @property {number} REGISTER_NOTIFICATION_CHANNEL_RESULT_FAILED=2 REGISTER_NOTIFICATION_CHANNEL_RESULT_FAILED value
                 */
                RegisterNotificationChannelResponse.RegisterNotificationChannelResult = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "REGISTER_NOTIFICATION_CHANNEL_RESULT_OK"] = 1;
                    values[valuesById[2] = "REGISTER_NOTIFICATION_CHANNEL_RESULT_FAILED"] = 2;
                    return values;
                })();

                return RegisterNotificationChannelResponse;
            })();

            api.UnregisterNotificationChannel = (function() {

                /**
                 * Properties of an UnregisterNotificationChannel.
                 * @typedef {Object} hudiy.app.api.UnregisterNotificationChannel.$Properties
                 * @property {number} id UnregisterNotificationChannel id
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of an UnregisterNotificationChannel.
                 * @memberof hudiy.app.api
                 * @interface IUnregisterNotificationChannel
                 * @augments hudiy.app.api.UnregisterNotificationChannel.$Properties
                 * @deprecated Use hudiy.app.api.UnregisterNotificationChannel.$Properties instead.
                 */

                /**
                 * Shape of an UnregisterNotificationChannel.
                 * @typedef {hudiy.app.api.UnregisterNotificationChannel.$Properties} hudiy.app.api.UnregisterNotificationChannel.$Shape
                 */

                /**
                 * Constructs a new UnregisterNotificationChannel.
                 * @memberof hudiy.app.api
                 * @classdesc Represents an UnregisterNotificationChannel.
                 * @constructor
                 * @param {hudiy.app.api.UnregisterNotificationChannel.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const UnregisterNotificationChannel = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * UnregisterNotificationChannel id.
                 * @member {number} id
                 * @memberof hudiy.app.api.UnregisterNotificationChannel
                 * @instance
                 */
                UnregisterNotificationChannel.prototype.id = 0;

                /**
                 * Creates a new UnregisterNotificationChannel instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.UnregisterNotificationChannel
                 * @static
                 * @param {hudiy.app.api.UnregisterNotificationChannel.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.UnregisterNotificationChannel} UnregisterNotificationChannel instance
                 * @type {{
                 *   (properties: hudiy.app.api.UnregisterNotificationChannel.$Shape): hudiy.app.api.UnregisterNotificationChannel & hudiy.app.api.UnregisterNotificationChannel.$Shape;
                 *   (properties?: hudiy.app.api.UnregisterNotificationChannel.$Properties): hudiy.app.api.UnregisterNotificationChannel;
                 * }}
                 */
                UnregisterNotificationChannel.create = function(properties) {
                    return new UnregisterNotificationChannel(properties);
                };

                /**
                 * Encodes the specified UnregisterNotificationChannel message. Does not implicitly {@link hudiy.app.api.UnregisterNotificationChannel.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.UnregisterNotificationChannel
                 * @static
                 * @param {hudiy.app.api.UnregisterNotificationChannel.$Properties} message UnregisterNotificationChannel message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UnregisterNotificationChannel.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified UnregisterNotificationChannel message, length delimited. Does not implicitly {@link hudiy.app.api.UnregisterNotificationChannel.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.UnregisterNotificationChannel
                 * @static
                 * @param {hudiy.app.api.UnregisterNotificationChannel.$Properties} message UnregisterNotificationChannel message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UnregisterNotificationChannel.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes an UnregisterNotificationChannel message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.UnregisterNotificationChannel
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.UnregisterNotificationChannel & hudiy.app.api.UnregisterNotificationChannel.$Shape} UnregisterNotificationChannel
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UnregisterNotificationChannel.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.UnregisterNotificationChannel();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.id = reader.int32();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "id"))
                        throw $util.ProtocolError("missing required 'id'", { instance: message });
                    return message;
                };

                /**
                 * Decodes an UnregisterNotificationChannel message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.UnregisterNotificationChannel
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.UnregisterNotificationChannel & hudiy.app.api.UnregisterNotificationChannel.$Shape} UnregisterNotificationChannel
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UnregisterNotificationChannel.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an UnregisterNotificationChannel message.
                 * @function verify
                 * @memberof hudiy.app.api.UnregisterNotificationChannel
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                UnregisterNotificationChannel.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                    return null;
                };

                /**
                 * Creates an UnregisterNotificationChannel message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.UnregisterNotificationChannel
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.UnregisterNotificationChannel} UnregisterNotificationChannel
                 */
                UnregisterNotificationChannel.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.UnregisterNotificationChannel)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.UnregisterNotificationChannel: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.UnregisterNotificationChannel();
                    if (object.id != null)
                        message.id = object.id | 0;
                    return message;
                };

                /**
                 * Creates a plain object from an UnregisterNotificationChannel message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.UnregisterNotificationChannel
                 * @static
                 * @param {hudiy.app.api.UnregisterNotificationChannel} message UnregisterNotificationChannel
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                UnregisterNotificationChannel.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        object.id = 0;
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        object.id = message.id;
                    return object;
                };

                /**
                 * Converts this UnregisterNotificationChannel to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.UnregisterNotificationChannel
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                UnregisterNotificationChannel.prototype.toJSON = function() {
                    return UnregisterNotificationChannel.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for UnregisterNotificationChannel
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.UnregisterNotificationChannel
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                UnregisterNotificationChannel.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.UnregisterNotificationChannel";
                };

                return UnregisterNotificationChannel;
            })();

            api.ShowNotification = (function() {

                /**
                 * Properties of a ShowNotification.
                 * @typedef {Object} hudiy.app.api.ShowNotification.$Properties
                 * @property {number} channelId ShowNotification channelId
                 * @property {string} title ShowNotification title
                 * @property {string} description ShowNotification description
                 * @property {string} iconFontFamily ShowNotification iconFontFamily
                 * @property {string} iconName ShowNotification iconName
                 * @property {string} action ShowNotification action
                 * @property {boolean} playSound ShowNotification playSound
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a ShowNotification.
                 * @memberof hudiy.app.api
                 * @interface IShowNotification
                 * @augments hudiy.app.api.ShowNotification.$Properties
                 * @deprecated Use hudiy.app.api.ShowNotification.$Properties instead.
                 */

                /**
                 * Shape of a ShowNotification.
                 * @typedef {hudiy.app.api.ShowNotification.$Properties} hudiy.app.api.ShowNotification.$Shape
                 */

                /**
                 * Constructs a new ShowNotification.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a ShowNotification.
                 * @constructor
                 * @param {hudiy.app.api.ShowNotification.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const ShowNotification = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * ShowNotification channelId.
                 * @member {number} channelId
                 * @memberof hudiy.app.api.ShowNotification
                 * @instance
                 */
                ShowNotification.prototype.channelId = 0;

                /**
                 * ShowNotification title.
                 * @member {string} title
                 * @memberof hudiy.app.api.ShowNotification
                 * @instance
                 */
                ShowNotification.prototype.title = "";

                /**
                 * ShowNotification description.
                 * @member {string} description
                 * @memberof hudiy.app.api.ShowNotification
                 * @instance
                 */
                ShowNotification.prototype.description = "";

                /**
                 * ShowNotification iconFontFamily.
                 * @member {string} iconFontFamily
                 * @memberof hudiy.app.api.ShowNotification
                 * @instance
                 */
                ShowNotification.prototype.iconFontFamily = "";

                /**
                 * ShowNotification iconName.
                 * @member {string} iconName
                 * @memberof hudiy.app.api.ShowNotification
                 * @instance
                 */
                ShowNotification.prototype.iconName = "";

                /**
                 * ShowNotification action.
                 * @member {string} action
                 * @memberof hudiy.app.api.ShowNotification
                 * @instance
                 */
                ShowNotification.prototype.action = "";

                /**
                 * ShowNotification playSound.
                 * @member {boolean} playSound
                 * @memberof hudiy.app.api.ShowNotification
                 * @instance
                 */
                ShowNotification.prototype.playSound = false;

                /**
                 * Creates a new ShowNotification instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.ShowNotification
                 * @static
                 * @param {hudiy.app.api.ShowNotification.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.ShowNotification} ShowNotification instance
                 * @type {{
                 *   (properties: hudiy.app.api.ShowNotification.$Shape): hudiy.app.api.ShowNotification & hudiy.app.api.ShowNotification.$Shape;
                 *   (properties?: hudiy.app.api.ShowNotification.$Properties): hudiy.app.api.ShowNotification;
                 * }}
                 */
                ShowNotification.create = function(properties) {
                    return new ShowNotification(properties);
                };

                /**
                 * Encodes the specified ShowNotification message. Does not implicitly {@link hudiy.app.api.ShowNotification.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.ShowNotification
                 * @static
                 * @param {hudiy.app.api.ShowNotification.$Properties} message ShowNotification message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ShowNotification.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.channelId);
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.title);
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.description);
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.iconFontFamily);
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.iconName);
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.action);
                    writer.uint32(/* id 7, wireType 0 =*/56).bool(message.playSound);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified ShowNotification message, length delimited. Does not implicitly {@link hudiy.app.api.ShowNotification.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.ShowNotification
                 * @static
                 * @param {hudiy.app.api.ShowNotification.$Properties} message ShowNotification message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ShowNotification.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a ShowNotification message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.ShowNotification
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.ShowNotification & hudiy.app.api.ShowNotification.$Shape} ShowNotification
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ShowNotification.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.ShowNotification();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.channelId = reader.int32();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                message.title = reader.string();
                                continue;
                            }
                        case 3: {
                                if (wireType !== 2)
                                    break;
                                message.description = reader.string();
                                continue;
                            }
                        case 4: {
                                if (wireType !== 2)
                                    break;
                                message.iconFontFamily = reader.string();
                                continue;
                            }
                        case 5: {
                                if (wireType !== 2)
                                    break;
                                message.iconName = reader.string();
                                continue;
                            }
                        case 6: {
                                if (wireType !== 2)
                                    break;
                                message.action = reader.string();
                                continue;
                            }
                        case 7: {
                                if (wireType !== 0)
                                    break;
                                message.playSound = reader.bool();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "channelId"))
                        throw $util.ProtocolError("missing required 'channelId'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "title"))
                        throw $util.ProtocolError("missing required 'title'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "description"))
                        throw $util.ProtocolError("missing required 'description'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "iconFontFamily"))
                        throw $util.ProtocolError("missing required 'iconFontFamily'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "iconName"))
                        throw $util.ProtocolError("missing required 'iconName'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "action"))
                        throw $util.ProtocolError("missing required 'action'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "playSound"))
                        throw $util.ProtocolError("missing required 'playSound'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a ShowNotification message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.ShowNotification
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.ShowNotification & hudiy.app.api.ShowNotification.$Shape} ShowNotification
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ShowNotification.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ShowNotification message.
                 * @function verify
                 * @memberof hudiy.app.api.ShowNotification
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ShowNotification.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isInteger(message.channelId))
                        return "channelId: integer expected";
                    if (!$util.isString(message.title))
                        return "title: string expected";
                    if (!$util.isString(message.description))
                        return "description: string expected";
                    if (!$util.isString(message.iconFontFamily))
                        return "iconFontFamily: string expected";
                    if (!$util.isString(message.iconName))
                        return "iconName: string expected";
                    if (!$util.isString(message.action))
                        return "action: string expected";
                    if (typeof message.playSound !== "boolean")
                        return "playSound: boolean expected";
                    return null;
                };

                /**
                 * Creates a ShowNotification message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.ShowNotification
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.ShowNotification} ShowNotification
                 */
                ShowNotification.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.ShowNotification)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.ShowNotification: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.ShowNotification();
                    if (object.channelId != null)
                        message.channelId = object.channelId | 0;
                    if (object.title != null)
                        message.title = $String(object.title);
                    if (object.description != null)
                        message.description = $String(object.description);
                    if (object.iconFontFamily != null)
                        message.iconFontFamily = $String(object.iconFontFamily);
                    if (object.iconName != null)
                        message.iconName = $String(object.iconName);
                    if (object.action != null)
                        message.action = $String(object.action);
                    if (object.playSound != null)
                        message.playSound = $Boolean(object.playSound);
                    return message;
                };

                /**
                 * Creates a plain object from a ShowNotification message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.ShowNotification
                 * @static
                 * @param {hudiy.app.api.ShowNotification} message ShowNotification
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ShowNotification.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.channelId = 0;
                        object.title = "";
                        object.description = "";
                        object.iconFontFamily = "";
                        object.iconName = "";
                        object.action = "";
                        object.playSound = false;
                    }
                    if (message.channelId != null && $Object.hasOwnProperty.call(message, "channelId"))
                        object.channelId = message.channelId;
                    if (message.title != null && $Object.hasOwnProperty.call(message, "title"))
                        object.title = message.title;
                    if (message.description != null && $Object.hasOwnProperty.call(message, "description"))
                        object.description = message.description;
                    if (message.iconFontFamily != null && $Object.hasOwnProperty.call(message, "iconFontFamily"))
                        object.iconFontFamily = message.iconFontFamily;
                    if (message.iconName != null && $Object.hasOwnProperty.call(message, "iconName"))
                        object.iconName = message.iconName;
                    if (message.action != null && $Object.hasOwnProperty.call(message, "action"))
                        object.action = message.action;
                    if (message.playSound != null && $Object.hasOwnProperty.call(message, "playSound"))
                        object.playSound = message.playSound;
                    return object;
                };

                /**
                 * Converts this ShowNotification to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.ShowNotification
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ShowNotification.prototype.toJSON = function() {
                    return ShowNotification.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for ShowNotification
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.ShowNotification
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                ShowNotification.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.ShowNotification";
                };

                return ShowNotification;
            })();

            api.RegisterToastChannelRequest = (function() {

                /**
                 * Properties of a RegisterToastChannelRequest.
                 * @typedef {Object} hudiy.app.api.RegisterToastChannelRequest.$Properties
                 * @property {string} name RegisterToastChannelRequest name
                 * @property {string} description RegisterToastChannelRequest description
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a RegisterToastChannelRequest.
                 * @memberof hudiy.app.api
                 * @interface IRegisterToastChannelRequest
                 * @augments hudiy.app.api.RegisterToastChannelRequest.$Properties
                 * @deprecated Use hudiy.app.api.RegisterToastChannelRequest.$Properties instead.
                 */

                /**
                 * Shape of a RegisterToastChannelRequest.
                 * @typedef {hudiy.app.api.RegisterToastChannelRequest.$Properties} hudiy.app.api.RegisterToastChannelRequest.$Shape
                 */

                /**
                 * Constructs a new RegisterToastChannelRequest.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a RegisterToastChannelRequest.
                 * @constructor
                 * @param {hudiy.app.api.RegisterToastChannelRequest.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const RegisterToastChannelRequest = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * RegisterToastChannelRequest name.
                 * @member {string} name
                 * @memberof hudiy.app.api.RegisterToastChannelRequest
                 * @instance
                 */
                RegisterToastChannelRequest.prototype.name = "";

                /**
                 * RegisterToastChannelRequest description.
                 * @member {string} description
                 * @memberof hudiy.app.api.RegisterToastChannelRequest
                 * @instance
                 */
                RegisterToastChannelRequest.prototype.description = "";

                /**
                 * Creates a new RegisterToastChannelRequest instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.RegisterToastChannelRequest
                 * @static
                 * @param {hudiy.app.api.RegisterToastChannelRequest.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.RegisterToastChannelRequest} RegisterToastChannelRequest instance
                 * @type {{
                 *   (properties: hudiy.app.api.RegisterToastChannelRequest.$Shape): hudiy.app.api.RegisterToastChannelRequest & hudiy.app.api.RegisterToastChannelRequest.$Shape;
                 *   (properties?: hudiy.app.api.RegisterToastChannelRequest.$Properties): hudiy.app.api.RegisterToastChannelRequest;
                 * }}
                 */
                RegisterToastChannelRequest.create = function(properties) {
                    return new RegisterToastChannelRequest(properties);
                };

                /**
                 * Encodes the specified RegisterToastChannelRequest message. Does not implicitly {@link hudiy.app.api.RegisterToastChannelRequest.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.RegisterToastChannelRequest
                 * @static
                 * @param {hudiy.app.api.RegisterToastChannelRequest.$Properties} message RegisterToastChannelRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterToastChannelRequest.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.description);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified RegisterToastChannelRequest message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterToastChannelRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.RegisterToastChannelRequest
                 * @static
                 * @param {hudiy.app.api.RegisterToastChannelRequest.$Properties} message RegisterToastChannelRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterToastChannelRequest.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a RegisterToastChannelRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.RegisterToastChannelRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterToastChannelRequest & hudiy.app.api.RegisterToastChannelRequest.$Shape} RegisterToastChannelRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterToastChannelRequest.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.RegisterToastChannelRequest();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                message.name = reader.string();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                message.description = reader.string();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "name"))
                        throw $util.ProtocolError("missing required 'name'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "description"))
                        throw $util.ProtocolError("missing required 'description'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a RegisterToastChannelRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.RegisterToastChannelRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterToastChannelRequest & hudiy.app.api.RegisterToastChannelRequest.$Shape} RegisterToastChannelRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterToastChannelRequest.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RegisterToastChannelRequest message.
                 * @function verify
                 * @memberof hudiy.app.api.RegisterToastChannelRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RegisterToastChannelRequest.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isString(message.name))
                        return "name: string expected";
                    if (!$util.isString(message.description))
                        return "description: string expected";
                    return null;
                };

                /**
                 * Creates a RegisterToastChannelRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.RegisterToastChannelRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.RegisterToastChannelRequest} RegisterToastChannelRequest
                 */
                RegisterToastChannelRequest.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.RegisterToastChannelRequest)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.RegisterToastChannelRequest: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.RegisterToastChannelRequest();
                    if (object.name != null)
                        message.name = $String(object.name);
                    if (object.description != null)
                        message.description = $String(object.description);
                    return message;
                };

                /**
                 * Creates a plain object from a RegisterToastChannelRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.RegisterToastChannelRequest
                 * @static
                 * @param {hudiy.app.api.RegisterToastChannelRequest} message RegisterToastChannelRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RegisterToastChannelRequest.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.name = "";
                        object.description = "";
                    }
                    if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                        object.name = message.name;
                    if (message.description != null && $Object.hasOwnProperty.call(message, "description"))
                        object.description = message.description;
                    return object;
                };

                /**
                 * Converts this RegisterToastChannelRequest to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.RegisterToastChannelRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RegisterToastChannelRequest.prototype.toJSON = function() {
                    return RegisterToastChannelRequest.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for RegisterToastChannelRequest
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.RegisterToastChannelRequest
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                RegisterToastChannelRequest.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.RegisterToastChannelRequest";
                };

                return RegisterToastChannelRequest;
            })();

            api.RegisterToastChannelResponse = (function() {

                /**
                 * Properties of a RegisterToastChannelResponse.
                 * @typedef {Object} hudiy.app.api.RegisterToastChannelResponse.$Properties
                 * @property {hudiy.app.api.RegisterToastChannelResponse.RegisterToastChannelResult} result RegisterToastChannelResponse result
                 * @property {number|null} [id] RegisterToastChannelResponse id
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a RegisterToastChannelResponse.
                 * @memberof hudiy.app.api
                 * @interface IRegisterToastChannelResponse
                 * @augments hudiy.app.api.RegisterToastChannelResponse.$Properties
                 * @deprecated Use hudiy.app.api.RegisterToastChannelResponse.$Properties instead.
                 */

                /**
                 * Shape of a RegisterToastChannelResponse.
                 * @typedef {hudiy.app.api.RegisterToastChannelResponse.$Properties} hudiy.app.api.RegisterToastChannelResponse.$Shape
                 */

                /**
                 * Constructs a new RegisterToastChannelResponse.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a RegisterToastChannelResponse.
                 * @constructor
                 * @param {hudiy.app.api.RegisterToastChannelResponse.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const RegisterToastChannelResponse = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * RegisterToastChannelResponse result.
                 * @member {hudiy.app.api.RegisterToastChannelResponse.RegisterToastChannelResult} result
                 * @memberof hudiy.app.api.RegisterToastChannelResponse
                 * @instance
                 */
                RegisterToastChannelResponse.prototype.result = 1;

                /**
                 * RegisterToastChannelResponse id.
                 * @member {number} id
                 * @memberof hudiy.app.api.RegisterToastChannelResponse
                 * @instance
                 */
                RegisterToastChannelResponse.prototype.id = 0;

                /**
                 * Creates a new RegisterToastChannelResponse instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.RegisterToastChannelResponse
                 * @static
                 * @param {hudiy.app.api.RegisterToastChannelResponse.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.RegisterToastChannelResponse} RegisterToastChannelResponse instance
                 * @type {{
                 *   (properties: hudiy.app.api.RegisterToastChannelResponse.$Shape): hudiy.app.api.RegisterToastChannelResponse & hudiy.app.api.RegisterToastChannelResponse.$Shape;
                 *   (properties?: hudiy.app.api.RegisterToastChannelResponse.$Properties): hudiy.app.api.RegisterToastChannelResponse;
                 * }}
                 */
                RegisterToastChannelResponse.create = function(properties) {
                    return new RegisterToastChannelResponse(properties);
                };

                /**
                 * Encodes the specified RegisterToastChannelResponse message. Does not implicitly {@link hudiy.app.api.RegisterToastChannelResponse.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.RegisterToastChannelResponse
                 * @static
                 * @param {hudiy.app.api.RegisterToastChannelResponse.$Properties} message RegisterToastChannelResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterToastChannelResponse.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.id);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified RegisterToastChannelResponse message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterToastChannelResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.RegisterToastChannelResponse
                 * @static
                 * @param {hudiy.app.api.RegisterToastChannelResponse.$Properties} message RegisterToastChannelResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterToastChannelResponse.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a RegisterToastChannelResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.RegisterToastChannelResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterToastChannelResponse & hudiy.app.api.RegisterToastChannelResponse.$Shape} RegisterToastChannelResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterToastChannelResponse.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.RegisterToastChannelResponse(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.RegisterToastChannelResponse.RegisterToastChannelResult[value] !== $undefined)
                                    message.result = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                message.id = reader.int32();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "result"))
                        throw $util.ProtocolError("missing required 'result'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a RegisterToastChannelResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.RegisterToastChannelResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterToastChannelResponse & hudiy.app.api.RegisterToastChannelResponse.$Shape} RegisterToastChannelResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterToastChannelResponse.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RegisterToastChannelResponse message.
                 * @function verify
                 * @memberof hudiy.app.api.RegisterToastChannelResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RegisterToastChannelResponse.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    switch (message.result) {
                    default:
                        return "result: enum value expected";
                    case 1:
                    case 2:
                        break;
                    }
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        if (!$util.isInteger(message.id))
                            return "id: integer expected";
                    return null;
                };

                /**
                 * Creates a RegisterToastChannelResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.RegisterToastChannelResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.RegisterToastChannelResponse} RegisterToastChannelResponse
                 */
                RegisterToastChannelResponse.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.RegisterToastChannelResponse)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.RegisterToastChannelResponse: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.RegisterToastChannelResponse();
                    switch (object.result) {
                    case "REGISTER_TOAST_CHANNEL_RESULT_OK":
                    case 1:
                        message.result = 1;
                        break;
                    case "REGISTER_TOAST_CHANNEL_RESULT_FAILED":
                    case 2:
                        message.result = 2;
                        break;
                    default:
                    }
                    if (object.id != null)
                        message.id = object.id | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a RegisterToastChannelResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.RegisterToastChannelResponse
                 * @static
                 * @param {hudiy.app.api.RegisterToastChannelResponse} message RegisterToastChannelResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RegisterToastChannelResponse.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.result = options.enums === $String ? "REGISTER_TOAST_CHANNEL_RESULT_OK" : 1;
                        object.id = 0;
                    }
                    if (message.result != null && $Object.hasOwnProperty.call(message, "result"))
                        object.result = options.enums === $String ? $root.hudiy.app.api.RegisterToastChannelResponse.RegisterToastChannelResult[message.result] === $undefined ? message.result : $root.hudiy.app.api.RegisterToastChannelResponse.RegisterToastChannelResult[message.result] : message.result;
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        object.id = message.id;
                    return object;
                };

                /**
                 * Converts this RegisterToastChannelResponse to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.RegisterToastChannelResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RegisterToastChannelResponse.prototype.toJSON = function() {
                    return RegisterToastChannelResponse.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for RegisterToastChannelResponse
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.RegisterToastChannelResponse
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                RegisterToastChannelResponse.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.RegisterToastChannelResponse";
                };

                /**
                 * RegisterToastChannelResult enum.
                 * @name hudiy.app.api.RegisterToastChannelResponse.RegisterToastChannelResult
                 * @enum {number}
                 * @property {number} REGISTER_TOAST_CHANNEL_RESULT_OK=1 REGISTER_TOAST_CHANNEL_RESULT_OK value
                 * @property {number} REGISTER_TOAST_CHANNEL_RESULT_FAILED=2 REGISTER_TOAST_CHANNEL_RESULT_FAILED value
                 */
                RegisterToastChannelResponse.RegisterToastChannelResult = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "REGISTER_TOAST_CHANNEL_RESULT_OK"] = 1;
                    values[valuesById[2] = "REGISTER_TOAST_CHANNEL_RESULT_FAILED"] = 2;
                    return values;
                })();

                return RegisterToastChannelResponse;
            })();

            api.UnregisterToastChannel = (function() {

                /**
                 * Properties of an UnregisterToastChannel.
                 * @typedef {Object} hudiy.app.api.UnregisterToastChannel.$Properties
                 * @property {number} id UnregisterToastChannel id
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of an UnregisterToastChannel.
                 * @memberof hudiy.app.api
                 * @interface IUnregisterToastChannel
                 * @augments hudiy.app.api.UnregisterToastChannel.$Properties
                 * @deprecated Use hudiy.app.api.UnregisterToastChannel.$Properties instead.
                 */

                /**
                 * Shape of an UnregisterToastChannel.
                 * @typedef {hudiy.app.api.UnregisterToastChannel.$Properties} hudiy.app.api.UnregisterToastChannel.$Shape
                 */

                /**
                 * Constructs a new UnregisterToastChannel.
                 * @memberof hudiy.app.api
                 * @classdesc Represents an UnregisterToastChannel.
                 * @constructor
                 * @param {hudiy.app.api.UnregisterToastChannel.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const UnregisterToastChannel = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * UnregisterToastChannel id.
                 * @member {number} id
                 * @memberof hudiy.app.api.UnregisterToastChannel
                 * @instance
                 */
                UnregisterToastChannel.prototype.id = 0;

                /**
                 * Creates a new UnregisterToastChannel instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.UnregisterToastChannel
                 * @static
                 * @param {hudiy.app.api.UnregisterToastChannel.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.UnregisterToastChannel} UnregisterToastChannel instance
                 * @type {{
                 *   (properties: hudiy.app.api.UnregisterToastChannel.$Shape): hudiy.app.api.UnregisterToastChannel & hudiy.app.api.UnregisterToastChannel.$Shape;
                 *   (properties?: hudiy.app.api.UnregisterToastChannel.$Properties): hudiy.app.api.UnregisterToastChannel;
                 * }}
                 */
                UnregisterToastChannel.create = function(properties) {
                    return new UnregisterToastChannel(properties);
                };

                /**
                 * Encodes the specified UnregisterToastChannel message. Does not implicitly {@link hudiy.app.api.UnregisterToastChannel.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.UnregisterToastChannel
                 * @static
                 * @param {hudiy.app.api.UnregisterToastChannel.$Properties} message UnregisterToastChannel message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UnregisterToastChannel.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified UnregisterToastChannel message, length delimited. Does not implicitly {@link hudiy.app.api.UnregisterToastChannel.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.UnregisterToastChannel
                 * @static
                 * @param {hudiy.app.api.UnregisterToastChannel.$Properties} message UnregisterToastChannel message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UnregisterToastChannel.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes an UnregisterToastChannel message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.UnregisterToastChannel
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.UnregisterToastChannel & hudiy.app.api.UnregisterToastChannel.$Shape} UnregisterToastChannel
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UnregisterToastChannel.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.UnregisterToastChannel();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.id = reader.int32();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "id"))
                        throw $util.ProtocolError("missing required 'id'", { instance: message });
                    return message;
                };

                /**
                 * Decodes an UnregisterToastChannel message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.UnregisterToastChannel
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.UnregisterToastChannel & hudiy.app.api.UnregisterToastChannel.$Shape} UnregisterToastChannel
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UnregisterToastChannel.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an UnregisterToastChannel message.
                 * @function verify
                 * @memberof hudiy.app.api.UnregisterToastChannel
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                UnregisterToastChannel.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                    return null;
                };

                /**
                 * Creates an UnregisterToastChannel message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.UnregisterToastChannel
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.UnregisterToastChannel} UnregisterToastChannel
                 */
                UnregisterToastChannel.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.UnregisterToastChannel)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.UnregisterToastChannel: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.UnregisterToastChannel();
                    if (object.id != null)
                        message.id = object.id | 0;
                    return message;
                };

                /**
                 * Creates a plain object from an UnregisterToastChannel message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.UnregisterToastChannel
                 * @static
                 * @param {hudiy.app.api.UnregisterToastChannel} message UnregisterToastChannel
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                UnregisterToastChannel.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        object.id = 0;
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        object.id = message.id;
                    return object;
                };

                /**
                 * Converts this UnregisterToastChannel to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.UnregisterToastChannel
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                UnregisterToastChannel.prototype.toJSON = function() {
                    return UnregisterToastChannel.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for UnregisterToastChannel
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.UnregisterToastChannel
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                UnregisterToastChannel.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.UnregisterToastChannel";
                };

                return UnregisterToastChannel;
            })();

            api.ShowToast = (function() {

                /**
                 * Properties of a ShowToast.
                 * @typedef {Object} hudiy.app.api.ShowToast.$Properties
                 * @property {number} channelId ShowToast channelId
                 * @property {string} message ShowToast message
                 * @property {string} iconFontFamily ShowToast iconFontFamily
                 * @property {string} iconName ShowToast iconName
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a ShowToast.
                 * @memberof hudiy.app.api
                 * @interface IShowToast
                 * @augments hudiy.app.api.ShowToast.$Properties
                 * @deprecated Use hudiy.app.api.ShowToast.$Properties instead.
                 */

                /**
                 * Shape of a ShowToast.
                 * @typedef {hudiy.app.api.ShowToast.$Properties} hudiy.app.api.ShowToast.$Shape
                 */

                /**
                 * Constructs a new ShowToast.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a ShowToast.
                 * @constructor
                 * @param {hudiy.app.api.ShowToast.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const ShowToast = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * ShowToast channelId.
                 * @member {number} channelId
                 * @memberof hudiy.app.api.ShowToast
                 * @instance
                 */
                ShowToast.prototype.channelId = 0;

                /**
                 * ShowToast message.
                 * @member {string} message
                 * @memberof hudiy.app.api.ShowToast
                 * @instance
                 */
                ShowToast.prototype.message = "";

                /**
                 * ShowToast iconFontFamily.
                 * @member {string} iconFontFamily
                 * @memberof hudiy.app.api.ShowToast
                 * @instance
                 */
                ShowToast.prototype.iconFontFamily = "";

                /**
                 * ShowToast iconName.
                 * @member {string} iconName
                 * @memberof hudiy.app.api.ShowToast
                 * @instance
                 */
                ShowToast.prototype.iconName = "";

                /**
                 * Creates a new ShowToast instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.ShowToast
                 * @static
                 * @param {hudiy.app.api.ShowToast.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.ShowToast} ShowToast instance
                 * @type {{
                 *   (properties: hudiy.app.api.ShowToast.$Shape): hudiy.app.api.ShowToast & hudiy.app.api.ShowToast.$Shape;
                 *   (properties?: hudiy.app.api.ShowToast.$Properties): hudiy.app.api.ShowToast;
                 * }}
                 */
                ShowToast.create = function(properties) {
                    return new ShowToast(properties);
                };

                /**
                 * Encodes the specified ShowToast message. Does not implicitly {@link hudiy.app.api.ShowToast.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.ShowToast
                 * @static
                 * @param {hudiy.app.api.ShowToast.$Properties} message ShowToast message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ShowToast.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.channelId);
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.iconFontFamily);
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.iconName);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified ShowToast message, length delimited. Does not implicitly {@link hudiy.app.api.ShowToast.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.ShowToast
                 * @static
                 * @param {hudiy.app.api.ShowToast.$Properties} message ShowToast message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ShowToast.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a ShowToast message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.ShowToast
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.ShowToast & hudiy.app.api.ShowToast.$Shape} ShowToast
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ShowToast.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.ShowToast();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.channelId = reader.int32();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                message.message = reader.string();
                                continue;
                            }
                        case 3: {
                                if (wireType !== 2)
                                    break;
                                message.iconFontFamily = reader.string();
                                continue;
                            }
                        case 4: {
                                if (wireType !== 2)
                                    break;
                                message.iconName = reader.string();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "channelId"))
                        throw $util.ProtocolError("missing required 'channelId'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "message"))
                        throw $util.ProtocolError("missing required 'message'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "iconFontFamily"))
                        throw $util.ProtocolError("missing required 'iconFontFamily'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "iconName"))
                        throw $util.ProtocolError("missing required 'iconName'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a ShowToast message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.ShowToast
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.ShowToast & hudiy.app.api.ShowToast.$Shape} ShowToast
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ShowToast.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ShowToast message.
                 * @function verify
                 * @memberof hudiy.app.api.ShowToast
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ShowToast.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isInteger(message.channelId))
                        return "channelId: integer expected";
                    if (!$util.isString(message.message))
                        return "message: string expected";
                    if (!$util.isString(message.iconFontFamily))
                        return "iconFontFamily: string expected";
                    if (!$util.isString(message.iconName))
                        return "iconName: string expected";
                    return null;
                };

                /**
                 * Creates a ShowToast message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.ShowToast
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.ShowToast} ShowToast
                 */
                ShowToast.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.ShowToast)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.ShowToast: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.ShowToast();
                    if (object.channelId != null)
                        message.channelId = object.channelId | 0;
                    if (object.message != null)
                        message.message = $String(object.message);
                    if (object.iconFontFamily != null)
                        message.iconFontFamily = $String(object.iconFontFamily);
                    if (object.iconName != null)
                        message.iconName = $String(object.iconName);
                    return message;
                };

                /**
                 * Creates a plain object from a ShowToast message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.ShowToast
                 * @static
                 * @param {hudiy.app.api.ShowToast} message ShowToast
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ShowToast.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.channelId = 0;
                        object.message = "";
                        object.iconFontFamily = "";
                        object.iconName = "";
                    }
                    if (message.channelId != null && $Object.hasOwnProperty.call(message, "channelId"))
                        object.channelId = message.channelId;
                    if (message.message != null && $Object.hasOwnProperty.call(message, "message"))
                        object.message = message.message;
                    if (message.iconFontFamily != null && $Object.hasOwnProperty.call(message, "iconFontFamily"))
                        object.iconFontFamily = message.iconFontFamily;
                    if (message.iconName != null && $Object.hasOwnProperty.call(message, "iconName"))
                        object.iconName = message.iconName;
                    return object;
                };

                /**
                 * Converts this ShowToast to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.ShowToast
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ShowToast.prototype.toJSON = function() {
                    return ShowToast.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for ShowToast
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.ShowToast
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                ShowToast.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.ShowToast";
                };

                return ShowToast;
            })();

            api.ObdConnectionStatus = (function() {

                /**
                 * Properties of an ObdConnectionStatus.
                 * @typedef {Object} hudiy.app.api.ObdConnectionStatus.$Properties
                 * @property {hudiy.app.api.ObdConnectionStatus.ObdConnectionState} state ObdConnectionStatus state
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of an ObdConnectionStatus.
                 * @memberof hudiy.app.api
                 * @interface IObdConnectionStatus
                 * @augments hudiy.app.api.ObdConnectionStatus.$Properties
                 * @deprecated Use hudiy.app.api.ObdConnectionStatus.$Properties instead.
                 */

                /**
                 * Shape of an ObdConnectionStatus.
                 * @typedef {hudiy.app.api.ObdConnectionStatus.$Properties} hudiy.app.api.ObdConnectionStatus.$Shape
                 */

                /**
                 * Constructs a new ObdConnectionStatus.
                 * @memberof hudiy.app.api
                 * @classdesc Represents an ObdConnectionStatus.
                 * @constructor
                 * @param {hudiy.app.api.ObdConnectionStatus.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const ObdConnectionStatus = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * ObdConnectionStatus state.
                 * @member {hudiy.app.api.ObdConnectionStatus.ObdConnectionState} state
                 * @memberof hudiy.app.api.ObdConnectionStatus
                 * @instance
                 */
                ObdConnectionStatus.prototype.state = 1;

                /**
                 * Creates a new ObdConnectionStatus instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.ObdConnectionStatus
                 * @static
                 * @param {hudiy.app.api.ObdConnectionStatus.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.ObdConnectionStatus} ObdConnectionStatus instance
                 * @type {{
                 *   (properties: hudiy.app.api.ObdConnectionStatus.$Shape): hudiy.app.api.ObdConnectionStatus & hudiy.app.api.ObdConnectionStatus.$Shape;
                 *   (properties?: hudiy.app.api.ObdConnectionStatus.$Properties): hudiy.app.api.ObdConnectionStatus;
                 * }}
                 */
                ObdConnectionStatus.create = function(properties) {
                    return new ObdConnectionStatus(properties);
                };

                /**
                 * Encodes the specified ObdConnectionStatus message. Does not implicitly {@link hudiy.app.api.ObdConnectionStatus.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.ObdConnectionStatus
                 * @static
                 * @param {hudiy.app.api.ObdConnectionStatus.$Properties} message ObdConnectionStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ObdConnectionStatus.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified ObdConnectionStatus message, length delimited. Does not implicitly {@link hudiy.app.api.ObdConnectionStatus.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.ObdConnectionStatus
                 * @static
                 * @param {hudiy.app.api.ObdConnectionStatus.$Properties} message ObdConnectionStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ObdConnectionStatus.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes an ObdConnectionStatus message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.ObdConnectionStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.ObdConnectionStatus & hudiy.app.api.ObdConnectionStatus.$Shape} ObdConnectionStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ObdConnectionStatus.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.ObdConnectionStatus(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.ObdConnectionStatus.ObdConnectionState[value] !== $undefined)
                                    message.state = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "state"))
                        throw $util.ProtocolError("missing required 'state'", { instance: message });
                    return message;
                };

                /**
                 * Decodes an ObdConnectionStatus message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.ObdConnectionStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.ObdConnectionStatus & hudiy.app.api.ObdConnectionStatus.$Shape} ObdConnectionStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ObdConnectionStatus.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an ObdConnectionStatus message.
                 * @function verify
                 * @memberof hudiy.app.api.ObdConnectionStatus
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ObdConnectionStatus.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    switch (message.state) {
                    default:
                        return "state: enum value expected";
                    case 1:
                    case 2:
                        break;
                    }
                    return null;
                };

                /**
                 * Creates an ObdConnectionStatus message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.ObdConnectionStatus
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.ObdConnectionStatus} ObdConnectionStatus
                 */
                ObdConnectionStatus.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.ObdConnectionStatus)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.ObdConnectionStatus: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.ObdConnectionStatus();
                    switch (object.state) {
                    case "OBD_CONNECTION_STATE_CONNECTED":
                    case 1:
                        message.state = 1;
                        break;
                    case "OBD_CONNECTION_STATE_DISCONNECTED":
                    case 2:
                        message.state = 2;
                        break;
                    default:
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an ObdConnectionStatus message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.ObdConnectionStatus
                 * @static
                 * @param {hudiy.app.api.ObdConnectionStatus} message ObdConnectionStatus
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ObdConnectionStatus.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        object.state = options.enums === $String ? "OBD_CONNECTION_STATE_CONNECTED" : 1;
                    if (message.state != null && $Object.hasOwnProperty.call(message, "state"))
                        object.state = options.enums === $String ? $root.hudiy.app.api.ObdConnectionStatus.ObdConnectionState[message.state] === $undefined ? message.state : $root.hudiy.app.api.ObdConnectionStatus.ObdConnectionState[message.state] : message.state;
                    return object;
                };

                /**
                 * Converts this ObdConnectionStatus to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.ObdConnectionStatus
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ObdConnectionStatus.prototype.toJSON = function() {
                    return ObdConnectionStatus.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for ObdConnectionStatus
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.ObdConnectionStatus
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                ObdConnectionStatus.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.ObdConnectionStatus";
                };

                /**
                 * ObdConnectionState enum.
                 * @name hudiy.app.api.ObdConnectionStatus.ObdConnectionState
                 * @enum {number}
                 * @property {number} OBD_CONNECTION_STATE_CONNECTED=1 OBD_CONNECTION_STATE_CONNECTED value
                 * @property {number} OBD_CONNECTION_STATE_DISCONNECTED=2 OBD_CONNECTION_STATE_DISCONNECTED value
                 */
                ObdConnectionStatus.ObdConnectionState = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "OBD_CONNECTION_STATE_CONNECTED"] = 1;
                    values[valuesById[2] = "OBD_CONNECTION_STATE_DISCONNECTED"] = 2;
                    return values;
                })();

                return ObdConnectionStatus;
            })();

            api.RegisterAudioFocusReceiverRequest = (function() {

                /**
                 * Properties of a RegisterAudioFocusReceiverRequest.
                 * @typedef {Object} hudiy.app.api.RegisterAudioFocusReceiverRequest.$Properties
                 * @property {string} name RegisterAudioFocusReceiverRequest name
                 * @property {hudiy.app.api.RegisterAudioFocusReceiverRequest.AudioStreamCategory} category RegisterAudioFocusReceiverRequest category
                 * @property {number} duckPriority RegisterAudioFocusReceiverRequest duckPriority
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a RegisterAudioFocusReceiverRequest.
                 * @memberof hudiy.app.api
                 * @interface IRegisterAudioFocusReceiverRequest
                 * @augments hudiy.app.api.RegisterAudioFocusReceiverRequest.$Properties
                 * @deprecated Use hudiy.app.api.RegisterAudioFocusReceiverRequest.$Properties instead.
                 */

                /**
                 * Shape of a RegisterAudioFocusReceiverRequest.
                 * @typedef {hudiy.app.api.RegisterAudioFocusReceiverRequest.$Properties} hudiy.app.api.RegisterAudioFocusReceiverRequest.$Shape
                 */

                /**
                 * Constructs a new RegisterAudioFocusReceiverRequest.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a RegisterAudioFocusReceiverRequest.
                 * @constructor
                 * @param {hudiy.app.api.RegisterAudioFocusReceiverRequest.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const RegisterAudioFocusReceiverRequest = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * RegisterAudioFocusReceiverRequest name.
                 * @member {string} name
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverRequest
                 * @instance
                 */
                RegisterAudioFocusReceiverRequest.prototype.name = "";

                /**
                 * RegisterAudioFocusReceiverRequest category.
                 * @member {hudiy.app.api.RegisterAudioFocusReceiverRequest.AudioStreamCategory} category
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverRequest
                 * @instance
                 */
                RegisterAudioFocusReceiverRequest.prototype.category = 1;

                /**
                 * RegisterAudioFocusReceiverRequest duckPriority.
                 * @member {number} duckPriority
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverRequest
                 * @instance
                 */
                RegisterAudioFocusReceiverRequest.prototype.duckPriority = 0;

                /**
                 * Creates a new RegisterAudioFocusReceiverRequest instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverRequest
                 * @static
                 * @param {hudiy.app.api.RegisterAudioFocusReceiverRequest.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.RegisterAudioFocusReceiverRequest} RegisterAudioFocusReceiverRequest instance
                 * @type {{
                 *   (properties: hudiy.app.api.RegisterAudioFocusReceiverRequest.$Shape): hudiy.app.api.RegisterAudioFocusReceiverRequest & hudiy.app.api.RegisterAudioFocusReceiverRequest.$Shape;
                 *   (properties?: hudiy.app.api.RegisterAudioFocusReceiverRequest.$Properties): hudiy.app.api.RegisterAudioFocusReceiverRequest;
                 * }}
                 */
                RegisterAudioFocusReceiverRequest.create = function(properties) {
                    return new RegisterAudioFocusReceiverRequest(properties);
                };

                /**
                 * Encodes the specified RegisterAudioFocusReceiverRequest message. Does not implicitly {@link hudiy.app.api.RegisterAudioFocusReceiverRequest.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverRequest
                 * @static
                 * @param {hudiy.app.api.RegisterAudioFocusReceiverRequest.$Properties} message RegisterAudioFocusReceiverRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterAudioFocusReceiverRequest.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.category);
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.duckPriority);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified RegisterAudioFocusReceiverRequest message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterAudioFocusReceiverRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverRequest
                 * @static
                 * @param {hudiy.app.api.RegisterAudioFocusReceiverRequest.$Properties} message RegisterAudioFocusReceiverRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterAudioFocusReceiverRequest.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a RegisterAudioFocusReceiverRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterAudioFocusReceiverRequest & hudiy.app.api.RegisterAudioFocusReceiverRequest.$Shape} RegisterAudioFocusReceiverRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterAudioFocusReceiverRequest.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.RegisterAudioFocusReceiverRequest(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                message.name = reader.string();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.RegisterAudioFocusReceiverRequest.AudioStreamCategory[value] !== $undefined)
                                    message.category = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        case 3: {
                                if (wireType !== 0)
                                    break;
                                message.duckPriority = reader.int32();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "name"))
                        throw $util.ProtocolError("missing required 'name'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "category"))
                        throw $util.ProtocolError("missing required 'category'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "duckPriority"))
                        throw $util.ProtocolError("missing required 'duckPriority'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a RegisterAudioFocusReceiverRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterAudioFocusReceiverRequest & hudiy.app.api.RegisterAudioFocusReceiverRequest.$Shape} RegisterAudioFocusReceiverRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterAudioFocusReceiverRequest.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RegisterAudioFocusReceiverRequest message.
                 * @function verify
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RegisterAudioFocusReceiverRequest.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isString(message.name))
                        return "name: string expected";
                    switch (message.category) {
                    default:
                        return "category: enum value expected";
                    case 1:
                    case 2:
                        break;
                    }
                    if (!$util.isInteger(message.duckPriority))
                        return "duckPriority: integer expected";
                    return null;
                };

                /**
                 * Creates a RegisterAudioFocusReceiverRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.RegisterAudioFocusReceiverRequest} RegisterAudioFocusReceiverRequest
                 */
                RegisterAudioFocusReceiverRequest.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.RegisterAudioFocusReceiverRequest)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.RegisterAudioFocusReceiverRequest: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.RegisterAudioFocusReceiverRequest();
                    if (object.name != null)
                        message.name = $String(object.name);
                    switch (object.category) {
                    case "AUDIO_STREAM_CATEGORY_ENTERTAINMENT":
                    case 1:
                        message.category = 1;
                        break;
                    case "AUDIO_STREAM_CATEGORY_COMMUNICATION":
                    case 2:
                        message.category = 2;
                        break;
                    default:
                    }
                    if (object.duckPriority != null)
                        message.duckPriority = object.duckPriority | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a RegisterAudioFocusReceiverRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverRequest
                 * @static
                 * @param {hudiy.app.api.RegisterAudioFocusReceiverRequest} message RegisterAudioFocusReceiverRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RegisterAudioFocusReceiverRequest.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.name = "";
                        object.category = options.enums === $String ? "AUDIO_STREAM_CATEGORY_ENTERTAINMENT" : 1;
                        object.duckPriority = 0;
                    }
                    if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                        object.name = message.name;
                    if (message.category != null && $Object.hasOwnProperty.call(message, "category"))
                        object.category = options.enums === $String ? $root.hudiy.app.api.RegisterAudioFocusReceiverRequest.AudioStreamCategory[message.category] === $undefined ? message.category : $root.hudiy.app.api.RegisterAudioFocusReceiverRequest.AudioStreamCategory[message.category] : message.category;
                    if (message.duckPriority != null && $Object.hasOwnProperty.call(message, "duckPriority"))
                        object.duckPriority = message.duckPriority;
                    return object;
                };

                /**
                 * Converts this RegisterAudioFocusReceiverRequest to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RegisterAudioFocusReceiverRequest.prototype.toJSON = function() {
                    return RegisterAudioFocusReceiverRequest.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for RegisterAudioFocusReceiverRequest
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverRequest
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                RegisterAudioFocusReceiverRequest.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.RegisterAudioFocusReceiverRequest";
                };

                /**
                 * AudioStreamCategory enum.
                 * @name hudiy.app.api.RegisterAudioFocusReceiverRequest.AudioStreamCategory
                 * @enum {number}
                 * @property {number} AUDIO_STREAM_CATEGORY_ENTERTAINMENT=1 AUDIO_STREAM_CATEGORY_ENTERTAINMENT value
                 * @property {number} AUDIO_STREAM_CATEGORY_COMMUNICATION=2 AUDIO_STREAM_CATEGORY_COMMUNICATION value
                 */
                RegisterAudioFocusReceiverRequest.AudioStreamCategory = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "AUDIO_STREAM_CATEGORY_ENTERTAINMENT"] = 1;
                    values[valuesById[2] = "AUDIO_STREAM_CATEGORY_COMMUNICATION"] = 2;
                    return values;
                })();

                return RegisterAudioFocusReceiverRequest;
            })();

            api.RegisterAudioFocusReceiverResponse = (function() {

                /**
                 * Properties of a RegisterAudioFocusReceiverResponse.
                 * @typedef {Object} hudiy.app.api.RegisterAudioFocusReceiverResponse.$Properties
                 * @property {hudiy.app.api.RegisterAudioFocusReceiverResponse.RegisterAudioFocusReceiverResult} result RegisterAudioFocusReceiverResponse result
                 * @property {number|null} [id] RegisterAudioFocusReceiverResponse id
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a RegisterAudioFocusReceiverResponse.
                 * @memberof hudiy.app.api
                 * @interface IRegisterAudioFocusReceiverResponse
                 * @augments hudiy.app.api.RegisterAudioFocusReceiverResponse.$Properties
                 * @deprecated Use hudiy.app.api.RegisterAudioFocusReceiverResponse.$Properties instead.
                 */

                /**
                 * Shape of a RegisterAudioFocusReceiverResponse.
                 * @typedef {hudiy.app.api.RegisterAudioFocusReceiverResponse.$Properties} hudiy.app.api.RegisterAudioFocusReceiverResponse.$Shape
                 */

                /**
                 * Constructs a new RegisterAudioFocusReceiverResponse.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a RegisterAudioFocusReceiverResponse.
                 * @constructor
                 * @param {hudiy.app.api.RegisterAudioFocusReceiverResponse.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const RegisterAudioFocusReceiverResponse = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * RegisterAudioFocusReceiverResponse result.
                 * @member {hudiy.app.api.RegisterAudioFocusReceiverResponse.RegisterAudioFocusReceiverResult} result
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverResponse
                 * @instance
                 */
                RegisterAudioFocusReceiverResponse.prototype.result = 1;

                /**
                 * RegisterAudioFocusReceiverResponse id.
                 * @member {number} id
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverResponse
                 * @instance
                 */
                RegisterAudioFocusReceiverResponse.prototype.id = 0;

                /**
                 * Creates a new RegisterAudioFocusReceiverResponse instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverResponse
                 * @static
                 * @param {hudiy.app.api.RegisterAudioFocusReceiverResponse.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.RegisterAudioFocusReceiverResponse} RegisterAudioFocusReceiverResponse instance
                 * @type {{
                 *   (properties: hudiy.app.api.RegisterAudioFocusReceiverResponse.$Shape): hudiy.app.api.RegisterAudioFocusReceiverResponse & hudiy.app.api.RegisterAudioFocusReceiverResponse.$Shape;
                 *   (properties?: hudiy.app.api.RegisterAudioFocusReceiverResponse.$Properties): hudiy.app.api.RegisterAudioFocusReceiverResponse;
                 * }}
                 */
                RegisterAudioFocusReceiverResponse.create = function(properties) {
                    return new RegisterAudioFocusReceiverResponse(properties);
                };

                /**
                 * Encodes the specified RegisterAudioFocusReceiverResponse message. Does not implicitly {@link hudiy.app.api.RegisterAudioFocusReceiverResponse.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverResponse
                 * @static
                 * @param {hudiy.app.api.RegisterAudioFocusReceiverResponse.$Properties} message RegisterAudioFocusReceiverResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterAudioFocusReceiverResponse.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.id);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified RegisterAudioFocusReceiverResponse message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterAudioFocusReceiverResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverResponse
                 * @static
                 * @param {hudiy.app.api.RegisterAudioFocusReceiverResponse.$Properties} message RegisterAudioFocusReceiverResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterAudioFocusReceiverResponse.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a RegisterAudioFocusReceiverResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterAudioFocusReceiverResponse & hudiy.app.api.RegisterAudioFocusReceiverResponse.$Shape} RegisterAudioFocusReceiverResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterAudioFocusReceiverResponse.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.RegisterAudioFocusReceiverResponse(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.RegisterAudioFocusReceiverResponse.RegisterAudioFocusReceiverResult[value] !== $undefined)
                                    message.result = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                message.id = reader.int32();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "result"))
                        throw $util.ProtocolError("missing required 'result'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a RegisterAudioFocusReceiverResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterAudioFocusReceiverResponse & hudiy.app.api.RegisterAudioFocusReceiverResponse.$Shape} RegisterAudioFocusReceiverResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterAudioFocusReceiverResponse.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RegisterAudioFocusReceiverResponse message.
                 * @function verify
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RegisterAudioFocusReceiverResponse.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    switch (message.result) {
                    default:
                        return "result: enum value expected";
                    case 1:
                    case 2:
                        break;
                    }
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        if (!$util.isInteger(message.id))
                            return "id: integer expected";
                    return null;
                };

                /**
                 * Creates a RegisterAudioFocusReceiverResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.RegisterAudioFocusReceiverResponse} RegisterAudioFocusReceiverResponse
                 */
                RegisterAudioFocusReceiverResponse.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.RegisterAudioFocusReceiverResponse)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.RegisterAudioFocusReceiverResponse: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.RegisterAudioFocusReceiverResponse();
                    switch (object.result) {
                    case "REGISTER_AUDIO_FOCUS_RECEIVER_RESULT_OK":
                    case 1:
                        message.result = 1;
                        break;
                    case "REGISTER_AUDIO_FOCUS_RECEIVER_RESULT_FAILED":
                    case 2:
                        message.result = 2;
                        break;
                    default:
                    }
                    if (object.id != null)
                        message.id = object.id | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a RegisterAudioFocusReceiverResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverResponse
                 * @static
                 * @param {hudiy.app.api.RegisterAudioFocusReceiverResponse} message RegisterAudioFocusReceiverResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RegisterAudioFocusReceiverResponse.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.result = options.enums === $String ? "REGISTER_AUDIO_FOCUS_RECEIVER_RESULT_OK" : 1;
                        object.id = 0;
                    }
                    if (message.result != null && $Object.hasOwnProperty.call(message, "result"))
                        object.result = options.enums === $String ? $root.hudiy.app.api.RegisterAudioFocusReceiverResponse.RegisterAudioFocusReceiverResult[message.result] === $undefined ? message.result : $root.hudiy.app.api.RegisterAudioFocusReceiverResponse.RegisterAudioFocusReceiverResult[message.result] : message.result;
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        object.id = message.id;
                    return object;
                };

                /**
                 * Converts this RegisterAudioFocusReceiverResponse to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RegisterAudioFocusReceiverResponse.prototype.toJSON = function() {
                    return RegisterAudioFocusReceiverResponse.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for RegisterAudioFocusReceiverResponse
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.RegisterAudioFocusReceiverResponse
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                RegisterAudioFocusReceiverResponse.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.RegisterAudioFocusReceiverResponse";
                };

                /**
                 * RegisterAudioFocusReceiverResult enum.
                 * @name hudiy.app.api.RegisterAudioFocusReceiverResponse.RegisterAudioFocusReceiverResult
                 * @enum {number}
                 * @property {number} REGISTER_AUDIO_FOCUS_RECEIVER_RESULT_OK=1 REGISTER_AUDIO_FOCUS_RECEIVER_RESULT_OK value
                 * @property {number} REGISTER_AUDIO_FOCUS_RECEIVER_RESULT_FAILED=2 REGISTER_AUDIO_FOCUS_RECEIVER_RESULT_FAILED value
                 */
                RegisterAudioFocusReceiverResponse.RegisterAudioFocusReceiverResult = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "REGISTER_AUDIO_FOCUS_RECEIVER_RESULT_OK"] = 1;
                    values[valuesById[2] = "REGISTER_AUDIO_FOCUS_RECEIVER_RESULT_FAILED"] = 2;
                    return values;
                })();

                return RegisterAudioFocusReceiverResponse;
            })();

            api.UnregisterAudioFocusReceiver = (function() {

                /**
                 * Properties of an UnregisterAudioFocusReceiver.
                 * @typedef {Object} hudiy.app.api.UnregisterAudioFocusReceiver.$Properties
                 * @property {number} id UnregisterAudioFocusReceiver id
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of an UnregisterAudioFocusReceiver.
                 * @memberof hudiy.app.api
                 * @interface IUnregisterAudioFocusReceiver
                 * @augments hudiy.app.api.UnregisterAudioFocusReceiver.$Properties
                 * @deprecated Use hudiy.app.api.UnregisterAudioFocusReceiver.$Properties instead.
                 */

                /**
                 * Shape of an UnregisterAudioFocusReceiver.
                 * @typedef {hudiy.app.api.UnregisterAudioFocusReceiver.$Properties} hudiy.app.api.UnregisterAudioFocusReceiver.$Shape
                 */

                /**
                 * Constructs a new UnregisterAudioFocusReceiver.
                 * @memberof hudiy.app.api
                 * @classdesc Represents an UnregisterAudioFocusReceiver.
                 * @constructor
                 * @param {hudiy.app.api.UnregisterAudioFocusReceiver.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const UnregisterAudioFocusReceiver = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * UnregisterAudioFocusReceiver id.
                 * @member {number} id
                 * @memberof hudiy.app.api.UnregisterAudioFocusReceiver
                 * @instance
                 */
                UnregisterAudioFocusReceiver.prototype.id = 0;

                /**
                 * Creates a new UnregisterAudioFocusReceiver instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.UnregisterAudioFocusReceiver
                 * @static
                 * @param {hudiy.app.api.UnregisterAudioFocusReceiver.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.UnregisterAudioFocusReceiver} UnregisterAudioFocusReceiver instance
                 * @type {{
                 *   (properties: hudiy.app.api.UnregisterAudioFocusReceiver.$Shape): hudiy.app.api.UnregisterAudioFocusReceiver & hudiy.app.api.UnregisterAudioFocusReceiver.$Shape;
                 *   (properties?: hudiy.app.api.UnregisterAudioFocusReceiver.$Properties): hudiy.app.api.UnregisterAudioFocusReceiver;
                 * }}
                 */
                UnregisterAudioFocusReceiver.create = function(properties) {
                    return new UnregisterAudioFocusReceiver(properties);
                };

                /**
                 * Encodes the specified UnregisterAudioFocusReceiver message. Does not implicitly {@link hudiy.app.api.UnregisterAudioFocusReceiver.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.UnregisterAudioFocusReceiver
                 * @static
                 * @param {hudiy.app.api.UnregisterAudioFocusReceiver.$Properties} message UnregisterAudioFocusReceiver message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UnregisterAudioFocusReceiver.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified UnregisterAudioFocusReceiver message, length delimited. Does not implicitly {@link hudiy.app.api.UnregisterAudioFocusReceiver.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.UnregisterAudioFocusReceiver
                 * @static
                 * @param {hudiy.app.api.UnregisterAudioFocusReceiver.$Properties} message UnregisterAudioFocusReceiver message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UnregisterAudioFocusReceiver.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes an UnregisterAudioFocusReceiver message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.UnregisterAudioFocusReceiver
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.UnregisterAudioFocusReceiver & hudiy.app.api.UnregisterAudioFocusReceiver.$Shape} UnregisterAudioFocusReceiver
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UnregisterAudioFocusReceiver.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.UnregisterAudioFocusReceiver();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.id = reader.int32();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "id"))
                        throw $util.ProtocolError("missing required 'id'", { instance: message });
                    return message;
                };

                /**
                 * Decodes an UnregisterAudioFocusReceiver message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.UnregisterAudioFocusReceiver
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.UnregisterAudioFocusReceiver & hudiy.app.api.UnregisterAudioFocusReceiver.$Shape} UnregisterAudioFocusReceiver
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UnregisterAudioFocusReceiver.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an UnregisterAudioFocusReceiver message.
                 * @function verify
                 * @memberof hudiy.app.api.UnregisterAudioFocusReceiver
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                UnregisterAudioFocusReceiver.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                    return null;
                };

                /**
                 * Creates an UnregisterAudioFocusReceiver message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.UnregisterAudioFocusReceiver
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.UnregisterAudioFocusReceiver} UnregisterAudioFocusReceiver
                 */
                UnregisterAudioFocusReceiver.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.UnregisterAudioFocusReceiver)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.UnregisterAudioFocusReceiver: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.UnregisterAudioFocusReceiver();
                    if (object.id != null)
                        message.id = object.id | 0;
                    return message;
                };

                /**
                 * Creates a plain object from an UnregisterAudioFocusReceiver message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.UnregisterAudioFocusReceiver
                 * @static
                 * @param {hudiy.app.api.UnregisterAudioFocusReceiver} message UnregisterAudioFocusReceiver
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                UnregisterAudioFocusReceiver.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        object.id = 0;
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        object.id = message.id;
                    return object;
                };

                /**
                 * Converts this UnregisterAudioFocusReceiver to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.UnregisterAudioFocusReceiver
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                UnregisterAudioFocusReceiver.prototype.toJSON = function() {
                    return UnregisterAudioFocusReceiver.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for UnregisterAudioFocusReceiver
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.UnregisterAudioFocusReceiver
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                UnregisterAudioFocusReceiver.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.UnregisterAudioFocusReceiver";
                };

                return UnregisterAudioFocusReceiver;
            })();

            api.AudioFocusChangeRequest = (function() {

                /**
                 * Properties of an AudioFocusChangeRequest.
                 * @typedef {Object} hudiy.app.api.AudioFocusChangeRequest.$Properties
                 * @property {number} id AudioFocusChangeRequest id
                 * @property {hudiy.app.api.AudioFocusChangeRequest.AudioFocusType} type AudioFocusChangeRequest type
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of an AudioFocusChangeRequest.
                 * @memberof hudiy.app.api
                 * @interface IAudioFocusChangeRequest
                 * @augments hudiy.app.api.AudioFocusChangeRequest.$Properties
                 * @deprecated Use hudiy.app.api.AudioFocusChangeRequest.$Properties instead.
                 */

                /**
                 * Shape of an AudioFocusChangeRequest.
                 * @typedef {hudiy.app.api.AudioFocusChangeRequest.$Properties} hudiy.app.api.AudioFocusChangeRequest.$Shape
                 */

                /**
                 * Constructs a new AudioFocusChangeRequest.
                 * @memberof hudiy.app.api
                 * @classdesc Represents an AudioFocusChangeRequest.
                 * @constructor
                 * @param {hudiy.app.api.AudioFocusChangeRequest.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const AudioFocusChangeRequest = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * AudioFocusChangeRequest id.
                 * @member {number} id
                 * @memberof hudiy.app.api.AudioFocusChangeRequest
                 * @instance
                 */
                AudioFocusChangeRequest.prototype.id = 0;

                /**
                 * AudioFocusChangeRequest type.
                 * @member {hudiy.app.api.AudioFocusChangeRequest.AudioFocusType} type
                 * @memberof hudiy.app.api.AudioFocusChangeRequest
                 * @instance
                 */
                AudioFocusChangeRequest.prototype.type = 1;

                /**
                 * Creates a new AudioFocusChangeRequest instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.AudioFocusChangeRequest
                 * @static
                 * @param {hudiy.app.api.AudioFocusChangeRequest.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.AudioFocusChangeRequest} AudioFocusChangeRequest instance
                 * @type {{
                 *   (properties: hudiy.app.api.AudioFocusChangeRequest.$Shape): hudiy.app.api.AudioFocusChangeRequest & hudiy.app.api.AudioFocusChangeRequest.$Shape;
                 *   (properties?: hudiy.app.api.AudioFocusChangeRequest.$Properties): hudiy.app.api.AudioFocusChangeRequest;
                 * }}
                 */
                AudioFocusChangeRequest.create = function(properties) {
                    return new AudioFocusChangeRequest(properties);
                };

                /**
                 * Encodes the specified AudioFocusChangeRequest message. Does not implicitly {@link hudiy.app.api.AudioFocusChangeRequest.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.AudioFocusChangeRequest
                 * @static
                 * @param {hudiy.app.api.AudioFocusChangeRequest.$Properties} message AudioFocusChangeRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudioFocusChangeRequest.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified AudioFocusChangeRequest message, length delimited. Does not implicitly {@link hudiy.app.api.AudioFocusChangeRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.AudioFocusChangeRequest
                 * @static
                 * @param {hudiy.app.api.AudioFocusChangeRequest.$Properties} message AudioFocusChangeRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudioFocusChangeRequest.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes an AudioFocusChangeRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.AudioFocusChangeRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.AudioFocusChangeRequest & hudiy.app.api.AudioFocusChangeRequest.$Shape} AudioFocusChangeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudioFocusChangeRequest.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.AudioFocusChangeRequest(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.id = reader.int32();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.AudioFocusChangeRequest.AudioFocusType[value] !== $undefined)
                                    message.type = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "id"))
                        throw $util.ProtocolError("missing required 'id'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "type"))
                        throw $util.ProtocolError("missing required 'type'", { instance: message });
                    return message;
                };

                /**
                 * Decodes an AudioFocusChangeRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.AudioFocusChangeRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.AudioFocusChangeRequest & hudiy.app.api.AudioFocusChangeRequest.$Shape} AudioFocusChangeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudioFocusChangeRequest.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an AudioFocusChangeRequest message.
                 * @function verify
                 * @memberof hudiy.app.api.AudioFocusChangeRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AudioFocusChangeRequest.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                    return null;
                };

                /**
                 * Creates an AudioFocusChangeRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.AudioFocusChangeRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.AudioFocusChangeRequest} AudioFocusChangeRequest
                 */
                AudioFocusChangeRequest.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.AudioFocusChangeRequest)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.AudioFocusChangeRequest: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.AudioFocusChangeRequest();
                    if (object.id != null)
                        message.id = object.id | 0;
                    switch (object.type) {
                    case "AUDIO_FOCUS_TYPE_GAIN":
                    case 1:
                        message.type = 1;
                        break;
                    case "AUDIO_FOCUS_TYPE_TRANSIENT":
                    case 2:
                        message.type = 2;
                        break;
                    case "AUDIO_FOCUS_TYPE_DUCK":
                    case 3:
                        message.type = 3;
                        break;
                    case "AUDIO_FOCUS_TYPE_RELEASE":
                    case 4:
                        message.type = 4;
                        break;
                    default:
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an AudioFocusChangeRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.AudioFocusChangeRequest
                 * @static
                 * @param {hudiy.app.api.AudioFocusChangeRequest} message AudioFocusChangeRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AudioFocusChangeRequest.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.id = 0;
                        object.type = options.enums === $String ? "AUDIO_FOCUS_TYPE_GAIN" : 1;
                    }
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        object.id = message.id;
                    if (message.type != null && $Object.hasOwnProperty.call(message, "type"))
                        object.type = options.enums === $String ? $root.hudiy.app.api.AudioFocusChangeRequest.AudioFocusType[message.type] === $undefined ? message.type : $root.hudiy.app.api.AudioFocusChangeRequest.AudioFocusType[message.type] : message.type;
                    return object;
                };

                /**
                 * Converts this AudioFocusChangeRequest to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.AudioFocusChangeRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AudioFocusChangeRequest.prototype.toJSON = function() {
                    return AudioFocusChangeRequest.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for AudioFocusChangeRequest
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.AudioFocusChangeRequest
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                AudioFocusChangeRequest.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.AudioFocusChangeRequest";
                };

                /**
                 * AudioFocusType enum.
                 * @name hudiy.app.api.AudioFocusChangeRequest.AudioFocusType
                 * @enum {number}
                 * @property {number} AUDIO_FOCUS_TYPE_GAIN=1 AUDIO_FOCUS_TYPE_GAIN value
                 * @property {number} AUDIO_FOCUS_TYPE_TRANSIENT=2 AUDIO_FOCUS_TYPE_TRANSIENT value
                 * @property {number} AUDIO_FOCUS_TYPE_DUCK=3 AUDIO_FOCUS_TYPE_DUCK value
                 * @property {number} AUDIO_FOCUS_TYPE_RELEASE=4 AUDIO_FOCUS_TYPE_RELEASE value
                 */
                AudioFocusChangeRequest.AudioFocusType = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "AUDIO_FOCUS_TYPE_GAIN"] = 1;
                    values[valuesById[2] = "AUDIO_FOCUS_TYPE_TRANSIENT"] = 2;
                    values[valuesById[3] = "AUDIO_FOCUS_TYPE_DUCK"] = 3;
                    values[valuesById[4] = "AUDIO_FOCUS_TYPE_RELEASE"] = 4;
                    return values;
                })();

                return AudioFocusChangeRequest;
            })();

            api.AudioFocusChangeResponse = (function() {

                /**
                 * Properties of an AudioFocusChangeResponse.
                 * @typedef {Object} hudiy.app.api.AudioFocusChangeResponse.$Properties
                 * @property {number} id AudioFocusChangeResponse id
                 * @property {boolean} result AudioFocusChangeResponse result
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of an AudioFocusChangeResponse.
                 * @memberof hudiy.app.api
                 * @interface IAudioFocusChangeResponse
                 * @augments hudiy.app.api.AudioFocusChangeResponse.$Properties
                 * @deprecated Use hudiy.app.api.AudioFocusChangeResponse.$Properties instead.
                 */

                /**
                 * Shape of an AudioFocusChangeResponse.
                 * @typedef {hudiy.app.api.AudioFocusChangeResponse.$Properties} hudiy.app.api.AudioFocusChangeResponse.$Shape
                 */

                /**
                 * Constructs a new AudioFocusChangeResponse.
                 * @memberof hudiy.app.api
                 * @classdesc Represents an AudioFocusChangeResponse.
                 * @constructor
                 * @param {hudiy.app.api.AudioFocusChangeResponse.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const AudioFocusChangeResponse = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * AudioFocusChangeResponse id.
                 * @member {number} id
                 * @memberof hudiy.app.api.AudioFocusChangeResponse
                 * @instance
                 */
                AudioFocusChangeResponse.prototype.id = 0;

                /**
                 * AudioFocusChangeResponse result.
                 * @member {boolean} result
                 * @memberof hudiy.app.api.AudioFocusChangeResponse
                 * @instance
                 */
                AudioFocusChangeResponse.prototype.result = false;

                /**
                 * Creates a new AudioFocusChangeResponse instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.AudioFocusChangeResponse
                 * @static
                 * @param {hudiy.app.api.AudioFocusChangeResponse.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.AudioFocusChangeResponse} AudioFocusChangeResponse instance
                 * @type {{
                 *   (properties: hudiy.app.api.AudioFocusChangeResponse.$Shape): hudiy.app.api.AudioFocusChangeResponse & hudiy.app.api.AudioFocusChangeResponse.$Shape;
                 *   (properties?: hudiy.app.api.AudioFocusChangeResponse.$Properties): hudiy.app.api.AudioFocusChangeResponse;
                 * }}
                 */
                AudioFocusChangeResponse.create = function(properties) {
                    return new AudioFocusChangeResponse(properties);
                };

                /**
                 * Encodes the specified AudioFocusChangeResponse message. Does not implicitly {@link hudiy.app.api.AudioFocusChangeResponse.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.AudioFocusChangeResponse
                 * @static
                 * @param {hudiy.app.api.AudioFocusChangeResponse.$Properties} message AudioFocusChangeResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudioFocusChangeResponse.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.result);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified AudioFocusChangeResponse message, length delimited. Does not implicitly {@link hudiy.app.api.AudioFocusChangeResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.AudioFocusChangeResponse
                 * @static
                 * @param {hudiy.app.api.AudioFocusChangeResponse.$Properties} message AudioFocusChangeResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudioFocusChangeResponse.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes an AudioFocusChangeResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.AudioFocusChangeResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.AudioFocusChangeResponse & hudiy.app.api.AudioFocusChangeResponse.$Shape} AudioFocusChangeResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudioFocusChangeResponse.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.AudioFocusChangeResponse();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.id = reader.int32();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                message.result = reader.bool();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "id"))
                        throw $util.ProtocolError("missing required 'id'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "result"))
                        throw $util.ProtocolError("missing required 'result'", { instance: message });
                    return message;
                };

                /**
                 * Decodes an AudioFocusChangeResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.AudioFocusChangeResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.AudioFocusChangeResponse & hudiy.app.api.AudioFocusChangeResponse.$Shape} AudioFocusChangeResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudioFocusChangeResponse.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an AudioFocusChangeResponse message.
                 * @function verify
                 * @memberof hudiy.app.api.AudioFocusChangeResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AudioFocusChangeResponse.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                    if (typeof message.result !== "boolean")
                        return "result: boolean expected";
                    return null;
                };

                /**
                 * Creates an AudioFocusChangeResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.AudioFocusChangeResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.AudioFocusChangeResponse} AudioFocusChangeResponse
                 */
                AudioFocusChangeResponse.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.AudioFocusChangeResponse)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.AudioFocusChangeResponse: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.AudioFocusChangeResponse();
                    if (object.id != null)
                        message.id = object.id | 0;
                    if (object.result != null)
                        message.result = $Boolean(object.result);
                    return message;
                };

                /**
                 * Creates a plain object from an AudioFocusChangeResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.AudioFocusChangeResponse
                 * @static
                 * @param {hudiy.app.api.AudioFocusChangeResponse} message AudioFocusChangeResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AudioFocusChangeResponse.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.id = 0;
                        object.result = false;
                    }
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        object.id = message.id;
                    if (message.result != null && $Object.hasOwnProperty.call(message, "result"))
                        object.result = message.result;
                    return object;
                };

                /**
                 * Converts this AudioFocusChangeResponse to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.AudioFocusChangeResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AudioFocusChangeResponse.prototype.toJSON = function() {
                    return AudioFocusChangeResponse.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for AudioFocusChangeResponse
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.AudioFocusChangeResponse
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                AudioFocusChangeResponse.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.AudioFocusChangeResponse";
                };

                return AudioFocusChangeResponse;
            })();

            api.AudioFocusAction = (function() {

                /**
                 * Properties of an AudioFocusAction.
                 * @typedef {Object} hudiy.app.api.AudioFocusAction.$Properties
                 * @property {number} id AudioFocusAction id
                 * @property {hudiy.app.api.AudioFocusAction.AudioFocusActionType} action AudioFocusAction action
                 * @property {hudiy.app.api.AudioFocusAction.LostAudioFocusType|null} [lostType] AudioFocusAction lostType
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of an AudioFocusAction.
                 * @memberof hudiy.app.api
                 * @interface IAudioFocusAction
                 * @augments hudiy.app.api.AudioFocusAction.$Properties
                 * @deprecated Use hudiy.app.api.AudioFocusAction.$Properties instead.
                 */

                /**
                 * Shape of an AudioFocusAction.
                 * @typedef {hudiy.app.api.AudioFocusAction.$Properties} hudiy.app.api.AudioFocusAction.$Shape
                 */

                /**
                 * Constructs a new AudioFocusAction.
                 * @memberof hudiy.app.api
                 * @classdesc Represents an AudioFocusAction.
                 * @constructor
                 * @param {hudiy.app.api.AudioFocusAction.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const AudioFocusAction = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * AudioFocusAction id.
                 * @member {number} id
                 * @memberof hudiy.app.api.AudioFocusAction
                 * @instance
                 */
                AudioFocusAction.prototype.id = 0;

                /**
                 * AudioFocusAction action.
                 * @member {hudiy.app.api.AudioFocusAction.AudioFocusActionType} action
                 * @memberof hudiy.app.api.AudioFocusAction
                 * @instance
                 */
                AudioFocusAction.prototype.action = 1;

                /**
                 * AudioFocusAction lostType.
                 * @member {hudiy.app.api.AudioFocusAction.LostAudioFocusType} lostType
                 * @memberof hudiy.app.api.AudioFocusAction
                 * @instance
                 */
                AudioFocusAction.prototype.lostType = 1;

                /**
                 * Creates a new AudioFocusAction instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.AudioFocusAction
                 * @static
                 * @param {hudiy.app.api.AudioFocusAction.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.AudioFocusAction} AudioFocusAction instance
                 * @type {{
                 *   (properties: hudiy.app.api.AudioFocusAction.$Shape): hudiy.app.api.AudioFocusAction & hudiy.app.api.AudioFocusAction.$Shape;
                 *   (properties?: hudiy.app.api.AudioFocusAction.$Properties): hudiy.app.api.AudioFocusAction;
                 * }}
                 */
                AudioFocusAction.create = function(properties) {
                    return new AudioFocusAction(properties);
                };

                /**
                 * Encodes the specified AudioFocusAction message. Does not implicitly {@link hudiy.app.api.AudioFocusAction.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.AudioFocusAction
                 * @static
                 * @param {hudiy.app.api.AudioFocusAction.$Properties} message AudioFocusAction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudioFocusAction.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.action);
                    if (message.lostType != null && $Object.hasOwnProperty.call(message, "lostType"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.lostType);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified AudioFocusAction message, length delimited. Does not implicitly {@link hudiy.app.api.AudioFocusAction.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.AudioFocusAction
                 * @static
                 * @param {hudiy.app.api.AudioFocusAction.$Properties} message AudioFocusAction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudioFocusAction.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes an AudioFocusAction message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.AudioFocusAction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.AudioFocusAction & hudiy.app.api.AudioFocusAction.$Shape} AudioFocusAction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudioFocusAction.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.AudioFocusAction(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.id = reader.int32();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.AudioFocusAction.AudioFocusActionType[value] !== $undefined)
                                    message.action = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        case 3: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.AudioFocusAction.LostAudioFocusType[value] !== $undefined)
                                    message.lostType = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "id"))
                        throw $util.ProtocolError("missing required 'id'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "action"))
                        throw $util.ProtocolError("missing required 'action'", { instance: message });
                    return message;
                };

                /**
                 * Decodes an AudioFocusAction message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.AudioFocusAction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.AudioFocusAction & hudiy.app.api.AudioFocusAction.$Shape} AudioFocusAction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudioFocusAction.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an AudioFocusAction message.
                 * @function verify
                 * @memberof hudiy.app.api.AudioFocusAction
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AudioFocusAction.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                    switch (message.action) {
                    default:
                        return "action: enum value expected";
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    }
                    if (message.lostType != null && $Object.hasOwnProperty.call(message, "lostType"))
                        switch (message.lostType) {
                        default:
                            return "lostType: enum value expected";
                        case 1:
                        case 2:
                        case 3:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates an AudioFocusAction message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.AudioFocusAction
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.AudioFocusAction} AudioFocusAction
                 */
                AudioFocusAction.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.AudioFocusAction)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.AudioFocusAction: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.AudioFocusAction();
                    if (object.id != null)
                        message.id = object.id | 0;
                    switch (object.action) {
                    case "AUDIO_FOCUS_ACTION_TYPE_SUSPEND":
                    case 1:
                        message.action = 1;
                        break;
                    case "AUDIO_FOCUS_ACTION_TYPE_RESTORE":
                    case 2:
                        message.action = 2;
                        break;
                    case "AUDIO_FOCUS_ACTION_TYPE_LOSS":
                    case 3:
                        message.action = 3;
                        break;
                    case "AUDIO_FOCUS_ACTION_TYPE_DUCK_START":
                    case 4:
                        message.action = 4;
                        break;
                    case "AUDIO_FOCUS_ACTION_TYPE_DUCK_END":
                    case 5:
                        message.action = 5;
                        break;
                    default:
                    }
                    switch (object.lostType) {
                    case "LOST_AUDIO_FOCUS_TYPE_GAIN":
                    case 1:
                        message.lostType = 1;
                        break;
                    case "LOST_AUDIO_FOCUS_TYPE_TRANSIENT":
                    case 2:
                        message.lostType = 2;
                        break;
                    case "LOST_AUDIO_FOCUS_TYPE_DUCK":
                    case 3:
                        message.lostType = 3;
                        break;
                    default:
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an AudioFocusAction message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.AudioFocusAction
                 * @static
                 * @param {hudiy.app.api.AudioFocusAction} message AudioFocusAction
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AudioFocusAction.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.id = 0;
                        object.action = options.enums === $String ? "AUDIO_FOCUS_ACTION_TYPE_SUSPEND" : 1;
                        object.lostType = options.enums === $String ? "LOST_AUDIO_FOCUS_TYPE_GAIN" : 1;
                    }
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        object.id = message.id;
                    if (message.action != null && $Object.hasOwnProperty.call(message, "action"))
                        object.action = options.enums === $String ? $root.hudiy.app.api.AudioFocusAction.AudioFocusActionType[message.action] === $undefined ? message.action : $root.hudiy.app.api.AudioFocusAction.AudioFocusActionType[message.action] : message.action;
                    if (message.lostType != null && $Object.hasOwnProperty.call(message, "lostType"))
                        object.lostType = options.enums === $String ? $root.hudiy.app.api.AudioFocusAction.LostAudioFocusType[message.lostType] === $undefined ? message.lostType : $root.hudiy.app.api.AudioFocusAction.LostAudioFocusType[message.lostType] : message.lostType;
                    return object;
                };

                /**
                 * Converts this AudioFocusAction to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.AudioFocusAction
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AudioFocusAction.prototype.toJSON = function() {
                    return AudioFocusAction.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for AudioFocusAction
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.AudioFocusAction
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                AudioFocusAction.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.AudioFocusAction";
                };

                /**
                 * AudioFocusActionType enum.
                 * @name hudiy.app.api.AudioFocusAction.AudioFocusActionType
                 * @enum {number}
                 * @property {number} AUDIO_FOCUS_ACTION_TYPE_SUSPEND=1 AUDIO_FOCUS_ACTION_TYPE_SUSPEND value
                 * @property {number} AUDIO_FOCUS_ACTION_TYPE_RESTORE=2 AUDIO_FOCUS_ACTION_TYPE_RESTORE value
                 * @property {number} AUDIO_FOCUS_ACTION_TYPE_LOSS=3 AUDIO_FOCUS_ACTION_TYPE_LOSS value
                 * @property {number} AUDIO_FOCUS_ACTION_TYPE_DUCK_START=4 AUDIO_FOCUS_ACTION_TYPE_DUCK_START value
                 * @property {number} AUDIO_FOCUS_ACTION_TYPE_DUCK_END=5 AUDIO_FOCUS_ACTION_TYPE_DUCK_END value
                 */
                AudioFocusAction.AudioFocusActionType = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "AUDIO_FOCUS_ACTION_TYPE_SUSPEND"] = 1;
                    values[valuesById[2] = "AUDIO_FOCUS_ACTION_TYPE_RESTORE"] = 2;
                    values[valuesById[3] = "AUDIO_FOCUS_ACTION_TYPE_LOSS"] = 3;
                    values[valuesById[4] = "AUDIO_FOCUS_ACTION_TYPE_DUCK_START"] = 4;
                    values[valuesById[5] = "AUDIO_FOCUS_ACTION_TYPE_DUCK_END"] = 5;
                    return values;
                })();

                /**
                 * LostAudioFocusType enum.
                 * @name hudiy.app.api.AudioFocusAction.LostAudioFocusType
                 * @enum {number}
                 * @property {number} LOST_AUDIO_FOCUS_TYPE_GAIN=1 LOST_AUDIO_FOCUS_TYPE_GAIN value
                 * @property {number} LOST_AUDIO_FOCUS_TYPE_TRANSIENT=2 LOST_AUDIO_FOCUS_TYPE_TRANSIENT value
                 * @property {number} LOST_AUDIO_FOCUS_TYPE_DUCK=3 LOST_AUDIO_FOCUS_TYPE_DUCK value
                 */
                AudioFocusAction.LostAudioFocusType = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "LOST_AUDIO_FOCUS_TYPE_GAIN"] = 1;
                    values[valuesById[2] = "LOST_AUDIO_FOCUS_TYPE_TRANSIENT"] = 2;
                    values[valuesById[3] = "LOST_AUDIO_FOCUS_TYPE_DUCK"] = 3;
                    return values;
                })();

                return AudioFocusAction;
            })();

            api.AudioFocusMediaKey = (function() {

                /**
                 * Properties of an AudioFocusMediaKey.
                 * @typedef {Object} hudiy.app.api.AudioFocusMediaKey.$Properties
                 * @property {number} id AudioFocusMediaKey id
                 * @property {hudiy.app.api.AudioFocusMediaKey.AudioFocusMediaKeyEventType} eventType AudioFocusMediaKey eventType
                 * @property {hudiy.app.api.AudioFocusMediaKey.AudioFocusMediaKeyType} keyType AudioFocusMediaKey keyType
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of an AudioFocusMediaKey.
                 * @memberof hudiy.app.api
                 * @interface IAudioFocusMediaKey
                 * @augments hudiy.app.api.AudioFocusMediaKey.$Properties
                 * @deprecated Use hudiy.app.api.AudioFocusMediaKey.$Properties instead.
                 */

                /**
                 * Shape of an AudioFocusMediaKey.
                 * @typedef {hudiy.app.api.AudioFocusMediaKey.$Properties} hudiy.app.api.AudioFocusMediaKey.$Shape
                 */

                /**
                 * Constructs a new AudioFocusMediaKey.
                 * @memberof hudiy.app.api
                 * @classdesc Represents an AudioFocusMediaKey.
                 * @constructor
                 * @param {hudiy.app.api.AudioFocusMediaKey.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const AudioFocusMediaKey = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * AudioFocusMediaKey id.
                 * @member {number} id
                 * @memberof hudiy.app.api.AudioFocusMediaKey
                 * @instance
                 */
                AudioFocusMediaKey.prototype.id = 0;

                /**
                 * AudioFocusMediaKey eventType.
                 * @member {hudiy.app.api.AudioFocusMediaKey.AudioFocusMediaKeyEventType} eventType
                 * @memberof hudiy.app.api.AudioFocusMediaKey
                 * @instance
                 */
                AudioFocusMediaKey.prototype.eventType = 0;

                /**
                 * AudioFocusMediaKey keyType.
                 * @member {hudiy.app.api.AudioFocusMediaKey.AudioFocusMediaKeyType} keyType
                 * @memberof hudiy.app.api.AudioFocusMediaKey
                 * @instance
                 */
                AudioFocusMediaKey.prototype.keyType = 0;

                /**
                 * Creates a new AudioFocusMediaKey instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.AudioFocusMediaKey
                 * @static
                 * @param {hudiy.app.api.AudioFocusMediaKey.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.AudioFocusMediaKey} AudioFocusMediaKey instance
                 * @type {{
                 *   (properties: hudiy.app.api.AudioFocusMediaKey.$Shape): hudiy.app.api.AudioFocusMediaKey & hudiy.app.api.AudioFocusMediaKey.$Shape;
                 *   (properties?: hudiy.app.api.AudioFocusMediaKey.$Properties): hudiy.app.api.AudioFocusMediaKey;
                 * }}
                 */
                AudioFocusMediaKey.create = function(properties) {
                    return new AudioFocusMediaKey(properties);
                };

                /**
                 * Encodes the specified AudioFocusMediaKey message. Does not implicitly {@link hudiy.app.api.AudioFocusMediaKey.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.AudioFocusMediaKey
                 * @static
                 * @param {hudiy.app.api.AudioFocusMediaKey.$Properties} message AudioFocusMediaKey message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudioFocusMediaKey.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.eventType);
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.keyType);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified AudioFocusMediaKey message, length delimited. Does not implicitly {@link hudiy.app.api.AudioFocusMediaKey.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.AudioFocusMediaKey
                 * @static
                 * @param {hudiy.app.api.AudioFocusMediaKey.$Properties} message AudioFocusMediaKey message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AudioFocusMediaKey.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes an AudioFocusMediaKey message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.AudioFocusMediaKey
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.AudioFocusMediaKey & hudiy.app.api.AudioFocusMediaKey.$Shape} AudioFocusMediaKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudioFocusMediaKey.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.AudioFocusMediaKey(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.id = reader.int32();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.AudioFocusMediaKey.AudioFocusMediaKeyEventType[value] !== $undefined)
                                    message.eventType = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        case 3: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.AudioFocusMediaKey.AudioFocusMediaKeyType[value] !== $undefined)
                                    message.keyType = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "id"))
                        throw $util.ProtocolError("missing required 'id'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "eventType"))
                        throw $util.ProtocolError("missing required 'eventType'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "keyType"))
                        throw $util.ProtocolError("missing required 'keyType'", { instance: message });
                    return message;
                };

                /**
                 * Decodes an AudioFocusMediaKey message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.AudioFocusMediaKey
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.AudioFocusMediaKey & hudiy.app.api.AudioFocusMediaKey.$Shape} AudioFocusMediaKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AudioFocusMediaKey.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an AudioFocusMediaKey message.
                 * @function verify
                 * @memberof hudiy.app.api.AudioFocusMediaKey
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AudioFocusMediaKey.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                    switch (message.eventType) {
                    default:
                        return "eventType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                    switch (message.keyType) {
                    default:
                        return "keyType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    }
                    return null;
                };

                /**
                 * Creates an AudioFocusMediaKey message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.AudioFocusMediaKey
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.AudioFocusMediaKey} AudioFocusMediaKey
                 */
                AudioFocusMediaKey.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.AudioFocusMediaKey)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.AudioFocusMediaKey: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.AudioFocusMediaKey();
                    if (object.id != null)
                        message.id = object.id | 0;
                    switch (object.eventType) {
                    case "AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_NONE":
                    case 0:
                        message.eventType = 0;
                        break;
                    case "AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_PRESS":
                    case 1:
                        message.eventType = 1;
                        break;
                    case "AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_RELEASE":
                    case 2:
                        message.eventType = 2;
                        break;
                    default:
                    }
                    switch (object.keyType) {
                    case "AUDIO_FOCUS_MEDIA_KEY_TYPE_NONE":
                    case 0:
                        message.keyType = 0;
                        break;
                    case "AUDIO_FOCUS_MEDIA_KEY_TYPE_PLAY":
                    case 1:
                        message.keyType = 1;
                        break;
                    case "AUDIO_FOCUS_MEDIA_KEY_TYPE_PAUSE":
                    case 2:
                        message.keyType = 2;
                        break;
                    case "AUDIO_FOCUS_MEDIA_KEY_TYPE_PREVIOUS":
                    case 3:
                        message.keyType = 3;
                        break;
                    case "AUDIO_FOCUS_MEDIA_KEY_TYPE_NEXT":
                    case 4:
                        message.keyType = 4;
                        break;
                    case "AUDIO_FOCUS_MEDIA_KEY_TYPE_TOGGLE_PLAY":
                    case 5:
                        message.keyType = 5;
                        break;
                    default:
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an AudioFocusMediaKey message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.AudioFocusMediaKey
                 * @static
                 * @param {hudiy.app.api.AudioFocusMediaKey} message AudioFocusMediaKey
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AudioFocusMediaKey.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.id = 0;
                        object.eventType = options.enums === $String ? "AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_NONE" : 0;
                        object.keyType = options.enums === $String ? "AUDIO_FOCUS_MEDIA_KEY_TYPE_NONE" : 0;
                    }
                    if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                        object.id = message.id;
                    if (message.eventType != null && $Object.hasOwnProperty.call(message, "eventType"))
                        object.eventType = options.enums === $String ? $root.hudiy.app.api.AudioFocusMediaKey.AudioFocusMediaKeyEventType[message.eventType] === $undefined ? message.eventType : $root.hudiy.app.api.AudioFocusMediaKey.AudioFocusMediaKeyEventType[message.eventType] : message.eventType;
                    if (message.keyType != null && $Object.hasOwnProperty.call(message, "keyType"))
                        object.keyType = options.enums === $String ? $root.hudiy.app.api.AudioFocusMediaKey.AudioFocusMediaKeyType[message.keyType] === $undefined ? message.keyType : $root.hudiy.app.api.AudioFocusMediaKey.AudioFocusMediaKeyType[message.keyType] : message.keyType;
                    return object;
                };

                /**
                 * Converts this AudioFocusMediaKey to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.AudioFocusMediaKey
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AudioFocusMediaKey.prototype.toJSON = function() {
                    return AudioFocusMediaKey.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for AudioFocusMediaKey
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.AudioFocusMediaKey
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                AudioFocusMediaKey.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.AudioFocusMediaKey";
                };

                /**
                 * AudioFocusMediaKeyEventType enum.
                 * @name hudiy.app.api.AudioFocusMediaKey.AudioFocusMediaKeyEventType
                 * @enum {number}
                 * @property {number} AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_NONE=0 AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_NONE value
                 * @property {number} AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_PRESS=1 AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_PRESS value
                 * @property {number} AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_RELEASE=2 AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_RELEASE value
                 */
                AudioFocusMediaKey.AudioFocusMediaKeyEventType = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[0] = "AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_NONE"] = 0;
                    values[valuesById[1] = "AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_PRESS"] = 1;
                    values[valuesById[2] = "AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_RELEASE"] = 2;
                    return values;
                })();

                /**
                 * AudioFocusMediaKeyType enum.
                 * @name hudiy.app.api.AudioFocusMediaKey.AudioFocusMediaKeyType
                 * @enum {number}
                 * @property {number} AUDIO_FOCUS_MEDIA_KEY_TYPE_NONE=0 AUDIO_FOCUS_MEDIA_KEY_TYPE_NONE value
                 * @property {number} AUDIO_FOCUS_MEDIA_KEY_TYPE_PLAY=1 AUDIO_FOCUS_MEDIA_KEY_TYPE_PLAY value
                 * @property {number} AUDIO_FOCUS_MEDIA_KEY_TYPE_PAUSE=2 AUDIO_FOCUS_MEDIA_KEY_TYPE_PAUSE value
                 * @property {number} AUDIO_FOCUS_MEDIA_KEY_TYPE_PREVIOUS=3 AUDIO_FOCUS_MEDIA_KEY_TYPE_PREVIOUS value
                 * @property {number} AUDIO_FOCUS_MEDIA_KEY_TYPE_NEXT=4 AUDIO_FOCUS_MEDIA_KEY_TYPE_NEXT value
                 * @property {number} AUDIO_FOCUS_MEDIA_KEY_TYPE_TOGGLE_PLAY=5 AUDIO_FOCUS_MEDIA_KEY_TYPE_TOGGLE_PLAY value
                 */
                AudioFocusMediaKey.AudioFocusMediaKeyType = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[0] = "AUDIO_FOCUS_MEDIA_KEY_TYPE_NONE"] = 0;
                    values[valuesById[1] = "AUDIO_FOCUS_MEDIA_KEY_TYPE_PLAY"] = 1;
                    values[valuesById[2] = "AUDIO_FOCUS_MEDIA_KEY_TYPE_PAUSE"] = 2;
                    values[valuesById[3] = "AUDIO_FOCUS_MEDIA_KEY_TYPE_PREVIOUS"] = 3;
                    values[valuesById[4] = "AUDIO_FOCUS_MEDIA_KEY_TYPE_NEXT"] = 4;
                    values[valuesById[5] = "AUDIO_FOCUS_MEDIA_KEY_TYPE_TOGGLE_PLAY"] = 5;
                    return values;
                })();

                return AudioFocusMediaKey;
            })();

            api.PhoneConnectionStatus = (function() {

                /**
                 * Properties of a PhoneConnectionStatus.
                 * @typedef {Object} hudiy.app.api.PhoneConnectionStatus.$Properties
                 * @property {hudiy.app.api.PhoneConnectionStatus.PhoneConnectionState} state PhoneConnectionStatus state
                 * @property {string} name PhoneConnectionStatus name
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a PhoneConnectionStatus.
                 * @memberof hudiy.app.api
                 * @interface IPhoneConnectionStatus
                 * @augments hudiy.app.api.PhoneConnectionStatus.$Properties
                 * @deprecated Use hudiy.app.api.PhoneConnectionStatus.$Properties instead.
                 */

                /**
                 * Shape of a PhoneConnectionStatus.
                 * @typedef {hudiy.app.api.PhoneConnectionStatus.$Properties} hudiy.app.api.PhoneConnectionStatus.$Shape
                 */

                /**
                 * Constructs a new PhoneConnectionStatus.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a PhoneConnectionStatus.
                 * @constructor
                 * @param {hudiy.app.api.PhoneConnectionStatus.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const PhoneConnectionStatus = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * PhoneConnectionStatus state.
                 * @member {hudiy.app.api.PhoneConnectionStatus.PhoneConnectionState} state
                 * @memberof hudiy.app.api.PhoneConnectionStatus
                 * @instance
                 */
                PhoneConnectionStatus.prototype.state = 1;

                /**
                 * PhoneConnectionStatus name.
                 * @member {string} name
                 * @memberof hudiy.app.api.PhoneConnectionStatus
                 * @instance
                 */
                PhoneConnectionStatus.prototype.name = "";

                /**
                 * Creates a new PhoneConnectionStatus instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.PhoneConnectionStatus
                 * @static
                 * @param {hudiy.app.api.PhoneConnectionStatus.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.PhoneConnectionStatus} PhoneConnectionStatus instance
                 * @type {{
                 *   (properties: hudiy.app.api.PhoneConnectionStatus.$Shape): hudiy.app.api.PhoneConnectionStatus & hudiy.app.api.PhoneConnectionStatus.$Shape;
                 *   (properties?: hudiy.app.api.PhoneConnectionStatus.$Properties): hudiy.app.api.PhoneConnectionStatus;
                 * }}
                 */
                PhoneConnectionStatus.create = function(properties) {
                    return new PhoneConnectionStatus(properties);
                };

                /**
                 * Encodes the specified PhoneConnectionStatus message. Does not implicitly {@link hudiy.app.api.PhoneConnectionStatus.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.PhoneConnectionStatus
                 * @static
                 * @param {hudiy.app.api.PhoneConnectionStatus.$Properties} message PhoneConnectionStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PhoneConnectionStatus.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified PhoneConnectionStatus message, length delimited. Does not implicitly {@link hudiy.app.api.PhoneConnectionStatus.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.PhoneConnectionStatus
                 * @static
                 * @param {hudiy.app.api.PhoneConnectionStatus.$Properties} message PhoneConnectionStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PhoneConnectionStatus.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a PhoneConnectionStatus message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.PhoneConnectionStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.PhoneConnectionStatus & hudiy.app.api.PhoneConnectionStatus.$Shape} PhoneConnectionStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PhoneConnectionStatus.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.PhoneConnectionStatus(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.PhoneConnectionStatus.PhoneConnectionState[value] !== $undefined)
                                    message.state = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                message.name = reader.string();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "state"))
                        throw $util.ProtocolError("missing required 'state'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "name"))
                        throw $util.ProtocolError("missing required 'name'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a PhoneConnectionStatus message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.PhoneConnectionStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.PhoneConnectionStatus & hudiy.app.api.PhoneConnectionStatus.$Shape} PhoneConnectionStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PhoneConnectionStatus.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a PhoneConnectionStatus message.
                 * @function verify
                 * @memberof hudiy.app.api.PhoneConnectionStatus
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                PhoneConnectionStatus.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    switch (message.state) {
                    default:
                        return "state: enum value expected";
                    case 1:
                    case 2:
                        break;
                    }
                    if (!$util.isString(message.name))
                        return "name: string expected";
                    return null;
                };

                /**
                 * Creates a PhoneConnectionStatus message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.PhoneConnectionStatus
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.PhoneConnectionStatus} PhoneConnectionStatus
                 */
                PhoneConnectionStatus.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.PhoneConnectionStatus)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.PhoneConnectionStatus: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.PhoneConnectionStatus();
                    switch (object.state) {
                    case "PHONE_CONNECTION_STATE_CONNECTED":
                    case 1:
                        message.state = 1;
                        break;
                    case "PHONE_CONNECTION_STATE_DISCONNECTED":
                    case 2:
                        message.state = 2;
                        break;
                    default:
                    }
                    if (object.name != null)
                        message.name = $String(object.name);
                    return message;
                };

                /**
                 * Creates a plain object from a PhoneConnectionStatus message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.PhoneConnectionStatus
                 * @static
                 * @param {hudiy.app.api.PhoneConnectionStatus} message PhoneConnectionStatus
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                PhoneConnectionStatus.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.state = options.enums === $String ? "PHONE_CONNECTION_STATE_CONNECTED" : 1;
                        object.name = "";
                    }
                    if (message.state != null && $Object.hasOwnProperty.call(message, "state"))
                        object.state = options.enums === $String ? $root.hudiy.app.api.PhoneConnectionStatus.PhoneConnectionState[message.state] === $undefined ? message.state : $root.hudiy.app.api.PhoneConnectionStatus.PhoneConnectionState[message.state] : message.state;
                    if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                        object.name = message.name;
                    return object;
                };

                /**
                 * Converts this PhoneConnectionStatus to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.PhoneConnectionStatus
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PhoneConnectionStatus.prototype.toJSON = function() {
                    return PhoneConnectionStatus.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for PhoneConnectionStatus
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.PhoneConnectionStatus
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                PhoneConnectionStatus.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.PhoneConnectionStatus";
                };

                /**
                 * PhoneConnectionState enum.
                 * @name hudiy.app.api.PhoneConnectionStatus.PhoneConnectionState
                 * @enum {number}
                 * @property {number} PHONE_CONNECTION_STATE_CONNECTED=1 PHONE_CONNECTION_STATE_CONNECTED value
                 * @property {number} PHONE_CONNECTION_STATE_DISCONNECTED=2 PHONE_CONNECTION_STATE_DISCONNECTED value
                 */
                PhoneConnectionStatus.PhoneConnectionState = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "PHONE_CONNECTION_STATE_CONNECTED"] = 1;
                    values[valuesById[2] = "PHONE_CONNECTION_STATE_DISCONNECTED"] = 2;
                    return values;
                })();

                return PhoneConnectionStatus;
            })();

            api.PhoneVoiceCallStatus = (function() {

                /**
                 * Properties of a PhoneVoiceCallStatus.
                 * @typedef {Object} hudiy.app.api.PhoneVoiceCallStatus.$Properties
                 * @property {hudiy.app.api.PhoneVoiceCallStatus.PhoneVoiceCallState} state PhoneVoiceCallStatus state
                 * @property {string} callerId PhoneVoiceCallStatus callerId
                 * @property {string} callerName PhoneVoiceCallStatus callerName
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a PhoneVoiceCallStatus.
                 * @memberof hudiy.app.api
                 * @interface IPhoneVoiceCallStatus
                 * @augments hudiy.app.api.PhoneVoiceCallStatus.$Properties
                 * @deprecated Use hudiy.app.api.PhoneVoiceCallStatus.$Properties instead.
                 */

                /**
                 * Shape of a PhoneVoiceCallStatus.
                 * @typedef {hudiy.app.api.PhoneVoiceCallStatus.$Properties} hudiy.app.api.PhoneVoiceCallStatus.$Shape
                 */

                /**
                 * Constructs a new PhoneVoiceCallStatus.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a PhoneVoiceCallStatus.
                 * @constructor
                 * @param {hudiy.app.api.PhoneVoiceCallStatus.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const PhoneVoiceCallStatus = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * PhoneVoiceCallStatus state.
                 * @member {hudiy.app.api.PhoneVoiceCallStatus.PhoneVoiceCallState} state
                 * @memberof hudiy.app.api.PhoneVoiceCallStatus
                 * @instance
                 */
                PhoneVoiceCallStatus.prototype.state = 0;

                /**
                 * PhoneVoiceCallStatus callerId.
                 * @member {string} callerId
                 * @memberof hudiy.app.api.PhoneVoiceCallStatus
                 * @instance
                 */
                PhoneVoiceCallStatus.prototype.callerId = "";

                /**
                 * PhoneVoiceCallStatus callerName.
                 * @member {string} callerName
                 * @memberof hudiy.app.api.PhoneVoiceCallStatus
                 * @instance
                 */
                PhoneVoiceCallStatus.prototype.callerName = "";

                /**
                 * Creates a new PhoneVoiceCallStatus instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.PhoneVoiceCallStatus
                 * @static
                 * @param {hudiy.app.api.PhoneVoiceCallStatus.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.PhoneVoiceCallStatus} PhoneVoiceCallStatus instance
                 * @type {{
                 *   (properties: hudiy.app.api.PhoneVoiceCallStatus.$Shape): hudiy.app.api.PhoneVoiceCallStatus & hudiy.app.api.PhoneVoiceCallStatus.$Shape;
                 *   (properties?: hudiy.app.api.PhoneVoiceCallStatus.$Properties): hudiy.app.api.PhoneVoiceCallStatus;
                 * }}
                 */
                PhoneVoiceCallStatus.create = function(properties) {
                    return new PhoneVoiceCallStatus(properties);
                };

                /**
                 * Encodes the specified PhoneVoiceCallStatus message. Does not implicitly {@link hudiy.app.api.PhoneVoiceCallStatus.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.PhoneVoiceCallStatus
                 * @static
                 * @param {hudiy.app.api.PhoneVoiceCallStatus.$Properties} message PhoneVoiceCallStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PhoneVoiceCallStatus.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.callerId);
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.callerName);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified PhoneVoiceCallStatus message, length delimited. Does not implicitly {@link hudiy.app.api.PhoneVoiceCallStatus.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.PhoneVoiceCallStatus
                 * @static
                 * @param {hudiy.app.api.PhoneVoiceCallStatus.$Properties} message PhoneVoiceCallStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PhoneVoiceCallStatus.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a PhoneVoiceCallStatus message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.PhoneVoiceCallStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.PhoneVoiceCallStatus & hudiy.app.api.PhoneVoiceCallStatus.$Shape} PhoneVoiceCallStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PhoneVoiceCallStatus.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.PhoneVoiceCallStatus(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.PhoneVoiceCallStatus.PhoneVoiceCallState[value] !== $undefined)
                                    message.state = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                message.callerId = reader.string();
                                continue;
                            }
                        case 3: {
                                if (wireType !== 2)
                                    break;
                                message.callerName = reader.string();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "state"))
                        throw $util.ProtocolError("missing required 'state'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "callerId"))
                        throw $util.ProtocolError("missing required 'callerId'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "callerName"))
                        throw $util.ProtocolError("missing required 'callerName'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a PhoneVoiceCallStatus message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.PhoneVoiceCallStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.PhoneVoiceCallStatus & hudiy.app.api.PhoneVoiceCallStatus.$Shape} PhoneVoiceCallStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PhoneVoiceCallStatus.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a PhoneVoiceCallStatus message.
                 * @function verify
                 * @memberof hudiy.app.api.PhoneVoiceCallStatus
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                PhoneVoiceCallStatus.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    switch (message.state) {
                    default:
                        return "state: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                    if (!$util.isString(message.callerId))
                        return "callerId: string expected";
                    if (!$util.isString(message.callerName))
                        return "callerName: string expected";
                    return null;
                };

                /**
                 * Creates a PhoneVoiceCallStatus message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.PhoneVoiceCallStatus
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.PhoneVoiceCallStatus} PhoneVoiceCallStatus
                 */
                PhoneVoiceCallStatus.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.PhoneVoiceCallStatus)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.PhoneVoiceCallStatus: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.PhoneVoiceCallStatus();
                    switch (object.state) {
                    case "PHONE_VOICE_CALL_STATE_NONE":
                    case 0:
                        message.state = 0;
                        break;
                    case "PHONE_VOICE_CALL_STATE_INCOMING":
                    case 1:
                        message.state = 1;
                        break;
                    case "PHONE_VOICE_CALL_STATE_ALERTING":
                    case 2:
                        message.state = 2;
                        break;
                    case "PHONE_VOICE_CALL_STATE_ACTIVE":
                    case 3:
                        message.state = 3;
                        break;
                    default:
                    }
                    if (object.callerId != null)
                        message.callerId = $String(object.callerId);
                    if (object.callerName != null)
                        message.callerName = $String(object.callerName);
                    return message;
                };

                /**
                 * Creates a plain object from a PhoneVoiceCallStatus message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.PhoneVoiceCallStatus
                 * @static
                 * @param {hudiy.app.api.PhoneVoiceCallStatus} message PhoneVoiceCallStatus
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                PhoneVoiceCallStatus.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.state = options.enums === $String ? "PHONE_VOICE_CALL_STATE_NONE" : 0;
                        object.callerId = "";
                        object.callerName = "";
                    }
                    if (message.state != null && $Object.hasOwnProperty.call(message, "state"))
                        object.state = options.enums === $String ? $root.hudiy.app.api.PhoneVoiceCallStatus.PhoneVoiceCallState[message.state] === $undefined ? message.state : $root.hudiy.app.api.PhoneVoiceCallStatus.PhoneVoiceCallState[message.state] : message.state;
                    if (message.callerId != null && $Object.hasOwnProperty.call(message, "callerId"))
                        object.callerId = message.callerId;
                    if (message.callerName != null && $Object.hasOwnProperty.call(message, "callerName"))
                        object.callerName = message.callerName;
                    return object;
                };

                /**
                 * Converts this PhoneVoiceCallStatus to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.PhoneVoiceCallStatus
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PhoneVoiceCallStatus.prototype.toJSON = function() {
                    return PhoneVoiceCallStatus.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for PhoneVoiceCallStatus
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.PhoneVoiceCallStatus
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                PhoneVoiceCallStatus.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.PhoneVoiceCallStatus";
                };

                /**
                 * PhoneVoiceCallState enum.
                 * @name hudiy.app.api.PhoneVoiceCallStatus.PhoneVoiceCallState
                 * @enum {number}
                 * @property {number} PHONE_VOICE_CALL_STATE_NONE=0 PHONE_VOICE_CALL_STATE_NONE value
                 * @property {number} PHONE_VOICE_CALL_STATE_INCOMING=1 PHONE_VOICE_CALL_STATE_INCOMING value
                 * @property {number} PHONE_VOICE_CALL_STATE_ALERTING=2 PHONE_VOICE_CALL_STATE_ALERTING value
                 * @property {number} PHONE_VOICE_CALL_STATE_ACTIVE=3 PHONE_VOICE_CALL_STATE_ACTIVE value
                 */
                PhoneVoiceCallStatus.PhoneVoiceCallState = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[0] = "PHONE_VOICE_CALL_STATE_NONE"] = 0;
                    values[valuesById[1] = "PHONE_VOICE_CALL_STATE_INCOMING"] = 1;
                    values[valuesById[2] = "PHONE_VOICE_CALL_STATE_ALERTING"] = 2;
                    values[valuesById[3] = "PHONE_VOICE_CALL_STATE_ACTIVE"] = 3;
                    return values;
                })();

                return PhoneVoiceCallStatus;
            })();

            api.PhoneLevelsStatus = (function() {

                /**
                 * Properties of a PhoneLevelsStatus.
                 * @typedef {Object} hudiy.app.api.PhoneLevelsStatus.$Properties
                 * @property {number} betteryLevel PhoneLevelsStatus betteryLevel
                 * @property {number} signalLevel PhoneLevelsStatus signalLevel
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a PhoneLevelsStatus.
                 * @memberof hudiy.app.api
                 * @interface IPhoneLevelsStatus
                 * @augments hudiy.app.api.PhoneLevelsStatus.$Properties
                 * @deprecated Use hudiy.app.api.PhoneLevelsStatus.$Properties instead.
                 */

                /**
                 * Shape of a PhoneLevelsStatus.
                 * @typedef {hudiy.app.api.PhoneLevelsStatus.$Properties} hudiy.app.api.PhoneLevelsStatus.$Shape
                 */

                /**
                 * Constructs a new PhoneLevelsStatus.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a PhoneLevelsStatus.
                 * @constructor
                 * @param {hudiy.app.api.PhoneLevelsStatus.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const PhoneLevelsStatus = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * PhoneLevelsStatus betteryLevel.
                 * @member {number} betteryLevel
                 * @memberof hudiy.app.api.PhoneLevelsStatus
                 * @instance
                 */
                PhoneLevelsStatus.prototype.betteryLevel = 0;

                /**
                 * PhoneLevelsStatus signalLevel.
                 * @member {number} signalLevel
                 * @memberof hudiy.app.api.PhoneLevelsStatus
                 * @instance
                 */
                PhoneLevelsStatus.prototype.signalLevel = 0;

                /**
                 * Creates a new PhoneLevelsStatus instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.PhoneLevelsStatus
                 * @static
                 * @param {hudiy.app.api.PhoneLevelsStatus.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.PhoneLevelsStatus} PhoneLevelsStatus instance
                 * @type {{
                 *   (properties: hudiy.app.api.PhoneLevelsStatus.$Shape): hudiy.app.api.PhoneLevelsStatus & hudiy.app.api.PhoneLevelsStatus.$Shape;
                 *   (properties?: hudiy.app.api.PhoneLevelsStatus.$Properties): hudiy.app.api.PhoneLevelsStatus;
                 * }}
                 */
                PhoneLevelsStatus.create = function(properties) {
                    return new PhoneLevelsStatus(properties);
                };

                /**
                 * Encodes the specified PhoneLevelsStatus message. Does not implicitly {@link hudiy.app.api.PhoneLevelsStatus.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.PhoneLevelsStatus
                 * @static
                 * @param {hudiy.app.api.PhoneLevelsStatus.$Properties} message PhoneLevelsStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PhoneLevelsStatus.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.betteryLevel);
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.signalLevel);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified PhoneLevelsStatus message, length delimited. Does not implicitly {@link hudiy.app.api.PhoneLevelsStatus.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.PhoneLevelsStatus
                 * @static
                 * @param {hudiy.app.api.PhoneLevelsStatus.$Properties} message PhoneLevelsStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PhoneLevelsStatus.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a PhoneLevelsStatus message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.PhoneLevelsStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.PhoneLevelsStatus & hudiy.app.api.PhoneLevelsStatus.$Shape} PhoneLevelsStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PhoneLevelsStatus.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.PhoneLevelsStatus();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.betteryLevel = reader.int32();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                message.signalLevel = reader.int32();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "betteryLevel"))
                        throw $util.ProtocolError("missing required 'betteryLevel'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "signalLevel"))
                        throw $util.ProtocolError("missing required 'signalLevel'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a PhoneLevelsStatus message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.PhoneLevelsStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.PhoneLevelsStatus & hudiy.app.api.PhoneLevelsStatus.$Shape} PhoneLevelsStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PhoneLevelsStatus.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a PhoneLevelsStatus message.
                 * @function verify
                 * @memberof hudiy.app.api.PhoneLevelsStatus
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                PhoneLevelsStatus.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isInteger(message.betteryLevel))
                        return "betteryLevel: integer expected";
                    if (!$util.isInteger(message.signalLevel))
                        return "signalLevel: integer expected";
                    return null;
                };

                /**
                 * Creates a PhoneLevelsStatus message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.PhoneLevelsStatus
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.PhoneLevelsStatus} PhoneLevelsStatus
                 */
                PhoneLevelsStatus.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.PhoneLevelsStatus)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.PhoneLevelsStatus: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.PhoneLevelsStatus();
                    if (object.betteryLevel != null)
                        message.betteryLevel = object.betteryLevel | 0;
                    if (object.signalLevel != null)
                        message.signalLevel = object.signalLevel | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a PhoneLevelsStatus message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.PhoneLevelsStatus
                 * @static
                 * @param {hudiy.app.api.PhoneLevelsStatus} message PhoneLevelsStatus
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                PhoneLevelsStatus.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.betteryLevel = 0;
                        object.signalLevel = 0;
                    }
                    if (message.betteryLevel != null && $Object.hasOwnProperty.call(message, "betteryLevel"))
                        object.betteryLevel = message.betteryLevel;
                    if (message.signalLevel != null && $Object.hasOwnProperty.call(message, "signalLevel"))
                        object.signalLevel = message.signalLevel;
                    return object;
                };

                /**
                 * Converts this PhoneLevelsStatus to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.PhoneLevelsStatus
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PhoneLevelsStatus.prototype.toJSON = function() {
                    return PhoneLevelsStatus.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for PhoneLevelsStatus
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.PhoneLevelsStatus
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                PhoneLevelsStatus.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.PhoneLevelsStatus";
                };

                return PhoneLevelsStatus;
            })();

            api.KeyEvent = (function() {

                /**
                 * Properties of a KeyEvent.
                 * @typedef {Object} hudiy.app.api.KeyEvent.$Properties
                 * @property {hudiy.app.api.KeyEvent.KeyType} keyType KeyEvent keyType
                 * @property {hudiy.app.api.KeyEvent.EventType} eventType KeyEvent eventType
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a KeyEvent.
                 * @memberof hudiy.app.api
                 * @interface IKeyEvent
                 * @augments hudiy.app.api.KeyEvent.$Properties
                 * @deprecated Use hudiy.app.api.KeyEvent.$Properties instead.
                 */

                /**
                 * Shape of a KeyEvent.
                 * @typedef {hudiy.app.api.KeyEvent.$Properties} hudiy.app.api.KeyEvent.$Shape
                 */

                /**
                 * Constructs a new KeyEvent.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a KeyEvent.
                 * @constructor
                 * @param {hudiy.app.api.KeyEvent.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const KeyEvent = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * KeyEvent keyType.
                 * @member {hudiy.app.api.KeyEvent.KeyType} keyType
                 * @memberof hudiy.app.api.KeyEvent
                 * @instance
                 */
                KeyEvent.prototype.keyType = 1;

                /**
                 * KeyEvent eventType.
                 * @member {hudiy.app.api.KeyEvent.EventType} eventType
                 * @memberof hudiy.app.api.KeyEvent
                 * @instance
                 */
                KeyEvent.prototype.eventType = 1;

                /**
                 * Creates a new KeyEvent instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.KeyEvent
                 * @static
                 * @param {hudiy.app.api.KeyEvent.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.KeyEvent} KeyEvent instance
                 * @type {{
                 *   (properties: hudiy.app.api.KeyEvent.$Shape): hudiy.app.api.KeyEvent & hudiy.app.api.KeyEvent.$Shape;
                 *   (properties?: hudiy.app.api.KeyEvent.$Properties): hudiy.app.api.KeyEvent;
                 * }}
                 */
                KeyEvent.create = function(properties) {
                    return new KeyEvent(properties);
                };

                /**
                 * Encodes the specified KeyEvent message. Does not implicitly {@link hudiy.app.api.KeyEvent.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.KeyEvent
                 * @static
                 * @param {hudiy.app.api.KeyEvent.$Properties} message KeyEvent message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                KeyEvent.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.keyType);
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.eventType);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified KeyEvent message, length delimited. Does not implicitly {@link hudiy.app.api.KeyEvent.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.KeyEvent
                 * @static
                 * @param {hudiy.app.api.KeyEvent.$Properties} message KeyEvent message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                KeyEvent.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a KeyEvent message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.KeyEvent
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.KeyEvent & hudiy.app.api.KeyEvent.$Shape} KeyEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                KeyEvent.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.KeyEvent(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.KeyEvent.KeyType[value] !== $undefined)
                                    message.keyType = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.KeyEvent.EventType[value] !== $undefined)
                                    message.eventType = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "keyType"))
                        throw $util.ProtocolError("missing required 'keyType'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "eventType"))
                        throw $util.ProtocolError("missing required 'eventType'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a KeyEvent message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.KeyEvent
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.KeyEvent & hudiy.app.api.KeyEvent.$Shape} KeyEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                KeyEvent.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a KeyEvent message.
                 * @function verify
                 * @memberof hudiy.app.api.KeyEvent
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                KeyEvent.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    switch (message.keyType) {
                    default:
                        return "keyType: enum value expected";
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 23:
                        break;
                    }
                    switch (message.eventType) {
                    default:
                        return "eventType: enum value expected";
                    case 1:
                    case 2:
                        break;
                    }
                    return null;
                };

                /**
                 * Creates a KeyEvent message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.KeyEvent
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.KeyEvent} KeyEvent
                 */
                KeyEvent.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.KeyEvent)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.KeyEvent: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.KeyEvent();
                    switch (object.keyType) {
                    case "KEY_TYPE_UP":
                    case 1:
                        message.keyType = 1;
                        break;
                    case "KEY_TYPE_DOWN":
                    case 2:
                        message.keyType = 2;
                        break;
                    case "KEY_TYPE_LEFT":
                    case 3:
                        message.keyType = 3;
                        break;
                    case "KEY_TYPE_RIGHT":
                    case 4:
                        message.keyType = 4;
                        break;
                    case "KEY_TYPE_SCROLL_LEFT":
                    case 5:
                        message.keyType = 5;
                        break;
                    case "KEY_TYPE_SCROLL_RIGHT":
                    case 6:
                        message.keyType = 6;
                        break;
                    case "KEY_TYPE_ENTER":
                    case 7:
                        message.keyType = 7;
                        break;
                    case "KEY_TYPE_BACK":
                    case 8:
                        message.keyType = 8;
                        break;
                    case "KEY_TYPE_HOME":
                    case 9:
                        message.keyType = 9;
                        break;
                    case "KEY_TYPE_ANSWER_CALL":
                    case 10:
                        message.keyType = 10;
                        break;
                    case "KEY_TYPE_PHONE_MENU":
                    case 11:
                        message.keyType = 11;
                        break;
                    case "KEY_TYPE_HANGUP_CALL":
                    case 12:
                        message.keyType = 12;
                        break;
                    case "KEY_TYPE_PLAY":
                    case 13:
                        message.keyType = 13;
                        break;
                    case "KEY_TYPE_TOGGLE_PLAY":
                    case 14:
                        message.keyType = 14;
                        break;
                    case "KEY_TYPE_PAUSE":
                    case 15:
                        message.keyType = 15;
                        break;
                    case "KEY_TYPE_STOP":
                    case 16:
                        message.keyType = 16;
                        break;
                    case "KEY_TYPE_PREVIOUS_TRACK":
                    case 17:
                        message.keyType = 17;
                        break;
                    case "KEY_TYPE_NEXT_TRACK":
                    case 18:
                        message.keyType = 18;
                        break;
                    case "KEY_TYPE_MEDIA_MENU":
                    case 19:
                        message.keyType = 19;
                        break;
                    case "KEY_TYPE_NAVIGATION_MENU":
                    case 20:
                        message.keyType = 20;
                        break;
                    case "KEY_TYPE_VOICE_COMMAND":
                    case 21:
                        message.keyType = 21;
                        break;
                    case "KEY_TYPE_TOGGLE_INPUT_FOCUS":
                    case 23:
                        message.keyType = 23;
                        break;
                    default:
                    }
                    switch (object.eventType) {
                    case "EVENT_TYPE_PRESS":
                    case 1:
                        message.eventType = 1;
                        break;
                    case "EVENT_TYPE_RELEASE":
                    case 2:
                        message.eventType = 2;
                        break;
                    default:
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a KeyEvent message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.KeyEvent
                 * @static
                 * @param {hudiy.app.api.KeyEvent} message KeyEvent
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                KeyEvent.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.keyType = options.enums === $String ? "KEY_TYPE_UP" : 1;
                        object.eventType = options.enums === $String ? "EVENT_TYPE_PRESS" : 1;
                    }
                    if (message.keyType != null && $Object.hasOwnProperty.call(message, "keyType"))
                        object.keyType = options.enums === $String ? $root.hudiy.app.api.KeyEvent.KeyType[message.keyType] === $undefined ? message.keyType : $root.hudiy.app.api.KeyEvent.KeyType[message.keyType] : message.keyType;
                    if (message.eventType != null && $Object.hasOwnProperty.call(message, "eventType"))
                        object.eventType = options.enums === $String ? $root.hudiy.app.api.KeyEvent.EventType[message.eventType] === $undefined ? message.eventType : $root.hudiy.app.api.KeyEvent.EventType[message.eventType] : message.eventType;
                    return object;
                };

                /**
                 * Converts this KeyEvent to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.KeyEvent
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                KeyEvent.prototype.toJSON = function() {
                    return KeyEvent.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for KeyEvent
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.KeyEvent
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                KeyEvent.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.KeyEvent";
                };

                /**
                 * KeyType enum.
                 * @name hudiy.app.api.KeyEvent.KeyType
                 * @enum {number}
                 * @property {number} KEY_TYPE_UP=1 KEY_TYPE_UP value
                 * @property {number} KEY_TYPE_DOWN=2 KEY_TYPE_DOWN value
                 * @property {number} KEY_TYPE_LEFT=3 KEY_TYPE_LEFT value
                 * @property {number} KEY_TYPE_RIGHT=4 KEY_TYPE_RIGHT value
                 * @property {number} KEY_TYPE_SCROLL_LEFT=5 KEY_TYPE_SCROLL_LEFT value
                 * @property {number} KEY_TYPE_SCROLL_RIGHT=6 KEY_TYPE_SCROLL_RIGHT value
                 * @property {number} KEY_TYPE_ENTER=7 KEY_TYPE_ENTER value
                 * @property {number} KEY_TYPE_BACK=8 KEY_TYPE_BACK value
                 * @property {number} KEY_TYPE_HOME=9 KEY_TYPE_HOME value
                 * @property {number} KEY_TYPE_ANSWER_CALL=10 KEY_TYPE_ANSWER_CALL value
                 * @property {number} KEY_TYPE_PHONE_MENU=11 KEY_TYPE_PHONE_MENU value
                 * @property {number} KEY_TYPE_HANGUP_CALL=12 KEY_TYPE_HANGUP_CALL value
                 * @property {number} KEY_TYPE_PLAY=13 KEY_TYPE_PLAY value
                 * @property {number} KEY_TYPE_TOGGLE_PLAY=14 KEY_TYPE_TOGGLE_PLAY value
                 * @property {number} KEY_TYPE_PAUSE=15 KEY_TYPE_PAUSE value
                 * @property {number} KEY_TYPE_STOP=16 KEY_TYPE_STOP value
                 * @property {number} KEY_TYPE_PREVIOUS_TRACK=17 KEY_TYPE_PREVIOUS_TRACK value
                 * @property {number} KEY_TYPE_NEXT_TRACK=18 KEY_TYPE_NEXT_TRACK value
                 * @property {number} KEY_TYPE_MEDIA_MENU=19 KEY_TYPE_MEDIA_MENU value
                 * @property {number} KEY_TYPE_NAVIGATION_MENU=20 KEY_TYPE_NAVIGATION_MENU value
                 * @property {number} KEY_TYPE_VOICE_COMMAND=21 KEY_TYPE_VOICE_COMMAND value
                 * @property {number} KEY_TYPE_TOGGLE_INPUT_FOCUS=23 KEY_TYPE_TOGGLE_INPUT_FOCUS value
                 */
                KeyEvent.KeyType = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "KEY_TYPE_UP"] = 1;
                    values[valuesById[2] = "KEY_TYPE_DOWN"] = 2;
                    values[valuesById[3] = "KEY_TYPE_LEFT"] = 3;
                    values[valuesById[4] = "KEY_TYPE_RIGHT"] = 4;
                    values[valuesById[5] = "KEY_TYPE_SCROLL_LEFT"] = 5;
                    values[valuesById[6] = "KEY_TYPE_SCROLL_RIGHT"] = 6;
                    values[valuesById[7] = "KEY_TYPE_ENTER"] = 7;
                    values[valuesById[8] = "KEY_TYPE_BACK"] = 8;
                    values[valuesById[9] = "KEY_TYPE_HOME"] = 9;
                    values[valuesById[10] = "KEY_TYPE_ANSWER_CALL"] = 10;
                    values[valuesById[11] = "KEY_TYPE_PHONE_MENU"] = 11;
                    values[valuesById[12] = "KEY_TYPE_HANGUP_CALL"] = 12;
                    values[valuesById[13] = "KEY_TYPE_PLAY"] = 13;
                    values[valuesById[14] = "KEY_TYPE_TOGGLE_PLAY"] = 14;
                    values[valuesById[15] = "KEY_TYPE_PAUSE"] = 15;
                    values[valuesById[16] = "KEY_TYPE_STOP"] = 16;
                    values[valuesById[17] = "KEY_TYPE_PREVIOUS_TRACK"] = 17;
                    values[valuesById[18] = "KEY_TYPE_NEXT_TRACK"] = 18;
                    values[valuesById[19] = "KEY_TYPE_MEDIA_MENU"] = 19;
                    values[valuesById[20] = "KEY_TYPE_NAVIGATION_MENU"] = 20;
                    values[valuesById[21] = "KEY_TYPE_VOICE_COMMAND"] = 21;
                    values[valuesById[23] = "KEY_TYPE_TOGGLE_INPUT_FOCUS"] = 23;
                    return values;
                })();

                /**
                 * EventType enum.
                 * @name hudiy.app.api.KeyEvent.EventType
                 * @enum {number}
                 * @property {number} EVENT_TYPE_PRESS=1 EVENT_TYPE_PRESS value
                 * @property {number} EVENT_TYPE_RELEASE=2 EVENT_TYPE_RELEASE value
                 */
                KeyEvent.EventType = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "EVENT_TYPE_PRESS"] = 1;
                    values[valuesById[2] = "EVENT_TYPE_RELEASE"] = 2;
                    return values;
                })();

                return KeyEvent;
            })();

            api.QueryObdDeviceRequest = (function() {

                /**
                 * Properties of a QueryObdDeviceRequest.
                 * @typedef {Object} hudiy.app.api.QueryObdDeviceRequest.$Properties
                 * @property {Array.<string>|null} [commands] QueryObdDeviceRequest commands
                 * @property {number} requestCode QueryObdDeviceRequest requestCode
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a QueryObdDeviceRequest.
                 * @memberof hudiy.app.api
                 * @interface IQueryObdDeviceRequest
                 * @augments hudiy.app.api.QueryObdDeviceRequest.$Properties
                 * @deprecated Use hudiy.app.api.QueryObdDeviceRequest.$Properties instead.
                 */

                /**
                 * Shape of a QueryObdDeviceRequest.
                 * @typedef {hudiy.app.api.QueryObdDeviceRequest.$Properties} hudiy.app.api.QueryObdDeviceRequest.$Shape
                 */

                /**
                 * Constructs a new QueryObdDeviceRequest.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a QueryObdDeviceRequest.
                 * @constructor
                 * @param {hudiy.app.api.QueryObdDeviceRequest.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const QueryObdDeviceRequest = function (properties) {
                    this.commands = [];
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * QueryObdDeviceRequest commands.
                 * @member {Array.<string>} commands
                 * @memberof hudiy.app.api.QueryObdDeviceRequest
                 * @instance
                 */
                QueryObdDeviceRequest.prototype.commands = $util.emptyArray;

                /**
                 * QueryObdDeviceRequest requestCode.
                 * @member {number} requestCode
                 * @memberof hudiy.app.api.QueryObdDeviceRequest
                 * @instance
                 */
                QueryObdDeviceRequest.prototype.requestCode = 0;

                /**
                 * Creates a new QueryObdDeviceRequest instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.QueryObdDeviceRequest
                 * @static
                 * @param {hudiy.app.api.QueryObdDeviceRequest.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.QueryObdDeviceRequest} QueryObdDeviceRequest instance
                 * @type {{
                 *   (properties: hudiy.app.api.QueryObdDeviceRequest.$Shape): hudiy.app.api.QueryObdDeviceRequest & hudiy.app.api.QueryObdDeviceRequest.$Shape;
                 *   (properties?: hudiy.app.api.QueryObdDeviceRequest.$Properties): hudiy.app.api.QueryObdDeviceRequest;
                 * }}
                 */
                QueryObdDeviceRequest.create = function(properties) {
                    return new QueryObdDeviceRequest(properties);
                };

                /**
                 * Encodes the specified QueryObdDeviceRequest message. Does not implicitly {@link hudiy.app.api.QueryObdDeviceRequest.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.QueryObdDeviceRequest
                 * @static
                 * @param {hudiy.app.api.QueryObdDeviceRequest.$Properties} message QueryObdDeviceRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                QueryObdDeviceRequest.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    if (message.commands != null && message.commands.length)
                        for (let i = 0; i < message.commands.length; ++i)
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.commands[i]);
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.requestCode);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified QueryObdDeviceRequest message, length delimited. Does not implicitly {@link hudiy.app.api.QueryObdDeviceRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.QueryObdDeviceRequest
                 * @static
                 * @param {hudiy.app.api.QueryObdDeviceRequest.$Properties} message QueryObdDeviceRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                QueryObdDeviceRequest.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a QueryObdDeviceRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.QueryObdDeviceRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.QueryObdDeviceRequest & hudiy.app.api.QueryObdDeviceRequest.$Shape} QueryObdDeviceRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                QueryObdDeviceRequest.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.QueryObdDeviceRequest();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                if (!(message.commands && message.commands.length))
                                    message.commands = [];
                                message.commands.push(reader.string());
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                message.requestCode = reader.int32();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "requestCode"))
                        throw $util.ProtocolError("missing required 'requestCode'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a QueryObdDeviceRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.QueryObdDeviceRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.QueryObdDeviceRequest & hudiy.app.api.QueryObdDeviceRequest.$Shape} QueryObdDeviceRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                QueryObdDeviceRequest.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a QueryObdDeviceRequest message.
                 * @function verify
                 * @memberof hudiy.app.api.QueryObdDeviceRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                QueryObdDeviceRequest.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.commands != null && $Object.hasOwnProperty.call(message, "commands")) {
                        if (!$Array.isArray(message.commands))
                            return "commands: array expected";
                        for (let i = 0; i < message.commands.length; ++i)
                            if (!$util.isString(message.commands[i]))
                                return "commands: string[] expected";
                    }
                    if (!$util.isInteger(message.requestCode))
                        return "requestCode: integer expected";
                    return null;
                };

                /**
                 * Creates a QueryObdDeviceRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.QueryObdDeviceRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.QueryObdDeviceRequest} QueryObdDeviceRequest
                 */
                QueryObdDeviceRequest.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.QueryObdDeviceRequest)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.QueryObdDeviceRequest: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.QueryObdDeviceRequest();
                    if (object.commands) {
                        if (!$Array.isArray(object.commands))
                            throw $TypeError(".hudiy.app.api.QueryObdDeviceRequest.commands: array expected");
                        message.commands = $Array(object.commands.length);
                        for (let i = 0; i < object.commands.length; ++i)
                            message.commands[i] = $String(object.commands[i]);
                    }
                    if (object.requestCode != null)
                        message.requestCode = object.requestCode | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a QueryObdDeviceRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.QueryObdDeviceRequest
                 * @static
                 * @param {hudiy.app.api.QueryObdDeviceRequest} message QueryObdDeviceRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                QueryObdDeviceRequest.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.commands = [];
                    if (options.defaults)
                        object.requestCode = 0;
                    if (message.commands && message.commands.length) {
                        object.commands = $Array(message.commands.length);
                        for (let j = 0; j < message.commands.length; ++j)
                            object.commands[j] = message.commands[j];
                    }
                    if (message.requestCode != null && $Object.hasOwnProperty.call(message, "requestCode"))
                        object.requestCode = message.requestCode;
                    return object;
                };

                /**
                 * Converts this QueryObdDeviceRequest to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.QueryObdDeviceRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                QueryObdDeviceRequest.prototype.toJSON = function() {
                    return QueryObdDeviceRequest.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for QueryObdDeviceRequest
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.QueryObdDeviceRequest
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                QueryObdDeviceRequest.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.QueryObdDeviceRequest";
                };

                return QueryObdDeviceRequest;
            })();

            api.QueryObdDeviceResponse = (function() {

                /**
                 * Properties of a QueryObdDeviceResponse.
                 * @typedef {Object} hudiy.app.api.QueryObdDeviceResponse.$Properties
                 * @property {boolean} result QueryObdDeviceResponse result
                 * @property {Array.<string>|null} [data] QueryObdDeviceResponse data
                 * @property {number} requestCode QueryObdDeviceResponse requestCode
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a QueryObdDeviceResponse.
                 * @memberof hudiy.app.api
                 * @interface IQueryObdDeviceResponse
                 * @augments hudiy.app.api.QueryObdDeviceResponse.$Properties
                 * @deprecated Use hudiy.app.api.QueryObdDeviceResponse.$Properties instead.
                 */

                /**
                 * Shape of a QueryObdDeviceResponse.
                 * @typedef {hudiy.app.api.QueryObdDeviceResponse.$Properties} hudiy.app.api.QueryObdDeviceResponse.$Shape
                 */

                /**
                 * Constructs a new QueryObdDeviceResponse.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a QueryObdDeviceResponse.
                 * @constructor
                 * @param {hudiy.app.api.QueryObdDeviceResponse.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const QueryObdDeviceResponse = function (properties) {
                    this.data = [];
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * QueryObdDeviceResponse result.
                 * @member {boolean} result
                 * @memberof hudiy.app.api.QueryObdDeviceResponse
                 * @instance
                 */
                QueryObdDeviceResponse.prototype.result = false;

                /**
                 * QueryObdDeviceResponse data.
                 * @member {Array.<string>} data
                 * @memberof hudiy.app.api.QueryObdDeviceResponse
                 * @instance
                 */
                QueryObdDeviceResponse.prototype.data = $util.emptyArray;

                /**
                 * QueryObdDeviceResponse requestCode.
                 * @member {number} requestCode
                 * @memberof hudiy.app.api.QueryObdDeviceResponse
                 * @instance
                 */
                QueryObdDeviceResponse.prototype.requestCode = 0;

                /**
                 * Creates a new QueryObdDeviceResponse instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.QueryObdDeviceResponse
                 * @static
                 * @param {hudiy.app.api.QueryObdDeviceResponse.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.QueryObdDeviceResponse} QueryObdDeviceResponse instance
                 * @type {{
                 *   (properties: hudiy.app.api.QueryObdDeviceResponse.$Shape): hudiy.app.api.QueryObdDeviceResponse & hudiy.app.api.QueryObdDeviceResponse.$Shape;
                 *   (properties?: hudiy.app.api.QueryObdDeviceResponse.$Properties): hudiy.app.api.QueryObdDeviceResponse;
                 * }}
                 */
                QueryObdDeviceResponse.create = function(properties) {
                    return new QueryObdDeviceResponse(properties);
                };

                /**
                 * Encodes the specified QueryObdDeviceResponse message. Does not implicitly {@link hudiy.app.api.QueryObdDeviceResponse.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.QueryObdDeviceResponse
                 * @static
                 * @param {hudiy.app.api.QueryObdDeviceResponse.$Properties} message QueryObdDeviceResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                QueryObdDeviceResponse.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.result);
                    if (message.data != null && message.data.length)
                        for (let i = 0; i < message.data.length; ++i)
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data[i]);
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.requestCode);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified QueryObdDeviceResponse message, length delimited. Does not implicitly {@link hudiy.app.api.QueryObdDeviceResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.QueryObdDeviceResponse
                 * @static
                 * @param {hudiy.app.api.QueryObdDeviceResponse.$Properties} message QueryObdDeviceResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                QueryObdDeviceResponse.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a QueryObdDeviceResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.QueryObdDeviceResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.QueryObdDeviceResponse & hudiy.app.api.QueryObdDeviceResponse.$Shape} QueryObdDeviceResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                QueryObdDeviceResponse.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.QueryObdDeviceResponse();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.result = reader.bool();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                if (!(message.data && message.data.length))
                                    message.data = [];
                                message.data.push(reader.string());
                                continue;
                            }
                        case 3: {
                                if (wireType !== 0)
                                    break;
                                message.requestCode = reader.int32();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "result"))
                        throw $util.ProtocolError("missing required 'result'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "requestCode"))
                        throw $util.ProtocolError("missing required 'requestCode'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a QueryObdDeviceResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.QueryObdDeviceResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.QueryObdDeviceResponse & hudiy.app.api.QueryObdDeviceResponse.$Shape} QueryObdDeviceResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                QueryObdDeviceResponse.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a QueryObdDeviceResponse message.
                 * @function verify
                 * @memberof hudiy.app.api.QueryObdDeviceResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                QueryObdDeviceResponse.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (typeof message.result !== "boolean")
                        return "result: boolean expected";
                    if (message.data != null && $Object.hasOwnProperty.call(message, "data")) {
                        if (!$Array.isArray(message.data))
                            return "data: array expected";
                        for (let i = 0; i < message.data.length; ++i)
                            if (!$util.isString(message.data[i]))
                                return "data: string[] expected";
                    }
                    if (!$util.isInteger(message.requestCode))
                        return "requestCode: integer expected";
                    return null;
                };

                /**
                 * Creates a QueryObdDeviceResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.QueryObdDeviceResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.QueryObdDeviceResponse} QueryObdDeviceResponse
                 */
                QueryObdDeviceResponse.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.QueryObdDeviceResponse)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.QueryObdDeviceResponse: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.QueryObdDeviceResponse();
                    if (object.result != null)
                        message.result = $Boolean(object.result);
                    if (object.data) {
                        if (!$Array.isArray(object.data))
                            throw $TypeError(".hudiy.app.api.QueryObdDeviceResponse.data: array expected");
                        message.data = $Array(object.data.length);
                        for (let i = 0; i < object.data.length; ++i)
                            message.data[i] = $String(object.data[i]);
                    }
                    if (object.requestCode != null)
                        message.requestCode = object.requestCode | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a QueryObdDeviceResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.QueryObdDeviceResponse
                 * @static
                 * @param {hudiy.app.api.QueryObdDeviceResponse} message QueryObdDeviceResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                QueryObdDeviceResponse.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.data = [];
                    if (options.defaults) {
                        object.result = false;
                        object.requestCode = 0;
                    }
                    if (message.result != null && $Object.hasOwnProperty.call(message, "result"))
                        object.result = message.result;
                    if (message.data && message.data.length) {
                        object.data = $Array(message.data.length);
                        for (let j = 0; j < message.data.length; ++j)
                            object.data[j] = message.data[j];
                    }
                    if (message.requestCode != null && $Object.hasOwnProperty.call(message, "requestCode"))
                        object.requestCode = message.requestCode;
                    return object;
                };

                /**
                 * Converts this QueryObdDeviceResponse to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.QueryObdDeviceResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                QueryObdDeviceResponse.prototype.toJSON = function() {
                    return QueryObdDeviceResponse.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for QueryObdDeviceResponse
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.QueryObdDeviceResponse
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                QueryObdDeviceResponse.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.QueryObdDeviceResponse";
                };

                return QueryObdDeviceResponse;
            })();

            api.SetDarkMode = (function() {

                /**
                 * Properties of a SetDarkMode.
                 * @typedef {Object} hudiy.app.api.SetDarkMode.$Properties
                 * @property {boolean} enabled SetDarkMode enabled
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a SetDarkMode.
                 * @memberof hudiy.app.api
                 * @interface ISetDarkMode
                 * @augments hudiy.app.api.SetDarkMode.$Properties
                 * @deprecated Use hudiy.app.api.SetDarkMode.$Properties instead.
                 */

                /**
                 * Shape of a SetDarkMode.
                 * @typedef {hudiy.app.api.SetDarkMode.$Properties} hudiy.app.api.SetDarkMode.$Shape
                 */

                /**
                 * Constructs a new SetDarkMode.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a SetDarkMode.
                 * @constructor
                 * @param {hudiy.app.api.SetDarkMode.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const SetDarkMode = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * SetDarkMode enabled.
                 * @member {boolean} enabled
                 * @memberof hudiy.app.api.SetDarkMode
                 * @instance
                 */
                SetDarkMode.prototype.enabled = false;

                /**
                 * Creates a new SetDarkMode instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.SetDarkMode
                 * @static
                 * @param {hudiy.app.api.SetDarkMode.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.SetDarkMode} SetDarkMode instance
                 * @type {{
                 *   (properties: hudiy.app.api.SetDarkMode.$Shape): hudiy.app.api.SetDarkMode & hudiy.app.api.SetDarkMode.$Shape;
                 *   (properties?: hudiy.app.api.SetDarkMode.$Properties): hudiy.app.api.SetDarkMode;
                 * }}
                 */
                SetDarkMode.create = function(properties) {
                    return new SetDarkMode(properties);
                };

                /**
                 * Encodes the specified SetDarkMode message. Does not implicitly {@link hudiy.app.api.SetDarkMode.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.SetDarkMode
                 * @static
                 * @param {hudiy.app.api.SetDarkMode.$Properties} message SetDarkMode message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetDarkMode.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.enabled);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified SetDarkMode message, length delimited. Does not implicitly {@link hudiy.app.api.SetDarkMode.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.SetDarkMode
                 * @static
                 * @param {hudiy.app.api.SetDarkMode.$Properties} message SetDarkMode message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetDarkMode.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a SetDarkMode message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.SetDarkMode
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetDarkMode & hudiy.app.api.SetDarkMode.$Shape} SetDarkMode
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetDarkMode.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.SetDarkMode();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.enabled = reader.bool();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "enabled"))
                        throw $util.ProtocolError("missing required 'enabled'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a SetDarkMode message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.SetDarkMode
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetDarkMode & hudiy.app.api.SetDarkMode.$Shape} SetDarkMode
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetDarkMode.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SetDarkMode message.
                 * @function verify
                 * @memberof hudiy.app.api.SetDarkMode
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SetDarkMode.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (typeof message.enabled !== "boolean")
                        return "enabled: boolean expected";
                    return null;
                };

                /**
                 * Creates a SetDarkMode message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.SetDarkMode
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.SetDarkMode} SetDarkMode
                 */
                SetDarkMode.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.SetDarkMode)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.SetDarkMode: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.SetDarkMode();
                    if (object.enabled != null)
                        message.enabled = $Boolean(object.enabled);
                    return message;
                };

                /**
                 * Creates a plain object from a SetDarkMode message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.SetDarkMode
                 * @static
                 * @param {hudiy.app.api.SetDarkMode} message SetDarkMode
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SetDarkMode.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        object.enabled = false;
                    if (message.enabled != null && $Object.hasOwnProperty.call(message, "enabled"))
                        object.enabled = message.enabled;
                    return object;
                };

                /**
                 * Converts this SetDarkMode to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.SetDarkMode
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SetDarkMode.prototype.toJSON = function() {
                    return SetDarkMode.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for SetDarkMode
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.SetDarkMode
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                SetDarkMode.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.SetDarkMode";
                };

                return SetDarkMode;
            })();

            /**
             * OverlayVisibility enum.
             * @name hudiy.app.api.OverlayVisibility
             * @enum {number}
             * @property {number} OVERLAY_VISIBILITY_NONE=0 OVERLAY_VISIBILITY_NONE value
             * @property {number} OVERLAY_VISIBILITY_ALWAYS=1 OVERLAY_VISIBILITY_ALWAYS value
             * @property {number} OVERLAY_VISIBILITY_NATIVE_UI_ONLY=2 OVERLAY_VISIBILITY_NATIVE_UI_ONLY value
             * @property {number} OVERLAY_VISIBILITY_PROJECTION_ONLY=3 OVERLAY_VISIBILITY_PROJECTION_ONLY value
             */
            api.OverlayVisibility = (function() {
                const valuesById = $Object.create(null), values = $Object.create(valuesById);
                values[valuesById[0] = "OVERLAY_VISIBILITY_NONE"] = 0;
                values[valuesById[1] = "OVERLAY_VISIBILITY_ALWAYS"] = 1;
                values[valuesById[2] = "OVERLAY_VISIBILITY_NATIVE_UI_ONLY"] = 2;
                values[valuesById[3] = "OVERLAY_VISIBILITY_PROJECTION_ONLY"] = 3;
                return values;
            })();

            api.SetCustomOverlayVisibility = (function() {

                /**
                 * Properties of a SetCustomOverlayVisibility.
                 * @typedef {Object} hudiy.app.api.SetCustomOverlayVisibility.$Properties
                 * @property {string} identifier SetCustomOverlayVisibility identifier
                 * @property {hudiy.app.api.OverlayVisibility} visibility SetCustomOverlayVisibility visibility
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a SetCustomOverlayVisibility.
                 * @memberof hudiy.app.api
                 * @interface ISetCustomOverlayVisibility
                 * @augments hudiy.app.api.SetCustomOverlayVisibility.$Properties
                 * @deprecated Use hudiy.app.api.SetCustomOverlayVisibility.$Properties instead.
                 */

                /**
                 * Shape of a SetCustomOverlayVisibility.
                 * @typedef {hudiy.app.api.SetCustomOverlayVisibility.$Properties} hudiy.app.api.SetCustomOverlayVisibility.$Shape
                 */

                /**
                 * Constructs a new SetCustomOverlayVisibility.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a SetCustomOverlayVisibility.
                 * @constructor
                 * @param {hudiy.app.api.SetCustomOverlayVisibility.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const SetCustomOverlayVisibility = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * SetCustomOverlayVisibility identifier.
                 * @member {string} identifier
                 * @memberof hudiy.app.api.SetCustomOverlayVisibility
                 * @instance
                 */
                SetCustomOverlayVisibility.prototype.identifier = "";

                /**
                 * SetCustomOverlayVisibility visibility.
                 * @member {hudiy.app.api.OverlayVisibility} visibility
                 * @memberof hudiy.app.api.SetCustomOverlayVisibility
                 * @instance
                 */
                SetCustomOverlayVisibility.prototype.visibility = 0;

                /**
                 * Creates a new SetCustomOverlayVisibility instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.SetCustomOverlayVisibility
                 * @static
                 * @param {hudiy.app.api.SetCustomOverlayVisibility.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.SetCustomOverlayVisibility} SetCustomOverlayVisibility instance
                 * @type {{
                 *   (properties: hudiy.app.api.SetCustomOverlayVisibility.$Shape): hudiy.app.api.SetCustomOverlayVisibility & hudiy.app.api.SetCustomOverlayVisibility.$Shape;
                 *   (properties?: hudiy.app.api.SetCustomOverlayVisibility.$Properties): hudiy.app.api.SetCustomOverlayVisibility;
                 * }}
                 */
                SetCustomOverlayVisibility.create = function(properties) {
                    return new SetCustomOverlayVisibility(properties);
                };

                /**
                 * Encodes the specified SetCustomOverlayVisibility message. Does not implicitly {@link hudiy.app.api.SetCustomOverlayVisibility.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.SetCustomOverlayVisibility
                 * @static
                 * @param {hudiy.app.api.SetCustomOverlayVisibility.$Properties} message SetCustomOverlayVisibility message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetCustomOverlayVisibility.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.identifier);
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.visibility);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified SetCustomOverlayVisibility message, length delimited. Does not implicitly {@link hudiy.app.api.SetCustomOverlayVisibility.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.SetCustomOverlayVisibility
                 * @static
                 * @param {hudiy.app.api.SetCustomOverlayVisibility.$Properties} message SetCustomOverlayVisibility message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetCustomOverlayVisibility.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a SetCustomOverlayVisibility message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.SetCustomOverlayVisibility
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetCustomOverlayVisibility & hudiy.app.api.SetCustomOverlayVisibility.$Shape} SetCustomOverlayVisibility
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetCustomOverlayVisibility.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.SetCustomOverlayVisibility(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                message.identifier = reader.string();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.OverlayVisibility[value] !== $undefined)
                                    message.visibility = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "identifier"))
                        throw $util.ProtocolError("missing required 'identifier'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "visibility"))
                        throw $util.ProtocolError("missing required 'visibility'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a SetCustomOverlayVisibility message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.SetCustomOverlayVisibility
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetCustomOverlayVisibility & hudiy.app.api.SetCustomOverlayVisibility.$Shape} SetCustomOverlayVisibility
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetCustomOverlayVisibility.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SetCustomOverlayVisibility message.
                 * @function verify
                 * @memberof hudiy.app.api.SetCustomOverlayVisibility
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SetCustomOverlayVisibility.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isString(message.identifier))
                        return "identifier: string expected";
                    switch (message.visibility) {
                    default:
                        return "visibility: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                    return null;
                };

                /**
                 * Creates a SetCustomOverlayVisibility message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.SetCustomOverlayVisibility
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.SetCustomOverlayVisibility} SetCustomOverlayVisibility
                 */
                SetCustomOverlayVisibility.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.SetCustomOverlayVisibility)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.SetCustomOverlayVisibility: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.SetCustomOverlayVisibility();
                    if (object.identifier != null)
                        message.identifier = $String(object.identifier);
                    switch (object.visibility) {
                    case "OVERLAY_VISIBILITY_NONE":
                    case 0:
                        message.visibility = 0;
                        break;
                    case "OVERLAY_VISIBILITY_ALWAYS":
                    case 1:
                        message.visibility = 1;
                        break;
                    case "OVERLAY_VISIBILITY_NATIVE_UI_ONLY":
                    case 2:
                        message.visibility = 2;
                        break;
                    case "OVERLAY_VISIBILITY_PROJECTION_ONLY":
                    case 3:
                        message.visibility = 3;
                        break;
                    default:
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a SetCustomOverlayVisibility message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.SetCustomOverlayVisibility
                 * @static
                 * @param {hudiy.app.api.SetCustomOverlayVisibility} message SetCustomOverlayVisibility
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SetCustomOverlayVisibility.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.identifier = "";
                        object.visibility = options.enums === $String ? "OVERLAY_VISIBILITY_NONE" : 0;
                    }
                    if (message.identifier != null && $Object.hasOwnProperty.call(message, "identifier"))
                        object.identifier = message.identifier;
                    if (message.visibility != null && $Object.hasOwnProperty.call(message, "visibility"))
                        object.visibility = options.enums === $String ? $root.hudiy.app.api.OverlayVisibility[message.visibility] === $undefined ? message.visibility : $root.hudiy.app.api.OverlayVisibility[message.visibility] : message.visibility;
                    return object;
                };

                /**
                 * Converts this SetCustomOverlayVisibility to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.SetCustomOverlayVisibility
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SetCustomOverlayVisibility.prototype.toJSON = function() {
                    return SetCustomOverlayVisibility.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for SetCustomOverlayVisibility
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.SetCustomOverlayVisibility
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                SetCustomOverlayVisibility.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.SetCustomOverlayVisibility";
                };

                return SetCustomOverlayVisibility;
            })();

            api.SetNavigationOverlayVisibility = (function() {

                /**
                 * Properties of a SetNavigationOverlayVisibility.
                 * @typedef {Object} hudiy.app.api.SetNavigationOverlayVisibility.$Properties
                 * @property {hudiy.app.api.OverlayVisibility} visibility SetNavigationOverlayVisibility visibility
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a SetNavigationOverlayVisibility.
                 * @memberof hudiy.app.api
                 * @interface ISetNavigationOverlayVisibility
                 * @augments hudiy.app.api.SetNavigationOverlayVisibility.$Properties
                 * @deprecated Use hudiy.app.api.SetNavigationOverlayVisibility.$Properties instead.
                 */

                /**
                 * Shape of a SetNavigationOverlayVisibility.
                 * @typedef {hudiy.app.api.SetNavigationOverlayVisibility.$Properties} hudiy.app.api.SetNavigationOverlayVisibility.$Shape
                 */

                /**
                 * Constructs a new SetNavigationOverlayVisibility.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a SetNavigationOverlayVisibility.
                 * @constructor
                 * @param {hudiy.app.api.SetNavigationOverlayVisibility.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const SetNavigationOverlayVisibility = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * SetNavigationOverlayVisibility visibility.
                 * @member {hudiy.app.api.OverlayVisibility} visibility
                 * @memberof hudiy.app.api.SetNavigationOverlayVisibility
                 * @instance
                 */
                SetNavigationOverlayVisibility.prototype.visibility = 0;

                /**
                 * Creates a new SetNavigationOverlayVisibility instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.SetNavigationOverlayVisibility
                 * @static
                 * @param {hudiy.app.api.SetNavigationOverlayVisibility.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.SetNavigationOverlayVisibility} SetNavigationOverlayVisibility instance
                 * @type {{
                 *   (properties: hudiy.app.api.SetNavigationOverlayVisibility.$Shape): hudiy.app.api.SetNavigationOverlayVisibility & hudiy.app.api.SetNavigationOverlayVisibility.$Shape;
                 *   (properties?: hudiy.app.api.SetNavigationOverlayVisibility.$Properties): hudiy.app.api.SetNavigationOverlayVisibility;
                 * }}
                 */
                SetNavigationOverlayVisibility.create = function(properties) {
                    return new SetNavigationOverlayVisibility(properties);
                };

                /**
                 * Encodes the specified SetNavigationOverlayVisibility message. Does not implicitly {@link hudiy.app.api.SetNavigationOverlayVisibility.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.SetNavigationOverlayVisibility
                 * @static
                 * @param {hudiy.app.api.SetNavigationOverlayVisibility.$Properties} message SetNavigationOverlayVisibility message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetNavigationOverlayVisibility.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.visibility);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified SetNavigationOverlayVisibility message, length delimited. Does not implicitly {@link hudiy.app.api.SetNavigationOverlayVisibility.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.SetNavigationOverlayVisibility
                 * @static
                 * @param {hudiy.app.api.SetNavigationOverlayVisibility.$Properties} message SetNavigationOverlayVisibility message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetNavigationOverlayVisibility.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a SetNavigationOverlayVisibility message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.SetNavigationOverlayVisibility
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetNavigationOverlayVisibility & hudiy.app.api.SetNavigationOverlayVisibility.$Shape} SetNavigationOverlayVisibility
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetNavigationOverlayVisibility.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.SetNavigationOverlayVisibility(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.OverlayVisibility[value] !== $undefined)
                                    message.visibility = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "visibility"))
                        throw $util.ProtocolError("missing required 'visibility'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a SetNavigationOverlayVisibility message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.SetNavigationOverlayVisibility
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetNavigationOverlayVisibility & hudiy.app.api.SetNavigationOverlayVisibility.$Shape} SetNavigationOverlayVisibility
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetNavigationOverlayVisibility.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SetNavigationOverlayVisibility message.
                 * @function verify
                 * @memberof hudiy.app.api.SetNavigationOverlayVisibility
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SetNavigationOverlayVisibility.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    switch (message.visibility) {
                    default:
                        return "visibility: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                    return null;
                };

                /**
                 * Creates a SetNavigationOverlayVisibility message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.SetNavigationOverlayVisibility
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.SetNavigationOverlayVisibility} SetNavigationOverlayVisibility
                 */
                SetNavigationOverlayVisibility.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.SetNavigationOverlayVisibility)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.SetNavigationOverlayVisibility: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.SetNavigationOverlayVisibility();
                    switch (object.visibility) {
                    case "OVERLAY_VISIBILITY_NONE":
                    case 0:
                        message.visibility = 0;
                        break;
                    case "OVERLAY_VISIBILITY_ALWAYS":
                    case 1:
                        message.visibility = 1;
                        break;
                    case "OVERLAY_VISIBILITY_NATIVE_UI_ONLY":
                    case 2:
                        message.visibility = 2;
                        break;
                    case "OVERLAY_VISIBILITY_PROJECTION_ONLY":
                    case 3:
                        message.visibility = 3;
                        break;
                    default:
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a SetNavigationOverlayVisibility message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.SetNavigationOverlayVisibility
                 * @static
                 * @param {hudiy.app.api.SetNavigationOverlayVisibility} message SetNavigationOverlayVisibility
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SetNavigationOverlayVisibility.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        object.visibility = options.enums === $String ? "OVERLAY_VISIBILITY_NONE" : 0;
                    if (message.visibility != null && $Object.hasOwnProperty.call(message, "visibility"))
                        object.visibility = options.enums === $String ? $root.hudiy.app.api.OverlayVisibility[message.visibility] === $undefined ? message.visibility : $root.hudiy.app.api.OverlayVisibility[message.visibility] : message.visibility;
                    return object;
                };

                /**
                 * Converts this SetNavigationOverlayVisibility to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.SetNavigationOverlayVisibility
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SetNavigationOverlayVisibility.prototype.toJSON = function() {
                    return SetNavigationOverlayVisibility.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for SetNavigationOverlayVisibility
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.SetNavigationOverlayVisibility
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                SetNavigationOverlayVisibility.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.SetNavigationOverlayVisibility";
                };

                return SetNavigationOverlayVisibility;
            })();

            api.SetVolumeOverlayVisibility = (function() {

                /**
                 * Properties of a SetVolumeOverlayVisibility.
                 * @typedef {Object} hudiy.app.api.SetVolumeOverlayVisibility.$Properties
                 * @property {hudiy.app.api.OverlayVisibility} visibility SetVolumeOverlayVisibility visibility
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a SetVolumeOverlayVisibility.
                 * @memberof hudiy.app.api
                 * @interface ISetVolumeOverlayVisibility
                 * @augments hudiy.app.api.SetVolumeOverlayVisibility.$Properties
                 * @deprecated Use hudiy.app.api.SetVolumeOverlayVisibility.$Properties instead.
                 */

                /**
                 * Shape of a SetVolumeOverlayVisibility.
                 * @typedef {hudiy.app.api.SetVolumeOverlayVisibility.$Properties} hudiy.app.api.SetVolumeOverlayVisibility.$Shape
                 */

                /**
                 * Constructs a new SetVolumeOverlayVisibility.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a SetVolumeOverlayVisibility.
                 * @constructor
                 * @param {hudiy.app.api.SetVolumeOverlayVisibility.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const SetVolumeOverlayVisibility = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * SetVolumeOverlayVisibility visibility.
                 * @member {hudiy.app.api.OverlayVisibility} visibility
                 * @memberof hudiy.app.api.SetVolumeOverlayVisibility
                 * @instance
                 */
                SetVolumeOverlayVisibility.prototype.visibility = 0;

                /**
                 * Creates a new SetVolumeOverlayVisibility instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.SetVolumeOverlayVisibility
                 * @static
                 * @param {hudiy.app.api.SetVolumeOverlayVisibility.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.SetVolumeOverlayVisibility} SetVolumeOverlayVisibility instance
                 * @type {{
                 *   (properties: hudiy.app.api.SetVolumeOverlayVisibility.$Shape): hudiy.app.api.SetVolumeOverlayVisibility & hudiy.app.api.SetVolumeOverlayVisibility.$Shape;
                 *   (properties?: hudiy.app.api.SetVolumeOverlayVisibility.$Properties): hudiy.app.api.SetVolumeOverlayVisibility;
                 * }}
                 */
                SetVolumeOverlayVisibility.create = function(properties) {
                    return new SetVolumeOverlayVisibility(properties);
                };

                /**
                 * Encodes the specified SetVolumeOverlayVisibility message. Does not implicitly {@link hudiy.app.api.SetVolumeOverlayVisibility.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.SetVolumeOverlayVisibility
                 * @static
                 * @param {hudiy.app.api.SetVolumeOverlayVisibility.$Properties} message SetVolumeOverlayVisibility message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetVolumeOverlayVisibility.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.visibility);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified SetVolumeOverlayVisibility message, length delimited. Does not implicitly {@link hudiy.app.api.SetVolumeOverlayVisibility.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.SetVolumeOverlayVisibility
                 * @static
                 * @param {hudiy.app.api.SetVolumeOverlayVisibility.$Properties} message SetVolumeOverlayVisibility message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetVolumeOverlayVisibility.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a SetVolumeOverlayVisibility message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.SetVolumeOverlayVisibility
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetVolumeOverlayVisibility & hudiy.app.api.SetVolumeOverlayVisibility.$Shape} SetVolumeOverlayVisibility
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetVolumeOverlayVisibility.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.SetVolumeOverlayVisibility(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.OverlayVisibility[value] !== $undefined)
                                    message.visibility = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "visibility"))
                        throw $util.ProtocolError("missing required 'visibility'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a SetVolumeOverlayVisibility message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.SetVolumeOverlayVisibility
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetVolumeOverlayVisibility & hudiy.app.api.SetVolumeOverlayVisibility.$Shape} SetVolumeOverlayVisibility
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetVolumeOverlayVisibility.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SetVolumeOverlayVisibility message.
                 * @function verify
                 * @memberof hudiy.app.api.SetVolumeOverlayVisibility
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SetVolumeOverlayVisibility.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    switch (message.visibility) {
                    default:
                        return "visibility: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                    return null;
                };

                /**
                 * Creates a SetVolumeOverlayVisibility message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.SetVolumeOverlayVisibility
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.SetVolumeOverlayVisibility} SetVolumeOverlayVisibility
                 */
                SetVolumeOverlayVisibility.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.SetVolumeOverlayVisibility)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.SetVolumeOverlayVisibility: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.SetVolumeOverlayVisibility();
                    switch (object.visibility) {
                    case "OVERLAY_VISIBILITY_NONE":
                    case 0:
                        message.visibility = 0;
                        break;
                    case "OVERLAY_VISIBILITY_ALWAYS":
                    case 1:
                        message.visibility = 1;
                        break;
                    case "OVERLAY_VISIBILITY_NATIVE_UI_ONLY":
                    case 2:
                        message.visibility = 2;
                        break;
                    case "OVERLAY_VISIBILITY_PROJECTION_ONLY":
                    case 3:
                        message.visibility = 3;
                        break;
                    default:
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a SetVolumeOverlayVisibility message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.SetVolumeOverlayVisibility
                 * @static
                 * @param {hudiy.app.api.SetVolumeOverlayVisibility} message SetVolumeOverlayVisibility
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SetVolumeOverlayVisibility.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        object.visibility = options.enums === $String ? "OVERLAY_VISIBILITY_NONE" : 0;
                    if (message.visibility != null && $Object.hasOwnProperty.call(message, "visibility"))
                        object.visibility = options.enums === $String ? $root.hudiy.app.api.OverlayVisibility[message.visibility] === $undefined ? message.visibility : $root.hudiy.app.api.OverlayVisibility[message.visibility] : message.visibility;
                    return object;
                };

                /**
                 * Converts this SetVolumeOverlayVisibility to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.SetVolumeOverlayVisibility
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SetVolumeOverlayVisibility.prototype.toJSON = function() {
                    return SetVolumeOverlayVisibility.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for SetVolumeOverlayVisibility
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.SetVolumeOverlayVisibility
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                SetVolumeOverlayVisibility.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.SetVolumeOverlayVisibility";
                };

                return SetVolumeOverlayVisibility;
            })();

            api.DispatchAction = (function() {

                /**
                 * Properties of a DispatchAction.
                 * @typedef {Object} hudiy.app.api.DispatchAction.$Properties
                 * @property {string} action DispatchAction action
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a DispatchAction.
                 * @memberof hudiy.app.api
                 * @interface IDispatchAction
                 * @augments hudiy.app.api.DispatchAction.$Properties
                 * @deprecated Use hudiy.app.api.DispatchAction.$Properties instead.
                 */

                /**
                 * Shape of a DispatchAction.
                 * @typedef {hudiy.app.api.DispatchAction.$Properties} hudiy.app.api.DispatchAction.$Shape
                 */

                /**
                 * Constructs a new DispatchAction.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a DispatchAction.
                 * @constructor
                 * @param {hudiy.app.api.DispatchAction.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const DispatchAction = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * DispatchAction action.
                 * @member {string} action
                 * @memberof hudiy.app.api.DispatchAction
                 * @instance
                 */
                DispatchAction.prototype.action = "";

                /**
                 * Creates a new DispatchAction instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.DispatchAction
                 * @static
                 * @param {hudiy.app.api.DispatchAction.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.DispatchAction} DispatchAction instance
                 * @type {{
                 *   (properties: hudiy.app.api.DispatchAction.$Shape): hudiy.app.api.DispatchAction & hudiy.app.api.DispatchAction.$Shape;
                 *   (properties?: hudiy.app.api.DispatchAction.$Properties): hudiy.app.api.DispatchAction;
                 * }}
                 */
                DispatchAction.create = function(properties) {
                    return new DispatchAction(properties);
                };

                /**
                 * Encodes the specified DispatchAction message. Does not implicitly {@link hudiy.app.api.DispatchAction.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.DispatchAction
                 * @static
                 * @param {hudiy.app.api.DispatchAction.$Properties} message DispatchAction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DispatchAction.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.action);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified DispatchAction message, length delimited. Does not implicitly {@link hudiy.app.api.DispatchAction.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.DispatchAction
                 * @static
                 * @param {hudiy.app.api.DispatchAction.$Properties} message DispatchAction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DispatchAction.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a DispatchAction message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.DispatchAction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.DispatchAction & hudiy.app.api.DispatchAction.$Shape} DispatchAction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DispatchAction.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.DispatchAction();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                message.action = reader.string();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "action"))
                        throw $util.ProtocolError("missing required 'action'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a DispatchAction message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.DispatchAction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.DispatchAction & hudiy.app.api.DispatchAction.$Shape} DispatchAction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DispatchAction.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DispatchAction message.
                 * @function verify
                 * @memberof hudiy.app.api.DispatchAction
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DispatchAction.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isString(message.action))
                        return "action: string expected";
                    return null;
                };

                /**
                 * Creates a DispatchAction message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.DispatchAction
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.DispatchAction} DispatchAction
                 */
                DispatchAction.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.DispatchAction)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.DispatchAction: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.DispatchAction();
                    if (object.action != null)
                        message.action = $String(object.action);
                    return message;
                };

                /**
                 * Creates a plain object from a DispatchAction message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.DispatchAction
                 * @static
                 * @param {hudiy.app.api.DispatchAction} message DispatchAction
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DispatchAction.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        object.action = "";
                    if (message.action != null && $Object.hasOwnProperty.call(message, "action"))
                        object.action = message.action;
                    return object;
                };

                /**
                 * Converts this DispatchAction to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.DispatchAction
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DispatchAction.prototype.toJSON = function() {
                    return DispatchAction.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for DispatchAction
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.DispatchAction
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                DispatchAction.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.DispatchAction";
                };

                return DispatchAction;
            })();

            api.RegisterActionRequest = (function() {

                /**
                 * Properties of a RegisterActionRequest.
                 * @typedef {Object} hudiy.app.api.RegisterActionRequest.$Properties
                 * @property {string} action RegisterActionRequest action
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a RegisterActionRequest.
                 * @memberof hudiy.app.api
                 * @interface IRegisterActionRequest
                 * @augments hudiy.app.api.RegisterActionRequest.$Properties
                 * @deprecated Use hudiy.app.api.RegisterActionRequest.$Properties instead.
                 */

                /**
                 * Shape of a RegisterActionRequest.
                 * @typedef {hudiy.app.api.RegisterActionRequest.$Properties} hudiy.app.api.RegisterActionRequest.$Shape
                 */

                /**
                 * Constructs a new RegisterActionRequest.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a RegisterActionRequest.
                 * @constructor
                 * @param {hudiy.app.api.RegisterActionRequest.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const RegisterActionRequest = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * RegisterActionRequest action.
                 * @member {string} action
                 * @memberof hudiy.app.api.RegisterActionRequest
                 * @instance
                 */
                RegisterActionRequest.prototype.action = "";

                /**
                 * Creates a new RegisterActionRequest instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.RegisterActionRequest
                 * @static
                 * @param {hudiy.app.api.RegisterActionRequest.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.RegisterActionRequest} RegisterActionRequest instance
                 * @type {{
                 *   (properties: hudiy.app.api.RegisterActionRequest.$Shape): hudiy.app.api.RegisterActionRequest & hudiy.app.api.RegisterActionRequest.$Shape;
                 *   (properties?: hudiy.app.api.RegisterActionRequest.$Properties): hudiy.app.api.RegisterActionRequest;
                 * }}
                 */
                RegisterActionRequest.create = function(properties) {
                    return new RegisterActionRequest(properties);
                };

                /**
                 * Encodes the specified RegisterActionRequest message. Does not implicitly {@link hudiy.app.api.RegisterActionRequest.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.RegisterActionRequest
                 * @static
                 * @param {hudiy.app.api.RegisterActionRequest.$Properties} message RegisterActionRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterActionRequest.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.action);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified RegisterActionRequest message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterActionRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.RegisterActionRequest
                 * @static
                 * @param {hudiy.app.api.RegisterActionRequest.$Properties} message RegisterActionRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterActionRequest.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a RegisterActionRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.RegisterActionRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterActionRequest & hudiy.app.api.RegisterActionRequest.$Shape} RegisterActionRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterActionRequest.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.RegisterActionRequest();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                message.action = reader.string();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "action"))
                        throw $util.ProtocolError("missing required 'action'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a RegisterActionRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.RegisterActionRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterActionRequest & hudiy.app.api.RegisterActionRequest.$Shape} RegisterActionRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterActionRequest.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RegisterActionRequest message.
                 * @function verify
                 * @memberof hudiy.app.api.RegisterActionRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RegisterActionRequest.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isString(message.action))
                        return "action: string expected";
                    return null;
                };

                /**
                 * Creates a RegisterActionRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.RegisterActionRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.RegisterActionRequest} RegisterActionRequest
                 */
                RegisterActionRequest.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.RegisterActionRequest)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.RegisterActionRequest: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.RegisterActionRequest();
                    if (object.action != null)
                        message.action = $String(object.action);
                    return message;
                };

                /**
                 * Creates a plain object from a RegisterActionRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.RegisterActionRequest
                 * @static
                 * @param {hudiy.app.api.RegisterActionRequest} message RegisterActionRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RegisterActionRequest.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        object.action = "";
                    if (message.action != null && $Object.hasOwnProperty.call(message, "action"))
                        object.action = message.action;
                    return object;
                };

                /**
                 * Converts this RegisterActionRequest to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.RegisterActionRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RegisterActionRequest.prototype.toJSON = function() {
                    return RegisterActionRequest.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for RegisterActionRequest
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.RegisterActionRequest
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                RegisterActionRequest.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.RegisterActionRequest";
                };

                return RegisterActionRequest;
            })();

            api.RegisterActionResponse = (function() {

                /**
                 * Properties of a RegisterActionResponse.
                 * @typedef {Object} hudiy.app.api.RegisterActionResponse.$Properties
                 * @property {string} action RegisterActionResponse action
                 * @property {boolean} result RegisterActionResponse result
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a RegisterActionResponse.
                 * @memberof hudiy.app.api
                 * @interface IRegisterActionResponse
                 * @augments hudiy.app.api.RegisterActionResponse.$Properties
                 * @deprecated Use hudiy.app.api.RegisterActionResponse.$Properties instead.
                 */

                /**
                 * Shape of a RegisterActionResponse.
                 * @typedef {hudiy.app.api.RegisterActionResponse.$Properties} hudiy.app.api.RegisterActionResponse.$Shape
                 */

                /**
                 * Constructs a new RegisterActionResponse.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a RegisterActionResponse.
                 * @constructor
                 * @param {hudiy.app.api.RegisterActionResponse.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const RegisterActionResponse = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * RegisterActionResponse action.
                 * @member {string} action
                 * @memberof hudiy.app.api.RegisterActionResponse
                 * @instance
                 */
                RegisterActionResponse.prototype.action = "";

                /**
                 * RegisterActionResponse result.
                 * @member {boolean} result
                 * @memberof hudiy.app.api.RegisterActionResponse
                 * @instance
                 */
                RegisterActionResponse.prototype.result = false;

                /**
                 * Creates a new RegisterActionResponse instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.RegisterActionResponse
                 * @static
                 * @param {hudiy.app.api.RegisterActionResponse.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.RegisterActionResponse} RegisterActionResponse instance
                 * @type {{
                 *   (properties: hudiy.app.api.RegisterActionResponse.$Shape): hudiy.app.api.RegisterActionResponse & hudiy.app.api.RegisterActionResponse.$Shape;
                 *   (properties?: hudiy.app.api.RegisterActionResponse.$Properties): hudiy.app.api.RegisterActionResponse;
                 * }}
                 */
                RegisterActionResponse.create = function(properties) {
                    return new RegisterActionResponse(properties);
                };

                /**
                 * Encodes the specified RegisterActionResponse message. Does not implicitly {@link hudiy.app.api.RegisterActionResponse.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.RegisterActionResponse
                 * @static
                 * @param {hudiy.app.api.RegisterActionResponse.$Properties} message RegisterActionResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterActionResponse.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.action);
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.result);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified RegisterActionResponse message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterActionResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.RegisterActionResponse
                 * @static
                 * @param {hudiy.app.api.RegisterActionResponse.$Properties} message RegisterActionResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RegisterActionResponse.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a RegisterActionResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.RegisterActionResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterActionResponse & hudiy.app.api.RegisterActionResponse.$Shape} RegisterActionResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterActionResponse.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.RegisterActionResponse();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                message.action = reader.string();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                message.result = reader.bool();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "action"))
                        throw $util.ProtocolError("missing required 'action'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "result"))
                        throw $util.ProtocolError("missing required 'result'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a RegisterActionResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.RegisterActionResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterActionResponse & hudiy.app.api.RegisterActionResponse.$Shape} RegisterActionResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RegisterActionResponse.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RegisterActionResponse message.
                 * @function verify
                 * @memberof hudiy.app.api.RegisterActionResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RegisterActionResponse.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isString(message.action))
                        return "action: string expected";
                    if (typeof message.result !== "boolean")
                        return "result: boolean expected";
                    return null;
                };

                /**
                 * Creates a RegisterActionResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.RegisterActionResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.RegisterActionResponse} RegisterActionResponse
                 */
                RegisterActionResponse.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.RegisterActionResponse)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.RegisterActionResponse: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.RegisterActionResponse();
                    if (object.action != null)
                        message.action = $String(object.action);
                    if (object.result != null)
                        message.result = $Boolean(object.result);
                    return message;
                };

                /**
                 * Creates a plain object from a RegisterActionResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.RegisterActionResponse
                 * @static
                 * @param {hudiy.app.api.RegisterActionResponse} message RegisterActionResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RegisterActionResponse.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.action = "";
                        object.result = false;
                    }
                    if (message.action != null && $Object.hasOwnProperty.call(message, "action"))
                        object.action = message.action;
                    if (message.result != null && $Object.hasOwnProperty.call(message, "result"))
                        object.result = message.result;
                    return object;
                };

                /**
                 * Converts this RegisterActionResponse to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.RegisterActionResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RegisterActionResponse.prototype.toJSON = function() {
                    return RegisterActionResponse.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for RegisterActionResponse
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.RegisterActionResponse
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                RegisterActionResponse.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.RegisterActionResponse";
                };

                return RegisterActionResponse;
            })();

            api.CoverartRequest = (function() {

                /**
                 * Properties of a CoverartRequest.
                 * @typedef {Object} hudiy.app.api.CoverartRequest.$Properties
                 * @property {number} requestCode CoverartRequest requestCode
                 * @property {string} artist CoverartRequest artist
                 * @property {string} album CoverartRequest album
                 * @property {string} title CoverartRequest title
                 * @property {hudiy.app.api.MediaSource} source CoverartRequest source
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a CoverartRequest.
                 * @memberof hudiy.app.api
                 * @interface ICoverartRequest
                 * @augments hudiy.app.api.CoverartRequest.$Properties
                 * @deprecated Use hudiy.app.api.CoverartRequest.$Properties instead.
                 */

                /**
                 * Shape of a CoverartRequest.
                 * @typedef {hudiy.app.api.CoverartRequest.$Properties} hudiy.app.api.CoverartRequest.$Shape
                 */

                /**
                 * Constructs a new CoverartRequest.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a CoverartRequest.
                 * @constructor
                 * @param {hudiy.app.api.CoverartRequest.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const CoverartRequest = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * CoverartRequest requestCode.
                 * @member {number} requestCode
                 * @memberof hudiy.app.api.CoverartRequest
                 * @instance
                 */
                CoverartRequest.prototype.requestCode = 0;

                /**
                 * CoverartRequest artist.
                 * @member {string} artist
                 * @memberof hudiy.app.api.CoverartRequest
                 * @instance
                 */
                CoverartRequest.prototype.artist = "";

                /**
                 * CoverartRequest album.
                 * @member {string} album
                 * @memberof hudiy.app.api.CoverartRequest
                 * @instance
                 */
                CoverartRequest.prototype.album = "";

                /**
                 * CoverartRequest title.
                 * @member {string} title
                 * @memberof hudiy.app.api.CoverartRequest
                 * @instance
                 */
                CoverartRequest.prototype.title = "";

                /**
                 * CoverartRequest source.
                 * @member {hudiy.app.api.MediaSource} source
                 * @memberof hudiy.app.api.CoverartRequest
                 * @instance
                 */
                CoverartRequest.prototype.source = 0;

                /**
                 * Creates a new CoverartRequest instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.CoverartRequest
                 * @static
                 * @param {hudiy.app.api.CoverartRequest.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.CoverartRequest} CoverartRequest instance
                 * @type {{
                 *   (properties: hudiy.app.api.CoverartRequest.$Shape): hudiy.app.api.CoverartRequest & hudiy.app.api.CoverartRequest.$Shape;
                 *   (properties?: hudiy.app.api.CoverartRequest.$Properties): hudiy.app.api.CoverartRequest;
                 * }}
                 */
                CoverartRequest.create = function(properties) {
                    return new CoverartRequest(properties);
                };

                /**
                 * Encodes the specified CoverartRequest message. Does not implicitly {@link hudiy.app.api.CoverartRequest.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.CoverartRequest
                 * @static
                 * @param {hudiy.app.api.CoverartRequest.$Properties} message CoverartRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CoverartRequest.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.requestCode);
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.artist);
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.album);
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.title);
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.source);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified CoverartRequest message, length delimited. Does not implicitly {@link hudiy.app.api.CoverartRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.CoverartRequest
                 * @static
                 * @param {hudiy.app.api.CoverartRequest.$Properties} message CoverartRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CoverartRequest.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a CoverartRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.CoverartRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.CoverartRequest & hudiy.app.api.CoverartRequest.$Shape} CoverartRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CoverartRequest.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.CoverartRequest(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.requestCode = reader.int32();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                message.artist = reader.string();
                                continue;
                            }
                        case 3: {
                                if (wireType !== 2)
                                    break;
                                message.album = reader.string();
                                continue;
                            }
                        case 4: {
                                if (wireType !== 2)
                                    break;
                                message.title = reader.string();
                                continue;
                            }
                        case 5: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.MediaSource[value] !== $undefined)
                                    message.source = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "requestCode"))
                        throw $util.ProtocolError("missing required 'requestCode'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "artist"))
                        throw $util.ProtocolError("missing required 'artist'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "album"))
                        throw $util.ProtocolError("missing required 'album'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "title"))
                        throw $util.ProtocolError("missing required 'title'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "source"))
                        throw $util.ProtocolError("missing required 'source'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a CoverartRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.CoverartRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.CoverartRequest & hudiy.app.api.CoverartRequest.$Shape} CoverartRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CoverartRequest.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CoverartRequest message.
                 * @function verify
                 * @memberof hudiy.app.api.CoverartRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CoverartRequest.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isInteger(message.requestCode))
                        return "requestCode: integer expected";
                    if (!$util.isString(message.artist))
                        return "artist: string expected";
                    if (!$util.isString(message.album))
                        return "album: string expected";
                    if (!$util.isString(message.title))
                        return "title: string expected";
                    switch (message.source) {
                    default:
                        return "source: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        break;
                    }
                    return null;
                };

                /**
                 * Creates a CoverartRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.CoverartRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.CoverartRequest} CoverartRequest
                 */
                CoverartRequest.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.CoverartRequest)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.CoverartRequest: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.CoverartRequest();
                    if (object.requestCode != null)
                        message.requestCode = object.requestCode | 0;
                    if (object.artist != null)
                        message.artist = $String(object.artist);
                    if (object.album != null)
                        message.album = $String(object.album);
                    if (object.title != null)
                        message.title = $String(object.title);
                    switch (object.source) {
                    case "MEDIA_SOURCE_NONE":
                    case 0:
                        message.source = 0;
                        break;
                    case "MEDIA_SOURCE_ANDROID_AUTO":
                    case 1:
                        message.source = 1;
                        break;
                    case "MEDIA_SOURCE_AUTOBOX":
                    case 2:
                        message.source = 2;
                        break;
                    case "MEDIA_SOURCE_A2DP":
                    case 3:
                        message.source = 3;
                        break;
                    case "MEDIA_SOURCE_STORAGE":
                    case 4:
                        message.source = 4;
                        break;
                    case "MEDIA_SOURCE_FM_RADIO":
                    case 5:
                        message.source = 5;
                        break;
                    case "MEDIA_SOURCE_WEB":
                    case 6:
                        message.source = 6;
                        break;
                    default:
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a CoverartRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.CoverartRequest
                 * @static
                 * @param {hudiy.app.api.CoverartRequest} message CoverartRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CoverartRequest.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.requestCode = 0;
                        object.artist = "";
                        object.album = "";
                        object.title = "";
                        object.source = options.enums === $String ? "MEDIA_SOURCE_NONE" : 0;
                    }
                    if (message.requestCode != null && $Object.hasOwnProperty.call(message, "requestCode"))
                        object.requestCode = message.requestCode;
                    if (message.artist != null && $Object.hasOwnProperty.call(message, "artist"))
                        object.artist = message.artist;
                    if (message.album != null && $Object.hasOwnProperty.call(message, "album"))
                        object.album = message.album;
                    if (message.title != null && $Object.hasOwnProperty.call(message, "title"))
                        object.title = message.title;
                    if (message.source != null && $Object.hasOwnProperty.call(message, "source"))
                        object.source = options.enums === $String ? $root.hudiy.app.api.MediaSource[message.source] === $undefined ? message.source : $root.hudiy.app.api.MediaSource[message.source] : message.source;
                    return object;
                };

                /**
                 * Converts this CoverartRequest to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.CoverartRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CoverartRequest.prototype.toJSON = function() {
                    return CoverartRequest.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for CoverartRequest
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.CoverartRequest
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                CoverartRequest.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.CoverartRequest";
                };

                return CoverartRequest;
            })();

            api.CoverartResponse = (function() {

                /**
                 * Properties of a CoverartResponse.
                 * @typedef {Object} hudiy.app.api.CoverartResponse.$Properties
                 * @property {number} requestCode CoverartResponse requestCode
                 * @property {Uint8Array} coverart CoverartResponse coverart
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a CoverartResponse.
                 * @memberof hudiy.app.api
                 * @interface ICoverartResponse
                 * @augments hudiy.app.api.CoverartResponse.$Properties
                 * @deprecated Use hudiy.app.api.CoverartResponse.$Properties instead.
                 */

                /**
                 * Shape of a CoverartResponse.
                 * @typedef {hudiy.app.api.CoverartResponse.$Properties} hudiy.app.api.CoverartResponse.$Shape
                 */

                /**
                 * Constructs a new CoverartResponse.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a CoverartResponse.
                 * @constructor
                 * @param {hudiy.app.api.CoverartResponse.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const CoverartResponse = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * CoverartResponse requestCode.
                 * @member {number} requestCode
                 * @memberof hudiy.app.api.CoverartResponse
                 * @instance
                 */
                CoverartResponse.prototype.requestCode = 0;

                /**
                 * CoverartResponse coverart.
                 * @member {Uint8Array} coverart
                 * @memberof hudiy.app.api.CoverartResponse
                 * @instance
                 */
                CoverartResponse.prototype.coverart = $util.newBuffer([]);

                /**
                 * Creates a new CoverartResponse instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.CoverartResponse
                 * @static
                 * @param {hudiy.app.api.CoverartResponse.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.CoverartResponse} CoverartResponse instance
                 * @type {{
                 *   (properties: hudiy.app.api.CoverartResponse.$Shape): hudiy.app.api.CoverartResponse & hudiy.app.api.CoverartResponse.$Shape;
                 *   (properties?: hudiy.app.api.CoverartResponse.$Properties): hudiy.app.api.CoverartResponse;
                 * }}
                 */
                CoverartResponse.create = function(properties) {
                    return new CoverartResponse(properties);
                };

                /**
                 * Encodes the specified CoverartResponse message. Does not implicitly {@link hudiy.app.api.CoverartResponse.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.CoverartResponse
                 * @static
                 * @param {hudiy.app.api.CoverartResponse.$Properties} message CoverartResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CoverartResponse.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.requestCode);
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.coverart);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified CoverartResponse message, length delimited. Does not implicitly {@link hudiy.app.api.CoverartResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.CoverartResponse
                 * @static
                 * @param {hudiy.app.api.CoverartResponse.$Properties} message CoverartResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CoverartResponse.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a CoverartResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.CoverartResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.CoverartResponse & hudiy.app.api.CoverartResponse.$Shape} CoverartResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CoverartResponse.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.CoverartResponse();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.requestCode = reader.int32();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 2)
                                    break;
                                message.coverart = reader.bytes();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "requestCode"))
                        throw $util.ProtocolError("missing required 'requestCode'", { instance: message });
                    if (!$Object.hasOwnProperty.call(message, "coverart"))
                        throw $util.ProtocolError("missing required 'coverart'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a CoverartResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.CoverartResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.CoverartResponse & hudiy.app.api.CoverartResponse.$Shape} CoverartResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CoverartResponse.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CoverartResponse message.
                 * @function verify
                 * @memberof hudiy.app.api.CoverartResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CoverartResponse.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isInteger(message.requestCode))
                        return "requestCode: integer expected";
                    if (!(message.coverart && typeof message.coverart.length === "number" || $util.isString(message.coverart)))
                        return "coverart: buffer expected";
                    return null;
                };

                /**
                 * Creates a CoverartResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.CoverartResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.CoverartResponse} CoverartResponse
                 */
                CoverartResponse.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.CoverartResponse)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.CoverartResponse: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.CoverartResponse();
                    if (object.requestCode != null)
                        message.requestCode = object.requestCode | 0;
                    if (object.coverart != null)
                        if (typeof object.coverart === "string")
                            $util.base64.decode(object.coverart, message.coverart = $util.newBuffer($util.base64.length(object.coverart)), 0);
                        else if (object.coverart.length >= 0)
                            message.coverart = object.coverart;
                    return message;
                };

                /**
                 * Creates a plain object from a CoverartResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.CoverartResponse
                 * @static
                 * @param {hudiy.app.api.CoverartResponse} message CoverartResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CoverartResponse.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.requestCode = 0;
                        if (options.bytes === $String)
                            object.coverart = "";
                        else {
                            object.coverart = [];
                            if (options.bytes !== $Array)
                                object.coverart = $util.newBuffer(object.coverart);
                        }
                    }
                    if (message.requestCode != null && $Object.hasOwnProperty.call(message, "requestCode"))
                        object.requestCode = message.requestCode;
                    if (message.coverart != null && $Object.hasOwnProperty.call(message, "coverart"))
                        object.coverart = options.bytes === $String ? $util.base64.encode(message.coverart, 0, message.coverart.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.coverart) : message.coverart;
                    return object;
                };

                /**
                 * Converts this CoverartResponse to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.CoverartResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CoverartResponse.prototype.toJSON = function() {
                    return CoverartResponse.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for CoverartResponse
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.CoverartResponse
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                CoverartResponse.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.CoverartResponse";
                };

                return CoverartResponse;
            })();

            api.SetEqualizerPreset = (function() {

                /**
                 * Properties of a SetEqualizerPreset.
                 * @typedef {Object} hudiy.app.api.SetEqualizerPreset.$Properties
                 * @property {string} name SetEqualizerPreset name
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a SetEqualizerPreset.
                 * @memberof hudiy.app.api
                 * @interface ISetEqualizerPreset
                 * @augments hudiy.app.api.SetEqualizerPreset.$Properties
                 * @deprecated Use hudiy.app.api.SetEqualizerPreset.$Properties instead.
                 */

                /**
                 * Shape of a SetEqualizerPreset.
                 * @typedef {hudiy.app.api.SetEqualizerPreset.$Properties} hudiy.app.api.SetEqualizerPreset.$Shape
                 */

                /**
                 * Constructs a new SetEqualizerPreset.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a SetEqualizerPreset.
                 * @constructor
                 * @param {hudiy.app.api.SetEqualizerPreset.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const SetEqualizerPreset = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * SetEqualizerPreset name.
                 * @member {string} name
                 * @memberof hudiy.app.api.SetEqualizerPreset
                 * @instance
                 */
                SetEqualizerPreset.prototype.name = "";

                /**
                 * Creates a new SetEqualizerPreset instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.SetEqualizerPreset
                 * @static
                 * @param {hudiy.app.api.SetEqualizerPreset.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.SetEqualizerPreset} SetEqualizerPreset instance
                 * @type {{
                 *   (properties: hudiy.app.api.SetEqualizerPreset.$Shape): hudiy.app.api.SetEqualizerPreset & hudiy.app.api.SetEqualizerPreset.$Shape;
                 *   (properties?: hudiy.app.api.SetEqualizerPreset.$Properties): hudiy.app.api.SetEqualizerPreset;
                 * }}
                 */
                SetEqualizerPreset.create = function(properties) {
                    return new SetEqualizerPreset(properties);
                };

                /**
                 * Encodes the specified SetEqualizerPreset message. Does not implicitly {@link hudiy.app.api.SetEqualizerPreset.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.SetEqualizerPreset
                 * @static
                 * @param {hudiy.app.api.SetEqualizerPreset.$Properties} message SetEqualizerPreset message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetEqualizerPreset.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified SetEqualizerPreset message, length delimited. Does not implicitly {@link hudiy.app.api.SetEqualizerPreset.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.SetEqualizerPreset
                 * @static
                 * @param {hudiy.app.api.SetEqualizerPreset.$Properties} message SetEqualizerPreset message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetEqualizerPreset.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a SetEqualizerPreset message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.SetEqualizerPreset
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetEqualizerPreset & hudiy.app.api.SetEqualizerPreset.$Shape} SetEqualizerPreset
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetEqualizerPreset.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.SetEqualizerPreset();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                message.name = reader.string();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "name"))
                        throw $util.ProtocolError("missing required 'name'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a SetEqualizerPreset message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.SetEqualizerPreset
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetEqualizerPreset & hudiy.app.api.SetEqualizerPreset.$Shape} SetEqualizerPreset
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetEqualizerPreset.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SetEqualizerPreset message.
                 * @function verify
                 * @memberof hudiy.app.api.SetEqualizerPreset
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SetEqualizerPreset.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isString(message.name))
                        return "name: string expected";
                    return null;
                };

                /**
                 * Creates a SetEqualizerPreset message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.SetEqualizerPreset
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.SetEqualizerPreset} SetEqualizerPreset
                 */
                SetEqualizerPreset.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.SetEqualizerPreset)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.SetEqualizerPreset: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.SetEqualizerPreset();
                    if (object.name != null)
                        message.name = $String(object.name);
                    return message;
                };

                /**
                 * Creates a plain object from a SetEqualizerPreset message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.SetEqualizerPreset
                 * @static
                 * @param {hudiy.app.api.SetEqualizerPreset} message SetEqualizerPreset
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SetEqualizerPreset.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        object.name = "";
                    if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                        object.name = message.name;
                    return object;
                };

                /**
                 * Converts this SetEqualizerPreset to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.SetEqualizerPreset
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SetEqualizerPreset.prototype.toJSON = function() {
                    return SetEqualizerPreset.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for SetEqualizerPreset
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.SetEqualizerPreset
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                SetEqualizerPreset.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.SetEqualizerPreset";
                };

                return SetEqualizerPreset;
            })();

            api.SetAndroidAutoDayNightMode = (function() {

                /**
                 * Properties of a SetAndroidAutoDayNightMode.
                 * @typedef {Object} hudiy.app.api.SetAndroidAutoDayNightMode.$Properties
                 * @property {hudiy.app.api.SetAndroidAutoDayNightMode.DayNightMode} mode SetAndroidAutoDayNightMode mode
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a SetAndroidAutoDayNightMode.
                 * @memberof hudiy.app.api
                 * @interface ISetAndroidAutoDayNightMode
                 * @augments hudiy.app.api.SetAndroidAutoDayNightMode.$Properties
                 * @deprecated Use hudiy.app.api.SetAndroidAutoDayNightMode.$Properties instead.
                 */

                /**
                 * Shape of a SetAndroidAutoDayNightMode.
                 * @typedef {hudiy.app.api.SetAndroidAutoDayNightMode.$Properties} hudiy.app.api.SetAndroidAutoDayNightMode.$Shape
                 */

                /**
                 * Constructs a new SetAndroidAutoDayNightMode.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a SetAndroidAutoDayNightMode.
                 * @constructor
                 * @param {hudiy.app.api.SetAndroidAutoDayNightMode.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const SetAndroidAutoDayNightMode = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * SetAndroidAutoDayNightMode mode.
                 * @member {hudiy.app.api.SetAndroidAutoDayNightMode.DayNightMode} mode
                 * @memberof hudiy.app.api.SetAndroidAutoDayNightMode
                 * @instance
                 */
                SetAndroidAutoDayNightMode.prototype.mode = 1;

                /**
                 * Creates a new SetAndroidAutoDayNightMode instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.SetAndroidAutoDayNightMode
                 * @static
                 * @param {hudiy.app.api.SetAndroidAutoDayNightMode.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.SetAndroidAutoDayNightMode} SetAndroidAutoDayNightMode instance
                 * @type {{
                 *   (properties: hudiy.app.api.SetAndroidAutoDayNightMode.$Shape): hudiy.app.api.SetAndroidAutoDayNightMode & hudiy.app.api.SetAndroidAutoDayNightMode.$Shape;
                 *   (properties?: hudiy.app.api.SetAndroidAutoDayNightMode.$Properties): hudiy.app.api.SetAndroidAutoDayNightMode;
                 * }}
                 */
                SetAndroidAutoDayNightMode.create = function(properties) {
                    return new SetAndroidAutoDayNightMode(properties);
                };

                /**
                 * Encodes the specified SetAndroidAutoDayNightMode message. Does not implicitly {@link hudiy.app.api.SetAndroidAutoDayNightMode.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.SetAndroidAutoDayNightMode
                 * @static
                 * @param {hudiy.app.api.SetAndroidAutoDayNightMode.$Properties} message SetAndroidAutoDayNightMode message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetAndroidAutoDayNightMode.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.mode);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified SetAndroidAutoDayNightMode message, length delimited. Does not implicitly {@link hudiy.app.api.SetAndroidAutoDayNightMode.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.SetAndroidAutoDayNightMode
                 * @static
                 * @param {hudiy.app.api.SetAndroidAutoDayNightMode.$Properties} message SetAndroidAutoDayNightMode message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetAndroidAutoDayNightMode.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a SetAndroidAutoDayNightMode message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.SetAndroidAutoDayNightMode
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetAndroidAutoDayNightMode & hudiy.app.api.SetAndroidAutoDayNightMode.$Shape} SetAndroidAutoDayNightMode
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetAndroidAutoDayNightMode.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.SetAndroidAutoDayNightMode(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.SetAndroidAutoDayNightMode.DayNightMode[value] !== $undefined)
                                    message.mode = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "mode"))
                        throw $util.ProtocolError("missing required 'mode'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a SetAndroidAutoDayNightMode message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.SetAndroidAutoDayNightMode
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetAndroidAutoDayNightMode & hudiy.app.api.SetAndroidAutoDayNightMode.$Shape} SetAndroidAutoDayNightMode
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetAndroidAutoDayNightMode.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SetAndroidAutoDayNightMode message.
                 * @function verify
                 * @memberof hudiy.app.api.SetAndroidAutoDayNightMode
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SetAndroidAutoDayNightMode.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    switch (message.mode) {
                    default:
                        return "mode: enum value expected";
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                    return null;
                };

                /**
                 * Creates a SetAndroidAutoDayNightMode message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.SetAndroidAutoDayNightMode
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.SetAndroidAutoDayNightMode} SetAndroidAutoDayNightMode
                 */
                SetAndroidAutoDayNightMode.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.SetAndroidAutoDayNightMode)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.SetAndroidAutoDayNightMode: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.SetAndroidAutoDayNightMode();
                    switch (object.mode) {
                    case "COMMON":
                    case 1:
                        message.mode = 1;
                        break;
                    case "DAY":
                    case 2:
                        message.mode = 2;
                        break;
                    case "NIGHT":
                    case 3:
                        message.mode = 3;
                        break;
                    default:
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a SetAndroidAutoDayNightMode message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.SetAndroidAutoDayNightMode
                 * @static
                 * @param {hudiy.app.api.SetAndroidAutoDayNightMode} message SetAndroidAutoDayNightMode
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SetAndroidAutoDayNightMode.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        object.mode = options.enums === $String ? "COMMON" : 1;
                    if (message.mode != null && $Object.hasOwnProperty.call(message, "mode"))
                        object.mode = options.enums === $String ? $root.hudiy.app.api.SetAndroidAutoDayNightMode.DayNightMode[message.mode] === $undefined ? message.mode : $root.hudiy.app.api.SetAndroidAutoDayNightMode.DayNightMode[message.mode] : message.mode;
                    return object;
                };

                /**
                 * Converts this SetAndroidAutoDayNightMode to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.SetAndroidAutoDayNightMode
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SetAndroidAutoDayNightMode.prototype.toJSON = function() {
                    return SetAndroidAutoDayNightMode.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for SetAndroidAutoDayNightMode
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.SetAndroidAutoDayNightMode
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                SetAndroidAutoDayNightMode.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.SetAndroidAutoDayNightMode";
                };

                /**
                 * DayNightMode enum.
                 * @name hudiy.app.api.SetAndroidAutoDayNightMode.DayNightMode
                 * @enum {number}
                 * @property {number} COMMON=1 COMMON value
                 * @property {number} DAY=2 DAY value
                 * @property {number} NIGHT=3 NIGHT value
                 */
                SetAndroidAutoDayNightMode.DayNightMode = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "COMMON"] = 1;
                    values[valuesById[2] = "DAY"] = 2;
                    values[valuesById[3] = "NIGHT"] = 3;
                    return values;
                })();

                return SetAndroidAutoDayNightMode;
            })();

            api.SetAutoboxDayNightMode = (function() {

                /**
                 * Properties of a SetAutoboxDayNightMode.
                 * @typedef {Object} hudiy.app.api.SetAutoboxDayNightMode.$Properties
                 * @property {hudiy.app.api.SetAutoboxDayNightMode.DayNightMode} mode SetAutoboxDayNightMode mode
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a SetAutoboxDayNightMode.
                 * @memberof hudiy.app.api
                 * @interface ISetAutoboxDayNightMode
                 * @augments hudiy.app.api.SetAutoboxDayNightMode.$Properties
                 * @deprecated Use hudiy.app.api.SetAutoboxDayNightMode.$Properties instead.
                 */

                /**
                 * Shape of a SetAutoboxDayNightMode.
                 * @typedef {hudiy.app.api.SetAutoboxDayNightMode.$Properties} hudiy.app.api.SetAutoboxDayNightMode.$Shape
                 */

                /**
                 * Constructs a new SetAutoboxDayNightMode.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a SetAutoboxDayNightMode.
                 * @constructor
                 * @param {hudiy.app.api.SetAutoboxDayNightMode.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const SetAutoboxDayNightMode = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * SetAutoboxDayNightMode mode.
                 * @member {hudiy.app.api.SetAutoboxDayNightMode.DayNightMode} mode
                 * @memberof hudiy.app.api.SetAutoboxDayNightMode
                 * @instance
                 */
                SetAutoboxDayNightMode.prototype.mode = 1;

                /**
                 * Creates a new SetAutoboxDayNightMode instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.SetAutoboxDayNightMode
                 * @static
                 * @param {hudiy.app.api.SetAutoboxDayNightMode.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.SetAutoboxDayNightMode} SetAutoboxDayNightMode instance
                 * @type {{
                 *   (properties: hudiy.app.api.SetAutoboxDayNightMode.$Shape): hudiy.app.api.SetAutoboxDayNightMode & hudiy.app.api.SetAutoboxDayNightMode.$Shape;
                 *   (properties?: hudiy.app.api.SetAutoboxDayNightMode.$Properties): hudiy.app.api.SetAutoboxDayNightMode;
                 * }}
                 */
                SetAutoboxDayNightMode.create = function(properties) {
                    return new SetAutoboxDayNightMode(properties);
                };

                /**
                 * Encodes the specified SetAutoboxDayNightMode message. Does not implicitly {@link hudiy.app.api.SetAutoboxDayNightMode.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.SetAutoboxDayNightMode
                 * @static
                 * @param {hudiy.app.api.SetAutoboxDayNightMode.$Properties} message SetAutoboxDayNightMode message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetAutoboxDayNightMode.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.mode);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified SetAutoboxDayNightMode message, length delimited. Does not implicitly {@link hudiy.app.api.SetAutoboxDayNightMode.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.SetAutoboxDayNightMode
                 * @static
                 * @param {hudiy.app.api.SetAutoboxDayNightMode.$Properties} message SetAutoboxDayNightMode message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetAutoboxDayNightMode.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a SetAutoboxDayNightMode message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.SetAutoboxDayNightMode
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetAutoboxDayNightMode & hudiy.app.api.SetAutoboxDayNightMode.$Shape} SetAutoboxDayNightMode
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetAutoboxDayNightMode.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.SetAutoboxDayNightMode(), value;
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                value = reader.int32();
                                if ($root.hudiy.app.api.SetAutoboxDayNightMode.DayNightMode[value] !== $undefined)
                                    message.mode = value;
                                else if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "mode"))
                        throw $util.ProtocolError("missing required 'mode'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a SetAutoboxDayNightMode message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.SetAutoboxDayNightMode
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetAutoboxDayNightMode & hudiy.app.api.SetAutoboxDayNightMode.$Shape} SetAutoboxDayNightMode
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetAutoboxDayNightMode.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SetAutoboxDayNightMode message.
                 * @function verify
                 * @memberof hudiy.app.api.SetAutoboxDayNightMode
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SetAutoboxDayNightMode.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    switch (message.mode) {
                    default:
                        return "mode: enum value expected";
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                    return null;
                };

                /**
                 * Creates a SetAutoboxDayNightMode message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.SetAutoboxDayNightMode
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.SetAutoboxDayNightMode} SetAutoboxDayNightMode
                 */
                SetAutoboxDayNightMode.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.SetAutoboxDayNightMode)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.SetAutoboxDayNightMode: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.SetAutoboxDayNightMode();
                    switch (object.mode) {
                    case "COMMON":
                    case 1:
                        message.mode = 1;
                        break;
                    case "DAY":
                    case 2:
                        message.mode = 2;
                        break;
                    case "NIGHT":
                    case 3:
                        message.mode = 3;
                        break;
                    default:
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a SetAutoboxDayNightMode message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.SetAutoboxDayNightMode
                 * @static
                 * @param {hudiy.app.api.SetAutoboxDayNightMode} message SetAutoboxDayNightMode
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SetAutoboxDayNightMode.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        object.mode = options.enums === $String ? "COMMON" : 1;
                    if (message.mode != null && $Object.hasOwnProperty.call(message, "mode"))
                        object.mode = options.enums === $String ? $root.hudiy.app.api.SetAutoboxDayNightMode.DayNightMode[message.mode] === $undefined ? message.mode : $root.hudiy.app.api.SetAutoboxDayNightMode.DayNightMode[message.mode] : message.mode;
                    return object;
                };

                /**
                 * Converts this SetAutoboxDayNightMode to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.SetAutoboxDayNightMode
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SetAutoboxDayNightMode.prototype.toJSON = function() {
                    return SetAutoboxDayNightMode.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for SetAutoboxDayNightMode
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.SetAutoboxDayNightMode
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                SetAutoboxDayNightMode.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.SetAutoboxDayNightMode";
                };

                /**
                 * DayNightMode enum.
                 * @name hudiy.app.api.SetAutoboxDayNightMode.DayNightMode
                 * @enum {number}
                 * @property {number} COMMON=1 COMMON value
                 * @property {number} DAY=2 DAY value
                 * @property {number} NIGHT=3 NIGHT value
                 */
                SetAutoboxDayNightMode.DayNightMode = (function() {
                    const valuesById = $Object.create(null), values = $Object.create(valuesById);
                    values[valuesById[1] = "COMMON"] = 1;
                    values[valuesById[2] = "DAY"] = 2;
                    values[valuesById[3] = "NIGHT"] = 3;
                    return values;
                })();

                return SetAutoboxDayNightMode;
            })();

            api.CurrentMenuAction = (function() {

                /**
                 * Properties of a CurrentMenuAction.
                 * @typedef {Object} hudiy.app.api.CurrentMenuAction.$Properties
                 * @property {string} actionName CurrentMenuAction actionName
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a CurrentMenuAction.
                 * @memberof hudiy.app.api
                 * @interface ICurrentMenuAction
                 * @augments hudiy.app.api.CurrentMenuAction.$Properties
                 * @deprecated Use hudiy.app.api.CurrentMenuAction.$Properties instead.
                 */

                /**
                 * Shape of a CurrentMenuAction.
                 * @typedef {hudiy.app.api.CurrentMenuAction.$Properties} hudiy.app.api.CurrentMenuAction.$Shape
                 */

                /**
                 * Constructs a new CurrentMenuAction.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a CurrentMenuAction.
                 * @constructor
                 * @param {hudiy.app.api.CurrentMenuAction.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const CurrentMenuAction = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * CurrentMenuAction actionName.
                 * @member {string} actionName
                 * @memberof hudiy.app.api.CurrentMenuAction
                 * @instance
                 */
                CurrentMenuAction.prototype.actionName = "";

                /**
                 * Creates a new CurrentMenuAction instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.CurrentMenuAction
                 * @static
                 * @param {hudiy.app.api.CurrentMenuAction.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.CurrentMenuAction} CurrentMenuAction instance
                 * @type {{
                 *   (properties: hudiy.app.api.CurrentMenuAction.$Shape): hudiy.app.api.CurrentMenuAction & hudiy.app.api.CurrentMenuAction.$Shape;
                 *   (properties?: hudiy.app.api.CurrentMenuAction.$Properties): hudiy.app.api.CurrentMenuAction;
                 * }}
                 */
                CurrentMenuAction.create = function(properties) {
                    return new CurrentMenuAction(properties);
                };

                /**
                 * Encodes the specified CurrentMenuAction message. Does not implicitly {@link hudiy.app.api.CurrentMenuAction.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.CurrentMenuAction
                 * @static
                 * @param {hudiy.app.api.CurrentMenuAction.$Properties} message CurrentMenuAction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CurrentMenuAction.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.actionName);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified CurrentMenuAction message, length delimited. Does not implicitly {@link hudiy.app.api.CurrentMenuAction.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.CurrentMenuAction
                 * @static
                 * @param {hudiy.app.api.CurrentMenuAction.$Properties} message CurrentMenuAction message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CurrentMenuAction.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a CurrentMenuAction message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.CurrentMenuAction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.CurrentMenuAction & hudiy.app.api.CurrentMenuAction.$Shape} CurrentMenuAction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CurrentMenuAction.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.CurrentMenuAction();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 2)
                                    break;
                                message.actionName = reader.string();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    if (!$Object.hasOwnProperty.call(message, "actionName"))
                        throw $util.ProtocolError("missing required 'actionName'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a CurrentMenuAction message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.CurrentMenuAction
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.CurrentMenuAction & hudiy.app.api.CurrentMenuAction.$Shape} CurrentMenuAction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CurrentMenuAction.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a CurrentMenuAction message.
                 * @function verify
                 * @memberof hudiy.app.api.CurrentMenuAction
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CurrentMenuAction.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (!$util.isString(message.actionName))
                        return "actionName: string expected";
                    return null;
                };

                /**
                 * Creates a CurrentMenuAction message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.CurrentMenuAction
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.CurrentMenuAction} CurrentMenuAction
                 */
                CurrentMenuAction.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.CurrentMenuAction)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.CurrentMenuAction: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.CurrentMenuAction();
                    if (object.actionName != null)
                        message.actionName = $String(object.actionName);
                    return message;
                };

                /**
                 * Creates a plain object from a CurrentMenuAction message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.CurrentMenuAction
                 * @static
                 * @param {hudiy.app.api.CurrentMenuAction} message CurrentMenuAction
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CurrentMenuAction.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        object.actionName = "";
                    if (message.actionName != null && $Object.hasOwnProperty.call(message, "actionName"))
                        object.actionName = message.actionName;
                    return object;
                };

                /**
                 * Converts this CurrentMenuAction to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.CurrentMenuAction
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CurrentMenuAction.prototype.toJSON = function() {
                    return CurrentMenuAction.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for CurrentMenuAction
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.CurrentMenuAction
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                CurrentMenuAction.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.CurrentMenuAction";
                };

                return CurrentMenuAction;
            })();

            api.SetBassTrebleBoost = (function() {

                /**
                 * Properties of a SetBassTrebleBoost.
                 * @typedef {Object} hudiy.app.api.SetBassTrebleBoost.$Properties
                 * @property {number|null} [bassGain] SetBassTrebleBoost bassGain
                 * @property {number|null} [bassFrequency] SetBassTrebleBoost bassFrequency
                 * @property {number|null} [trebleGain] SetBassTrebleBoost trebleGain
                 * @property {number|null} [trebleFrequency] SetBassTrebleBoost trebleFrequency
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */

                /**
                 * Properties of a SetBassTrebleBoost.
                 * @memberof hudiy.app.api
                 * @interface ISetBassTrebleBoost
                 * @augments hudiy.app.api.SetBassTrebleBoost.$Properties
                 * @deprecated Use hudiy.app.api.SetBassTrebleBoost.$Properties instead.
                 */

                /**
                 * Shape of a SetBassTrebleBoost.
                 * @typedef {hudiy.app.api.SetBassTrebleBoost.$Properties} hudiy.app.api.SetBassTrebleBoost.$Shape
                 */

                /**
                 * Constructs a new SetBassTrebleBoost.
                 * @memberof hudiy.app.api
                 * @classdesc Represents a SetBassTrebleBoost.
                 * @constructor
                 * @param {hudiy.app.api.SetBassTrebleBoost.$Properties=} [properties] Properties to set
                 * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                 */
                const SetBassTrebleBoost = function (properties) {
                    if (properties)
                        for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                };

                /**
                 * SetBassTrebleBoost bassGain.
                 * @member {number} bassGain
                 * @memberof hudiy.app.api.SetBassTrebleBoost
                 * @instance
                 */
                SetBassTrebleBoost.prototype.bassGain = 0;

                /**
                 * SetBassTrebleBoost bassFrequency.
                 * @member {number} bassFrequency
                 * @memberof hudiy.app.api.SetBassTrebleBoost
                 * @instance
                 */
                SetBassTrebleBoost.prototype.bassFrequency = 0;

                /**
                 * SetBassTrebleBoost trebleGain.
                 * @member {number} trebleGain
                 * @memberof hudiy.app.api.SetBassTrebleBoost
                 * @instance
                 */
                SetBassTrebleBoost.prototype.trebleGain = 0;

                /**
                 * SetBassTrebleBoost trebleFrequency.
                 * @member {number} trebleFrequency
                 * @memberof hudiy.app.api.SetBassTrebleBoost
                 * @instance
                 */
                SetBassTrebleBoost.prototype.trebleFrequency = 0;

                /**
                 * Creates a new SetBassTrebleBoost instance using the specified properties.
                 * @function create
                 * @memberof hudiy.app.api.SetBassTrebleBoost
                 * @static
                 * @param {hudiy.app.api.SetBassTrebleBoost.$Properties=} [properties] Properties to set
                 * @returns {hudiy.app.api.SetBassTrebleBoost} SetBassTrebleBoost instance
                 * @type {{
                 *   (properties: hudiy.app.api.SetBassTrebleBoost.$Shape): hudiy.app.api.SetBassTrebleBoost & hudiy.app.api.SetBassTrebleBoost.$Shape;
                 *   (properties?: hudiy.app.api.SetBassTrebleBoost.$Properties): hudiy.app.api.SetBassTrebleBoost;
                 * }}
                 */
                SetBassTrebleBoost.create = function(properties) {
                    return new SetBassTrebleBoost(properties);
                };

                /**
                 * Encodes the specified SetBassTrebleBoost message. Does not implicitly {@link hudiy.app.api.SetBassTrebleBoost.verify|verify} messages.
                 * @function encode
                 * @memberof hudiy.app.api.SetBassTrebleBoost
                 * @static
                 * @param {hudiy.app.api.SetBassTrebleBoost.$Properties} message SetBassTrebleBoost message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetBassTrebleBoost.encode = function (message, writer, _depth) {
                    if (!writer)
                        writer = $Writer.create();
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    if (message.bassGain != null && $Object.hasOwnProperty.call(message, "bassGain"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.bassGain);
                    if (message.bassFrequency != null && $Object.hasOwnProperty.call(message, "bassFrequency"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.bassFrequency);
                    if (message.trebleGain != null && $Object.hasOwnProperty.call(message, "trebleGain"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.trebleGain);
                    if (message.trebleFrequency != null && $Object.hasOwnProperty.call(message, "trebleFrequency"))
                        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.trebleFrequency);
                    if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                        for (let i = 0; i < message.$unknowns.length; ++i)
                            writer.raw(message.$unknowns[i]);
                    return writer;
                };

                /**
                 * Encodes the specified SetBassTrebleBoost message, length delimited. Does not implicitly {@link hudiy.app.api.SetBassTrebleBoost.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof hudiy.app.api.SetBassTrebleBoost
                 * @static
                 * @param {hudiy.app.api.SetBassTrebleBoost.$Properties} message SetBassTrebleBoost message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SetBassTrebleBoost.encodeDelimited = function(message, writer) {
                    return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                };

                /**
                 * Decodes a SetBassTrebleBoost message from the specified reader or buffer.
                 * @function decode
                 * @memberof hudiy.app.api.SetBassTrebleBoost
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetBassTrebleBoost & hudiy.app.api.SetBassTrebleBoost.$Shape} SetBassTrebleBoost
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetBassTrebleBoost.decode = function (reader, length, _end, _depth, _target) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $Reader.recursionLimit)
                        throw $Error("max depth exceeded");
                    let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.hudiy.app.api.SetBassTrebleBoost();
                    while (reader.pos < end) {
                        let start = reader.pos;
                        let tag = reader.tag();
                        if (tag === _end) {
                            _end = $undefined;
                            break;
                        }
                        let wireType = tag & 7;
                        switch (tag >>>= 3) {
                        case 1: {
                                if (wireType !== 0)
                                    break;
                                message.bassGain = reader.int32();
                                continue;
                            }
                        case 2: {
                                if (wireType !== 0)
                                    break;
                                message.bassFrequency = reader.int32();
                                continue;
                            }
                        case 3: {
                                if (wireType !== 0)
                                    break;
                                message.trebleGain = reader.int32();
                                continue;
                            }
                        case 4: {
                                if (wireType !== 0)
                                    break;
                                message.trebleFrequency = reader.int32();
                                continue;
                            }
                        }
                        reader.skipType(wireType, _depth, tag);
                        if (!reader.discardUnknown) {
                            $util.makeProp(message, "$unknowns", false);
                            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                        }
                    }
                    if (_end !== $undefined)
                        throw $Error("missing end group");
                    return message;
                };

                /**
                 * Decodes a SetBassTrebleBoost message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof hudiy.app.api.SetBassTrebleBoost
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetBassTrebleBoost & hudiy.app.api.SetBassTrebleBoost.$Shape} SetBassTrebleBoost
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SetBassTrebleBoost.decodeDelimited = function(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SetBassTrebleBoost message.
                 * @function verify
                 * @memberof hudiy.app.api.SetBassTrebleBoost
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SetBassTrebleBoost.verify = function (message, _depth) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        return "max depth exceeded";
                    if (message.bassGain != null && $Object.hasOwnProperty.call(message, "bassGain"))
                        if (!$util.isInteger(message.bassGain))
                            return "bassGain: integer expected";
                    if (message.bassFrequency != null && $Object.hasOwnProperty.call(message, "bassFrequency"))
                        if (!$util.isInteger(message.bassFrequency))
                            return "bassFrequency: integer expected";
                    if (message.trebleGain != null && $Object.hasOwnProperty.call(message, "trebleGain"))
                        if (!$util.isInteger(message.trebleGain))
                            return "trebleGain: integer expected";
                    if (message.trebleFrequency != null && $Object.hasOwnProperty.call(message, "trebleFrequency"))
                        if (!$util.isInteger(message.trebleFrequency))
                            return "trebleFrequency: integer expected";
                    return null;
                };

                /**
                 * Creates a SetBassTrebleBoost message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof hudiy.app.api.SetBassTrebleBoost
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {hudiy.app.api.SetBassTrebleBoost} SetBassTrebleBoost
                 */
                SetBassTrebleBoost.fromObject = function (object, _depth) {
                    if (object instanceof $root.hudiy.app.api.SetBassTrebleBoost)
                        return object;
                    if (!$util.isObject(object))
                        throw $TypeError(".hudiy.app.api.SetBassTrebleBoost: object expected");
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let message = new $root.hudiy.app.api.SetBassTrebleBoost();
                    if (object.bassGain != null)
                        message.bassGain = object.bassGain | 0;
                    if (object.bassFrequency != null)
                        message.bassFrequency = object.bassFrequency | 0;
                    if (object.trebleGain != null)
                        message.trebleGain = object.trebleGain | 0;
                    if (object.trebleFrequency != null)
                        message.trebleFrequency = object.trebleFrequency | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a SetBassTrebleBoost message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof hudiy.app.api.SetBassTrebleBoost
                 * @static
                 * @param {hudiy.app.api.SetBassTrebleBoost} message SetBassTrebleBoost
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SetBassTrebleBoost.toObject = function (message, options, _depth) {
                    if (!options)
                        options = {};
                    if (_depth === $undefined)
                        _depth = 0;
                    if (_depth > $util.recursionLimit)
                        throw $Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.bassGain = 0;
                        object.bassFrequency = 0;
                        object.trebleGain = 0;
                        object.trebleFrequency = 0;
                    }
                    if (message.bassGain != null && $Object.hasOwnProperty.call(message, "bassGain"))
                        object.bassGain = message.bassGain;
                    if (message.bassFrequency != null && $Object.hasOwnProperty.call(message, "bassFrequency"))
                        object.bassFrequency = message.bassFrequency;
                    if (message.trebleGain != null && $Object.hasOwnProperty.call(message, "trebleGain"))
                        object.trebleGain = message.trebleGain;
                    if (message.trebleFrequency != null && $Object.hasOwnProperty.call(message, "trebleFrequency"))
                        object.trebleFrequency = message.trebleFrequency;
                    return object;
                };

                /**
                 * Converts this SetBassTrebleBoost to JSON.
                 * @function toJSON
                 * @memberof hudiy.app.api.SetBassTrebleBoost
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SetBassTrebleBoost.prototype.toJSON = function() {
                    return SetBassTrebleBoost.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the type url for SetBassTrebleBoost
                 * @function getTypeUrl
                 * @memberof hudiy.app.api.SetBassTrebleBoost
                 * @static
                 * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns {string} The type url
                 */
                SetBassTrebleBoost.getTypeUrl = function(prefix) {
                    if (prefix === $undefined)
                        prefix = "type.googleapis.com";
                    return prefix + "/hudiy.app.api.SetBassTrebleBoost";
                };

                return SetBassTrebleBoost;
            })();

            return api;
        })();

        return app;
    })();

    return hudiy;
})();

export {
  $root as default
};
