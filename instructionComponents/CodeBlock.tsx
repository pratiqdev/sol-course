import Highlight, { defaultProps } from "prism-react-renderer";

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`;


const CodeBlock = (props:any) => {
    console.log('codeblock props:', props)
    return(
        <Highlight {...defaultProps} code={props.code || ''} language={props.lang || 'sol'}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
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