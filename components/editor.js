import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
// import styles from '../../styles/Home.module.css'
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
// import axios from 'axios';
import { useUserContext } from '../utils/context';
import verifyHolder from '../utils/verifyHolder';
// import { inspect } from 'util';
import connectionManager from '../utils/connection';

const ResponsiveImage = (props) => (
  <Image alt={props.alt} layout="responsive" {...props} />
)


export default function TestEditor(props) {

  const [editorContent, setEditorContent] = useState(props.code || 'no-code-props')


  return (
      <Editor
        height="60vh"
        defaultLanguage="sol"
        value={editorContent}
        onChange={setEditorContent}
        theme={'vs-dark'}
        /> 

  )
}
