# Contract Data

Now that we have a price, we have to think of a way to add our items. In real 
life the customer can easily just view if an item is in stock and click its 
corresponding number to see the price. However, in order to serve this 
information digitally we need to provide the customer with the quantity and the 
name of the goods. Since we chose to have our vending machine price to be static 
we don’t have to worry about providing the price for each individual item. 

We can do this with a struct. A struct gives us the tools to serve more complex 
data with multiple properties. 

## Instructions

Lets initialize a new **Struct** with the keyword `struct` and call it 'Item'.


So now we have 
```
struct Item {

}
```

To add properties to it we can simply add different types to it.

### Quantity

For our quantity we can use…

an integer! That's right! Since the quantity is a number we want to store this 
data as a uint .

All we have to do is declare that within our struct and give it a name. Such as 
uint quantity;.

### Item Name

We also want to store the name of the item, like a bag of chips. For this we 
would use a string.

A string is a data type that stores UTF-8 data such as “bag of chips” or “drink”

Now go ahead and put these two data types within our struct and give them the 
names quantity and itemName.


<!--
Code Editor Test: 

```
struct Item{
    uint quantity;
    string itemName;
}
```
-->