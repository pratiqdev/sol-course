const Instructions = (props: any) => {
    return(
        <div style={{ padding: '10px', paddingTop: '0', marginTop: '70px', minWidth: 'calc(35vw - 60px)', background: '#222', minHeight: 'calc(100vh - 70px)'}}>
            {props.children}
        </div>
    )
}
export default Instructions