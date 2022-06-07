import {useState} from 'react'
import Link from 'next/link'
import Editor from '@components/Editor'
import Shell from '@components/Shell'
import Instructions from '@components/Instructions'
import CodeBlock from '@instructions/CodeBlock'
import Blockquote from '@instructions/Blockquote'
import Image from '@instructions/Image'
import constants from '@data/constants'
import useConnectionManager from '@utils/hooks/useConnectionManager'
import { Button } from '@mantine/core'
import useStable from '@utils/hooks/useStable'

const AccessTest = () => {
    const {ctx, reset, connect} = useConnectionManager()
    const [r, setR] = useState(false)

    return(
        <>
        <Shell categoryIndex={999} restricted={r}>
            <Instructions>
                <h1>Connection Info</h1>
                <Button onClick={() => setR(!r)}>{!r ? 'Restrict Page' : 'Remove Restriction'}</Button>
                <br />
                <br />
                <Button onClick={connect}>Connect</Button>
                <Button onClick={reset}>Reset</Button>
                <p>Connected: {ctx.connected.toString()}</p>
                <p>Address: {ctx.address || 'Anon'}</p>
                <p>Is Verified: {ctx.isVerified.toString()}</p>
                <p>Is Holder: {ctx.isHolder.toString()}</p>
            </Instructions>
        </Shell>
        </>
    )

}

export default AccessTest