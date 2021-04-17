"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Initializations
var router = _express["default"].Router(); // Routes


router.post('/subscription/99p', function (req, res) {
  var create_payment_json = {
    "product_id": "PROD-60L70341GH758414Y",
    "name": "Membership",
    "description": "Membership Plan",
    "billing_cycles": [{
      "frequency": {
        "interval_unit": "MONTH",
        "interval_count": 1
      },
      "tenure_type": "REGULAR",
      "sequence": 1,
      "total_cycles": 12,
      "pricing_scheme": {
        "fixed_price": {
          "value": "0.99",
          "currency_code": "USD"
        }
      }
    }],
    "payment_preferences": {
      "service_type": "PREPAID",
      "auto_bill_outstanding": true,
      "setup_fee_failure_action": "CONTINUE",
      "payment_failure_threshold": 3
    },
    "quantity_supported": true
  };
}); // Exporting Router

var _default = router;
exports["default"] = _default;