'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _xmppConstants = require('xmpp-constants');

var _nodeXmppJid = require('node-xmpp-jid');

var _nodeXmppJid2 = _interopRequireDefault(_nodeXmppJid);

exports['default'] = function (JXT) {

    JXT.withIQ(function (IQ) {

        JXT.add(IQ, 'jidPrep', {
            get: function get() {

                var data = JXT.utils.getSubText(this.xml, _xmppConstants.Namespace.JID_PREP_0, 'jid');
                if (data) {
                    var jid = new _nodeXmppJid2['default'](data);
                    jid.prepped = true;
                    return jid;
                }
            },
            set: function set(value) {

                JXT.utils.setSubText(this.xml, _xmppConstants.Namespace.JID_PREP_0, 'jid', (value || '').toString());
            }
        });
    });
};

module.exports = exports['default'];
//# sourceMappingURL=jidprep.js.map