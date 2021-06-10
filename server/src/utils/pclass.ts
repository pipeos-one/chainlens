export function similarPclassBytecodeFilter(bytecode: String) {
  const pclassFilter: any = JSON.parse(JSON.stringify({
      where: {'data.sourceByLanguage.0.compilerOutput.runtime.bytecode': bytecode}
    }));
    return pclassFilter;
}

export function buildPclassFromBare(scontract: any) {
  let sources: any = [];
  let abi: any = [];
  // address contractName compilerVersion optimizations runs evmVersion sourceCode bytecode constructorArguments libraries abi block txhash timestamp sourcemap swarm license sourceCodeJson
  try {
    const jsonsources = JSON.parse(scontract.sourceCodeJson);
    Object.keys(jsonsources).forEach((name, i) => {
      const swarmpointer = scontract.swarm.split('://')
      sources[i] = {
        relative_path: name + '.sol',
        source: jsonsources[name],
        filePointer: {
          name: name,
          extension: 'sol',
          pointer: {
            identifier: swarmpointer[1],
            type: 'swarm',
            protocol: swarmpointer[0],
          }
        }
      }
    });
  } catch(e) {
    console.error('scontract.contractName - sourceCodeJson error: ', e);
    sources[scontract.contractName] = {
      relative_path: name + '.sol',
      source: scontract.sourceCode,
    }
  }

  try {
    abi = JSON.parse(scontract.abi);
  } catch(e) {
    console.error('scontract.contractName - abi error: ', e);
  }

  const compiler = {
    name: 'solc',
    version: scontract.compilerVersion,
    settings: {
      evmVersion: scontract.evmVersion,
      libraries: scontract.libraries,
      // remappings
      optimizer: {
        enabled: scontract.optimizations ? true : false,
        runs: scontract.runs
      }
    }
  }

  const compilerOutput = {
    runtime: {
      bytecode: scontract.bytecode,
      extra: {
        sourcemap: scontract.sourcemap,
      },
    },
    // compiled: {
    //   bytecode
    // },
  }

  return {
    pclass: {
      data: {
        name: scontract.contractName,
        license: scontract.license,
        gapi: abi,
        // natspec: ,
        sourceByLanguage: {
          0: {
            sources,
            compiler,
            compilerOutput,
            // extra: {
            //   abi: abi,
            // }
          }
        }
      },
      metadata: {
        categories: ['solidity'],
        chainids: [scontract.chainid],
      },
    },
    pfunctions: [],
    pclassInstances: [
      {
        data: {
          compiler,
          compilerOutput,
          deployment: {
            address: scontract.address,
            txhash: scontract.txhash,
            constructorArguments: scontract.constructorArguments,
            block: scontract.block,
            chainid: scontract.chainid,
          }
        },
        metadata: {
          categories: ['solidity'],
        }
      }
    ],
  }
}
