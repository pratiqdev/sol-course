import Link from 'next/link'
import Editor from '@components/Editor'
import Shell from '@components/Shell'
import Instructions from '@components/Instructions'
import CodeBlock from '@instructions/CodeBlock'
import InstructionsFull from '@components/InstructionsFull'
import Blockquote from '@instructions/Blockquote'
import Image from '@instructions/Image'
import constants from '@data/constants'
import { SuggestionCoreTypes } from '@utils/interfaces'

const CoursePage = () => {

    return(
        <Shell 
            categoryIndex={4}
            nextCourse='/courses/smart-contract-intro/contract-functions'
        >

            
<InstructionsFull
    categoryUri='smart-contract-intro'
    courseUri='contract-arrays'
>
<h2>Contract Arrays</h2>

<p>
    Next we want to introduce the idea of an array. An array is a collection of 
    something. In Solidity there are two main types. A Fixed-Array and a 
    Dynamic-Array.
</p>

<p>
    For example,
</p>

<p>
    An array can be instantiated with a type followed by []. So if we wanted to 
    instantiate an array of integers we can do uint[] followed by the name of our 
    array. Such as uint[] phoneNumbers;. This is an example of a dynamic array, 
    which has no fixed size so we can continuously keep adding to it. 
</p>

<p>
    Each entry in our array is referred to as an element. However, let&apos;s say we 
    want to create an array of a fixed length or a fixed number of elements. We can 
    do this by defining the number of allowed elements in our array with string[2] 
    contactNames;. This is an array of strings of fixed-length 2, meaning we can 
    only store 2 elements in it. 
</p>

<p>
    We can also create an array of the struct we just made. Meaning we can store 
    each struct as an element in an array. This basically allows us to store 
    multiple items within our vending machine at once based on the layout of our 
    struct. 
</p>


<Image 
    src='smart-contract-intro_1.png'
    alt='uint-public-phoneNumbers'
    width={911}
    height={325}
/> 

<p>
    In this instance, the data is just an integer that represents the phone number 
    and we can refer to it in the order it was added. Arrays index starting at 0 
    meaning the first entry will be phoneNumbers[0].
</p>

<Image 
    src='smart-contract-intro_2.png'
    alt='uint-public-contactNames'
    layout='intrinsic'
    width={348}
    height={312}
/> 

<p>
    In this instance of our fixed-array, we are only able to store 2 entries as we 
    defined when we created the array. In this array the data is a string.
</p>

<p>
    Our struct array is a little more complicated and that&apos;s why I want to 
    illustrate this because when I started the idea was a little hard to grasp.
</p>

<p>
    We know our struct holds an integer and a string. So if we make a struct array 
    we can store these unique pairs as a single element in an array. 
</p>

<p>
    We can create an array of our struct Item the same way we would any regular 
    array except this time instead of a type we call our struct name. Like this Item[] and give it a name. 
</p>

<p>
    Like this <code>Item[] allItems;</code>
</p>

<p>
    We also make this a public array because Solidity will automatically create a 
    getter function for it so we can request this data with it and view its 
    contents. Here is a visualization!
</p>


<Image 
    src='smart-contract-intro_3.png'
    alt='uint-public-allItems'
    width={874}
    height={329}
/> 

<p>
    So for each element we can now store a Quantity and an itemName because we 
    defined the structure of our struct beforehand.
</p>




</InstructionsFull>
</Shell>
    )
}

export default CoursePage