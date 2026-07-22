import * as $protobuf from "protobufjs/minimal.js";
import Long = require("long");

/** Namespace hudiy. */
export namespace hudiy {

    /** Namespace app. */
    namespace app {

        /** Namespace api. */
        namespace api {

            /** Constants enum. */
            enum Constants {

                /** API_MAJOR_VERSION value */
                API_MAJOR_VERSION = 1,

                /** API_MINOR_VERSION value */
                API_MINOR_VERSION = 3
            }

            /** MessageType enum. */
            enum MessageType {

                /** MESSAGE_INVALID_ID value */
                MESSAGE_INVALID_ID = 0,

                /** MESSAGE_HELLO_REQUEST value */
                MESSAGE_HELLO_REQUEST = 1,

                /** MESSAGE_HELLO_RESPONSE value */
                MESSAGE_HELLO_RESPONSE = 2,

                /** MESSAGE_SET_STATUS_SUBSCRIPTIONS value */
                MESSAGE_SET_STATUS_SUBSCRIPTIONS = 3,

                /** MESSAGE_SET_REVERSE_CAMERA_STATUS value */
                MESSAGE_SET_REVERSE_CAMERA_STATUS = 4,

                /** MESSAGE_PROJECTION_STATUS value */
                MESSAGE_PROJECTION_STATUS = 5,

                /** MESSAGE_MEDIA_STATUS value */
                MESSAGE_MEDIA_STATUS = 6,

                /** MESSAGE_MEDIA_METADATA value */
                MESSAGE_MEDIA_METADATA = 7,

                /** MESSAGE_NAVIGATION_STATUS value */
                MESSAGE_NAVIGATION_STATUS = 8,

                /** MESSAGE_NAVIGATION_MANEUVER_DETAILS value */
                MESSAGE_NAVIGATION_MANEUVER_DETAILS = 9,

                /** MESSAGE_NAVIGATION_MANEUVER_DISTANCE value */
                MESSAGE_NAVIGATION_MANEUVER_DISTANCE = 10,

                /** MESSAGE_REGISTER_STATUS_ICON_REQUEST value */
                MESSAGE_REGISTER_STATUS_ICON_REQUEST = 11,

                /** MESSAGE_REGISTER_STATUS_ICON_RESPONSE value */
                MESSAGE_REGISTER_STATUS_ICON_RESPONSE = 12,

                /** MESSAGE_UNREGISTER_STATUS_ICON value */
                MESSAGE_UNREGISTER_STATUS_ICON = 13,

                /** MESSAGE_CHANGE_STATUS_ICON_STATE value */
                MESSAGE_CHANGE_STATUS_ICON_STATE = 14,

                /** MESSAGE_REGISTER_NOTIFICATION_CHANNEL_REQUEST value */
                MESSAGE_REGISTER_NOTIFICATION_CHANNEL_REQUEST = 15,

                /** MESSAGE_REGISTER_NOTIFICATION_CHANNEL_RESPONSE value */
                MESSAGE_REGISTER_NOTIFICATION_CHANNEL_RESPONSE = 16,

                /** MESSAGE_UNREGISTER_NOTIFICATION_CHANNEL value */
                MESSAGE_UNREGISTER_NOTIFICATION_CHANNEL = 17,

                /** MESSAGE_SHOW_NOTIFICATION value */
                MESSAGE_SHOW_NOTIFICATION = 18,

                /** MESSAGE_REGISTER_TOAST_CHANNEL_REQUEST value */
                MESSAGE_REGISTER_TOAST_CHANNEL_REQUEST = 19,

                /** MESSAGE_REGISTER_TOAST_CHANNEL_RESPONSE value */
                MESSAGE_REGISTER_TOAST_CHANNEL_RESPONSE = 20,

                /** MESSAGE_UNREGISTER_TOAST_CHANNEL value */
                MESSAGE_UNREGISTER_TOAST_CHANNEL = 21,

                /** MESSAGE_SHOW_TOAST value */
                MESSAGE_SHOW_TOAST = 22,

                /** MESSAGE_OBD_CONNECTION_STATUS value */
                MESSAGE_OBD_CONNECTION_STATUS = 23,

                /** MESSAGE_QUERY_OBD_DEVICE_REQUEST value */
                MESSAGE_QUERY_OBD_DEVICE_REQUEST = 24,

                /** MESSAGE_QUERY_OBD_DEVICE_RESPONSE value */
                MESSAGE_QUERY_OBD_DEVICE_RESPONSE = 25,

                /** MESSAGE_REGISTER_AUDIO_FOCUS_RECEIVER_REQUEST value */
                MESSAGE_REGISTER_AUDIO_FOCUS_RECEIVER_REQUEST = 26,

                /** MESSAGE_REGISTER_AUDIO_FOCUS_RECEIVER_RESPONSE value */
                MESSAGE_REGISTER_AUDIO_FOCUS_RECEIVER_RESPONSE = 27,

                /** MESSAGE_UNREGISTER_AUDIO_FOCUS_RECEIVER value */
                MESSAGE_UNREGISTER_AUDIO_FOCUS_RECEIVER = 28,

                /** MESSAGE_AUDIO_FOCUS_CHANGE_REQUEST value */
                MESSAGE_AUDIO_FOCUS_CHANGE_REQUEST = 29,

                /** MESSAGE_AUDIO_FOCUS_CHANGE_RESPONSE value */
                MESSAGE_AUDIO_FOCUS_CHANGE_RESPONSE = 30,

                /** MESSAGE_AUDIO_FOCUS_ACTION value */
                MESSAGE_AUDIO_FOCUS_ACTION = 31,

                /** MESSAGE_AUDIO_FOCUS_MEDIA_KEY value */
                MESSAGE_AUDIO_FOCUS_MEDIA_KEY = 32,

                /** MESSAGE_PHONE_CONNECTION_STATUS value */
                MESSAGE_PHONE_CONNECTION_STATUS = 33,

                /** MESSAGE_PHONE_VOICE_CALL_STATUS value */
                MESSAGE_PHONE_VOICE_CALL_STATUS = 34,

                /** MESSAGE_PHONE_LEVELS_STATUS value */
                MESSAGE_PHONE_LEVELS_STATUS = 35,

                /** MESSAGE_KEY_EVENT value */
                MESSAGE_KEY_EVENT = 36,

                /** MESSAGE_SET_DARK_MODE value */
                MESSAGE_SET_DARK_MODE = 37,

                /** MESSAGE_SET_CUSTOM_OVERLAY_VISIBILITY value */
                MESSAGE_SET_CUSTOM_OVERLAY_VISIBILITY = 38,

                /** MESSAGE_SET_NAVIGATION_OVERLAY_VISIBILITY value */
                MESSAGE_SET_NAVIGATION_OVERLAY_VISIBILITY = 39,

                /** MESSAGE_SET_VOLUME_OVERLAY_VISIBILITY value */
                MESSAGE_SET_VOLUME_OVERLAY_VISIBILITY = 40,

                /** MESSAGE_REGISTER_ACTION_REQUEST value */
                MESSAGE_REGISTER_ACTION_REQUEST = 41,

                /** MESSAGE_REGISTER_ACTION_RESPONSE value */
                MESSAGE_REGISTER_ACTION_RESPONSE = 42,

                /** MESSAGE_DISPATCH_ACTION value */
                MESSAGE_DISPATCH_ACTION = 43,

                /** MESSAGE_SET_EQUALIZER_PRESET value */
                MESSAGE_SET_EQUALIZER_PRESET = 44,

                /** MESSAGE_COVERART_REQUEST value */
                MESSAGE_COVERART_REQUEST = 45,

                /** MESSAGE_COVERART_RESPONSE value */
                MESSAGE_COVERART_RESPONSE = 46,

                /** MESSAGE_PING value */
                MESSAGE_PING = 47,

                /** MESSAGE_PONG value */
                MESSAGE_PONG = 48,

                /** MESSAGE_BYEBYE value */
                MESSAGE_BYEBYE = 49,

                /** MESSAGE_SET_ANDROID_AUTO_DAY_NIGHT_MODE value */
                MESSAGE_SET_ANDROID_AUTO_DAY_NIGHT_MODE = 50,

                /** MESSAGE_SET_AUTOBOX_DAY_NIGHT_MODE value */
                MESSAGE_SET_AUTOBOX_DAY_NIGHT_MODE = 51,

                /** MESSAGE_CURRENT_MENU_ACTION value */
                MESSAGE_CURRENT_MENU_ACTION = 52,

                /** MESSAGE_SET_BASS_TREBLE_BOOST value */
                MESSAGE_SET_BASS_TREBLE_BOOST = 53
            }

            /**
             * Properties of a Version.
             * @deprecated Use hudiy.app.api.Version.$Properties instead.
             */
            interface IVersion extends hudiy.app.api.Version.$Properties {
            }

            /** Represents a Version. */
            class Version {

                /**
                 * Constructs a new Version.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.Version.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** Version major. */
                major: number;

                /** Version minor. */
                minor: number;

                /**
                 * Creates a new Version instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Version instance
                 */
                static create(properties: hudiy.app.api.Version.$Shape): hudiy.app.api.Version & hudiy.app.api.Version.$Shape;
                static create(properties?: hudiy.app.api.Version.$Properties): hudiy.app.api.Version;

                /**
                 * Encodes the specified Version message. Does not implicitly {@link hudiy.app.api.Version.verify|verify} messages.
                 * @param message Version message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.Version.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Version message, length delimited. Does not implicitly {@link hudiy.app.api.Version.verify|verify} messages.
                 * @param message Version message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.Version.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Version message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.Version & hudiy.app.api.Version.$Shape} Version
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.Version & hudiy.app.api.Version.$Shape;

                /**
                 * Decodes a Version message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.Version & hudiy.app.api.Version.$Shape} Version
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.Version & hudiy.app.api.Version.$Shape;

                /**
                 * Verifies a Version message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Version message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Version
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.Version;

                /**
                 * Creates a plain object from a Version message. Also converts values to other types if specified.
                 * @param message Version
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.Version, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Version to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for Version
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace Version {

                /** Properties of a Version. */
                interface $Properties {

                    /** Version major */
                    major: number;

                    /** Version minor */
                    minor: number;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a Version. */
                type $Shape = hudiy.app.api.Version.$Properties;
            }

            /**
             * Properties of a HelloRequest.
             * @deprecated Use hudiy.app.api.HelloRequest.$Properties instead.
             */
            interface IHelloRequest extends hudiy.app.api.HelloRequest.$Properties {
            }

            /** Represents a HelloRequest. */
            class HelloRequest {

                /**
                 * Constructs a new HelloRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.HelloRequest.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** HelloRequest name. */
                name: string;

                /** HelloRequest apiVersion. */
                apiVersion: hudiy.app.api.Version.$Properties;

                /**
                 * Creates a new HelloRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns HelloRequest instance
                 */
                static create(properties: hudiy.app.api.HelloRequest.$Shape): hudiy.app.api.HelloRequest & hudiy.app.api.HelloRequest.$Shape;
                static create(properties?: hudiy.app.api.HelloRequest.$Properties): hudiy.app.api.HelloRequest;

                /**
                 * Encodes the specified HelloRequest message. Does not implicitly {@link hudiy.app.api.HelloRequest.verify|verify} messages.
                 * @param message HelloRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.HelloRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified HelloRequest message, length delimited. Does not implicitly {@link hudiy.app.api.HelloRequest.verify|verify} messages.
                 * @param message HelloRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.HelloRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a HelloRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.HelloRequest & hudiy.app.api.HelloRequest.$Shape} HelloRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.HelloRequest & hudiy.app.api.HelloRequest.$Shape;

                /**
                 * Decodes a HelloRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.HelloRequest & hudiy.app.api.HelloRequest.$Shape} HelloRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.HelloRequest & hudiy.app.api.HelloRequest.$Shape;

                /**
                 * Verifies a HelloRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a HelloRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns HelloRequest
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.HelloRequest;

                /**
                 * Creates a plain object from a HelloRequest message. Also converts values to other types if specified.
                 * @param message HelloRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.HelloRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this HelloRequest to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for HelloRequest
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace HelloRequest {

                /** Properties of a HelloRequest. */
                interface $Properties {

                    /** HelloRequest name */
                    name: string;

                    /** HelloRequest apiVersion */
                    apiVersion: hudiy.app.api.Version.$Properties;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a HelloRequest. */
                type $Shape = hudiy.app.api.HelloRequest.$Properties;
            }

            /**
             * Properties of a HelloResponse.
             * @deprecated Use hudiy.app.api.HelloResponse.$Properties instead.
             */
            interface IHelloResponse extends hudiy.app.api.HelloResponse.$Properties {
            }

            /** Represents a HelloResponse. */
            class HelloResponse {

                /**
                 * Constructs a new HelloResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.HelloResponse.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** HelloResponse appVersion. */
                appVersion: hudiy.app.api.Version.$Properties;

                /** HelloResponse apiVersion. */
                apiVersion: hudiy.app.api.Version.$Properties;

                /** HelloResponse result. */
                result: hudiy.app.api.HelloResponse.HelloResponseResult;

                /**
                 * Creates a new HelloResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns HelloResponse instance
                 */
                static create(properties: hudiy.app.api.HelloResponse.$Shape): hudiy.app.api.HelloResponse & hudiy.app.api.HelloResponse.$Shape;
                static create(properties?: hudiy.app.api.HelloResponse.$Properties): hudiy.app.api.HelloResponse;

                /**
                 * Encodes the specified HelloResponse message. Does not implicitly {@link hudiy.app.api.HelloResponse.verify|verify} messages.
                 * @param message HelloResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.HelloResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified HelloResponse message, length delimited. Does not implicitly {@link hudiy.app.api.HelloResponse.verify|verify} messages.
                 * @param message HelloResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.HelloResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a HelloResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.HelloResponse & hudiy.app.api.HelloResponse.$Shape} HelloResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.HelloResponse & hudiy.app.api.HelloResponse.$Shape;

                /**
                 * Decodes a HelloResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.HelloResponse & hudiy.app.api.HelloResponse.$Shape} HelloResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.HelloResponse & hudiy.app.api.HelloResponse.$Shape;

                /**
                 * Verifies a HelloResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a HelloResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns HelloResponse
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.HelloResponse;

                /**
                 * Creates a plain object from a HelloResponse message. Also converts values to other types if specified.
                 * @param message HelloResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.HelloResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this HelloResponse to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for HelloResponse
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace HelloResponse {

                /** Properties of a HelloResponse. */
                interface $Properties {

                    /** HelloResponse appVersion */
                    appVersion: hudiy.app.api.Version.$Properties;

                    /** HelloResponse apiVersion */
                    apiVersion: hudiy.app.api.Version.$Properties;

                    /** HelloResponse result */
                    result: hudiy.app.api.HelloResponse.HelloResponseResult;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a HelloResponse. */
                type $Shape = hudiy.app.api.HelloResponse.$Properties;

                /** HelloResponseResult enum. */
                enum HelloResponseResult {

                    /** HELLO_RESPONSE_RESULT_OK value */
                    HELLO_RESPONSE_RESULT_OK = 1,

                    /** HELLO_RESPONSE_RESULT_VERSION_MISMATCH value */
                    HELLO_RESPONSE_RESULT_VERSION_MISMATCH = 2,

                    /** HELLO_RESPONSE_RESULT_UNKNOWN_ERROR value */
                    HELLO_RESPONSE_RESULT_UNKNOWN_ERROR = 3
                }
            }

            /**
             * Properties of a SetStatusSubscriptions.
             * @deprecated Use hudiy.app.api.SetStatusSubscriptions.$Properties instead.
             */
            interface ISetStatusSubscriptions extends hudiy.app.api.SetStatusSubscriptions.$Properties {
            }

            /** Represents a SetStatusSubscriptions. */
            class SetStatusSubscriptions {

                /**
                 * Constructs a new SetStatusSubscriptions.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.SetStatusSubscriptions.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** SetStatusSubscriptions subscriptions. */
                subscriptions: hudiy.app.api.SetStatusSubscriptions.Subscription[];

                /**
                 * Creates a new SetStatusSubscriptions instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SetStatusSubscriptions instance
                 */
                static create(properties: hudiy.app.api.SetStatusSubscriptions.$Shape): hudiy.app.api.SetStatusSubscriptions & hudiy.app.api.SetStatusSubscriptions.$Shape;
                static create(properties?: hudiy.app.api.SetStatusSubscriptions.$Properties): hudiy.app.api.SetStatusSubscriptions;

                /**
                 * Encodes the specified SetStatusSubscriptions message. Does not implicitly {@link hudiy.app.api.SetStatusSubscriptions.verify|verify} messages.
                 * @param message SetStatusSubscriptions message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.SetStatusSubscriptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SetStatusSubscriptions message, length delimited. Does not implicitly {@link hudiy.app.api.SetStatusSubscriptions.verify|verify} messages.
                 * @param message SetStatusSubscriptions message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.SetStatusSubscriptions.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SetStatusSubscriptions message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetStatusSubscriptions & hudiy.app.api.SetStatusSubscriptions.$Shape} SetStatusSubscriptions
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.SetStatusSubscriptions & hudiy.app.api.SetStatusSubscriptions.$Shape;

                /**
                 * Decodes a SetStatusSubscriptions message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetStatusSubscriptions & hudiy.app.api.SetStatusSubscriptions.$Shape} SetStatusSubscriptions
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.SetStatusSubscriptions & hudiy.app.api.SetStatusSubscriptions.$Shape;

                /**
                 * Verifies a SetStatusSubscriptions message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SetStatusSubscriptions message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SetStatusSubscriptions
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.SetStatusSubscriptions;

                /**
                 * Creates a plain object from a SetStatusSubscriptions message. Also converts values to other types if specified.
                 * @param message SetStatusSubscriptions
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.SetStatusSubscriptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SetStatusSubscriptions to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for SetStatusSubscriptions
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace SetStatusSubscriptions {

                /** Properties of a SetStatusSubscriptions. */
                interface $Properties {

                    /** SetStatusSubscriptions subscriptions */
                    subscriptions?: (hudiy.app.api.SetStatusSubscriptions.Subscription[]|null);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a SetStatusSubscriptions. */
                type $Shape = hudiy.app.api.SetStatusSubscriptions.$Properties;

                /** Subscription enum. */
                enum Subscription {

                    /** PROJECTION value */
                    PROJECTION = 1,

                    /** MEDIA value */
                    MEDIA = 2,

                    /** NAVIGATION value */
                    NAVIGATION = 3,

                    /** OBD value */
                    OBD = 4,

                    /** PHONE value */
                    PHONE = 5,

                    /** COVERARTS value */
                    COVERARTS = 6,

                    /** CURRENT_MENU_ACTION value */
                    CURRENT_MENU_ACTION = 7
                }
            }

            /**
             * Properties of a SetReverseCameraStatus.
             * @deprecated Use hudiy.app.api.SetReverseCameraStatus.$Properties instead.
             */
            interface ISetReverseCameraStatus extends hudiy.app.api.SetReverseCameraStatus.$Properties {
            }

            /** Represents a SetReverseCameraStatus. */
            class SetReverseCameraStatus {

                /**
                 * Constructs a new SetReverseCameraStatus.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.SetReverseCameraStatus.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** SetReverseCameraStatus visible. */
                visible: boolean;

                /**
                 * Creates a new SetReverseCameraStatus instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SetReverseCameraStatus instance
                 */
                static create(properties: hudiy.app.api.SetReverseCameraStatus.$Shape): hudiy.app.api.SetReverseCameraStatus & hudiy.app.api.SetReverseCameraStatus.$Shape;
                static create(properties?: hudiy.app.api.SetReverseCameraStatus.$Properties): hudiy.app.api.SetReverseCameraStatus;

                /**
                 * Encodes the specified SetReverseCameraStatus message. Does not implicitly {@link hudiy.app.api.SetReverseCameraStatus.verify|verify} messages.
                 * @param message SetReverseCameraStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.SetReverseCameraStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SetReverseCameraStatus message, length delimited. Does not implicitly {@link hudiy.app.api.SetReverseCameraStatus.verify|verify} messages.
                 * @param message SetReverseCameraStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.SetReverseCameraStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SetReverseCameraStatus message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetReverseCameraStatus & hudiy.app.api.SetReverseCameraStatus.$Shape} SetReverseCameraStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.SetReverseCameraStatus & hudiy.app.api.SetReverseCameraStatus.$Shape;

                /**
                 * Decodes a SetReverseCameraStatus message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetReverseCameraStatus & hudiy.app.api.SetReverseCameraStatus.$Shape} SetReverseCameraStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.SetReverseCameraStatus & hudiy.app.api.SetReverseCameraStatus.$Shape;

                /**
                 * Verifies a SetReverseCameraStatus message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SetReverseCameraStatus message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SetReverseCameraStatus
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.SetReverseCameraStatus;

                /**
                 * Creates a plain object from a SetReverseCameraStatus message. Also converts values to other types if specified.
                 * @param message SetReverseCameraStatus
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.SetReverseCameraStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SetReverseCameraStatus to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for SetReverseCameraStatus
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace SetReverseCameraStatus {

                /** Properties of a SetReverseCameraStatus. */
                interface $Properties {

                    /** SetReverseCameraStatus visible */
                    visible: boolean;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a SetReverseCameraStatus. */
                type $Shape = hudiy.app.api.SetReverseCameraStatus.$Properties;
            }

            /**
             * Properties of a ProjectionStatus.
             * @deprecated Use hudiy.app.api.ProjectionStatus.$Properties instead.
             */
            interface IProjectionStatus extends hudiy.app.api.ProjectionStatus.$Properties {
            }

            /** Represents a ProjectionStatus. */
            class ProjectionStatus {

                /**
                 * Constructs a new ProjectionStatus.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.ProjectionStatus.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** ProjectionStatus active. */
                active: boolean;

                /**
                 * Creates a new ProjectionStatus instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ProjectionStatus instance
                 */
                static create(properties: hudiy.app.api.ProjectionStatus.$Shape): hudiy.app.api.ProjectionStatus & hudiy.app.api.ProjectionStatus.$Shape;
                static create(properties?: hudiy.app.api.ProjectionStatus.$Properties): hudiy.app.api.ProjectionStatus;

                /**
                 * Encodes the specified ProjectionStatus message. Does not implicitly {@link hudiy.app.api.ProjectionStatus.verify|verify} messages.
                 * @param message ProjectionStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.ProjectionStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ProjectionStatus message, length delimited. Does not implicitly {@link hudiy.app.api.ProjectionStatus.verify|verify} messages.
                 * @param message ProjectionStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.ProjectionStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ProjectionStatus message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.ProjectionStatus & hudiy.app.api.ProjectionStatus.$Shape} ProjectionStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.ProjectionStatus & hudiy.app.api.ProjectionStatus.$Shape;

                /**
                 * Decodes a ProjectionStatus message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.ProjectionStatus & hudiy.app.api.ProjectionStatus.$Shape} ProjectionStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.ProjectionStatus & hudiy.app.api.ProjectionStatus.$Shape;

                /**
                 * Verifies a ProjectionStatus message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ProjectionStatus message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ProjectionStatus
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.ProjectionStatus;

                /**
                 * Creates a plain object from a ProjectionStatus message. Also converts values to other types if specified.
                 * @param message ProjectionStatus
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.ProjectionStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ProjectionStatus to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for ProjectionStatus
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace ProjectionStatus {

                /** Properties of a ProjectionStatus. */
                interface $Properties {

                    /** ProjectionStatus active */
                    active: boolean;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a ProjectionStatus. */
                type $Shape = hudiy.app.api.ProjectionStatus.$Properties;
            }

            /** MediaSource enum. */
            enum MediaSource {

                /** MEDIA_SOURCE_NONE value */
                MEDIA_SOURCE_NONE = 0,

                /** MEDIA_SOURCE_ANDROID_AUTO value */
                MEDIA_SOURCE_ANDROID_AUTO = 1,

                /** MEDIA_SOURCE_AUTOBOX value */
                MEDIA_SOURCE_AUTOBOX = 2,

                /** MEDIA_SOURCE_A2DP value */
                MEDIA_SOURCE_A2DP = 3,

                /** MEDIA_SOURCE_STORAGE value */
                MEDIA_SOURCE_STORAGE = 4,

                /** MEDIA_SOURCE_FM_RADIO value */
                MEDIA_SOURCE_FM_RADIO = 5,

                /** MEDIA_SOURCE_WEB value */
                MEDIA_SOURCE_WEB = 6
            }

            /**
             * Properties of a MediaStatus.
             * @deprecated Use hudiy.app.api.MediaStatus.$Properties instead.
             */
            interface IMediaStatus extends hudiy.app.api.MediaStatus.$Properties {
            }

            /** Represents a MediaStatus. */
            class MediaStatus {

                /**
                 * Constructs a new MediaStatus.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.MediaStatus.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** MediaStatus positionLabel. */
                positionLabel: string;

                /** MediaStatus isPlaying. */
                isPlaying: boolean;

                /** MediaStatus source. */
                source: hudiy.app.api.MediaSource;

                /**
                 * Creates a new MediaStatus instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns MediaStatus instance
                 */
                static create(properties: hudiy.app.api.MediaStatus.$Shape): hudiy.app.api.MediaStatus & hudiy.app.api.MediaStatus.$Shape;
                static create(properties?: hudiy.app.api.MediaStatus.$Properties): hudiy.app.api.MediaStatus;

                /**
                 * Encodes the specified MediaStatus message. Does not implicitly {@link hudiy.app.api.MediaStatus.verify|verify} messages.
                 * @param message MediaStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.MediaStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified MediaStatus message, length delimited. Does not implicitly {@link hudiy.app.api.MediaStatus.verify|verify} messages.
                 * @param message MediaStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.MediaStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a MediaStatus message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.MediaStatus & hudiy.app.api.MediaStatus.$Shape} MediaStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.MediaStatus & hudiy.app.api.MediaStatus.$Shape;

                /**
                 * Decodes a MediaStatus message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.MediaStatus & hudiy.app.api.MediaStatus.$Shape} MediaStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.MediaStatus & hudiy.app.api.MediaStatus.$Shape;

                /**
                 * Verifies a MediaStatus message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a MediaStatus message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns MediaStatus
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.MediaStatus;

                /**
                 * Creates a plain object from a MediaStatus message. Also converts values to other types if specified.
                 * @param message MediaStatus
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.MediaStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this MediaStatus to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for MediaStatus
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace MediaStatus {

                /** Properties of a MediaStatus. */
                interface $Properties {

                    /** MediaStatus positionLabel */
                    positionLabel: string;

                    /** MediaStatus isPlaying */
                    isPlaying: boolean;

                    /** MediaStatus source */
                    source: hudiy.app.api.MediaSource;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a MediaStatus. */
                type $Shape = hudiy.app.api.MediaStatus.$Properties;
            }

            /**
             * Properties of a MediaMetadata.
             * @deprecated Use hudiy.app.api.MediaMetadata.$Properties instead.
             */
            interface IMediaMetadata extends hudiy.app.api.MediaMetadata.$Properties {
            }

            /** Represents a MediaMetadata. */
            class MediaMetadata {

                /**
                 * Constructs a new MediaMetadata.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.MediaMetadata.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** MediaMetadata album. */
                album: string;

                /** MediaMetadata artist. */
                artist: string;

                /** MediaMetadata title. */
                title: string;

                /** MediaMetadata durationLabel. */
                durationLabel: string;

                /** MediaMetadata coverart. */
                coverart: Uint8Array;

                /**
                 * Creates a new MediaMetadata instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns MediaMetadata instance
                 */
                static create(properties: hudiy.app.api.MediaMetadata.$Shape): hudiy.app.api.MediaMetadata & hudiy.app.api.MediaMetadata.$Shape;
                static create(properties?: hudiy.app.api.MediaMetadata.$Properties): hudiy.app.api.MediaMetadata;

                /**
                 * Encodes the specified MediaMetadata message. Does not implicitly {@link hudiy.app.api.MediaMetadata.verify|verify} messages.
                 * @param message MediaMetadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.MediaMetadata.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified MediaMetadata message, length delimited. Does not implicitly {@link hudiy.app.api.MediaMetadata.verify|verify} messages.
                 * @param message MediaMetadata message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.MediaMetadata.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a MediaMetadata message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.MediaMetadata & hudiy.app.api.MediaMetadata.$Shape} MediaMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.MediaMetadata & hudiy.app.api.MediaMetadata.$Shape;

                /**
                 * Decodes a MediaMetadata message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.MediaMetadata & hudiy.app.api.MediaMetadata.$Shape} MediaMetadata
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.MediaMetadata & hudiy.app.api.MediaMetadata.$Shape;

                /**
                 * Verifies a MediaMetadata message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a MediaMetadata message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns MediaMetadata
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.MediaMetadata;

                /**
                 * Creates a plain object from a MediaMetadata message. Also converts values to other types if specified.
                 * @param message MediaMetadata
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.MediaMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this MediaMetadata to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for MediaMetadata
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace MediaMetadata {

                /** Properties of a MediaMetadata. */
                interface $Properties {

                    /** MediaMetadata album */
                    album: string;

                    /** MediaMetadata artist */
                    artist: string;

                    /** MediaMetadata title */
                    title: string;

                    /** MediaMetadata durationLabel */
                    durationLabel: string;

                    /** MediaMetadata coverart */
                    coverart: Uint8Array;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a MediaMetadata. */
                type $Shape = hudiy.app.api.MediaMetadata.$Properties;
            }

            /**
             * Properties of a NavigationStatus.
             * @deprecated Use hudiy.app.api.NavigationStatus.$Properties instead.
             */
            interface INavigationStatus extends hudiy.app.api.NavigationStatus.$Properties {
            }

            /** Represents a NavigationStatus. */
            class NavigationStatus {

                /**
                 * Constructs a new NavigationStatus.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.NavigationStatus.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** NavigationStatus source. */
                source: hudiy.app.api.NavigationStatus.NavigationSource;

                /** NavigationStatus state. */
                state: hudiy.app.api.NavigationStatus.NavigationState;

                /**
                 * Creates a new NavigationStatus instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns NavigationStatus instance
                 */
                static create(properties: hudiy.app.api.NavigationStatus.$Shape): hudiy.app.api.NavigationStatus & hudiy.app.api.NavigationStatus.$Shape;
                static create(properties?: hudiy.app.api.NavigationStatus.$Properties): hudiy.app.api.NavigationStatus;

                /**
                 * Encodes the specified NavigationStatus message. Does not implicitly {@link hudiy.app.api.NavigationStatus.verify|verify} messages.
                 * @param message NavigationStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.NavigationStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified NavigationStatus message, length delimited. Does not implicitly {@link hudiy.app.api.NavigationStatus.verify|verify} messages.
                 * @param message NavigationStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.NavigationStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a NavigationStatus message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.NavigationStatus & hudiy.app.api.NavigationStatus.$Shape} NavigationStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.NavigationStatus & hudiy.app.api.NavigationStatus.$Shape;

                /**
                 * Decodes a NavigationStatus message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.NavigationStatus & hudiy.app.api.NavigationStatus.$Shape} NavigationStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.NavigationStatus & hudiy.app.api.NavigationStatus.$Shape;

                /**
                 * Verifies a NavigationStatus message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a NavigationStatus message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns NavigationStatus
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.NavigationStatus;

                /**
                 * Creates a plain object from a NavigationStatus message. Also converts values to other types if specified.
                 * @param message NavigationStatus
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.NavigationStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this NavigationStatus to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for NavigationStatus
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace NavigationStatus {

                /** Properties of a NavigationStatus. */
                interface $Properties {

                    /** NavigationStatus source */
                    source: hudiy.app.api.NavigationStatus.NavigationSource;

                    /** NavigationStatus state */
                    state: hudiy.app.api.NavigationStatus.NavigationState;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a NavigationStatus. */
                type $Shape = hudiy.app.api.NavigationStatus.$Properties;

                /** NavigationSource enum. */
                enum NavigationSource {

                    /** NAVIGATION_SOURCE_NONE value */
                    NAVIGATION_SOURCE_NONE = 0,

                    /** NAVIGATION_SOURCE_ANDROID_AUTO value */
                    NAVIGATION_SOURCE_ANDROID_AUTO = 1,

                    /** NAVIGATION_SOURCE_AUTOBOX value */
                    NAVIGATION_SOURCE_AUTOBOX = 2
                }

                /** NavigationState enum. */
                enum NavigationState {

                    /** NAVIGATION_STATE_ACTIVE value */
                    NAVIGATION_STATE_ACTIVE = 1,

                    /** NAVIGATION_STATE_INACTIVE value */
                    NAVIGATION_STATE_INACTIVE = 2
                }
            }

            /**
             * Properties of a NavigationManeuverDetails.
             * @deprecated Use hudiy.app.api.NavigationManeuverDetails.$Properties instead.
             */
            interface INavigationManeuverDetails extends hudiy.app.api.NavigationManeuverDetails.$Properties {
            }

            /** Represents a NavigationManeuverDetails. */
            class NavigationManeuverDetails {

                /**
                 * Constructs a new NavigationManeuverDetails.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.NavigationManeuverDetails.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** NavigationManeuverDetails description. */
                description: string;

                /** NavigationManeuverDetails icon. */
                icon: Uint8Array;

                /** NavigationManeuverDetails maneuverSide. */
                maneuverSide: hudiy.app.api.NavigationManeuverDetails.NavigationManeuverSide;

                /** NavigationManeuverDetails maneuverType. */
                maneuverType: hudiy.app.api.NavigationManeuverDetails.NavigationManeuverType;

                /** NavigationManeuverDetails maneuverAngle. */
                maneuverAngle: number;

                /**
                 * Creates a new NavigationManeuverDetails instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns NavigationManeuverDetails instance
                 */
                static create(properties: hudiy.app.api.NavigationManeuverDetails.$Shape): hudiy.app.api.NavigationManeuverDetails & hudiy.app.api.NavigationManeuverDetails.$Shape;
                static create(properties?: hudiy.app.api.NavigationManeuverDetails.$Properties): hudiy.app.api.NavigationManeuverDetails;

                /**
                 * Encodes the specified NavigationManeuverDetails message. Does not implicitly {@link hudiy.app.api.NavigationManeuverDetails.verify|verify} messages.
                 * @param message NavigationManeuverDetails message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.NavigationManeuverDetails.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified NavigationManeuverDetails message, length delimited. Does not implicitly {@link hudiy.app.api.NavigationManeuverDetails.verify|verify} messages.
                 * @param message NavigationManeuverDetails message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.NavigationManeuverDetails.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a NavigationManeuverDetails message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.NavigationManeuverDetails & hudiy.app.api.NavigationManeuverDetails.$Shape} NavigationManeuverDetails
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.NavigationManeuverDetails & hudiy.app.api.NavigationManeuverDetails.$Shape;

                /**
                 * Decodes a NavigationManeuverDetails message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.NavigationManeuverDetails & hudiy.app.api.NavigationManeuverDetails.$Shape} NavigationManeuverDetails
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.NavigationManeuverDetails & hudiy.app.api.NavigationManeuverDetails.$Shape;

                /**
                 * Verifies a NavigationManeuverDetails message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a NavigationManeuverDetails message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns NavigationManeuverDetails
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.NavigationManeuverDetails;

                /**
                 * Creates a plain object from a NavigationManeuverDetails message. Also converts values to other types if specified.
                 * @param message NavigationManeuverDetails
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.NavigationManeuverDetails, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this NavigationManeuverDetails to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for NavigationManeuverDetails
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace NavigationManeuverDetails {

                /** Properties of a NavigationManeuverDetails. */
                interface $Properties {

                    /** NavigationManeuverDetails description */
                    description: string;

                    /** NavigationManeuverDetails icon */
                    icon: Uint8Array;

                    /** NavigationManeuverDetails maneuverSide */
                    maneuverSide?: (hudiy.app.api.NavigationManeuverDetails.NavigationManeuverSide|null);

                    /** NavigationManeuverDetails maneuverType */
                    maneuverType?: (hudiy.app.api.NavigationManeuverDetails.NavigationManeuverType|null);

                    /** NavigationManeuverDetails maneuverAngle */
                    maneuverAngle?: (number|null);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a NavigationManeuverDetails. */
                type $Shape = hudiy.app.api.NavigationManeuverDetails.$Properties;

                /** NavigationManeuverType enum. */
                enum NavigationManeuverType {

                    /** UNKNOWN value */
                    UNKNOWN = 0,

                    /** DEPART value */
                    DEPART = 1,

                    /** NAME_CHANGE value */
                    NAME_CHANGE = 2,

                    /** SLIGHT_TURN value */
                    SLIGHT_TURN = 3,

                    /** TURN value */
                    TURN = 4,

                    /** SHARP_TURN value */
                    SHARP_TURN = 5,

                    /** U_TURN value */
                    U_TURN = 6,

                    /** ON_RAMP value */
                    ON_RAMP = 7,

                    /** OFF_RAMP value */
                    OFF_RAMP = 8,

                    /** FORK value */
                    FORK = 9,

                    /** MERGE value */
                    MERGE = 10,

                    /** ROUNDABOUT_ENTER value */
                    ROUNDABOUT_ENTER = 11,

                    /** ROUNDABOUT_EXIT value */
                    ROUNDABOUT_EXIT = 12,

                    /** ROUNDABOUT_ENTER_AND_EXIT value */
                    ROUNDABOUT_ENTER_AND_EXIT = 13,

                    /** STRAIGHT value */
                    STRAIGHT = 14,

                    /** FERRY_BOAT value */
                    FERRY_BOAT = 16,

                    /** FERRY_TRAIN value */
                    FERRY_TRAIN = 17,

                    /** DESTINATION value */
                    DESTINATION = 19
                }

                /** NavigationManeuverSide enum. */
                enum NavigationManeuverSide {

                    /** LEFT value */
                    LEFT = 1,

                    /** RIGHT value */
                    RIGHT = 2,

                    /** UNSPECIFIED value */
                    UNSPECIFIED = 3
                }
            }

            /**
             * Properties of a NavigationManeuverDistance.
             * @deprecated Use hudiy.app.api.NavigationManeuverDistance.$Properties instead.
             */
            interface INavigationManeuverDistance extends hudiy.app.api.NavigationManeuverDistance.$Properties {
            }

            /** Represents a NavigationManeuverDistance. */
            class NavigationManeuverDistance {

                /**
                 * Constructs a new NavigationManeuverDistance.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.NavigationManeuverDistance.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** NavigationManeuverDistance label. */
                label: string;

                /**
                 * Creates a new NavigationManeuverDistance instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns NavigationManeuverDistance instance
                 */
                static create(properties: hudiy.app.api.NavigationManeuverDistance.$Shape): hudiy.app.api.NavigationManeuverDistance & hudiy.app.api.NavigationManeuverDistance.$Shape;
                static create(properties?: hudiy.app.api.NavigationManeuverDistance.$Properties): hudiy.app.api.NavigationManeuverDistance;

                /**
                 * Encodes the specified NavigationManeuverDistance message. Does not implicitly {@link hudiy.app.api.NavigationManeuverDistance.verify|verify} messages.
                 * @param message NavigationManeuverDistance message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.NavigationManeuverDistance.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified NavigationManeuverDistance message, length delimited. Does not implicitly {@link hudiy.app.api.NavigationManeuverDistance.verify|verify} messages.
                 * @param message NavigationManeuverDistance message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.NavigationManeuverDistance.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a NavigationManeuverDistance message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.NavigationManeuverDistance & hudiy.app.api.NavigationManeuverDistance.$Shape} NavigationManeuverDistance
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.NavigationManeuverDistance & hudiy.app.api.NavigationManeuverDistance.$Shape;

                /**
                 * Decodes a NavigationManeuverDistance message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.NavigationManeuverDistance & hudiy.app.api.NavigationManeuverDistance.$Shape} NavigationManeuverDistance
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.NavigationManeuverDistance & hudiy.app.api.NavigationManeuverDistance.$Shape;

                /**
                 * Verifies a NavigationManeuverDistance message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a NavigationManeuverDistance message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns NavigationManeuverDistance
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.NavigationManeuverDistance;

                /**
                 * Creates a plain object from a NavigationManeuverDistance message. Also converts values to other types if specified.
                 * @param message NavigationManeuverDistance
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.NavigationManeuverDistance, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this NavigationManeuverDistance to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for NavigationManeuverDistance
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace NavigationManeuverDistance {

                /** Properties of a NavigationManeuverDistance. */
                interface $Properties {

                    /** NavigationManeuverDistance label */
                    label: string;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a NavigationManeuverDistance. */
                type $Shape = hudiy.app.api.NavigationManeuverDistance.$Properties;
            }

            /**
             * Properties of a RegisterStatusIconRequest.
             * @deprecated Use hudiy.app.api.RegisterStatusIconRequest.$Properties instead.
             */
            interface IRegisterStatusIconRequest extends hudiy.app.api.RegisterStatusIconRequest.$Properties {
            }

            /** Represents a RegisterStatusIconRequest. */
            class RegisterStatusIconRequest {

                /**
                 * Constructs a new RegisterStatusIconRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.RegisterStatusIconRequest.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** RegisterStatusIconRequest description. */
                description: string;

                /** RegisterStatusIconRequest iconFontFamily. */
                iconFontFamily: string;

                /** RegisterStatusIconRequest iconName. */
                iconName: string;

                /**
                 * Creates a new RegisterStatusIconRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RegisterStatusIconRequest instance
                 */
                static create(properties: hudiy.app.api.RegisterStatusIconRequest.$Shape): hudiy.app.api.RegisterStatusIconRequest & hudiy.app.api.RegisterStatusIconRequest.$Shape;
                static create(properties?: hudiy.app.api.RegisterStatusIconRequest.$Properties): hudiy.app.api.RegisterStatusIconRequest;

                /**
                 * Encodes the specified RegisterStatusIconRequest message. Does not implicitly {@link hudiy.app.api.RegisterStatusIconRequest.verify|verify} messages.
                 * @param message RegisterStatusIconRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.RegisterStatusIconRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RegisterStatusIconRequest message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterStatusIconRequest.verify|verify} messages.
                 * @param message RegisterStatusIconRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.RegisterStatusIconRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RegisterStatusIconRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterStatusIconRequest & hudiy.app.api.RegisterStatusIconRequest.$Shape} RegisterStatusIconRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.RegisterStatusIconRequest & hudiy.app.api.RegisterStatusIconRequest.$Shape;

                /**
                 * Decodes a RegisterStatusIconRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterStatusIconRequest & hudiy.app.api.RegisterStatusIconRequest.$Shape} RegisterStatusIconRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.RegisterStatusIconRequest & hudiy.app.api.RegisterStatusIconRequest.$Shape;

                /**
                 * Verifies a RegisterStatusIconRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RegisterStatusIconRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RegisterStatusIconRequest
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.RegisterStatusIconRequest;

                /**
                 * Creates a plain object from a RegisterStatusIconRequest message. Also converts values to other types if specified.
                 * @param message RegisterStatusIconRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.RegisterStatusIconRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RegisterStatusIconRequest to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for RegisterStatusIconRequest
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace RegisterStatusIconRequest {

                /** Properties of a RegisterStatusIconRequest. */
                interface $Properties {

                    /** RegisterStatusIconRequest description */
                    description: string;

                    /** RegisterStatusIconRequest iconFontFamily */
                    iconFontFamily: string;

                    /** RegisterStatusIconRequest iconName */
                    iconName: string;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a RegisterStatusIconRequest. */
                type $Shape = hudiy.app.api.RegisterStatusIconRequest.$Properties;
            }

            /**
             * Properties of a RegisterStatusIconResponse.
             * @deprecated Use hudiy.app.api.RegisterStatusIconResponse.$Properties instead.
             */
            interface IRegisterStatusIconResponse extends hudiy.app.api.RegisterStatusIconResponse.$Properties {
            }

            /** Represents a RegisterStatusIconResponse. */
            class RegisterStatusIconResponse {

                /**
                 * Constructs a new RegisterStatusIconResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.RegisterStatusIconResponse.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** RegisterStatusIconResponse result. */
                result: hudiy.app.api.RegisterStatusIconResponse.RegisterStatusIconResult;

                /** RegisterStatusIconResponse id. */
                id: number;

                /**
                 * Creates a new RegisterStatusIconResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RegisterStatusIconResponse instance
                 */
                static create(properties: hudiy.app.api.RegisterStatusIconResponse.$Shape): hudiy.app.api.RegisterStatusIconResponse & hudiy.app.api.RegisterStatusIconResponse.$Shape;
                static create(properties?: hudiy.app.api.RegisterStatusIconResponse.$Properties): hudiy.app.api.RegisterStatusIconResponse;

                /**
                 * Encodes the specified RegisterStatusIconResponse message. Does not implicitly {@link hudiy.app.api.RegisterStatusIconResponse.verify|verify} messages.
                 * @param message RegisterStatusIconResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.RegisterStatusIconResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RegisterStatusIconResponse message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterStatusIconResponse.verify|verify} messages.
                 * @param message RegisterStatusIconResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.RegisterStatusIconResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RegisterStatusIconResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterStatusIconResponse & hudiy.app.api.RegisterStatusIconResponse.$Shape} RegisterStatusIconResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.RegisterStatusIconResponse & hudiy.app.api.RegisterStatusIconResponse.$Shape;

                /**
                 * Decodes a RegisterStatusIconResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterStatusIconResponse & hudiy.app.api.RegisterStatusIconResponse.$Shape} RegisterStatusIconResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.RegisterStatusIconResponse & hudiy.app.api.RegisterStatusIconResponse.$Shape;

                /**
                 * Verifies a RegisterStatusIconResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RegisterStatusIconResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RegisterStatusIconResponse
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.RegisterStatusIconResponse;

                /**
                 * Creates a plain object from a RegisterStatusIconResponse message. Also converts values to other types if specified.
                 * @param message RegisterStatusIconResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.RegisterStatusIconResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RegisterStatusIconResponse to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for RegisterStatusIconResponse
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace RegisterStatusIconResponse {

                /** Properties of a RegisterStatusIconResponse. */
                interface $Properties {

                    /** RegisterStatusIconResponse result */
                    result: hudiy.app.api.RegisterStatusIconResponse.RegisterStatusIconResult;

                    /** RegisterStatusIconResponse id */
                    id?: (number|null);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a RegisterStatusIconResponse. */
                type $Shape = hudiy.app.api.RegisterStatusIconResponse.$Properties;

                /** RegisterStatusIconResult enum. */
                enum RegisterStatusIconResult {

                    /** REGISTER_STATUS_ICON_RESULT_OK value */
                    REGISTER_STATUS_ICON_RESULT_OK = 1,

                    /** REGISTER_STATUS_ICON_RESULT_FAILED value */
                    REGISTER_STATUS_ICON_RESULT_FAILED = 2
                }
            }

            /**
             * Properties of an UnregisterStatusIcon.
             * @deprecated Use hudiy.app.api.UnregisterStatusIcon.$Properties instead.
             */
            interface IUnregisterStatusIcon extends hudiy.app.api.UnregisterStatusIcon.$Properties {
            }

            /** Represents an UnregisterStatusIcon. */
            class UnregisterStatusIcon {

                /**
                 * Constructs a new UnregisterStatusIcon.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.UnregisterStatusIcon.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** UnregisterStatusIcon id. */
                id: number;

                /**
                 * Creates a new UnregisterStatusIcon instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns UnregisterStatusIcon instance
                 */
                static create(properties: hudiy.app.api.UnregisterStatusIcon.$Shape): hudiy.app.api.UnregisterStatusIcon & hudiy.app.api.UnregisterStatusIcon.$Shape;
                static create(properties?: hudiy.app.api.UnregisterStatusIcon.$Properties): hudiy.app.api.UnregisterStatusIcon;

                /**
                 * Encodes the specified UnregisterStatusIcon message. Does not implicitly {@link hudiy.app.api.UnregisterStatusIcon.verify|verify} messages.
                 * @param message UnregisterStatusIcon message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.UnregisterStatusIcon.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified UnregisterStatusIcon message, length delimited. Does not implicitly {@link hudiy.app.api.UnregisterStatusIcon.verify|verify} messages.
                 * @param message UnregisterStatusIcon message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.UnregisterStatusIcon.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an UnregisterStatusIcon message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.UnregisterStatusIcon & hudiy.app.api.UnregisterStatusIcon.$Shape} UnregisterStatusIcon
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.UnregisterStatusIcon & hudiy.app.api.UnregisterStatusIcon.$Shape;

                /**
                 * Decodes an UnregisterStatusIcon message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.UnregisterStatusIcon & hudiy.app.api.UnregisterStatusIcon.$Shape} UnregisterStatusIcon
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.UnregisterStatusIcon & hudiy.app.api.UnregisterStatusIcon.$Shape;

                /**
                 * Verifies an UnregisterStatusIcon message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an UnregisterStatusIcon message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns UnregisterStatusIcon
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.UnregisterStatusIcon;

                /**
                 * Creates a plain object from an UnregisterStatusIcon message. Also converts values to other types if specified.
                 * @param message UnregisterStatusIcon
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.UnregisterStatusIcon, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this UnregisterStatusIcon to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for UnregisterStatusIcon
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace UnregisterStatusIcon {

                /** Properties of an UnregisterStatusIcon. */
                interface $Properties {

                    /** UnregisterStatusIcon id */
                    id: number;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of an UnregisterStatusIcon. */
                type $Shape = hudiy.app.api.UnregisterStatusIcon.$Properties;
            }

            /**
             * Properties of a ChangeStatusIconState.
             * @deprecated Use hudiy.app.api.ChangeStatusIconState.$Properties instead.
             */
            interface IChangeStatusIconState extends hudiy.app.api.ChangeStatusIconState.$Properties {
            }

            /** Represents a ChangeStatusIconState. */
            class ChangeStatusIconState {

                /**
                 * Constructs a new ChangeStatusIconState.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.ChangeStatusIconState.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** ChangeStatusIconState id. */
                id: number;

                /** ChangeStatusIconState visible. */
                visible: boolean;

                /**
                 * Creates a new ChangeStatusIconState instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ChangeStatusIconState instance
                 */
                static create(properties: hudiy.app.api.ChangeStatusIconState.$Shape): hudiy.app.api.ChangeStatusIconState & hudiy.app.api.ChangeStatusIconState.$Shape;
                static create(properties?: hudiy.app.api.ChangeStatusIconState.$Properties): hudiy.app.api.ChangeStatusIconState;

                /**
                 * Encodes the specified ChangeStatusIconState message. Does not implicitly {@link hudiy.app.api.ChangeStatusIconState.verify|verify} messages.
                 * @param message ChangeStatusIconState message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.ChangeStatusIconState.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ChangeStatusIconState message, length delimited. Does not implicitly {@link hudiy.app.api.ChangeStatusIconState.verify|verify} messages.
                 * @param message ChangeStatusIconState message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.ChangeStatusIconState.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ChangeStatusIconState message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.ChangeStatusIconState & hudiy.app.api.ChangeStatusIconState.$Shape} ChangeStatusIconState
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.ChangeStatusIconState & hudiy.app.api.ChangeStatusIconState.$Shape;

                /**
                 * Decodes a ChangeStatusIconState message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.ChangeStatusIconState & hudiy.app.api.ChangeStatusIconState.$Shape} ChangeStatusIconState
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.ChangeStatusIconState & hudiy.app.api.ChangeStatusIconState.$Shape;

                /**
                 * Verifies a ChangeStatusIconState message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ChangeStatusIconState message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ChangeStatusIconState
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.ChangeStatusIconState;

                /**
                 * Creates a plain object from a ChangeStatusIconState message. Also converts values to other types if specified.
                 * @param message ChangeStatusIconState
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.ChangeStatusIconState, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ChangeStatusIconState to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for ChangeStatusIconState
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace ChangeStatusIconState {

                /** Properties of a ChangeStatusIconState. */
                interface $Properties {

                    /** ChangeStatusIconState id */
                    id: number;

                    /** ChangeStatusIconState visible */
                    visible: boolean;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a ChangeStatusIconState. */
                type $Shape = hudiy.app.api.ChangeStatusIconState.$Properties;
            }

            /**
             * Properties of a RegisterNotificationChannelRequest.
             * @deprecated Use hudiy.app.api.RegisterNotificationChannelRequest.$Properties instead.
             */
            interface IRegisterNotificationChannelRequest extends hudiy.app.api.RegisterNotificationChannelRequest.$Properties {
            }

            /** Represents a RegisterNotificationChannelRequest. */
            class RegisterNotificationChannelRequest {

                /**
                 * Constructs a new RegisterNotificationChannelRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.RegisterNotificationChannelRequest.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** RegisterNotificationChannelRequest name. */
                name: string;

                /** RegisterNotificationChannelRequest description. */
                description: string;

                /**
                 * Creates a new RegisterNotificationChannelRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RegisterNotificationChannelRequest instance
                 */
                static create(properties: hudiy.app.api.RegisterNotificationChannelRequest.$Shape): hudiy.app.api.RegisterNotificationChannelRequest & hudiy.app.api.RegisterNotificationChannelRequest.$Shape;
                static create(properties?: hudiy.app.api.RegisterNotificationChannelRequest.$Properties): hudiy.app.api.RegisterNotificationChannelRequest;

                /**
                 * Encodes the specified RegisterNotificationChannelRequest message. Does not implicitly {@link hudiy.app.api.RegisterNotificationChannelRequest.verify|verify} messages.
                 * @param message RegisterNotificationChannelRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.RegisterNotificationChannelRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RegisterNotificationChannelRequest message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterNotificationChannelRequest.verify|verify} messages.
                 * @param message RegisterNotificationChannelRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.RegisterNotificationChannelRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RegisterNotificationChannelRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterNotificationChannelRequest & hudiy.app.api.RegisterNotificationChannelRequest.$Shape} RegisterNotificationChannelRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.RegisterNotificationChannelRequest & hudiy.app.api.RegisterNotificationChannelRequest.$Shape;

                /**
                 * Decodes a RegisterNotificationChannelRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterNotificationChannelRequest & hudiy.app.api.RegisterNotificationChannelRequest.$Shape} RegisterNotificationChannelRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.RegisterNotificationChannelRequest & hudiy.app.api.RegisterNotificationChannelRequest.$Shape;

                /**
                 * Verifies a RegisterNotificationChannelRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RegisterNotificationChannelRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RegisterNotificationChannelRequest
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.RegisterNotificationChannelRequest;

                /**
                 * Creates a plain object from a RegisterNotificationChannelRequest message. Also converts values to other types if specified.
                 * @param message RegisterNotificationChannelRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.RegisterNotificationChannelRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RegisterNotificationChannelRequest to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for RegisterNotificationChannelRequest
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace RegisterNotificationChannelRequest {

                /** Properties of a RegisterNotificationChannelRequest. */
                interface $Properties {

                    /** RegisterNotificationChannelRequest name */
                    name: string;

                    /** RegisterNotificationChannelRequest description */
                    description: string;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a RegisterNotificationChannelRequest. */
                type $Shape = hudiy.app.api.RegisterNotificationChannelRequest.$Properties;
            }

            /**
             * Properties of a RegisterNotificationChannelResponse.
             * @deprecated Use hudiy.app.api.RegisterNotificationChannelResponse.$Properties instead.
             */
            interface IRegisterNotificationChannelResponse extends hudiy.app.api.RegisterNotificationChannelResponse.$Properties {
            }

            /** Represents a RegisterNotificationChannelResponse. */
            class RegisterNotificationChannelResponse {

                /**
                 * Constructs a new RegisterNotificationChannelResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.RegisterNotificationChannelResponse.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** RegisterNotificationChannelResponse result. */
                result: hudiy.app.api.RegisterNotificationChannelResponse.RegisterNotificationChannelResult;

                /** RegisterNotificationChannelResponse id. */
                id: number;

                /**
                 * Creates a new RegisterNotificationChannelResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RegisterNotificationChannelResponse instance
                 */
                static create(properties: hudiy.app.api.RegisterNotificationChannelResponse.$Shape): hudiy.app.api.RegisterNotificationChannelResponse & hudiy.app.api.RegisterNotificationChannelResponse.$Shape;
                static create(properties?: hudiy.app.api.RegisterNotificationChannelResponse.$Properties): hudiy.app.api.RegisterNotificationChannelResponse;

                /**
                 * Encodes the specified RegisterNotificationChannelResponse message. Does not implicitly {@link hudiy.app.api.RegisterNotificationChannelResponse.verify|verify} messages.
                 * @param message RegisterNotificationChannelResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.RegisterNotificationChannelResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RegisterNotificationChannelResponse message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterNotificationChannelResponse.verify|verify} messages.
                 * @param message RegisterNotificationChannelResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.RegisterNotificationChannelResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RegisterNotificationChannelResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterNotificationChannelResponse & hudiy.app.api.RegisterNotificationChannelResponse.$Shape} RegisterNotificationChannelResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.RegisterNotificationChannelResponse & hudiy.app.api.RegisterNotificationChannelResponse.$Shape;

                /**
                 * Decodes a RegisterNotificationChannelResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterNotificationChannelResponse & hudiy.app.api.RegisterNotificationChannelResponse.$Shape} RegisterNotificationChannelResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.RegisterNotificationChannelResponse & hudiy.app.api.RegisterNotificationChannelResponse.$Shape;

                /**
                 * Verifies a RegisterNotificationChannelResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RegisterNotificationChannelResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RegisterNotificationChannelResponse
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.RegisterNotificationChannelResponse;

                /**
                 * Creates a plain object from a RegisterNotificationChannelResponse message. Also converts values to other types if specified.
                 * @param message RegisterNotificationChannelResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.RegisterNotificationChannelResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RegisterNotificationChannelResponse to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for RegisterNotificationChannelResponse
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace RegisterNotificationChannelResponse {

                /** Properties of a RegisterNotificationChannelResponse. */
                interface $Properties {

                    /** RegisterNotificationChannelResponse result */
                    result: hudiy.app.api.RegisterNotificationChannelResponse.RegisterNotificationChannelResult;

                    /** RegisterNotificationChannelResponse id */
                    id?: (number|null);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a RegisterNotificationChannelResponse. */
                type $Shape = hudiy.app.api.RegisterNotificationChannelResponse.$Properties;

                /** RegisterNotificationChannelResult enum. */
                enum RegisterNotificationChannelResult {

                    /** REGISTER_NOTIFICATION_CHANNEL_RESULT_OK value */
                    REGISTER_NOTIFICATION_CHANNEL_RESULT_OK = 1,

                    /** REGISTER_NOTIFICATION_CHANNEL_RESULT_FAILED value */
                    REGISTER_NOTIFICATION_CHANNEL_RESULT_FAILED = 2
                }
            }

            /**
             * Properties of an UnregisterNotificationChannel.
             * @deprecated Use hudiy.app.api.UnregisterNotificationChannel.$Properties instead.
             */
            interface IUnregisterNotificationChannel extends hudiy.app.api.UnregisterNotificationChannel.$Properties {
            }

            /** Represents an UnregisterNotificationChannel. */
            class UnregisterNotificationChannel {

                /**
                 * Constructs a new UnregisterNotificationChannel.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.UnregisterNotificationChannel.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** UnregisterNotificationChannel id. */
                id: number;

                /**
                 * Creates a new UnregisterNotificationChannel instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns UnregisterNotificationChannel instance
                 */
                static create(properties: hudiy.app.api.UnregisterNotificationChannel.$Shape): hudiy.app.api.UnregisterNotificationChannel & hudiy.app.api.UnregisterNotificationChannel.$Shape;
                static create(properties?: hudiy.app.api.UnregisterNotificationChannel.$Properties): hudiy.app.api.UnregisterNotificationChannel;

                /**
                 * Encodes the specified UnregisterNotificationChannel message. Does not implicitly {@link hudiy.app.api.UnregisterNotificationChannel.verify|verify} messages.
                 * @param message UnregisterNotificationChannel message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.UnregisterNotificationChannel.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified UnregisterNotificationChannel message, length delimited. Does not implicitly {@link hudiy.app.api.UnregisterNotificationChannel.verify|verify} messages.
                 * @param message UnregisterNotificationChannel message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.UnregisterNotificationChannel.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an UnregisterNotificationChannel message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.UnregisterNotificationChannel & hudiy.app.api.UnregisterNotificationChannel.$Shape} UnregisterNotificationChannel
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.UnregisterNotificationChannel & hudiy.app.api.UnregisterNotificationChannel.$Shape;

                /**
                 * Decodes an UnregisterNotificationChannel message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.UnregisterNotificationChannel & hudiy.app.api.UnregisterNotificationChannel.$Shape} UnregisterNotificationChannel
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.UnregisterNotificationChannel & hudiy.app.api.UnregisterNotificationChannel.$Shape;

                /**
                 * Verifies an UnregisterNotificationChannel message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an UnregisterNotificationChannel message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns UnregisterNotificationChannel
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.UnregisterNotificationChannel;

                /**
                 * Creates a plain object from an UnregisterNotificationChannel message. Also converts values to other types if specified.
                 * @param message UnregisterNotificationChannel
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.UnregisterNotificationChannel, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this UnregisterNotificationChannel to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for UnregisterNotificationChannel
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace UnregisterNotificationChannel {

                /** Properties of an UnregisterNotificationChannel. */
                interface $Properties {

                    /** UnregisterNotificationChannel id */
                    id: number;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of an UnregisterNotificationChannel. */
                type $Shape = hudiy.app.api.UnregisterNotificationChannel.$Properties;
            }

            /**
             * Properties of a ShowNotification.
             * @deprecated Use hudiy.app.api.ShowNotification.$Properties instead.
             */
            interface IShowNotification extends hudiy.app.api.ShowNotification.$Properties {
            }

            /** Represents a ShowNotification. */
            class ShowNotification {

                /**
                 * Constructs a new ShowNotification.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.ShowNotification.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** ShowNotification channelId. */
                channelId: number;

                /** ShowNotification title. */
                title: string;

                /** ShowNotification description. */
                description: string;

                /** ShowNotification iconFontFamily. */
                iconFontFamily: string;

                /** ShowNotification iconName. */
                iconName: string;

                /** ShowNotification action. */
                action: string;

                /** ShowNotification playSound. */
                playSound: boolean;

                /**
                 * Creates a new ShowNotification instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ShowNotification instance
                 */
                static create(properties: hudiy.app.api.ShowNotification.$Shape): hudiy.app.api.ShowNotification & hudiy.app.api.ShowNotification.$Shape;
                static create(properties?: hudiy.app.api.ShowNotification.$Properties): hudiy.app.api.ShowNotification;

                /**
                 * Encodes the specified ShowNotification message. Does not implicitly {@link hudiy.app.api.ShowNotification.verify|verify} messages.
                 * @param message ShowNotification message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.ShowNotification.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ShowNotification message, length delimited. Does not implicitly {@link hudiy.app.api.ShowNotification.verify|verify} messages.
                 * @param message ShowNotification message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.ShowNotification.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ShowNotification message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.ShowNotification & hudiy.app.api.ShowNotification.$Shape} ShowNotification
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.ShowNotification & hudiy.app.api.ShowNotification.$Shape;

                /**
                 * Decodes a ShowNotification message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.ShowNotification & hudiy.app.api.ShowNotification.$Shape} ShowNotification
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.ShowNotification & hudiy.app.api.ShowNotification.$Shape;

                /**
                 * Verifies a ShowNotification message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ShowNotification message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ShowNotification
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.ShowNotification;

                /**
                 * Creates a plain object from a ShowNotification message. Also converts values to other types if specified.
                 * @param message ShowNotification
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.ShowNotification, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ShowNotification to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for ShowNotification
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace ShowNotification {

                /** Properties of a ShowNotification. */
                interface $Properties {

                    /** ShowNotification channelId */
                    channelId: number;

                    /** ShowNotification title */
                    title: string;

                    /** ShowNotification description */
                    description: string;

                    /** ShowNotification iconFontFamily */
                    iconFontFamily: string;

                    /** ShowNotification iconName */
                    iconName: string;

                    /** ShowNotification action */
                    action: string;

                    /** ShowNotification playSound */
                    playSound: boolean;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a ShowNotification. */
                type $Shape = hudiy.app.api.ShowNotification.$Properties;
            }

            /**
             * Properties of a RegisterToastChannelRequest.
             * @deprecated Use hudiy.app.api.RegisterToastChannelRequest.$Properties instead.
             */
            interface IRegisterToastChannelRequest extends hudiy.app.api.RegisterToastChannelRequest.$Properties {
            }

            /** Represents a RegisterToastChannelRequest. */
            class RegisterToastChannelRequest {

                /**
                 * Constructs a new RegisterToastChannelRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.RegisterToastChannelRequest.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** RegisterToastChannelRequest name. */
                name: string;

                /** RegisterToastChannelRequest description. */
                description: string;

                /**
                 * Creates a new RegisterToastChannelRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RegisterToastChannelRequest instance
                 */
                static create(properties: hudiy.app.api.RegisterToastChannelRequest.$Shape): hudiy.app.api.RegisterToastChannelRequest & hudiy.app.api.RegisterToastChannelRequest.$Shape;
                static create(properties?: hudiy.app.api.RegisterToastChannelRequest.$Properties): hudiy.app.api.RegisterToastChannelRequest;

                /**
                 * Encodes the specified RegisterToastChannelRequest message. Does not implicitly {@link hudiy.app.api.RegisterToastChannelRequest.verify|verify} messages.
                 * @param message RegisterToastChannelRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.RegisterToastChannelRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RegisterToastChannelRequest message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterToastChannelRequest.verify|verify} messages.
                 * @param message RegisterToastChannelRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.RegisterToastChannelRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RegisterToastChannelRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterToastChannelRequest & hudiy.app.api.RegisterToastChannelRequest.$Shape} RegisterToastChannelRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.RegisterToastChannelRequest & hudiy.app.api.RegisterToastChannelRequest.$Shape;

                /**
                 * Decodes a RegisterToastChannelRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterToastChannelRequest & hudiy.app.api.RegisterToastChannelRequest.$Shape} RegisterToastChannelRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.RegisterToastChannelRequest & hudiy.app.api.RegisterToastChannelRequest.$Shape;

                /**
                 * Verifies a RegisterToastChannelRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RegisterToastChannelRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RegisterToastChannelRequest
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.RegisterToastChannelRequest;

                /**
                 * Creates a plain object from a RegisterToastChannelRequest message. Also converts values to other types if specified.
                 * @param message RegisterToastChannelRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.RegisterToastChannelRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RegisterToastChannelRequest to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for RegisterToastChannelRequest
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace RegisterToastChannelRequest {

                /** Properties of a RegisterToastChannelRequest. */
                interface $Properties {

                    /** RegisterToastChannelRequest name */
                    name: string;

                    /** RegisterToastChannelRequest description */
                    description: string;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a RegisterToastChannelRequest. */
                type $Shape = hudiy.app.api.RegisterToastChannelRequest.$Properties;
            }

            /**
             * Properties of a RegisterToastChannelResponse.
             * @deprecated Use hudiy.app.api.RegisterToastChannelResponse.$Properties instead.
             */
            interface IRegisterToastChannelResponse extends hudiy.app.api.RegisterToastChannelResponse.$Properties {
            }

            /** Represents a RegisterToastChannelResponse. */
            class RegisterToastChannelResponse {

                /**
                 * Constructs a new RegisterToastChannelResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.RegisterToastChannelResponse.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** RegisterToastChannelResponse result. */
                result: hudiy.app.api.RegisterToastChannelResponse.RegisterToastChannelResult;

                /** RegisterToastChannelResponse id. */
                id: number;

                /**
                 * Creates a new RegisterToastChannelResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RegisterToastChannelResponse instance
                 */
                static create(properties: hudiy.app.api.RegisterToastChannelResponse.$Shape): hudiy.app.api.RegisterToastChannelResponse & hudiy.app.api.RegisterToastChannelResponse.$Shape;
                static create(properties?: hudiy.app.api.RegisterToastChannelResponse.$Properties): hudiy.app.api.RegisterToastChannelResponse;

                /**
                 * Encodes the specified RegisterToastChannelResponse message. Does not implicitly {@link hudiy.app.api.RegisterToastChannelResponse.verify|verify} messages.
                 * @param message RegisterToastChannelResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.RegisterToastChannelResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RegisterToastChannelResponse message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterToastChannelResponse.verify|verify} messages.
                 * @param message RegisterToastChannelResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.RegisterToastChannelResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RegisterToastChannelResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterToastChannelResponse & hudiy.app.api.RegisterToastChannelResponse.$Shape} RegisterToastChannelResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.RegisterToastChannelResponse & hudiy.app.api.RegisterToastChannelResponse.$Shape;

                /**
                 * Decodes a RegisterToastChannelResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterToastChannelResponse & hudiy.app.api.RegisterToastChannelResponse.$Shape} RegisterToastChannelResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.RegisterToastChannelResponse & hudiy.app.api.RegisterToastChannelResponse.$Shape;

                /**
                 * Verifies a RegisterToastChannelResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RegisterToastChannelResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RegisterToastChannelResponse
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.RegisterToastChannelResponse;

                /**
                 * Creates a plain object from a RegisterToastChannelResponse message. Also converts values to other types if specified.
                 * @param message RegisterToastChannelResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.RegisterToastChannelResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RegisterToastChannelResponse to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for RegisterToastChannelResponse
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace RegisterToastChannelResponse {

                /** Properties of a RegisterToastChannelResponse. */
                interface $Properties {

                    /** RegisterToastChannelResponse result */
                    result: hudiy.app.api.RegisterToastChannelResponse.RegisterToastChannelResult;

                    /** RegisterToastChannelResponse id */
                    id?: (number|null);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a RegisterToastChannelResponse. */
                type $Shape = hudiy.app.api.RegisterToastChannelResponse.$Properties;

                /** RegisterToastChannelResult enum. */
                enum RegisterToastChannelResult {

                    /** REGISTER_TOAST_CHANNEL_RESULT_OK value */
                    REGISTER_TOAST_CHANNEL_RESULT_OK = 1,

                    /** REGISTER_TOAST_CHANNEL_RESULT_FAILED value */
                    REGISTER_TOAST_CHANNEL_RESULT_FAILED = 2
                }
            }

            /**
             * Properties of an UnregisterToastChannel.
             * @deprecated Use hudiy.app.api.UnregisterToastChannel.$Properties instead.
             */
            interface IUnregisterToastChannel extends hudiy.app.api.UnregisterToastChannel.$Properties {
            }

            /** Represents an UnregisterToastChannel. */
            class UnregisterToastChannel {

                /**
                 * Constructs a new UnregisterToastChannel.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.UnregisterToastChannel.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** UnregisterToastChannel id. */
                id: number;

                /**
                 * Creates a new UnregisterToastChannel instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns UnregisterToastChannel instance
                 */
                static create(properties: hudiy.app.api.UnregisterToastChannel.$Shape): hudiy.app.api.UnregisterToastChannel & hudiy.app.api.UnregisterToastChannel.$Shape;
                static create(properties?: hudiy.app.api.UnregisterToastChannel.$Properties): hudiy.app.api.UnregisterToastChannel;

                /**
                 * Encodes the specified UnregisterToastChannel message. Does not implicitly {@link hudiy.app.api.UnregisterToastChannel.verify|verify} messages.
                 * @param message UnregisterToastChannel message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.UnregisterToastChannel.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified UnregisterToastChannel message, length delimited. Does not implicitly {@link hudiy.app.api.UnregisterToastChannel.verify|verify} messages.
                 * @param message UnregisterToastChannel message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.UnregisterToastChannel.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an UnregisterToastChannel message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.UnregisterToastChannel & hudiy.app.api.UnregisterToastChannel.$Shape} UnregisterToastChannel
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.UnregisterToastChannel & hudiy.app.api.UnregisterToastChannel.$Shape;

                /**
                 * Decodes an UnregisterToastChannel message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.UnregisterToastChannel & hudiy.app.api.UnregisterToastChannel.$Shape} UnregisterToastChannel
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.UnregisterToastChannel & hudiy.app.api.UnregisterToastChannel.$Shape;

                /**
                 * Verifies an UnregisterToastChannel message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an UnregisterToastChannel message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns UnregisterToastChannel
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.UnregisterToastChannel;

                /**
                 * Creates a plain object from an UnregisterToastChannel message. Also converts values to other types if specified.
                 * @param message UnregisterToastChannel
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.UnregisterToastChannel, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this UnregisterToastChannel to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for UnregisterToastChannel
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace UnregisterToastChannel {

                /** Properties of an UnregisterToastChannel. */
                interface $Properties {

                    /** UnregisterToastChannel id */
                    id: number;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of an UnregisterToastChannel. */
                type $Shape = hudiy.app.api.UnregisterToastChannel.$Properties;
            }

            /**
             * Properties of a ShowToast.
             * @deprecated Use hudiy.app.api.ShowToast.$Properties instead.
             */
            interface IShowToast extends hudiy.app.api.ShowToast.$Properties {
            }

            /** Represents a ShowToast. */
            class ShowToast {

                /**
                 * Constructs a new ShowToast.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.ShowToast.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** ShowToast channelId. */
                channelId: number;

                /** ShowToast message. */
                message: string;

                /** ShowToast iconFontFamily. */
                iconFontFamily: string;

                /** ShowToast iconName. */
                iconName: string;

                /**
                 * Creates a new ShowToast instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ShowToast instance
                 */
                static create(properties: hudiy.app.api.ShowToast.$Shape): hudiy.app.api.ShowToast & hudiy.app.api.ShowToast.$Shape;
                static create(properties?: hudiy.app.api.ShowToast.$Properties): hudiy.app.api.ShowToast;

                /**
                 * Encodes the specified ShowToast message. Does not implicitly {@link hudiy.app.api.ShowToast.verify|verify} messages.
                 * @param message ShowToast message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.ShowToast.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ShowToast message, length delimited. Does not implicitly {@link hudiy.app.api.ShowToast.verify|verify} messages.
                 * @param message ShowToast message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.ShowToast.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ShowToast message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.ShowToast & hudiy.app.api.ShowToast.$Shape} ShowToast
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.ShowToast & hudiy.app.api.ShowToast.$Shape;

                /**
                 * Decodes a ShowToast message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.ShowToast & hudiy.app.api.ShowToast.$Shape} ShowToast
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.ShowToast & hudiy.app.api.ShowToast.$Shape;

                /**
                 * Verifies a ShowToast message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ShowToast message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ShowToast
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.ShowToast;

                /**
                 * Creates a plain object from a ShowToast message. Also converts values to other types if specified.
                 * @param message ShowToast
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.ShowToast, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ShowToast to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for ShowToast
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace ShowToast {

                /** Properties of a ShowToast. */
                interface $Properties {

                    /** ShowToast channelId */
                    channelId: number;

                    /** ShowToast message */
                    message: string;

                    /** ShowToast iconFontFamily */
                    iconFontFamily: string;

                    /** ShowToast iconName */
                    iconName: string;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a ShowToast. */
                type $Shape = hudiy.app.api.ShowToast.$Properties;
            }

            /**
             * Properties of an ObdConnectionStatus.
             * @deprecated Use hudiy.app.api.ObdConnectionStatus.$Properties instead.
             */
            interface IObdConnectionStatus extends hudiy.app.api.ObdConnectionStatus.$Properties {
            }

            /** Represents an ObdConnectionStatus. */
            class ObdConnectionStatus {

                /**
                 * Constructs a new ObdConnectionStatus.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.ObdConnectionStatus.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** ObdConnectionStatus state. */
                state: hudiy.app.api.ObdConnectionStatus.ObdConnectionState;

                /**
                 * Creates a new ObdConnectionStatus instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ObdConnectionStatus instance
                 */
                static create(properties: hudiy.app.api.ObdConnectionStatus.$Shape): hudiy.app.api.ObdConnectionStatus & hudiy.app.api.ObdConnectionStatus.$Shape;
                static create(properties?: hudiy.app.api.ObdConnectionStatus.$Properties): hudiy.app.api.ObdConnectionStatus;

                /**
                 * Encodes the specified ObdConnectionStatus message. Does not implicitly {@link hudiy.app.api.ObdConnectionStatus.verify|verify} messages.
                 * @param message ObdConnectionStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.ObdConnectionStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ObdConnectionStatus message, length delimited. Does not implicitly {@link hudiy.app.api.ObdConnectionStatus.verify|verify} messages.
                 * @param message ObdConnectionStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.ObdConnectionStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an ObdConnectionStatus message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.ObdConnectionStatus & hudiy.app.api.ObdConnectionStatus.$Shape} ObdConnectionStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.ObdConnectionStatus & hudiy.app.api.ObdConnectionStatus.$Shape;

                /**
                 * Decodes an ObdConnectionStatus message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.ObdConnectionStatus & hudiy.app.api.ObdConnectionStatus.$Shape} ObdConnectionStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.ObdConnectionStatus & hudiy.app.api.ObdConnectionStatus.$Shape;

                /**
                 * Verifies an ObdConnectionStatus message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an ObdConnectionStatus message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ObdConnectionStatus
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.ObdConnectionStatus;

                /**
                 * Creates a plain object from an ObdConnectionStatus message. Also converts values to other types if specified.
                 * @param message ObdConnectionStatus
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.ObdConnectionStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ObdConnectionStatus to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for ObdConnectionStatus
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace ObdConnectionStatus {

                /** Properties of an ObdConnectionStatus. */
                interface $Properties {

                    /** ObdConnectionStatus state */
                    state: hudiy.app.api.ObdConnectionStatus.ObdConnectionState;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of an ObdConnectionStatus. */
                type $Shape = hudiy.app.api.ObdConnectionStatus.$Properties;

                /** ObdConnectionState enum. */
                enum ObdConnectionState {

                    /** OBD_CONNECTION_STATE_CONNECTED value */
                    OBD_CONNECTION_STATE_CONNECTED = 1,

                    /** OBD_CONNECTION_STATE_DISCONNECTED value */
                    OBD_CONNECTION_STATE_DISCONNECTED = 2
                }
            }

            /**
             * Properties of a RegisterAudioFocusReceiverRequest.
             * @deprecated Use hudiy.app.api.RegisterAudioFocusReceiverRequest.$Properties instead.
             */
            interface IRegisterAudioFocusReceiverRequest extends hudiy.app.api.RegisterAudioFocusReceiverRequest.$Properties {
            }

            /** Represents a RegisterAudioFocusReceiverRequest. */
            class RegisterAudioFocusReceiverRequest {

                /**
                 * Constructs a new RegisterAudioFocusReceiverRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.RegisterAudioFocusReceiverRequest.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** RegisterAudioFocusReceiverRequest name. */
                name: string;

                /** RegisterAudioFocusReceiverRequest category. */
                category: hudiy.app.api.RegisterAudioFocusReceiverRequest.AudioStreamCategory;

                /** RegisterAudioFocusReceiverRequest duckPriority. */
                duckPriority: number;

                /**
                 * Creates a new RegisterAudioFocusReceiverRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RegisterAudioFocusReceiverRequest instance
                 */
                static create(properties: hudiy.app.api.RegisterAudioFocusReceiverRequest.$Shape): hudiy.app.api.RegisterAudioFocusReceiverRequest & hudiy.app.api.RegisterAudioFocusReceiverRequest.$Shape;
                static create(properties?: hudiy.app.api.RegisterAudioFocusReceiverRequest.$Properties): hudiy.app.api.RegisterAudioFocusReceiverRequest;

                /**
                 * Encodes the specified RegisterAudioFocusReceiverRequest message. Does not implicitly {@link hudiy.app.api.RegisterAudioFocusReceiverRequest.verify|verify} messages.
                 * @param message RegisterAudioFocusReceiverRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.RegisterAudioFocusReceiverRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RegisterAudioFocusReceiverRequest message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterAudioFocusReceiverRequest.verify|verify} messages.
                 * @param message RegisterAudioFocusReceiverRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.RegisterAudioFocusReceiverRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RegisterAudioFocusReceiverRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterAudioFocusReceiverRequest & hudiy.app.api.RegisterAudioFocusReceiverRequest.$Shape} RegisterAudioFocusReceiverRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.RegisterAudioFocusReceiverRequest & hudiy.app.api.RegisterAudioFocusReceiverRequest.$Shape;

                /**
                 * Decodes a RegisterAudioFocusReceiverRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterAudioFocusReceiverRequest & hudiy.app.api.RegisterAudioFocusReceiverRequest.$Shape} RegisterAudioFocusReceiverRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.RegisterAudioFocusReceiverRequest & hudiy.app.api.RegisterAudioFocusReceiverRequest.$Shape;

                /**
                 * Verifies a RegisterAudioFocusReceiverRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RegisterAudioFocusReceiverRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RegisterAudioFocusReceiverRequest
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.RegisterAudioFocusReceiverRequest;

                /**
                 * Creates a plain object from a RegisterAudioFocusReceiverRequest message. Also converts values to other types if specified.
                 * @param message RegisterAudioFocusReceiverRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.RegisterAudioFocusReceiverRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RegisterAudioFocusReceiverRequest to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for RegisterAudioFocusReceiverRequest
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace RegisterAudioFocusReceiverRequest {

                /** Properties of a RegisterAudioFocusReceiverRequest. */
                interface $Properties {

                    /** RegisterAudioFocusReceiverRequest name */
                    name: string;

                    /** RegisterAudioFocusReceiverRequest category */
                    category: hudiy.app.api.RegisterAudioFocusReceiverRequest.AudioStreamCategory;

                    /** RegisterAudioFocusReceiverRequest duckPriority */
                    duckPriority: number;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a RegisterAudioFocusReceiverRequest. */
                type $Shape = hudiy.app.api.RegisterAudioFocusReceiverRequest.$Properties;

                /** AudioStreamCategory enum. */
                enum AudioStreamCategory {

                    /** AUDIO_STREAM_CATEGORY_ENTERTAINMENT value */
                    AUDIO_STREAM_CATEGORY_ENTERTAINMENT = 1,

                    /** AUDIO_STREAM_CATEGORY_COMMUNICATION value */
                    AUDIO_STREAM_CATEGORY_COMMUNICATION = 2
                }
            }

            /**
             * Properties of a RegisterAudioFocusReceiverResponse.
             * @deprecated Use hudiy.app.api.RegisterAudioFocusReceiverResponse.$Properties instead.
             */
            interface IRegisterAudioFocusReceiverResponse extends hudiy.app.api.RegisterAudioFocusReceiverResponse.$Properties {
            }

            /** Represents a RegisterAudioFocusReceiverResponse. */
            class RegisterAudioFocusReceiverResponse {

                /**
                 * Constructs a new RegisterAudioFocusReceiverResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.RegisterAudioFocusReceiverResponse.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** RegisterAudioFocusReceiverResponse result. */
                result: hudiy.app.api.RegisterAudioFocusReceiverResponse.RegisterAudioFocusReceiverResult;

                /** RegisterAudioFocusReceiverResponse id. */
                id: number;

                /**
                 * Creates a new RegisterAudioFocusReceiverResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RegisterAudioFocusReceiverResponse instance
                 */
                static create(properties: hudiy.app.api.RegisterAudioFocusReceiverResponse.$Shape): hudiy.app.api.RegisterAudioFocusReceiverResponse & hudiy.app.api.RegisterAudioFocusReceiverResponse.$Shape;
                static create(properties?: hudiy.app.api.RegisterAudioFocusReceiverResponse.$Properties): hudiy.app.api.RegisterAudioFocusReceiverResponse;

                /**
                 * Encodes the specified RegisterAudioFocusReceiverResponse message. Does not implicitly {@link hudiy.app.api.RegisterAudioFocusReceiverResponse.verify|verify} messages.
                 * @param message RegisterAudioFocusReceiverResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.RegisterAudioFocusReceiverResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RegisterAudioFocusReceiverResponse message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterAudioFocusReceiverResponse.verify|verify} messages.
                 * @param message RegisterAudioFocusReceiverResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.RegisterAudioFocusReceiverResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RegisterAudioFocusReceiverResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterAudioFocusReceiverResponse & hudiy.app.api.RegisterAudioFocusReceiverResponse.$Shape} RegisterAudioFocusReceiverResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.RegisterAudioFocusReceiverResponse & hudiy.app.api.RegisterAudioFocusReceiverResponse.$Shape;

                /**
                 * Decodes a RegisterAudioFocusReceiverResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterAudioFocusReceiverResponse & hudiy.app.api.RegisterAudioFocusReceiverResponse.$Shape} RegisterAudioFocusReceiverResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.RegisterAudioFocusReceiverResponse & hudiy.app.api.RegisterAudioFocusReceiverResponse.$Shape;

                /**
                 * Verifies a RegisterAudioFocusReceiverResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RegisterAudioFocusReceiverResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RegisterAudioFocusReceiverResponse
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.RegisterAudioFocusReceiverResponse;

                /**
                 * Creates a plain object from a RegisterAudioFocusReceiverResponse message. Also converts values to other types if specified.
                 * @param message RegisterAudioFocusReceiverResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.RegisterAudioFocusReceiverResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RegisterAudioFocusReceiverResponse to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for RegisterAudioFocusReceiverResponse
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace RegisterAudioFocusReceiverResponse {

                /** Properties of a RegisterAudioFocusReceiverResponse. */
                interface $Properties {

                    /** RegisterAudioFocusReceiverResponse result */
                    result: hudiy.app.api.RegisterAudioFocusReceiverResponse.RegisterAudioFocusReceiverResult;

                    /** RegisterAudioFocusReceiverResponse id */
                    id?: (number|null);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a RegisterAudioFocusReceiverResponse. */
                type $Shape = hudiy.app.api.RegisterAudioFocusReceiverResponse.$Properties;

                /** RegisterAudioFocusReceiverResult enum. */
                enum RegisterAudioFocusReceiverResult {

                    /** REGISTER_AUDIO_FOCUS_RECEIVER_RESULT_OK value */
                    REGISTER_AUDIO_FOCUS_RECEIVER_RESULT_OK = 1,

                    /** REGISTER_AUDIO_FOCUS_RECEIVER_RESULT_FAILED value */
                    REGISTER_AUDIO_FOCUS_RECEIVER_RESULT_FAILED = 2
                }
            }

            /**
             * Properties of an UnregisterAudioFocusReceiver.
             * @deprecated Use hudiy.app.api.UnregisterAudioFocusReceiver.$Properties instead.
             */
            interface IUnregisterAudioFocusReceiver extends hudiy.app.api.UnregisterAudioFocusReceiver.$Properties {
            }

            /** Represents an UnregisterAudioFocusReceiver. */
            class UnregisterAudioFocusReceiver {

                /**
                 * Constructs a new UnregisterAudioFocusReceiver.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.UnregisterAudioFocusReceiver.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** UnregisterAudioFocusReceiver id. */
                id: number;

                /**
                 * Creates a new UnregisterAudioFocusReceiver instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns UnregisterAudioFocusReceiver instance
                 */
                static create(properties: hudiy.app.api.UnregisterAudioFocusReceiver.$Shape): hudiy.app.api.UnregisterAudioFocusReceiver & hudiy.app.api.UnregisterAudioFocusReceiver.$Shape;
                static create(properties?: hudiy.app.api.UnregisterAudioFocusReceiver.$Properties): hudiy.app.api.UnregisterAudioFocusReceiver;

                /**
                 * Encodes the specified UnregisterAudioFocusReceiver message. Does not implicitly {@link hudiy.app.api.UnregisterAudioFocusReceiver.verify|verify} messages.
                 * @param message UnregisterAudioFocusReceiver message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.UnregisterAudioFocusReceiver.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified UnregisterAudioFocusReceiver message, length delimited. Does not implicitly {@link hudiy.app.api.UnregisterAudioFocusReceiver.verify|verify} messages.
                 * @param message UnregisterAudioFocusReceiver message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.UnregisterAudioFocusReceiver.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an UnregisterAudioFocusReceiver message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.UnregisterAudioFocusReceiver & hudiy.app.api.UnregisterAudioFocusReceiver.$Shape} UnregisterAudioFocusReceiver
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.UnregisterAudioFocusReceiver & hudiy.app.api.UnregisterAudioFocusReceiver.$Shape;

                /**
                 * Decodes an UnregisterAudioFocusReceiver message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.UnregisterAudioFocusReceiver & hudiy.app.api.UnregisterAudioFocusReceiver.$Shape} UnregisterAudioFocusReceiver
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.UnregisterAudioFocusReceiver & hudiy.app.api.UnregisterAudioFocusReceiver.$Shape;

                /**
                 * Verifies an UnregisterAudioFocusReceiver message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an UnregisterAudioFocusReceiver message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns UnregisterAudioFocusReceiver
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.UnregisterAudioFocusReceiver;

                /**
                 * Creates a plain object from an UnregisterAudioFocusReceiver message. Also converts values to other types if specified.
                 * @param message UnregisterAudioFocusReceiver
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.UnregisterAudioFocusReceiver, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this UnregisterAudioFocusReceiver to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for UnregisterAudioFocusReceiver
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace UnregisterAudioFocusReceiver {

                /** Properties of an UnregisterAudioFocusReceiver. */
                interface $Properties {

                    /** UnregisterAudioFocusReceiver id */
                    id: number;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of an UnregisterAudioFocusReceiver. */
                type $Shape = hudiy.app.api.UnregisterAudioFocusReceiver.$Properties;
            }

            /**
             * Properties of an AudioFocusChangeRequest.
             * @deprecated Use hudiy.app.api.AudioFocusChangeRequest.$Properties instead.
             */
            interface IAudioFocusChangeRequest extends hudiy.app.api.AudioFocusChangeRequest.$Properties {
            }

            /** Represents an AudioFocusChangeRequest. */
            class AudioFocusChangeRequest {

                /**
                 * Constructs a new AudioFocusChangeRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.AudioFocusChangeRequest.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** AudioFocusChangeRequest id. */
                id: number;

                /** AudioFocusChangeRequest type. */
                type: hudiy.app.api.AudioFocusChangeRequest.AudioFocusType;

                /**
                 * Creates a new AudioFocusChangeRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AudioFocusChangeRequest instance
                 */
                static create(properties: hudiy.app.api.AudioFocusChangeRequest.$Shape): hudiy.app.api.AudioFocusChangeRequest & hudiy.app.api.AudioFocusChangeRequest.$Shape;
                static create(properties?: hudiy.app.api.AudioFocusChangeRequest.$Properties): hudiy.app.api.AudioFocusChangeRequest;

                /**
                 * Encodes the specified AudioFocusChangeRequest message. Does not implicitly {@link hudiy.app.api.AudioFocusChangeRequest.verify|verify} messages.
                 * @param message AudioFocusChangeRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.AudioFocusChangeRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AudioFocusChangeRequest message, length delimited. Does not implicitly {@link hudiy.app.api.AudioFocusChangeRequest.verify|verify} messages.
                 * @param message AudioFocusChangeRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.AudioFocusChangeRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AudioFocusChangeRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.AudioFocusChangeRequest & hudiy.app.api.AudioFocusChangeRequest.$Shape} AudioFocusChangeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.AudioFocusChangeRequest & hudiy.app.api.AudioFocusChangeRequest.$Shape;

                /**
                 * Decodes an AudioFocusChangeRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.AudioFocusChangeRequest & hudiy.app.api.AudioFocusChangeRequest.$Shape} AudioFocusChangeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.AudioFocusChangeRequest & hudiy.app.api.AudioFocusChangeRequest.$Shape;

                /**
                 * Verifies an AudioFocusChangeRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AudioFocusChangeRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AudioFocusChangeRequest
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.AudioFocusChangeRequest;

                /**
                 * Creates a plain object from an AudioFocusChangeRequest message. Also converts values to other types if specified.
                 * @param message AudioFocusChangeRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.AudioFocusChangeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AudioFocusChangeRequest to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for AudioFocusChangeRequest
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace AudioFocusChangeRequest {

                /** Properties of an AudioFocusChangeRequest. */
                interface $Properties {

                    /** AudioFocusChangeRequest id */
                    id: number;

                    /** AudioFocusChangeRequest type */
                    type: hudiy.app.api.AudioFocusChangeRequest.AudioFocusType;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of an AudioFocusChangeRequest. */
                type $Shape = hudiy.app.api.AudioFocusChangeRequest.$Properties;

                /** AudioFocusType enum. */
                enum AudioFocusType {

                    /** AUDIO_FOCUS_TYPE_GAIN value */
                    AUDIO_FOCUS_TYPE_GAIN = 1,

                    /** AUDIO_FOCUS_TYPE_TRANSIENT value */
                    AUDIO_FOCUS_TYPE_TRANSIENT = 2,

                    /** AUDIO_FOCUS_TYPE_DUCK value */
                    AUDIO_FOCUS_TYPE_DUCK = 3,

                    /** AUDIO_FOCUS_TYPE_RELEASE value */
                    AUDIO_FOCUS_TYPE_RELEASE = 4
                }
            }

            /**
             * Properties of an AudioFocusChangeResponse.
             * @deprecated Use hudiy.app.api.AudioFocusChangeResponse.$Properties instead.
             */
            interface IAudioFocusChangeResponse extends hudiy.app.api.AudioFocusChangeResponse.$Properties {
            }

            /** Represents an AudioFocusChangeResponse. */
            class AudioFocusChangeResponse {

                /**
                 * Constructs a new AudioFocusChangeResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.AudioFocusChangeResponse.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** AudioFocusChangeResponse id. */
                id: number;

                /** AudioFocusChangeResponse result. */
                result: boolean;

                /**
                 * Creates a new AudioFocusChangeResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AudioFocusChangeResponse instance
                 */
                static create(properties: hudiy.app.api.AudioFocusChangeResponse.$Shape): hudiy.app.api.AudioFocusChangeResponse & hudiy.app.api.AudioFocusChangeResponse.$Shape;
                static create(properties?: hudiy.app.api.AudioFocusChangeResponse.$Properties): hudiy.app.api.AudioFocusChangeResponse;

                /**
                 * Encodes the specified AudioFocusChangeResponse message. Does not implicitly {@link hudiy.app.api.AudioFocusChangeResponse.verify|verify} messages.
                 * @param message AudioFocusChangeResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.AudioFocusChangeResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AudioFocusChangeResponse message, length delimited. Does not implicitly {@link hudiy.app.api.AudioFocusChangeResponse.verify|verify} messages.
                 * @param message AudioFocusChangeResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.AudioFocusChangeResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AudioFocusChangeResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.AudioFocusChangeResponse & hudiy.app.api.AudioFocusChangeResponse.$Shape} AudioFocusChangeResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.AudioFocusChangeResponse & hudiy.app.api.AudioFocusChangeResponse.$Shape;

                /**
                 * Decodes an AudioFocusChangeResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.AudioFocusChangeResponse & hudiy.app.api.AudioFocusChangeResponse.$Shape} AudioFocusChangeResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.AudioFocusChangeResponse & hudiy.app.api.AudioFocusChangeResponse.$Shape;

                /**
                 * Verifies an AudioFocusChangeResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AudioFocusChangeResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AudioFocusChangeResponse
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.AudioFocusChangeResponse;

                /**
                 * Creates a plain object from an AudioFocusChangeResponse message. Also converts values to other types if specified.
                 * @param message AudioFocusChangeResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.AudioFocusChangeResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AudioFocusChangeResponse to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for AudioFocusChangeResponse
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace AudioFocusChangeResponse {

                /** Properties of an AudioFocusChangeResponse. */
                interface $Properties {

                    /** AudioFocusChangeResponse id */
                    id: number;

                    /** AudioFocusChangeResponse result */
                    result: boolean;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of an AudioFocusChangeResponse. */
                type $Shape = hudiy.app.api.AudioFocusChangeResponse.$Properties;
            }

            /**
             * Properties of an AudioFocusAction.
             * @deprecated Use hudiy.app.api.AudioFocusAction.$Properties instead.
             */
            interface IAudioFocusAction extends hudiy.app.api.AudioFocusAction.$Properties {
            }

            /** Represents an AudioFocusAction. */
            class AudioFocusAction {

                /**
                 * Constructs a new AudioFocusAction.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.AudioFocusAction.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** AudioFocusAction id. */
                id: number;

                /** AudioFocusAction action. */
                action: hudiy.app.api.AudioFocusAction.AudioFocusActionType;

                /** AudioFocusAction lostType. */
                lostType: hudiy.app.api.AudioFocusAction.LostAudioFocusType;

                /**
                 * Creates a new AudioFocusAction instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AudioFocusAction instance
                 */
                static create(properties: hudiy.app.api.AudioFocusAction.$Shape): hudiy.app.api.AudioFocusAction & hudiy.app.api.AudioFocusAction.$Shape;
                static create(properties?: hudiy.app.api.AudioFocusAction.$Properties): hudiy.app.api.AudioFocusAction;

                /**
                 * Encodes the specified AudioFocusAction message. Does not implicitly {@link hudiy.app.api.AudioFocusAction.verify|verify} messages.
                 * @param message AudioFocusAction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.AudioFocusAction.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AudioFocusAction message, length delimited. Does not implicitly {@link hudiy.app.api.AudioFocusAction.verify|verify} messages.
                 * @param message AudioFocusAction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.AudioFocusAction.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AudioFocusAction message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.AudioFocusAction & hudiy.app.api.AudioFocusAction.$Shape} AudioFocusAction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.AudioFocusAction & hudiy.app.api.AudioFocusAction.$Shape;

                /**
                 * Decodes an AudioFocusAction message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.AudioFocusAction & hudiy.app.api.AudioFocusAction.$Shape} AudioFocusAction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.AudioFocusAction & hudiy.app.api.AudioFocusAction.$Shape;

                /**
                 * Verifies an AudioFocusAction message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AudioFocusAction message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AudioFocusAction
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.AudioFocusAction;

                /**
                 * Creates a plain object from an AudioFocusAction message. Also converts values to other types if specified.
                 * @param message AudioFocusAction
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.AudioFocusAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AudioFocusAction to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for AudioFocusAction
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace AudioFocusAction {

                /** Properties of an AudioFocusAction. */
                interface $Properties {

                    /** AudioFocusAction id */
                    id: number;

                    /** AudioFocusAction action */
                    action: hudiy.app.api.AudioFocusAction.AudioFocusActionType;

                    /** AudioFocusAction lostType */
                    lostType?: (hudiy.app.api.AudioFocusAction.LostAudioFocusType|null);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of an AudioFocusAction. */
                type $Shape = hudiy.app.api.AudioFocusAction.$Properties;

                /** AudioFocusActionType enum. */
                enum AudioFocusActionType {

                    /** AUDIO_FOCUS_ACTION_TYPE_SUSPEND value */
                    AUDIO_FOCUS_ACTION_TYPE_SUSPEND = 1,

                    /** AUDIO_FOCUS_ACTION_TYPE_RESTORE value */
                    AUDIO_FOCUS_ACTION_TYPE_RESTORE = 2,

                    /** AUDIO_FOCUS_ACTION_TYPE_LOSS value */
                    AUDIO_FOCUS_ACTION_TYPE_LOSS = 3,

                    /** AUDIO_FOCUS_ACTION_TYPE_DUCK_START value */
                    AUDIO_FOCUS_ACTION_TYPE_DUCK_START = 4,

                    /** AUDIO_FOCUS_ACTION_TYPE_DUCK_END value */
                    AUDIO_FOCUS_ACTION_TYPE_DUCK_END = 5
                }

                /** LostAudioFocusType enum. */
                enum LostAudioFocusType {

                    /** LOST_AUDIO_FOCUS_TYPE_GAIN value */
                    LOST_AUDIO_FOCUS_TYPE_GAIN = 1,

                    /** LOST_AUDIO_FOCUS_TYPE_TRANSIENT value */
                    LOST_AUDIO_FOCUS_TYPE_TRANSIENT = 2,

                    /** LOST_AUDIO_FOCUS_TYPE_DUCK value */
                    LOST_AUDIO_FOCUS_TYPE_DUCK = 3
                }
            }

            /**
             * Properties of an AudioFocusMediaKey.
             * @deprecated Use hudiy.app.api.AudioFocusMediaKey.$Properties instead.
             */
            interface IAudioFocusMediaKey extends hudiy.app.api.AudioFocusMediaKey.$Properties {
            }

            /** Represents an AudioFocusMediaKey. */
            class AudioFocusMediaKey {

                /**
                 * Constructs a new AudioFocusMediaKey.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.AudioFocusMediaKey.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** AudioFocusMediaKey id. */
                id: number;

                /** AudioFocusMediaKey eventType. */
                eventType: hudiy.app.api.AudioFocusMediaKey.AudioFocusMediaKeyEventType;

                /** AudioFocusMediaKey keyType. */
                keyType: hudiy.app.api.AudioFocusMediaKey.AudioFocusMediaKeyType;

                /**
                 * Creates a new AudioFocusMediaKey instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AudioFocusMediaKey instance
                 */
                static create(properties: hudiy.app.api.AudioFocusMediaKey.$Shape): hudiy.app.api.AudioFocusMediaKey & hudiy.app.api.AudioFocusMediaKey.$Shape;
                static create(properties?: hudiy.app.api.AudioFocusMediaKey.$Properties): hudiy.app.api.AudioFocusMediaKey;

                /**
                 * Encodes the specified AudioFocusMediaKey message. Does not implicitly {@link hudiy.app.api.AudioFocusMediaKey.verify|verify} messages.
                 * @param message AudioFocusMediaKey message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.AudioFocusMediaKey.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AudioFocusMediaKey message, length delimited. Does not implicitly {@link hudiy.app.api.AudioFocusMediaKey.verify|verify} messages.
                 * @param message AudioFocusMediaKey message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.AudioFocusMediaKey.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AudioFocusMediaKey message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.AudioFocusMediaKey & hudiy.app.api.AudioFocusMediaKey.$Shape} AudioFocusMediaKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.AudioFocusMediaKey & hudiy.app.api.AudioFocusMediaKey.$Shape;

                /**
                 * Decodes an AudioFocusMediaKey message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.AudioFocusMediaKey & hudiy.app.api.AudioFocusMediaKey.$Shape} AudioFocusMediaKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.AudioFocusMediaKey & hudiy.app.api.AudioFocusMediaKey.$Shape;

                /**
                 * Verifies an AudioFocusMediaKey message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AudioFocusMediaKey message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AudioFocusMediaKey
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.AudioFocusMediaKey;

                /**
                 * Creates a plain object from an AudioFocusMediaKey message. Also converts values to other types if specified.
                 * @param message AudioFocusMediaKey
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.AudioFocusMediaKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AudioFocusMediaKey to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for AudioFocusMediaKey
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace AudioFocusMediaKey {

                /** Properties of an AudioFocusMediaKey. */
                interface $Properties {

                    /** AudioFocusMediaKey id */
                    id: number;

                    /** AudioFocusMediaKey eventType */
                    eventType: hudiy.app.api.AudioFocusMediaKey.AudioFocusMediaKeyEventType;

                    /** AudioFocusMediaKey keyType */
                    keyType: hudiy.app.api.AudioFocusMediaKey.AudioFocusMediaKeyType;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of an AudioFocusMediaKey. */
                type $Shape = hudiy.app.api.AudioFocusMediaKey.$Properties;

                /** AudioFocusMediaKeyEventType enum. */
                enum AudioFocusMediaKeyEventType {

                    /** AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_NONE value */
                    AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_NONE = 0,

                    /** AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_PRESS value */
                    AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_PRESS = 1,

                    /** AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_RELEASE value */
                    AUDIO_FOCUS_MEDIA_KEY_EVENT_TYPE_RELEASE = 2
                }

                /** AudioFocusMediaKeyType enum. */
                enum AudioFocusMediaKeyType {

                    /** AUDIO_FOCUS_MEDIA_KEY_TYPE_NONE value */
                    AUDIO_FOCUS_MEDIA_KEY_TYPE_NONE = 0,

                    /** AUDIO_FOCUS_MEDIA_KEY_TYPE_PLAY value */
                    AUDIO_FOCUS_MEDIA_KEY_TYPE_PLAY = 1,

                    /** AUDIO_FOCUS_MEDIA_KEY_TYPE_PAUSE value */
                    AUDIO_FOCUS_MEDIA_KEY_TYPE_PAUSE = 2,

                    /** AUDIO_FOCUS_MEDIA_KEY_TYPE_PREVIOUS value */
                    AUDIO_FOCUS_MEDIA_KEY_TYPE_PREVIOUS = 3,

                    /** AUDIO_FOCUS_MEDIA_KEY_TYPE_NEXT value */
                    AUDIO_FOCUS_MEDIA_KEY_TYPE_NEXT = 4,

                    /** AUDIO_FOCUS_MEDIA_KEY_TYPE_TOGGLE_PLAY value */
                    AUDIO_FOCUS_MEDIA_KEY_TYPE_TOGGLE_PLAY = 5
                }
            }

            /**
             * Properties of a PhoneConnectionStatus.
             * @deprecated Use hudiy.app.api.PhoneConnectionStatus.$Properties instead.
             */
            interface IPhoneConnectionStatus extends hudiy.app.api.PhoneConnectionStatus.$Properties {
            }

            /** Represents a PhoneConnectionStatus. */
            class PhoneConnectionStatus {

                /**
                 * Constructs a new PhoneConnectionStatus.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.PhoneConnectionStatus.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** PhoneConnectionStatus state. */
                state: hudiy.app.api.PhoneConnectionStatus.PhoneConnectionState;

                /** PhoneConnectionStatus name. */
                name: string;

                /**
                 * Creates a new PhoneConnectionStatus instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PhoneConnectionStatus instance
                 */
                static create(properties: hudiy.app.api.PhoneConnectionStatus.$Shape): hudiy.app.api.PhoneConnectionStatus & hudiy.app.api.PhoneConnectionStatus.$Shape;
                static create(properties?: hudiy.app.api.PhoneConnectionStatus.$Properties): hudiy.app.api.PhoneConnectionStatus;

                /**
                 * Encodes the specified PhoneConnectionStatus message. Does not implicitly {@link hudiy.app.api.PhoneConnectionStatus.verify|verify} messages.
                 * @param message PhoneConnectionStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.PhoneConnectionStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PhoneConnectionStatus message, length delimited. Does not implicitly {@link hudiy.app.api.PhoneConnectionStatus.verify|verify} messages.
                 * @param message PhoneConnectionStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.PhoneConnectionStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PhoneConnectionStatus message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.PhoneConnectionStatus & hudiy.app.api.PhoneConnectionStatus.$Shape} PhoneConnectionStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.PhoneConnectionStatus & hudiy.app.api.PhoneConnectionStatus.$Shape;

                /**
                 * Decodes a PhoneConnectionStatus message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.PhoneConnectionStatus & hudiy.app.api.PhoneConnectionStatus.$Shape} PhoneConnectionStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.PhoneConnectionStatus & hudiy.app.api.PhoneConnectionStatus.$Shape;

                /**
                 * Verifies a PhoneConnectionStatus message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PhoneConnectionStatus message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PhoneConnectionStatus
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.PhoneConnectionStatus;

                /**
                 * Creates a plain object from a PhoneConnectionStatus message. Also converts values to other types if specified.
                 * @param message PhoneConnectionStatus
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.PhoneConnectionStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PhoneConnectionStatus to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for PhoneConnectionStatus
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace PhoneConnectionStatus {

                /** Properties of a PhoneConnectionStatus. */
                interface $Properties {

                    /** PhoneConnectionStatus state */
                    state: hudiy.app.api.PhoneConnectionStatus.PhoneConnectionState;

                    /** PhoneConnectionStatus name */
                    name: string;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a PhoneConnectionStatus. */
                type $Shape = hudiy.app.api.PhoneConnectionStatus.$Properties;

                /** PhoneConnectionState enum. */
                enum PhoneConnectionState {

                    /** PHONE_CONNECTION_STATE_CONNECTED value */
                    PHONE_CONNECTION_STATE_CONNECTED = 1,

                    /** PHONE_CONNECTION_STATE_DISCONNECTED value */
                    PHONE_CONNECTION_STATE_DISCONNECTED = 2
                }
            }

            /**
             * Properties of a PhoneVoiceCallStatus.
             * @deprecated Use hudiy.app.api.PhoneVoiceCallStatus.$Properties instead.
             */
            interface IPhoneVoiceCallStatus extends hudiy.app.api.PhoneVoiceCallStatus.$Properties {
            }

            /** Represents a PhoneVoiceCallStatus. */
            class PhoneVoiceCallStatus {

                /**
                 * Constructs a new PhoneVoiceCallStatus.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.PhoneVoiceCallStatus.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** PhoneVoiceCallStatus state. */
                state: hudiy.app.api.PhoneVoiceCallStatus.PhoneVoiceCallState;

                /** PhoneVoiceCallStatus callerId. */
                callerId: string;

                /** PhoneVoiceCallStatus callerName. */
                callerName: string;

                /**
                 * Creates a new PhoneVoiceCallStatus instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PhoneVoiceCallStatus instance
                 */
                static create(properties: hudiy.app.api.PhoneVoiceCallStatus.$Shape): hudiy.app.api.PhoneVoiceCallStatus & hudiy.app.api.PhoneVoiceCallStatus.$Shape;
                static create(properties?: hudiy.app.api.PhoneVoiceCallStatus.$Properties): hudiy.app.api.PhoneVoiceCallStatus;

                /**
                 * Encodes the specified PhoneVoiceCallStatus message. Does not implicitly {@link hudiy.app.api.PhoneVoiceCallStatus.verify|verify} messages.
                 * @param message PhoneVoiceCallStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.PhoneVoiceCallStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PhoneVoiceCallStatus message, length delimited. Does not implicitly {@link hudiy.app.api.PhoneVoiceCallStatus.verify|verify} messages.
                 * @param message PhoneVoiceCallStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.PhoneVoiceCallStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PhoneVoiceCallStatus message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.PhoneVoiceCallStatus & hudiy.app.api.PhoneVoiceCallStatus.$Shape} PhoneVoiceCallStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.PhoneVoiceCallStatus & hudiy.app.api.PhoneVoiceCallStatus.$Shape;

                /**
                 * Decodes a PhoneVoiceCallStatus message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.PhoneVoiceCallStatus & hudiy.app.api.PhoneVoiceCallStatus.$Shape} PhoneVoiceCallStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.PhoneVoiceCallStatus & hudiy.app.api.PhoneVoiceCallStatus.$Shape;

                /**
                 * Verifies a PhoneVoiceCallStatus message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PhoneVoiceCallStatus message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PhoneVoiceCallStatus
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.PhoneVoiceCallStatus;

                /**
                 * Creates a plain object from a PhoneVoiceCallStatus message. Also converts values to other types if specified.
                 * @param message PhoneVoiceCallStatus
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.PhoneVoiceCallStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PhoneVoiceCallStatus to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for PhoneVoiceCallStatus
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace PhoneVoiceCallStatus {

                /** Properties of a PhoneVoiceCallStatus. */
                interface $Properties {

                    /** PhoneVoiceCallStatus state */
                    state: hudiy.app.api.PhoneVoiceCallStatus.PhoneVoiceCallState;

                    /** PhoneVoiceCallStatus callerId */
                    callerId: string;

                    /** PhoneVoiceCallStatus callerName */
                    callerName: string;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a PhoneVoiceCallStatus. */
                type $Shape = hudiy.app.api.PhoneVoiceCallStatus.$Properties;

                /** PhoneVoiceCallState enum. */
                enum PhoneVoiceCallState {

                    /** PHONE_VOICE_CALL_STATE_NONE value */
                    PHONE_VOICE_CALL_STATE_NONE = 0,

                    /** PHONE_VOICE_CALL_STATE_INCOMING value */
                    PHONE_VOICE_CALL_STATE_INCOMING = 1,

                    /** PHONE_VOICE_CALL_STATE_ALERTING value */
                    PHONE_VOICE_CALL_STATE_ALERTING = 2,

                    /** PHONE_VOICE_CALL_STATE_ACTIVE value */
                    PHONE_VOICE_CALL_STATE_ACTIVE = 3
                }
            }

            /**
             * Properties of a PhoneLevelsStatus.
             * @deprecated Use hudiy.app.api.PhoneLevelsStatus.$Properties instead.
             */
            interface IPhoneLevelsStatus extends hudiy.app.api.PhoneLevelsStatus.$Properties {
            }

            /** Represents a PhoneLevelsStatus. */
            class PhoneLevelsStatus {

                /**
                 * Constructs a new PhoneLevelsStatus.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.PhoneLevelsStatus.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** PhoneLevelsStatus betteryLevel. */
                betteryLevel: number;

                /** PhoneLevelsStatus signalLevel. */
                signalLevel: number;

                /**
                 * Creates a new PhoneLevelsStatus instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PhoneLevelsStatus instance
                 */
                static create(properties: hudiy.app.api.PhoneLevelsStatus.$Shape): hudiy.app.api.PhoneLevelsStatus & hudiy.app.api.PhoneLevelsStatus.$Shape;
                static create(properties?: hudiy.app.api.PhoneLevelsStatus.$Properties): hudiy.app.api.PhoneLevelsStatus;

                /**
                 * Encodes the specified PhoneLevelsStatus message. Does not implicitly {@link hudiy.app.api.PhoneLevelsStatus.verify|verify} messages.
                 * @param message PhoneLevelsStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.PhoneLevelsStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PhoneLevelsStatus message, length delimited. Does not implicitly {@link hudiy.app.api.PhoneLevelsStatus.verify|verify} messages.
                 * @param message PhoneLevelsStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.PhoneLevelsStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PhoneLevelsStatus message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.PhoneLevelsStatus & hudiy.app.api.PhoneLevelsStatus.$Shape} PhoneLevelsStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.PhoneLevelsStatus & hudiy.app.api.PhoneLevelsStatus.$Shape;

                /**
                 * Decodes a PhoneLevelsStatus message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.PhoneLevelsStatus & hudiy.app.api.PhoneLevelsStatus.$Shape} PhoneLevelsStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.PhoneLevelsStatus & hudiy.app.api.PhoneLevelsStatus.$Shape;

                /**
                 * Verifies a PhoneLevelsStatus message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PhoneLevelsStatus message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PhoneLevelsStatus
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.PhoneLevelsStatus;

                /**
                 * Creates a plain object from a PhoneLevelsStatus message. Also converts values to other types if specified.
                 * @param message PhoneLevelsStatus
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.PhoneLevelsStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PhoneLevelsStatus to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for PhoneLevelsStatus
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace PhoneLevelsStatus {

                /** Properties of a PhoneLevelsStatus. */
                interface $Properties {

                    /** PhoneLevelsStatus betteryLevel */
                    betteryLevel: number;

                    /** PhoneLevelsStatus signalLevel */
                    signalLevel: number;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a PhoneLevelsStatus. */
                type $Shape = hudiy.app.api.PhoneLevelsStatus.$Properties;
            }

            /**
             * Properties of a KeyEvent.
             * @deprecated Use hudiy.app.api.KeyEvent.$Properties instead.
             */
            interface IKeyEvent extends hudiy.app.api.KeyEvent.$Properties {
            }

            /** Represents a KeyEvent. */
            class KeyEvent {

                /**
                 * Constructs a new KeyEvent.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.KeyEvent.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** KeyEvent keyType. */
                keyType: hudiy.app.api.KeyEvent.KeyType;

                /** KeyEvent eventType. */
                eventType: hudiy.app.api.KeyEvent.EventType;

                /**
                 * Creates a new KeyEvent instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns KeyEvent instance
                 */
                static create(properties: hudiy.app.api.KeyEvent.$Shape): hudiy.app.api.KeyEvent & hudiy.app.api.KeyEvent.$Shape;
                static create(properties?: hudiy.app.api.KeyEvent.$Properties): hudiy.app.api.KeyEvent;

                /**
                 * Encodes the specified KeyEvent message. Does not implicitly {@link hudiy.app.api.KeyEvent.verify|verify} messages.
                 * @param message KeyEvent message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.KeyEvent.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified KeyEvent message, length delimited. Does not implicitly {@link hudiy.app.api.KeyEvent.verify|verify} messages.
                 * @param message KeyEvent message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.KeyEvent.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a KeyEvent message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.KeyEvent & hudiy.app.api.KeyEvent.$Shape} KeyEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.KeyEvent & hudiy.app.api.KeyEvent.$Shape;

                /**
                 * Decodes a KeyEvent message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.KeyEvent & hudiy.app.api.KeyEvent.$Shape} KeyEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.KeyEvent & hudiy.app.api.KeyEvent.$Shape;

                /**
                 * Verifies a KeyEvent message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a KeyEvent message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns KeyEvent
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.KeyEvent;

                /**
                 * Creates a plain object from a KeyEvent message. Also converts values to other types if specified.
                 * @param message KeyEvent
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.KeyEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this KeyEvent to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for KeyEvent
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace KeyEvent {

                /** Properties of a KeyEvent. */
                interface $Properties {

                    /** KeyEvent keyType */
                    keyType: hudiy.app.api.KeyEvent.KeyType;

                    /** KeyEvent eventType */
                    eventType: hudiy.app.api.KeyEvent.EventType;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a KeyEvent. */
                type $Shape = hudiy.app.api.KeyEvent.$Properties;

                /** KeyType enum. */
                enum KeyType {

                    /** KEY_TYPE_UP value */
                    KEY_TYPE_UP = 1,

                    /** KEY_TYPE_DOWN value */
                    KEY_TYPE_DOWN = 2,

                    /** KEY_TYPE_LEFT value */
                    KEY_TYPE_LEFT = 3,

                    /** KEY_TYPE_RIGHT value */
                    KEY_TYPE_RIGHT = 4,

                    /** KEY_TYPE_SCROLL_LEFT value */
                    KEY_TYPE_SCROLL_LEFT = 5,

                    /** KEY_TYPE_SCROLL_RIGHT value */
                    KEY_TYPE_SCROLL_RIGHT = 6,

                    /** KEY_TYPE_ENTER value */
                    KEY_TYPE_ENTER = 7,

                    /** KEY_TYPE_BACK value */
                    KEY_TYPE_BACK = 8,

                    /** KEY_TYPE_HOME value */
                    KEY_TYPE_HOME = 9,

                    /** KEY_TYPE_ANSWER_CALL value */
                    KEY_TYPE_ANSWER_CALL = 10,

                    /** KEY_TYPE_PHONE_MENU value */
                    KEY_TYPE_PHONE_MENU = 11,

                    /** KEY_TYPE_HANGUP_CALL value */
                    KEY_TYPE_HANGUP_CALL = 12,

                    /** KEY_TYPE_PLAY value */
                    KEY_TYPE_PLAY = 13,

                    /** KEY_TYPE_TOGGLE_PLAY value */
                    KEY_TYPE_TOGGLE_PLAY = 14,

                    /** KEY_TYPE_PAUSE value */
                    KEY_TYPE_PAUSE = 15,

                    /** KEY_TYPE_STOP value */
                    KEY_TYPE_STOP = 16,

                    /** KEY_TYPE_PREVIOUS_TRACK value */
                    KEY_TYPE_PREVIOUS_TRACK = 17,

                    /** KEY_TYPE_NEXT_TRACK value */
                    KEY_TYPE_NEXT_TRACK = 18,

                    /** KEY_TYPE_MEDIA_MENU value */
                    KEY_TYPE_MEDIA_MENU = 19,

                    /** KEY_TYPE_NAVIGATION_MENU value */
                    KEY_TYPE_NAVIGATION_MENU = 20,

                    /** KEY_TYPE_VOICE_COMMAND value */
                    KEY_TYPE_VOICE_COMMAND = 21,

                    /** KEY_TYPE_TOGGLE_INPUT_FOCUS value */
                    KEY_TYPE_TOGGLE_INPUT_FOCUS = 23
                }

                /** EventType enum. */
                enum EventType {

                    /** EVENT_TYPE_PRESS value */
                    EVENT_TYPE_PRESS = 1,

                    /** EVENT_TYPE_RELEASE value */
                    EVENT_TYPE_RELEASE = 2
                }
            }

            /**
             * Properties of a QueryObdDeviceRequest.
             * @deprecated Use hudiy.app.api.QueryObdDeviceRequest.$Properties instead.
             */
            interface IQueryObdDeviceRequest extends hudiy.app.api.QueryObdDeviceRequest.$Properties {
            }

            /** Represents a QueryObdDeviceRequest. */
            class QueryObdDeviceRequest {

                /**
                 * Constructs a new QueryObdDeviceRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.QueryObdDeviceRequest.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** QueryObdDeviceRequest commands. */
                commands: string[];

                /** QueryObdDeviceRequest requestCode. */
                requestCode: number;

                /**
                 * Creates a new QueryObdDeviceRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns QueryObdDeviceRequest instance
                 */
                static create(properties: hudiy.app.api.QueryObdDeviceRequest.$Shape): hudiy.app.api.QueryObdDeviceRequest & hudiy.app.api.QueryObdDeviceRequest.$Shape;
                static create(properties?: hudiy.app.api.QueryObdDeviceRequest.$Properties): hudiy.app.api.QueryObdDeviceRequest;

                /**
                 * Encodes the specified QueryObdDeviceRequest message. Does not implicitly {@link hudiy.app.api.QueryObdDeviceRequest.verify|verify} messages.
                 * @param message QueryObdDeviceRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.QueryObdDeviceRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified QueryObdDeviceRequest message, length delimited. Does not implicitly {@link hudiy.app.api.QueryObdDeviceRequest.verify|verify} messages.
                 * @param message QueryObdDeviceRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.QueryObdDeviceRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a QueryObdDeviceRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.QueryObdDeviceRequest & hudiy.app.api.QueryObdDeviceRequest.$Shape} QueryObdDeviceRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.QueryObdDeviceRequest & hudiy.app.api.QueryObdDeviceRequest.$Shape;

                /**
                 * Decodes a QueryObdDeviceRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.QueryObdDeviceRequest & hudiy.app.api.QueryObdDeviceRequest.$Shape} QueryObdDeviceRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.QueryObdDeviceRequest & hudiy.app.api.QueryObdDeviceRequest.$Shape;

                /**
                 * Verifies a QueryObdDeviceRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a QueryObdDeviceRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns QueryObdDeviceRequest
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.QueryObdDeviceRequest;

                /**
                 * Creates a plain object from a QueryObdDeviceRequest message. Also converts values to other types if specified.
                 * @param message QueryObdDeviceRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.QueryObdDeviceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this QueryObdDeviceRequest to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for QueryObdDeviceRequest
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace QueryObdDeviceRequest {

                /** Properties of a QueryObdDeviceRequest. */
                interface $Properties {

                    /** QueryObdDeviceRequest commands */
                    commands?: (string[]|null);

                    /** QueryObdDeviceRequest requestCode */
                    requestCode: number;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a QueryObdDeviceRequest. */
                type $Shape = hudiy.app.api.QueryObdDeviceRequest.$Properties;
            }

            /**
             * Properties of a QueryObdDeviceResponse.
             * @deprecated Use hudiy.app.api.QueryObdDeviceResponse.$Properties instead.
             */
            interface IQueryObdDeviceResponse extends hudiy.app.api.QueryObdDeviceResponse.$Properties {
            }

            /** Represents a QueryObdDeviceResponse. */
            class QueryObdDeviceResponse {

                /**
                 * Constructs a new QueryObdDeviceResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.QueryObdDeviceResponse.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** QueryObdDeviceResponse result. */
                result: boolean;

                /** QueryObdDeviceResponse data. */
                data: string[];

                /** QueryObdDeviceResponse requestCode. */
                requestCode: number;

                /**
                 * Creates a new QueryObdDeviceResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns QueryObdDeviceResponse instance
                 */
                static create(properties: hudiy.app.api.QueryObdDeviceResponse.$Shape): hudiy.app.api.QueryObdDeviceResponse & hudiy.app.api.QueryObdDeviceResponse.$Shape;
                static create(properties?: hudiy.app.api.QueryObdDeviceResponse.$Properties): hudiy.app.api.QueryObdDeviceResponse;

                /**
                 * Encodes the specified QueryObdDeviceResponse message. Does not implicitly {@link hudiy.app.api.QueryObdDeviceResponse.verify|verify} messages.
                 * @param message QueryObdDeviceResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.QueryObdDeviceResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified QueryObdDeviceResponse message, length delimited. Does not implicitly {@link hudiy.app.api.QueryObdDeviceResponse.verify|verify} messages.
                 * @param message QueryObdDeviceResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.QueryObdDeviceResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a QueryObdDeviceResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.QueryObdDeviceResponse & hudiy.app.api.QueryObdDeviceResponse.$Shape} QueryObdDeviceResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.QueryObdDeviceResponse & hudiy.app.api.QueryObdDeviceResponse.$Shape;

                /**
                 * Decodes a QueryObdDeviceResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.QueryObdDeviceResponse & hudiy.app.api.QueryObdDeviceResponse.$Shape} QueryObdDeviceResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.QueryObdDeviceResponse & hudiy.app.api.QueryObdDeviceResponse.$Shape;

                /**
                 * Verifies a QueryObdDeviceResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a QueryObdDeviceResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns QueryObdDeviceResponse
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.QueryObdDeviceResponse;

                /**
                 * Creates a plain object from a QueryObdDeviceResponse message. Also converts values to other types if specified.
                 * @param message QueryObdDeviceResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.QueryObdDeviceResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this QueryObdDeviceResponse to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for QueryObdDeviceResponse
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace QueryObdDeviceResponse {

                /** Properties of a QueryObdDeviceResponse. */
                interface $Properties {

                    /** QueryObdDeviceResponse result */
                    result: boolean;

                    /** QueryObdDeviceResponse data */
                    data?: (string[]|null);

                    /** QueryObdDeviceResponse requestCode */
                    requestCode: number;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a QueryObdDeviceResponse. */
                type $Shape = hudiy.app.api.QueryObdDeviceResponse.$Properties;
            }

            /**
             * Properties of a SetDarkMode.
             * @deprecated Use hudiy.app.api.SetDarkMode.$Properties instead.
             */
            interface ISetDarkMode extends hudiy.app.api.SetDarkMode.$Properties {
            }

            /** Represents a SetDarkMode. */
            class SetDarkMode {

                /**
                 * Constructs a new SetDarkMode.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.SetDarkMode.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** SetDarkMode enabled. */
                enabled: boolean;

                /**
                 * Creates a new SetDarkMode instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SetDarkMode instance
                 */
                static create(properties: hudiy.app.api.SetDarkMode.$Shape): hudiy.app.api.SetDarkMode & hudiy.app.api.SetDarkMode.$Shape;
                static create(properties?: hudiy.app.api.SetDarkMode.$Properties): hudiy.app.api.SetDarkMode;

                /**
                 * Encodes the specified SetDarkMode message. Does not implicitly {@link hudiy.app.api.SetDarkMode.verify|verify} messages.
                 * @param message SetDarkMode message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.SetDarkMode.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SetDarkMode message, length delimited. Does not implicitly {@link hudiy.app.api.SetDarkMode.verify|verify} messages.
                 * @param message SetDarkMode message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.SetDarkMode.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SetDarkMode message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetDarkMode & hudiy.app.api.SetDarkMode.$Shape} SetDarkMode
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.SetDarkMode & hudiy.app.api.SetDarkMode.$Shape;

                /**
                 * Decodes a SetDarkMode message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetDarkMode & hudiy.app.api.SetDarkMode.$Shape} SetDarkMode
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.SetDarkMode & hudiy.app.api.SetDarkMode.$Shape;

                /**
                 * Verifies a SetDarkMode message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SetDarkMode message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SetDarkMode
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.SetDarkMode;

                /**
                 * Creates a plain object from a SetDarkMode message. Also converts values to other types if specified.
                 * @param message SetDarkMode
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.SetDarkMode, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SetDarkMode to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for SetDarkMode
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace SetDarkMode {

                /** Properties of a SetDarkMode. */
                interface $Properties {

                    /** SetDarkMode enabled */
                    enabled: boolean;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a SetDarkMode. */
                type $Shape = hudiy.app.api.SetDarkMode.$Properties;
            }

            /** OverlayVisibility enum. */
            enum OverlayVisibility {

                /** OVERLAY_VISIBILITY_NONE value */
                OVERLAY_VISIBILITY_NONE = 0,

                /** OVERLAY_VISIBILITY_ALWAYS value */
                OVERLAY_VISIBILITY_ALWAYS = 1,

                /** OVERLAY_VISIBILITY_NATIVE_UI_ONLY value */
                OVERLAY_VISIBILITY_NATIVE_UI_ONLY = 2,

                /** OVERLAY_VISIBILITY_PROJECTION_ONLY value */
                OVERLAY_VISIBILITY_PROJECTION_ONLY = 3
            }

            /**
             * Properties of a SetCustomOverlayVisibility.
             * @deprecated Use hudiy.app.api.SetCustomOverlayVisibility.$Properties instead.
             */
            interface ISetCustomOverlayVisibility extends hudiy.app.api.SetCustomOverlayVisibility.$Properties {
            }

            /** Represents a SetCustomOverlayVisibility. */
            class SetCustomOverlayVisibility {

                /**
                 * Constructs a new SetCustomOverlayVisibility.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.SetCustomOverlayVisibility.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** SetCustomOverlayVisibility identifier. */
                identifier: string;

                /** SetCustomOverlayVisibility visibility. */
                visibility: hudiy.app.api.OverlayVisibility;

                /**
                 * Creates a new SetCustomOverlayVisibility instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SetCustomOverlayVisibility instance
                 */
                static create(properties: hudiy.app.api.SetCustomOverlayVisibility.$Shape): hudiy.app.api.SetCustomOverlayVisibility & hudiy.app.api.SetCustomOverlayVisibility.$Shape;
                static create(properties?: hudiy.app.api.SetCustomOverlayVisibility.$Properties): hudiy.app.api.SetCustomOverlayVisibility;

                /**
                 * Encodes the specified SetCustomOverlayVisibility message. Does not implicitly {@link hudiy.app.api.SetCustomOverlayVisibility.verify|verify} messages.
                 * @param message SetCustomOverlayVisibility message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.SetCustomOverlayVisibility.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SetCustomOverlayVisibility message, length delimited. Does not implicitly {@link hudiy.app.api.SetCustomOverlayVisibility.verify|verify} messages.
                 * @param message SetCustomOverlayVisibility message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.SetCustomOverlayVisibility.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SetCustomOverlayVisibility message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetCustomOverlayVisibility & hudiy.app.api.SetCustomOverlayVisibility.$Shape} SetCustomOverlayVisibility
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.SetCustomOverlayVisibility & hudiy.app.api.SetCustomOverlayVisibility.$Shape;

                /**
                 * Decodes a SetCustomOverlayVisibility message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetCustomOverlayVisibility & hudiy.app.api.SetCustomOverlayVisibility.$Shape} SetCustomOverlayVisibility
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.SetCustomOverlayVisibility & hudiy.app.api.SetCustomOverlayVisibility.$Shape;

                /**
                 * Verifies a SetCustomOverlayVisibility message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SetCustomOverlayVisibility message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SetCustomOverlayVisibility
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.SetCustomOverlayVisibility;

                /**
                 * Creates a plain object from a SetCustomOverlayVisibility message. Also converts values to other types if specified.
                 * @param message SetCustomOverlayVisibility
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.SetCustomOverlayVisibility, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SetCustomOverlayVisibility to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for SetCustomOverlayVisibility
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace SetCustomOverlayVisibility {

                /** Properties of a SetCustomOverlayVisibility. */
                interface $Properties {

                    /** SetCustomOverlayVisibility identifier */
                    identifier: string;

                    /** SetCustomOverlayVisibility visibility */
                    visibility: hudiy.app.api.OverlayVisibility;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a SetCustomOverlayVisibility. */
                type $Shape = hudiy.app.api.SetCustomOverlayVisibility.$Properties;
            }

            /**
             * Properties of a SetNavigationOverlayVisibility.
             * @deprecated Use hudiy.app.api.SetNavigationOverlayVisibility.$Properties instead.
             */
            interface ISetNavigationOverlayVisibility extends hudiy.app.api.SetNavigationOverlayVisibility.$Properties {
            }

            /** Represents a SetNavigationOverlayVisibility. */
            class SetNavigationOverlayVisibility {

                /**
                 * Constructs a new SetNavigationOverlayVisibility.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.SetNavigationOverlayVisibility.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** SetNavigationOverlayVisibility visibility. */
                visibility: hudiy.app.api.OverlayVisibility;

                /**
                 * Creates a new SetNavigationOverlayVisibility instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SetNavigationOverlayVisibility instance
                 */
                static create(properties: hudiy.app.api.SetNavigationOverlayVisibility.$Shape): hudiy.app.api.SetNavigationOverlayVisibility & hudiy.app.api.SetNavigationOverlayVisibility.$Shape;
                static create(properties?: hudiy.app.api.SetNavigationOverlayVisibility.$Properties): hudiy.app.api.SetNavigationOverlayVisibility;

                /**
                 * Encodes the specified SetNavigationOverlayVisibility message. Does not implicitly {@link hudiy.app.api.SetNavigationOverlayVisibility.verify|verify} messages.
                 * @param message SetNavigationOverlayVisibility message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.SetNavigationOverlayVisibility.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SetNavigationOverlayVisibility message, length delimited. Does not implicitly {@link hudiy.app.api.SetNavigationOverlayVisibility.verify|verify} messages.
                 * @param message SetNavigationOverlayVisibility message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.SetNavigationOverlayVisibility.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SetNavigationOverlayVisibility message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetNavigationOverlayVisibility & hudiy.app.api.SetNavigationOverlayVisibility.$Shape} SetNavigationOverlayVisibility
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.SetNavigationOverlayVisibility & hudiy.app.api.SetNavigationOverlayVisibility.$Shape;

                /**
                 * Decodes a SetNavigationOverlayVisibility message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetNavigationOverlayVisibility & hudiy.app.api.SetNavigationOverlayVisibility.$Shape} SetNavigationOverlayVisibility
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.SetNavigationOverlayVisibility & hudiy.app.api.SetNavigationOverlayVisibility.$Shape;

                /**
                 * Verifies a SetNavigationOverlayVisibility message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SetNavigationOverlayVisibility message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SetNavigationOverlayVisibility
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.SetNavigationOverlayVisibility;

                /**
                 * Creates a plain object from a SetNavigationOverlayVisibility message. Also converts values to other types if specified.
                 * @param message SetNavigationOverlayVisibility
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.SetNavigationOverlayVisibility, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SetNavigationOverlayVisibility to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for SetNavigationOverlayVisibility
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace SetNavigationOverlayVisibility {

                /** Properties of a SetNavigationOverlayVisibility. */
                interface $Properties {

                    /** SetNavigationOverlayVisibility visibility */
                    visibility: hudiy.app.api.OverlayVisibility;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a SetNavigationOverlayVisibility. */
                type $Shape = hudiy.app.api.SetNavigationOverlayVisibility.$Properties;
            }

            /**
             * Properties of a SetVolumeOverlayVisibility.
             * @deprecated Use hudiy.app.api.SetVolumeOverlayVisibility.$Properties instead.
             */
            interface ISetVolumeOverlayVisibility extends hudiy.app.api.SetVolumeOverlayVisibility.$Properties {
            }

            /** Represents a SetVolumeOverlayVisibility. */
            class SetVolumeOverlayVisibility {

                /**
                 * Constructs a new SetVolumeOverlayVisibility.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.SetVolumeOverlayVisibility.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** SetVolumeOverlayVisibility visibility. */
                visibility: hudiy.app.api.OverlayVisibility;

                /**
                 * Creates a new SetVolumeOverlayVisibility instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SetVolumeOverlayVisibility instance
                 */
                static create(properties: hudiy.app.api.SetVolumeOverlayVisibility.$Shape): hudiy.app.api.SetVolumeOverlayVisibility & hudiy.app.api.SetVolumeOverlayVisibility.$Shape;
                static create(properties?: hudiy.app.api.SetVolumeOverlayVisibility.$Properties): hudiy.app.api.SetVolumeOverlayVisibility;

                /**
                 * Encodes the specified SetVolumeOverlayVisibility message. Does not implicitly {@link hudiy.app.api.SetVolumeOverlayVisibility.verify|verify} messages.
                 * @param message SetVolumeOverlayVisibility message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.SetVolumeOverlayVisibility.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SetVolumeOverlayVisibility message, length delimited. Does not implicitly {@link hudiy.app.api.SetVolumeOverlayVisibility.verify|verify} messages.
                 * @param message SetVolumeOverlayVisibility message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.SetVolumeOverlayVisibility.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SetVolumeOverlayVisibility message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetVolumeOverlayVisibility & hudiy.app.api.SetVolumeOverlayVisibility.$Shape} SetVolumeOverlayVisibility
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.SetVolumeOverlayVisibility & hudiy.app.api.SetVolumeOverlayVisibility.$Shape;

                /**
                 * Decodes a SetVolumeOverlayVisibility message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetVolumeOverlayVisibility & hudiy.app.api.SetVolumeOverlayVisibility.$Shape} SetVolumeOverlayVisibility
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.SetVolumeOverlayVisibility & hudiy.app.api.SetVolumeOverlayVisibility.$Shape;

                /**
                 * Verifies a SetVolumeOverlayVisibility message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SetVolumeOverlayVisibility message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SetVolumeOverlayVisibility
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.SetVolumeOverlayVisibility;

                /**
                 * Creates a plain object from a SetVolumeOverlayVisibility message. Also converts values to other types if specified.
                 * @param message SetVolumeOverlayVisibility
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.SetVolumeOverlayVisibility, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SetVolumeOverlayVisibility to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for SetVolumeOverlayVisibility
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace SetVolumeOverlayVisibility {

                /** Properties of a SetVolumeOverlayVisibility. */
                interface $Properties {

                    /** SetVolumeOverlayVisibility visibility */
                    visibility: hudiy.app.api.OverlayVisibility;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a SetVolumeOverlayVisibility. */
                type $Shape = hudiy.app.api.SetVolumeOverlayVisibility.$Properties;
            }

            /**
             * Properties of a DispatchAction.
             * @deprecated Use hudiy.app.api.DispatchAction.$Properties instead.
             */
            interface IDispatchAction extends hudiy.app.api.DispatchAction.$Properties {
            }

            /** Represents a DispatchAction. */
            class DispatchAction {

                /**
                 * Constructs a new DispatchAction.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.DispatchAction.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** DispatchAction action. */
                action: string;

                /**
                 * Creates a new DispatchAction instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DispatchAction instance
                 */
                static create(properties: hudiy.app.api.DispatchAction.$Shape): hudiy.app.api.DispatchAction & hudiy.app.api.DispatchAction.$Shape;
                static create(properties?: hudiy.app.api.DispatchAction.$Properties): hudiy.app.api.DispatchAction;

                /**
                 * Encodes the specified DispatchAction message. Does not implicitly {@link hudiy.app.api.DispatchAction.verify|verify} messages.
                 * @param message DispatchAction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.DispatchAction.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DispatchAction message, length delimited. Does not implicitly {@link hudiy.app.api.DispatchAction.verify|verify} messages.
                 * @param message DispatchAction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.DispatchAction.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DispatchAction message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.DispatchAction & hudiy.app.api.DispatchAction.$Shape} DispatchAction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.DispatchAction & hudiy.app.api.DispatchAction.$Shape;

                /**
                 * Decodes a DispatchAction message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.DispatchAction & hudiy.app.api.DispatchAction.$Shape} DispatchAction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.DispatchAction & hudiy.app.api.DispatchAction.$Shape;

                /**
                 * Verifies a DispatchAction message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DispatchAction message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DispatchAction
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.DispatchAction;

                /**
                 * Creates a plain object from a DispatchAction message. Also converts values to other types if specified.
                 * @param message DispatchAction
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.DispatchAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DispatchAction to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for DispatchAction
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace DispatchAction {

                /** Properties of a DispatchAction. */
                interface $Properties {

                    /** DispatchAction action */
                    action: string;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a DispatchAction. */
                type $Shape = hudiy.app.api.DispatchAction.$Properties;
            }

            /**
             * Properties of a RegisterActionRequest.
             * @deprecated Use hudiy.app.api.RegisterActionRequest.$Properties instead.
             */
            interface IRegisterActionRequest extends hudiy.app.api.RegisterActionRequest.$Properties {
            }

            /** Represents a RegisterActionRequest. */
            class RegisterActionRequest {

                /**
                 * Constructs a new RegisterActionRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.RegisterActionRequest.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** RegisterActionRequest action. */
                action: string;

                /**
                 * Creates a new RegisterActionRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RegisterActionRequest instance
                 */
                static create(properties: hudiy.app.api.RegisterActionRequest.$Shape): hudiy.app.api.RegisterActionRequest & hudiy.app.api.RegisterActionRequest.$Shape;
                static create(properties?: hudiy.app.api.RegisterActionRequest.$Properties): hudiy.app.api.RegisterActionRequest;

                /**
                 * Encodes the specified RegisterActionRequest message. Does not implicitly {@link hudiy.app.api.RegisterActionRequest.verify|verify} messages.
                 * @param message RegisterActionRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.RegisterActionRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RegisterActionRequest message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterActionRequest.verify|verify} messages.
                 * @param message RegisterActionRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.RegisterActionRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RegisterActionRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterActionRequest & hudiy.app.api.RegisterActionRequest.$Shape} RegisterActionRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.RegisterActionRequest & hudiy.app.api.RegisterActionRequest.$Shape;

                /**
                 * Decodes a RegisterActionRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterActionRequest & hudiy.app.api.RegisterActionRequest.$Shape} RegisterActionRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.RegisterActionRequest & hudiy.app.api.RegisterActionRequest.$Shape;

                /**
                 * Verifies a RegisterActionRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RegisterActionRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RegisterActionRequest
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.RegisterActionRequest;

                /**
                 * Creates a plain object from a RegisterActionRequest message. Also converts values to other types if specified.
                 * @param message RegisterActionRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.RegisterActionRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RegisterActionRequest to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for RegisterActionRequest
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace RegisterActionRequest {

                /** Properties of a RegisterActionRequest. */
                interface $Properties {

                    /** RegisterActionRequest action */
                    action: string;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a RegisterActionRequest. */
                type $Shape = hudiy.app.api.RegisterActionRequest.$Properties;
            }

            /**
             * Properties of a RegisterActionResponse.
             * @deprecated Use hudiy.app.api.RegisterActionResponse.$Properties instead.
             */
            interface IRegisterActionResponse extends hudiy.app.api.RegisterActionResponse.$Properties {
            }

            /** Represents a RegisterActionResponse. */
            class RegisterActionResponse {

                /**
                 * Constructs a new RegisterActionResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.RegisterActionResponse.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** RegisterActionResponse action. */
                action: string;

                /** RegisterActionResponse result. */
                result: boolean;

                /**
                 * Creates a new RegisterActionResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RegisterActionResponse instance
                 */
                static create(properties: hudiy.app.api.RegisterActionResponse.$Shape): hudiy.app.api.RegisterActionResponse & hudiy.app.api.RegisterActionResponse.$Shape;
                static create(properties?: hudiy.app.api.RegisterActionResponse.$Properties): hudiy.app.api.RegisterActionResponse;

                /**
                 * Encodes the specified RegisterActionResponse message. Does not implicitly {@link hudiy.app.api.RegisterActionResponse.verify|verify} messages.
                 * @param message RegisterActionResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.RegisterActionResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RegisterActionResponse message, length delimited. Does not implicitly {@link hudiy.app.api.RegisterActionResponse.verify|verify} messages.
                 * @param message RegisterActionResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.RegisterActionResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RegisterActionResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.RegisterActionResponse & hudiy.app.api.RegisterActionResponse.$Shape} RegisterActionResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.RegisterActionResponse & hudiy.app.api.RegisterActionResponse.$Shape;

                /**
                 * Decodes a RegisterActionResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.RegisterActionResponse & hudiy.app.api.RegisterActionResponse.$Shape} RegisterActionResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.RegisterActionResponse & hudiy.app.api.RegisterActionResponse.$Shape;

                /**
                 * Verifies a RegisterActionResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RegisterActionResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RegisterActionResponse
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.RegisterActionResponse;

                /**
                 * Creates a plain object from a RegisterActionResponse message. Also converts values to other types if specified.
                 * @param message RegisterActionResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.RegisterActionResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RegisterActionResponse to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for RegisterActionResponse
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace RegisterActionResponse {

                /** Properties of a RegisterActionResponse. */
                interface $Properties {

                    /** RegisterActionResponse action */
                    action: string;

                    /** RegisterActionResponse result */
                    result: boolean;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a RegisterActionResponse. */
                type $Shape = hudiy.app.api.RegisterActionResponse.$Properties;
            }

            /**
             * Properties of a CoverartRequest.
             * @deprecated Use hudiy.app.api.CoverartRequest.$Properties instead.
             */
            interface ICoverartRequest extends hudiy.app.api.CoverartRequest.$Properties {
            }

            /** Represents a CoverartRequest. */
            class CoverartRequest {

                /**
                 * Constructs a new CoverartRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.CoverartRequest.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** CoverartRequest requestCode. */
                requestCode: number;

                /** CoverartRequest artist. */
                artist: string;

                /** CoverartRequest album. */
                album: string;

                /** CoverartRequest title. */
                title: string;

                /** CoverartRequest source. */
                source: hudiy.app.api.MediaSource;

                /**
                 * Creates a new CoverartRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CoverartRequest instance
                 */
                static create(properties: hudiy.app.api.CoverartRequest.$Shape): hudiy.app.api.CoverartRequest & hudiy.app.api.CoverartRequest.$Shape;
                static create(properties?: hudiy.app.api.CoverartRequest.$Properties): hudiy.app.api.CoverartRequest;

                /**
                 * Encodes the specified CoverartRequest message. Does not implicitly {@link hudiy.app.api.CoverartRequest.verify|verify} messages.
                 * @param message CoverartRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.CoverartRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CoverartRequest message, length delimited. Does not implicitly {@link hudiy.app.api.CoverartRequest.verify|verify} messages.
                 * @param message CoverartRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.CoverartRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CoverartRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.CoverartRequest & hudiy.app.api.CoverartRequest.$Shape} CoverartRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.CoverartRequest & hudiy.app.api.CoverartRequest.$Shape;

                /**
                 * Decodes a CoverartRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.CoverartRequest & hudiy.app.api.CoverartRequest.$Shape} CoverartRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.CoverartRequest & hudiy.app.api.CoverartRequest.$Shape;

                /**
                 * Verifies a CoverartRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CoverartRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CoverartRequest
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.CoverartRequest;

                /**
                 * Creates a plain object from a CoverartRequest message. Also converts values to other types if specified.
                 * @param message CoverartRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.CoverartRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CoverartRequest to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for CoverartRequest
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace CoverartRequest {

                /** Properties of a CoverartRequest. */
                interface $Properties {

                    /** CoverartRequest requestCode */
                    requestCode: number;

                    /** CoverartRequest artist */
                    artist: string;

                    /** CoverartRequest album */
                    album: string;

                    /** CoverartRequest title */
                    title: string;

                    /** CoverartRequest source */
                    source: hudiy.app.api.MediaSource;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a CoverartRequest. */
                type $Shape = hudiy.app.api.CoverartRequest.$Properties;
            }

            /**
             * Properties of a CoverartResponse.
             * @deprecated Use hudiy.app.api.CoverartResponse.$Properties instead.
             */
            interface ICoverartResponse extends hudiy.app.api.CoverartResponse.$Properties {
            }

            /** Represents a CoverartResponse. */
            class CoverartResponse {

                /**
                 * Constructs a new CoverartResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.CoverartResponse.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** CoverartResponse requestCode. */
                requestCode: number;

                /** CoverartResponse coverart. */
                coverart: Uint8Array;

                /**
                 * Creates a new CoverartResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CoverartResponse instance
                 */
                static create(properties: hudiy.app.api.CoverartResponse.$Shape): hudiy.app.api.CoverartResponse & hudiy.app.api.CoverartResponse.$Shape;
                static create(properties?: hudiy.app.api.CoverartResponse.$Properties): hudiy.app.api.CoverartResponse;

                /**
                 * Encodes the specified CoverartResponse message. Does not implicitly {@link hudiy.app.api.CoverartResponse.verify|verify} messages.
                 * @param message CoverartResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.CoverartResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CoverartResponse message, length delimited. Does not implicitly {@link hudiy.app.api.CoverartResponse.verify|verify} messages.
                 * @param message CoverartResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.CoverartResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CoverartResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.CoverartResponse & hudiy.app.api.CoverartResponse.$Shape} CoverartResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.CoverartResponse & hudiy.app.api.CoverartResponse.$Shape;

                /**
                 * Decodes a CoverartResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.CoverartResponse & hudiy.app.api.CoverartResponse.$Shape} CoverartResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.CoverartResponse & hudiy.app.api.CoverartResponse.$Shape;

                /**
                 * Verifies a CoverartResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CoverartResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CoverartResponse
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.CoverartResponse;

                /**
                 * Creates a plain object from a CoverartResponse message. Also converts values to other types if specified.
                 * @param message CoverartResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.CoverartResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CoverartResponse to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for CoverartResponse
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace CoverartResponse {

                /** Properties of a CoverartResponse. */
                interface $Properties {

                    /** CoverartResponse requestCode */
                    requestCode: number;

                    /** CoverartResponse coverart */
                    coverart: Uint8Array;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a CoverartResponse. */
                type $Shape = hudiy.app.api.CoverartResponse.$Properties;
            }

            /**
             * Properties of a SetEqualizerPreset.
             * @deprecated Use hudiy.app.api.SetEqualizerPreset.$Properties instead.
             */
            interface ISetEqualizerPreset extends hudiy.app.api.SetEqualizerPreset.$Properties {
            }

            /** Represents a SetEqualizerPreset. */
            class SetEqualizerPreset {

                /**
                 * Constructs a new SetEqualizerPreset.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.SetEqualizerPreset.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** SetEqualizerPreset name. */
                name: string;

                /**
                 * Creates a new SetEqualizerPreset instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SetEqualizerPreset instance
                 */
                static create(properties: hudiy.app.api.SetEqualizerPreset.$Shape): hudiy.app.api.SetEqualizerPreset & hudiy.app.api.SetEqualizerPreset.$Shape;
                static create(properties?: hudiy.app.api.SetEqualizerPreset.$Properties): hudiy.app.api.SetEqualizerPreset;

                /**
                 * Encodes the specified SetEqualizerPreset message. Does not implicitly {@link hudiy.app.api.SetEqualizerPreset.verify|verify} messages.
                 * @param message SetEqualizerPreset message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.SetEqualizerPreset.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SetEqualizerPreset message, length delimited. Does not implicitly {@link hudiy.app.api.SetEqualizerPreset.verify|verify} messages.
                 * @param message SetEqualizerPreset message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.SetEqualizerPreset.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SetEqualizerPreset message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetEqualizerPreset & hudiy.app.api.SetEqualizerPreset.$Shape} SetEqualizerPreset
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.SetEqualizerPreset & hudiy.app.api.SetEqualizerPreset.$Shape;

                /**
                 * Decodes a SetEqualizerPreset message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetEqualizerPreset & hudiy.app.api.SetEqualizerPreset.$Shape} SetEqualizerPreset
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.SetEqualizerPreset & hudiy.app.api.SetEqualizerPreset.$Shape;

                /**
                 * Verifies a SetEqualizerPreset message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SetEqualizerPreset message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SetEqualizerPreset
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.SetEqualizerPreset;

                /**
                 * Creates a plain object from a SetEqualizerPreset message. Also converts values to other types if specified.
                 * @param message SetEqualizerPreset
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.SetEqualizerPreset, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SetEqualizerPreset to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for SetEqualizerPreset
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace SetEqualizerPreset {

                /** Properties of a SetEqualizerPreset. */
                interface $Properties {

                    /** SetEqualizerPreset name */
                    name: string;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a SetEqualizerPreset. */
                type $Shape = hudiy.app.api.SetEqualizerPreset.$Properties;
            }

            /**
             * Properties of a SetAndroidAutoDayNightMode.
             * @deprecated Use hudiy.app.api.SetAndroidAutoDayNightMode.$Properties instead.
             */
            interface ISetAndroidAutoDayNightMode extends hudiy.app.api.SetAndroidAutoDayNightMode.$Properties {
            }

            /** Represents a SetAndroidAutoDayNightMode. */
            class SetAndroidAutoDayNightMode {

                /**
                 * Constructs a new SetAndroidAutoDayNightMode.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.SetAndroidAutoDayNightMode.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** SetAndroidAutoDayNightMode mode. */
                mode: hudiy.app.api.SetAndroidAutoDayNightMode.DayNightMode;

                /**
                 * Creates a new SetAndroidAutoDayNightMode instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SetAndroidAutoDayNightMode instance
                 */
                static create(properties: hudiy.app.api.SetAndroidAutoDayNightMode.$Shape): hudiy.app.api.SetAndroidAutoDayNightMode & hudiy.app.api.SetAndroidAutoDayNightMode.$Shape;
                static create(properties?: hudiy.app.api.SetAndroidAutoDayNightMode.$Properties): hudiy.app.api.SetAndroidAutoDayNightMode;

                /**
                 * Encodes the specified SetAndroidAutoDayNightMode message. Does not implicitly {@link hudiy.app.api.SetAndroidAutoDayNightMode.verify|verify} messages.
                 * @param message SetAndroidAutoDayNightMode message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.SetAndroidAutoDayNightMode.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SetAndroidAutoDayNightMode message, length delimited. Does not implicitly {@link hudiy.app.api.SetAndroidAutoDayNightMode.verify|verify} messages.
                 * @param message SetAndroidAutoDayNightMode message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.SetAndroidAutoDayNightMode.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SetAndroidAutoDayNightMode message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetAndroidAutoDayNightMode & hudiy.app.api.SetAndroidAutoDayNightMode.$Shape} SetAndroidAutoDayNightMode
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.SetAndroidAutoDayNightMode & hudiy.app.api.SetAndroidAutoDayNightMode.$Shape;

                /**
                 * Decodes a SetAndroidAutoDayNightMode message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetAndroidAutoDayNightMode & hudiy.app.api.SetAndroidAutoDayNightMode.$Shape} SetAndroidAutoDayNightMode
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.SetAndroidAutoDayNightMode & hudiy.app.api.SetAndroidAutoDayNightMode.$Shape;

                /**
                 * Verifies a SetAndroidAutoDayNightMode message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SetAndroidAutoDayNightMode message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SetAndroidAutoDayNightMode
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.SetAndroidAutoDayNightMode;

                /**
                 * Creates a plain object from a SetAndroidAutoDayNightMode message. Also converts values to other types if specified.
                 * @param message SetAndroidAutoDayNightMode
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.SetAndroidAutoDayNightMode, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SetAndroidAutoDayNightMode to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for SetAndroidAutoDayNightMode
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace SetAndroidAutoDayNightMode {

                /** Properties of a SetAndroidAutoDayNightMode. */
                interface $Properties {

                    /** SetAndroidAutoDayNightMode mode */
                    mode: hudiy.app.api.SetAndroidAutoDayNightMode.DayNightMode;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a SetAndroidAutoDayNightMode. */
                type $Shape = hudiy.app.api.SetAndroidAutoDayNightMode.$Properties;

                /** DayNightMode enum. */
                enum DayNightMode {

                    /** COMMON value */
                    COMMON = 1,

                    /** DAY value */
                    DAY = 2,

                    /** NIGHT value */
                    NIGHT = 3
                }
            }

            /**
             * Properties of a SetAutoboxDayNightMode.
             * @deprecated Use hudiy.app.api.SetAutoboxDayNightMode.$Properties instead.
             */
            interface ISetAutoboxDayNightMode extends hudiy.app.api.SetAutoboxDayNightMode.$Properties {
            }

            /** Represents a SetAutoboxDayNightMode. */
            class SetAutoboxDayNightMode {

                /**
                 * Constructs a new SetAutoboxDayNightMode.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.SetAutoboxDayNightMode.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** SetAutoboxDayNightMode mode. */
                mode: hudiy.app.api.SetAutoboxDayNightMode.DayNightMode;

                /**
                 * Creates a new SetAutoboxDayNightMode instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SetAutoboxDayNightMode instance
                 */
                static create(properties: hudiy.app.api.SetAutoboxDayNightMode.$Shape): hudiy.app.api.SetAutoboxDayNightMode & hudiy.app.api.SetAutoboxDayNightMode.$Shape;
                static create(properties?: hudiy.app.api.SetAutoboxDayNightMode.$Properties): hudiy.app.api.SetAutoboxDayNightMode;

                /**
                 * Encodes the specified SetAutoboxDayNightMode message. Does not implicitly {@link hudiy.app.api.SetAutoboxDayNightMode.verify|verify} messages.
                 * @param message SetAutoboxDayNightMode message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.SetAutoboxDayNightMode.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SetAutoboxDayNightMode message, length delimited. Does not implicitly {@link hudiy.app.api.SetAutoboxDayNightMode.verify|verify} messages.
                 * @param message SetAutoboxDayNightMode message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.SetAutoboxDayNightMode.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SetAutoboxDayNightMode message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetAutoboxDayNightMode & hudiy.app.api.SetAutoboxDayNightMode.$Shape} SetAutoboxDayNightMode
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.SetAutoboxDayNightMode & hudiy.app.api.SetAutoboxDayNightMode.$Shape;

                /**
                 * Decodes a SetAutoboxDayNightMode message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetAutoboxDayNightMode & hudiy.app.api.SetAutoboxDayNightMode.$Shape} SetAutoboxDayNightMode
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.SetAutoboxDayNightMode & hudiy.app.api.SetAutoboxDayNightMode.$Shape;

                /**
                 * Verifies a SetAutoboxDayNightMode message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SetAutoboxDayNightMode message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SetAutoboxDayNightMode
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.SetAutoboxDayNightMode;

                /**
                 * Creates a plain object from a SetAutoboxDayNightMode message. Also converts values to other types if specified.
                 * @param message SetAutoboxDayNightMode
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.SetAutoboxDayNightMode, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SetAutoboxDayNightMode to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for SetAutoboxDayNightMode
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace SetAutoboxDayNightMode {

                /** Properties of a SetAutoboxDayNightMode. */
                interface $Properties {

                    /** SetAutoboxDayNightMode mode */
                    mode: hudiy.app.api.SetAutoboxDayNightMode.DayNightMode;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a SetAutoboxDayNightMode. */
                type $Shape = hudiy.app.api.SetAutoboxDayNightMode.$Properties;

                /** DayNightMode enum. */
                enum DayNightMode {

                    /** COMMON value */
                    COMMON = 1,

                    /** DAY value */
                    DAY = 2,

                    /** NIGHT value */
                    NIGHT = 3
                }
            }

            /**
             * Properties of a CurrentMenuAction.
             * @deprecated Use hudiy.app.api.CurrentMenuAction.$Properties instead.
             */
            interface ICurrentMenuAction extends hudiy.app.api.CurrentMenuAction.$Properties {
            }

            /** Represents a CurrentMenuAction. */
            class CurrentMenuAction {

                /**
                 * Constructs a new CurrentMenuAction.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.CurrentMenuAction.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** CurrentMenuAction actionName. */
                actionName: string;

                /**
                 * Creates a new CurrentMenuAction instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CurrentMenuAction instance
                 */
                static create(properties: hudiy.app.api.CurrentMenuAction.$Shape): hudiy.app.api.CurrentMenuAction & hudiy.app.api.CurrentMenuAction.$Shape;
                static create(properties?: hudiy.app.api.CurrentMenuAction.$Properties): hudiy.app.api.CurrentMenuAction;

                /**
                 * Encodes the specified CurrentMenuAction message. Does not implicitly {@link hudiy.app.api.CurrentMenuAction.verify|verify} messages.
                 * @param message CurrentMenuAction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.CurrentMenuAction.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CurrentMenuAction message, length delimited. Does not implicitly {@link hudiy.app.api.CurrentMenuAction.verify|verify} messages.
                 * @param message CurrentMenuAction message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.CurrentMenuAction.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CurrentMenuAction message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.CurrentMenuAction & hudiy.app.api.CurrentMenuAction.$Shape} CurrentMenuAction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.CurrentMenuAction & hudiy.app.api.CurrentMenuAction.$Shape;

                /**
                 * Decodes a CurrentMenuAction message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.CurrentMenuAction & hudiy.app.api.CurrentMenuAction.$Shape} CurrentMenuAction
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.CurrentMenuAction & hudiy.app.api.CurrentMenuAction.$Shape;

                /**
                 * Verifies a CurrentMenuAction message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CurrentMenuAction message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CurrentMenuAction
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.CurrentMenuAction;

                /**
                 * Creates a plain object from a CurrentMenuAction message. Also converts values to other types if specified.
                 * @param message CurrentMenuAction
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.CurrentMenuAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CurrentMenuAction to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for CurrentMenuAction
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace CurrentMenuAction {

                /** Properties of a CurrentMenuAction. */
                interface $Properties {

                    /** CurrentMenuAction actionName */
                    actionName: string;

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a CurrentMenuAction. */
                type $Shape = hudiy.app.api.CurrentMenuAction.$Properties;
            }

            /**
             * Properties of a SetBassTrebleBoost.
             * @deprecated Use hudiy.app.api.SetBassTrebleBoost.$Properties instead.
             */
            interface ISetBassTrebleBoost extends hudiy.app.api.SetBassTrebleBoost.$Properties {
            }

            /** Represents a SetBassTrebleBoost. */
            class SetBassTrebleBoost {

                /**
                 * Constructs a new SetBassTrebleBoost.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: hudiy.app.api.SetBassTrebleBoost.$Properties);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];

                /** SetBassTrebleBoost bassGain. */
                bassGain: number;

                /** SetBassTrebleBoost bassFrequency. */
                bassFrequency: number;

                /** SetBassTrebleBoost trebleGain. */
                trebleGain: number;

                /** SetBassTrebleBoost trebleFrequency. */
                trebleFrequency: number;

                /**
                 * Creates a new SetBassTrebleBoost instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SetBassTrebleBoost instance
                 */
                static create(properties: hudiy.app.api.SetBassTrebleBoost.$Shape): hudiy.app.api.SetBassTrebleBoost & hudiy.app.api.SetBassTrebleBoost.$Shape;
                static create(properties?: hudiy.app.api.SetBassTrebleBoost.$Properties): hudiy.app.api.SetBassTrebleBoost;

                /**
                 * Encodes the specified SetBassTrebleBoost message. Does not implicitly {@link hudiy.app.api.SetBassTrebleBoost.verify|verify} messages.
                 * @param message SetBassTrebleBoost message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encode(message: hudiy.app.api.SetBassTrebleBoost.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SetBassTrebleBoost message, length delimited. Does not implicitly {@link hudiy.app.api.SetBassTrebleBoost.verify|verify} messages.
                 * @param message SetBassTrebleBoost message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                static encodeDelimited(message: hudiy.app.api.SetBassTrebleBoost.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SetBassTrebleBoost message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns {hudiy.app.api.SetBassTrebleBoost & hudiy.app.api.SetBassTrebleBoost.$Shape} SetBassTrebleBoost
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hudiy.app.api.SetBassTrebleBoost & hudiy.app.api.SetBassTrebleBoost.$Shape;

                /**
                 * Decodes a SetBassTrebleBoost message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns {hudiy.app.api.SetBassTrebleBoost & hudiy.app.api.SetBassTrebleBoost.$Shape} SetBassTrebleBoost
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hudiy.app.api.SetBassTrebleBoost & hudiy.app.api.SetBassTrebleBoost.$Shape;

                /**
                 * Verifies a SetBassTrebleBoost message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SetBassTrebleBoost message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SetBassTrebleBoost
                 */
                static fromObject(object: { [k: string]: any }): hudiy.app.api.SetBassTrebleBoost;

                /**
                 * Creates a plain object from a SetBassTrebleBoost message. Also converts values to other types if specified.
                 * @param message SetBassTrebleBoost
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                static toObject(message: hudiy.app.api.SetBassTrebleBoost, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SetBassTrebleBoost to JSON.
                 * @returns JSON object
                 */
                toJSON(): { [k: string]: any };

                /**
                 * Gets the type url for SetBassTrebleBoost
                 * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                 * @returns The type url
                 */
                static getTypeUrl(prefix?: string): string;
            }

            namespace SetBassTrebleBoost {

                /** Properties of a SetBassTrebleBoost. */
                interface $Properties {

                    /** SetBassTrebleBoost bassGain */
                    bassGain?: (number|null);

                    /** SetBassTrebleBoost bassFrequency */
                    bassFrequency?: (number|null);

                    /** SetBassTrebleBoost trebleGain */
                    trebleGain?: (number|null);

                    /** SetBassTrebleBoost trebleFrequency */
                    trebleFrequency?: (number|null);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];
                }

                /** Shape of a SetBassTrebleBoost. */
                type $Shape = hudiy.app.api.SetBassTrebleBoost.$Properties;
            }
        }
    }
}
