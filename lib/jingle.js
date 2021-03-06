'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _xmppConstants = require('xmpp-constants');

var CONDITIONS = ['out-of-order', 'tie-break', 'unknown-session', 'unsupported-info'];
var REASONS = ['alternative-session', 'busy', 'cancel', 'connectivity-error', 'decline', 'expired', 'failed-application', 'failed-transport', 'general-error', 'gone', 'incompatible-parameters', 'media-error', 'security-error', 'success', 'timeout', 'unsupported-applications', 'unsupported-transports'];

exports['default'] = function (JXT) {

    var Utils = JXT.utils;

    var Jingle = JXT.define({
        name: 'jingle',
        namespace: _xmppConstants.Namespace.JINGLE_1,
        element: 'jingle',
        fields: {
            action: Utils.attribute('action'),
            initiator: Utils.attribute('initiator'),
            responder: Utils.attribute('responder'),
            sid: Utils.attribute('sid')
        }
    });

    var Content = JXT.define({
        name: '_jingleContent',
        namespace: _xmppConstants.Namespace.JINGLE_1,
        element: 'content',
        fields: {
            creator: Utils.attribute('creator'),
            disposition: Utils.attribute('disposition', 'session'),
            name: Utils.attribute('name'),
            senders: Utils.attribute('senders', 'both'),
            description: {
                get: function get() {

                    var opts = JXT.tagged('jingle-description').map(function (Description) {

                        return Description.prototype._name;
                    });
                    for (var i = 0, len = opts.length; i < len; i++) {
                        if (this._extensions[opts[i]]) {
                            return this._extensions[opts[i]];
                        }
                    }
                },
                set: function set(value) {

                    var ext = '_' + value.descType;
                    this[ext] = value;
                }
            },
            transport: {
                get: function get() {

                    var opts = JXT.tagged('jingle-transport').map(function (Transport) {

                        return Transport.prototype._name;
                    });
                    for (var i = 0, len = opts.length; i < len; i++) {
                        if (this._extensions[opts[i]]) {
                            return this._extensions[opts[i]];
                        }
                    }
                },
                set: function set(value) {

                    var ext = '_' + value.transType;
                    this[ext] = value;
                }
            }
        }
    });

    var Reason = JXT.define({
        name: 'reason',
        namespace: _xmppConstants.Namespace.JINGLE_1,
        element: 'reason',
        fields: {
            condition: Utils.enumSub(_xmppConstants.Namespace.JINGLE_1, REASONS),
            alternativeSession: {
                get: function get() {

                    return Utils.getSubText(this.xml, _xmppConstants.Namespace.JINGLE_1, 'alternative-session');
                },
                set: function set(value) {

                    this.condition = 'alternative-session';
                    Utils.setSubText(this.xml, _xmppConstants.Namespace.JINGLE_1, 'alternative-session', value);
                }
            },
            text: Utils.textSub(_xmppConstants.Namespace.JINGLE_1, 'text')
        }
    });

    JXT.extend(Jingle, Content, 'contents');
    JXT.extend(Jingle, Reason);

    JXT.extendIQ(Jingle);

    JXT.withStanzaError(function (StanzaError) {

        JXT.add(StanzaError, 'jingleCondition', Utils.enumSub(_xmppConstants.Namespace.JINGLE_ERRORS_1, CONDITIONS));
    });
};

module.exports = exports['default'];
//# sourceMappingURL=jingle.js.map