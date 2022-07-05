# Contract Arrays <!-- Step 3 -->

Next we want to introduce the idea of an array. An array is a collection of 
something. In Solidity there are two main types. A Fixed-Array and a 
Dynamic-Array.

For example,

An array can be instantiated with a type followed by []. So if we wanted to 
instantiate an array of integers we can do uint[] followed by the name of our 
array. Such as uint[] phoneNumbers;. This is an example of a dynamic array, 
which has no fixed size so we can continuously keep adding to it. 

Each entry in our array is referred to as an element. However, let's say we 
want to create an array of a fixed length or a fixed number of elements. We can 
do this by defining the number of allowed elements in our array with string[2] 
contactNames;. This is an array of strings of fixed-length 2, meaning we can 
only store 2 elements in it. 

We can also create an array of the struct we just made. Meaning we can store 
each struct as an element in an array. This basically allows us to store 
multiple items within our vending machine at once based on the layout of our 
struct. 

![uint-public-phoneNumbers](../_images/image_3.png)

In this instance, the data is just an integer that represents the phone number 
and we can refer to it in the order it was added. Arrays index starting at 0 
meaning the first entry will be phoneNumbers[0].

![uint-public-phoneNumbers](../_images/image_2.png)

In this instance of our fixed-array, we are only able to store 2 entries as we 
defined when we created the array. In this array the data is a string.

Our struct array is a little more complicated and that’s why I want to 
illustrate this because when I started the idea was a little hard to grasp.

We know our struct holds an integer and a string. So if we make a struct array 
we can store these unique pairs as a single element in an array. 

We can create an array of our struct Item the same way we would any regular 
array except this time instead of a type we call our struct name. Like this Item[] and give it a name. 

Like this Item[] allItems;

We also make this a public array because Solidity will automatically create a 
getter function for it so we can request this data with it and view its 
contents. Here is a visualization!

![uint-public-phoneNumbers](../_images/image_1.png)

So for each element we can now store a Quantity and an itemName because we 
defined the structure of our struct beforehand.