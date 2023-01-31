# Etherable Solidity Course

Study up on your solidity / ethereum / blockchain basics with these interactive courses.

Use an NFT access token to take the *advanced* courses!

> Course

## Behind the Scenes

This application uses a mongo document store to save users progress - associated by their wallet
address - and a deployed ethereum smart-contract to enable purchase of the advanced course content.
Built with the `mantine AppShell` wrapper and heavily customized components. 

- MongoDB data store
- React client app
- CI/CD via Vercel GitHub integration
- Next.js serverless function running `solc` compiler
- Incremental static course page generation via Next.js ISG
- Custom web3 connection state manager with `web3-modal` UI