// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import requireFromUrl from 'require-from-url/sync.js'
import solc from 'solc';
import { code } from '../../data/node-memory';


export default function handler(req, res) {
  
  let USE_VERSION
  let START_TIMESTAMP = Date.now()
  
  try{
    
    const data = requireFromUrl('https://binaries.soliditylang.org/bin/list.js');
    const AVAILABLE_VERSIONS = data.releases
    const givenCode = req.body.code
    let givenVersion = req.body.version

    if(!givenCode){
      res.status(500).json('Must supply code to compile. Recieved:' + req.body)
      return
  }

  // if(!givenVersion){
  //     res.status(500).json('Should specify a version - using latest stable. Recieved:' + req.body)
  // }

    



  

    
    
    const loadSolc = async (_version) => {
      return new Promise((res) => {

          if(!_version){
              let version = solc.version() 
              res({
                  version,
                  solc
              })
          }
          console.log(`>> loadSolc | loading version: ${_version}`)

          const cleanVersion = _version
              .replace('soljson-', '')
              .replace('.js', '')

          solc.loadRemoteVersion(cleanVersion, async (err, solcSnapshot) => {
            if (err) {
                  console.log(`> loadSolc | could not load version: ${cleanVersion}`)
                  let version = solc.version()
                  res({
                      version,
                      solc,
                  })
              }else{

                  console.log(`> loadSolc | loaded version: ${cleanVersion}`)
                  
                  let version = solcSnapshot.version()
                  res({
                      version,
                      solc: solcSnapshot
                    })
              }
          });
      })
    }

    const compileSource = async (solc, data) => {
      return new Promise((res)=>{
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
        let result = solc.compile(inputString)
        // let output = JSON.parse(result)

        console.log('>> done compiling!')
        res({ 
          success: true, 
          output: result,  
          version: USE_VERSION, 
          error: null, 
          duration: Date.now() - START_TIMESTAMP
        })
      })
    }


    // console.log(typeof givenCode)
    if(givenCode.includes('pragma solidity')){
      let codeLines = givenCode.split('\n')
      let specVersion = null
      for(let i = 0; i<codeLines.length;i++){
        if(codeLines[i].includes('pragma solidity')){
          specVersion = codeLines[i]
            .replace('pragma solidity ', '')
            .replace(';','')
            .replace('^','')
          }
          continue;
        }
      console.log(`>> Code specified version: ${specVersion}`,)
      if(specVersion && specVersion in AVAILABLE_VERSIONS){
        USE_VERSION = AVAILABLE_VERSIONS[specVersion]
        console.log(`>> Using specified version ${specVersion}: ${AVAILABLE_VERSIONS[specVersion]}`)
      }else{
        USE_VERSION = Object.values(AVAILABLE_VERSIONS)[0]
      }
    }

    else{
      USE_VERSION = Object.values(AVAILABLE_VERSIONS)[0]
    }

    
    loadSolc(USE_VERSION)
    .then(x => {
      compileSource(x.solc, givenCode)
      .then(z => {
        res.status(200).json(z)
      })
    })
    
  
  }catch(err){
    console.log('>> compiler error! ------------------------------------------')
    console.log(err)
    res.status(200).json({ 
      success:false, 
      output: '', 
      version: USE_VERSION, 
      error: err,  
      duration: Date.now() - START_TIMESTAMP
    })
  }






  
}
