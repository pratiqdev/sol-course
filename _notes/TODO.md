# TODO

-/ setup github repo
-/ deploy to vercel (and commit frequently for testing)
-/ add `Web3Modal` 
-/ ping ChiptosX contract to check if user is holder (if on mainnet)
- generate JWT with expiration, or some method of secure access
- add Mantine (create toast for every event)
- add getStaticPaths post slug setup from portfolio site
- test server-side api pages with compilation scripts
- create 5 tutorial pages (2 private) and test access
- create components with collapsing views:
  - left sidebar tutorial nav
  - center sidebar tutorial content
  - right sidebar container






# NEXT

## Access restricted content (separate function / button):

1. get the user to sign a message (FE)
  - verifies that they own this account

2. ping the contract at `balanceOf(address)` with the verified address (FE)
  - returns 1 or more if they own a token

3. generate a jwt and save as a cookie `TOKEN_ACCESS` (BE generation, FE cookie storage)

# hasAuth hook

create a hook that checks if they are valid at page load
if not - show a modal with button to `Access restricted content`,
instructions to purchase a token, 
or list some free stuff