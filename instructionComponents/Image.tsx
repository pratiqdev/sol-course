import Image from "next/image";

interface ImageProps {
    src: string;
    width: number;
    height?: number;
    alt?:string;
    icon?: any;
    style?: any
}


const CustomImage = (props:ImageProps) => {
    if(props.icon){
        return(
            <div  style={{width: props.width, display: 'inline-block', ...props.style}} >

            <Image 
                layout='responsive'
                width={100}
                height={100}
                alt={props.alt || 'Instruction Icon'}
                src={'/assets/'+props.src}
                />
            </div>
        )
    }

    return(
        <div {...props}>
        <Image 
            layout='responsive'
            width={props.width}
            height={props.height}
            alt={props.alt || 'Instruction Image'}
            src={'/assets/'+props.src}
        />
        </div>
    )
}

export default CustomImage