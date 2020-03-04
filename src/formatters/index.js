import prettyRender from './pretty';
import jsonRender from './json';
import plainRender from './plain';


const getRender = (format) => {
  const formatters = {
    pretty: prettyRender,
    json: jsonRender,
    plain: plainRender,
  };

  return formatters[format];
};

export default getRender;
