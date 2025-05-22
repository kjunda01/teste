import ReactDOMServer from "react-dom/server";

export const htmlToString = (component) => {
  return ReactDOMServer.renderToStaticMarkup(component);
};
