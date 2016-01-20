function convertTransform(style) {
  var result = {};
  var transform = '';

  for (var k in style) {
    if (k === 'transformMatrix') {
      transform += ( 'matrix3d(' + style[k].join(',') + ') ' );
    }else if ( k === 'translateX' || k === 'translateY' || k === 'translateZ') {
      var v = style[k];
      if (typeof(v) === 'number') v += 'px';
      transform += ( k + '(' + v + ') ' );
    } else if (k === 'scaleX' || k === 'scaleY' || k === 'scaleZ') {
      transform += ( k + '(' + style[k] + ') ');
    } else {
      var val = style[k];

      if (typeof val == 'number') {
        val += 'px';
      }

      result[k] = val;
    }
  }

  if (transform) {
    result.transform = transform;
  }

  return result;
}

function setNativeProps(ref, props) {
  var node = React.findDOMNode(ref);
  var style = props.style;

  if (style) {
    style = convertTransform(style);
    for (var k in style) {
      node.style[k] = style[k];
    }
  }
}

module.exports = setNativeProps;
