let localIdentName;
if (process.env.NODE_ENV === 'production') {
  localIdentName = '[hash:base64:5]';
} else {
  localIdentName = '[name]__[local]___[hash:base64:5]';
}

export default {
  css: {
    localIdentName
  }
};
