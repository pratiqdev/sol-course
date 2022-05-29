const Blockquote = (props:any) => {

    return(
        <blockquote data-variant={props.variant || 'default'}>
            {props.title && <h4 style={{margin: '5px 0'}}>{props.title}</h4>}
            {props.children}
        </blockquote>
    )
}

export default Blockquote