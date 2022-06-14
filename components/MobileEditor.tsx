import React, { Fragment, Component } from 'react'

import Editor from 'react-simple-code-editor'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'

interface IMobileEditorProps {
    value: string;
    onChange: Function;
    language?: string;
}

const MobileEditor = (props:IMobileEditorProps) => {


    const highlight = (code: any) => (
        //@ts-ignore
        <Highlight {...defaultProps} theme={theme} code={code} language={props.language || 'sol'}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Fragment>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => <span key={key} {...getTokenProps({ token, key })} />)}
                </div>
              ))}
            </Fragment>
          )}
        </Highlight>
    )

    const onValueChange = (code:any) => {
        props.onChange(code)
    }

    return(
        <Editor
            value={props.value}
            onValueChange={onValueChange}
            highlight={highlight}
            padding={10}
            style={{minHeight: 'calc(70vh - 70px)', fontFamily: 'monospace, monospace', fontSize: '.8rem'}}
            // style={styles.root}
        />
    )

}

export default MobileEditor