import Shell from '@components/Shell'
import Instructions from '@components/Instructions'
import CustomAside from '@components/CustomAside'
import useConnectionManager from '@utils/hooks/useConnectionManager'

const CoursePage = () => {
    const {ctx, setCtx} = useConnectionManager()
    return(
        <Shell categoryIndex={0}>
            <Instructions>
                <h2>Intro - custom component (tsx)</h2>

                <p>CTX.showCompleteBanner: {ctx.showCompleteBanner.toString()}</p>

                <p>These are the instructions</p>

                <p>Custom components are easier to use in plain TSX instead of MDX</p>


            </Instructions>

            <CustomAside 
                categoryUri='intro'
                courseUri='standard-custom'
                style={{padding: '1rem', paddingTop: '0', backgroundImage: 'linear-gradient(45deg, #555, #99c, #222)'}}
                >
                <h1>Fully custom components...</h1>
                <img src='https://placekitten.com/400/600' alt='cats' />
            </CustomAside>
         
        </Shell>
    )

}

export default CoursePage