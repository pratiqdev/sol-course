# Create a token specifically for unlocking the courses

# check if user owns a token via a contract and let user access every course

Users would connect via metamask or any provider and validate that they own
a chiptos token and so have access to the course material. The front end would
store a JWT that expires after a couple hours and has to be revalidated on the
mainnet. Then users can switch to the testnet for interacting with test contracts.
Every time the site detects a change in network - check if its mainnet and revalidate
the user, and reset the expiration of the JWT.


# Create a quiz at the end of each course


# some courses are going to be hands on with custom components 

Many courses are going to have interactive content instead of an editor, so
include those JSX components in the markdown.

Examples:

- An interactive (fake) NFT image where users can manipulate the stats or properties
- A list of question labels and inputs where users can submit their answers
    Questions would be located within the MDX page
- 
like apreview panel or something that more functions and interactable content)



## Useful links:

The Deployed Site
https://vercel.com/pratiqdev/sol-course

The Repo
https://github.com/pratiqdev/sol-course

The ChiptosX Contract
https://etherscan.io/address/0x5955373cc1196fd91a4165c4c5c227b30a3948f9#readContract

Medium article on message signing and verification (with gist)
https://medium.com/coinmonks/signing-messages-in-ethereum-5517040c2ff1

JWT generation and validation
https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
