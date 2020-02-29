import prettyRender from './pretty';


const getRender = (format) => {
  const formatters = {
    pretty: prettyRender,
  };

  return formatters[format];
};

export default getRender;
