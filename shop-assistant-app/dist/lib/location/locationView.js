var g = require('react-google-maps');
var React = require('react/addons');
var r = React;
function locationView(context) {
    return React.createElement(g.GoogleMaps, {"containerProps": {
        style: {
            height: "100%"
        }
    }, "googleMapsApi": google.maps, "zoom": 8, "center": { lat: 51.4, lng: -0.19 }, "onClick": context.onClick.bind(context)});
}
exports.locationView = locationView;
//# sourceMappingURL=locationView.js.map