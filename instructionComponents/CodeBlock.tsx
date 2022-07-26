import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from 'prism-react-renderer/themes/vsDark';
import Prism from "prism-react-renderer/prism";
//@ts-ignore
(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-solidity");

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`;


const CodeBlock = (props:any) => {
    return(
        <Highlight {...defaultProps} theme={dracula} code={props.code.trim() || ''} language={props.lang  || 'sol'}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className || 'codeblock'} style={{...style, overflow: 'auto'}}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={i} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    )
}

export default CodeBlock