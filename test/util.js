export function getTextContent(element) {
  const children = Array.isArray(element.props.children) ?
    element.props.children : [ element.props.children ];

  return children.reduce((out, child) => {
    return out + (child.props ? getTextContent(child) : child);
  }, '');
}
