# Collection App


- use a gateway instaed of contacting ipfs directly: gateway.pinata.cloud/ipfs/tokenBaseURI/tokenId

- add a contract address to the side (moderator only) and loop thru tokens (useTotalSupply) (!!some contracts start at index 1 instead of zero)

- gateway is somethimes masked at ipffs://tokenHash
- use ipfs gateway with this hash instead of direct connection


- when clicking on a thumbnail: show a modal with stats / token id / traits / links to lookrare and etherscan
- set the background color to the bg color of the token (decided not to)

lookup ens ethereum name service