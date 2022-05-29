// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import requireFromUrl from 'require-from-url/sync.js'
import solc from 'solc';


export default async function handler(req, res) {
  return new Promise((resolve)=>{
    console.log('/api/solc-compile | starting compilation...')
    let START_TIMESTAMP = Date.now()
    
    try{

      const givenCode = req.body.code

      if(!givenCode){
        console.log('/api/solc-compile | no code in body')
        res.status(500).json('Must supply code to compile. Recieved:' + req.body)
        resolve()
        return
    }



    const compileSource = async (data) => {
      console.log(`/api/solc-compile | compileSource...`)
      
      const input = {
          language: 'Solidity',
          sources: {
            'code.sol': {
              content: data || 'contract C { function f() public {  } }'
              }
          },
          settings: {
            outputSelection: {
              '*': {
                  '*': ['*']
              }
              }
          }
      };

      let inputString = JSON.stringify(input)
      let result = await solc.compile(inputString)

      console.log('/api/solc-compile | compileSource | done compiling!')
      return { 
        success: true, 
        output: result,  
        version: '0.8.14', 
        error: null, 
        duration: ((Date.now() - START_TIMESTAMP) / 1000).toFixed(2)
      }
    }


    compileSource(givenCode)
    .then(z => {
      console.log(`/api/solc-compile | code compiled in: ${((Date.now() - START_TIMESTAMP) / 1000).toFixed(2)}`)
      res.status(200).json(z)
      resolve()
    })
  
    
  }catch(err){
    console.log('/api/solc-compile | ERROR ------------------------------------------')
    console.log(err)
    res.status(200).json({ 
      success:false, 
      output: '', 
      version: '0.8.14', 
      error: err,  
      duration: ((Date.now() - START_TIMESTAMP) / 1000).toFixed(2)
    })
    resolve()
  }






  })
}



/*
POST] /api/solc-compile
15:05:05:09

>> compiler error! ------------------------------------------
SyntaxError: Unexpected end of JSON input    
at JSON.parse (<anonymous>)    
at sync (/var/task/node_modules/require-from-url/sync.js:17:37)    
at /var/task/.next/server/pages/api/solc-compile.js:70:44    
at new Promise (<anonymous>)    
at handler (/var/task/.next/server/pages/api/solc-compile.js:66:12)    
at Object.apiResolver (/var/task/node_modules/next/dist/server/api-utils/node.js:185:15)    
at processTicksAndRejections (node:internal/process/task_queues:96:5)    
at async NextNodeServer.runApi (/var/task/node_modules/next/dist/server/next-server.js:395:9)    
at async Object.fn (/var/task/node_modules/next/dist/server/base-server.js:496:37)    
at async Router.execute (/var/task/node_modules/next/dist/server/router.js:226:36)

*/