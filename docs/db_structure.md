#PipeOS DB



```uml

[DType
	|
	[.|
		_id: string
		metadata: Metadata
		timestamp: string
	]
	[data|
		name: string
		identifier: string, // encoded name
		signature: string // calculated
		typeChoice: number
		hasSlotSize: bool
		inputs: DTypeComponent Arr
		optionals: DTypeComponent Arr
		outputs: DTypeComponent Arr
		synsets: string Arr
		sources: Sources
		natspec: object //?
	]
	[extra
		|
		pfunctionid: string //?
		pclassid: string //?
	]
]

[DTypeComponent
	|
	name: string
	label: string
	dimensions: string Arr
	relation: number
]

[SourceByLanguage
	|
	[SourceData - key: number|
		sources: Source Arr
		compiler: Compiler
		compilerOutput: CompilerOutput
		extra: object // freeform
	]
]

[Compiler|
	name: string
	version: string
	settings: object {// freeform
	-evmVersion: string
	-libraries: any
	-remappings: string Arr
	}
]

[CompilerOutput|
	runtime: Bytecode
	compiled: Bytecode
]

[Source|
	relative_path: string
	source: string // blob?
	filePointer: FilePointer
]

[FilePointer|
	name: string
	extension: number
	pointer: SwarmPointer, IpfsPointer, UriPointer
]

[DStoragePointer
	|
	identifier: string
	type: string  // ipfs, swarm
	protocol: string  // bzz bzzr
]

[Bytecode
	|
	bytecode: string // blob?
	extra: object {
	-link_references: LinkReference Arr
	-link_dependencies: LinkValue Arr
	}
]

[PFunction
	|
	[.|
		_id: string
		pclassid: string
		dtypeid: string
		graphid?: string
		metadata: Metadata
		timestamp: string
	]
	[data| // cached dtype
		name: string
		signature: string
		gapi: object
		natspec: object
		sources: Sources
	]
]

[PClass
	|
	[.|
		_id: string
		packageid?: string
		dtypeid?: string
		type: string ?? sources.language
		metadata: Metadata
		extra: object // freeform; e.g. openapiid
		timestamp: string
	]
	[data|
		name: string
		gapi: AbiFunction Arr
		natspec: Natspec
		sourceByLanguage: SourceByLanguage
	]

]

[PClassInstance
	|
	[.|
		_id: string
		packageid?: string
		pclassid: string
		dtypeid?: string
		extra: object
		metadata: Metadata
		timestamp: string
	]
	[data|
		compilerOutput: CompilerOutput
		compiler: Compiler
		deployment: SolidityDeployment/OpenAPiDeployment etc.
	]
]

[Package
	|
	[.|
		_id: string
		metadata: Metadata
		timestamp: string
	]
	[data|
		name: string
		packageJson: string
		filePointer: FilePointer // folder?
	]
]

[Graph
	|
	[.|
		_id: string
		metadata: Metadata
		timestamp: string
	]
	[data|
		name: string
		shortGraph: object
		runnableGraph: object
		markdown: string
		filePointer: DStorage
	]

]


[Metadata
	|
	categories: string Arr
	synsets: string Arr
	chainids: number Arr
	languages: number Arr
]


[DTypeComponent]<-[DType]

[DStoragePointer]<-[FilePointer]
[FilePointer]<-[Graph]
[FilePointer]<-[SourceByLanguage]
[FilePointer]<-[Package]

[SourceByLanguage]<-[DType]
[SourceByLanguage]<-[PClass]
[SourceByLanguage]<-[PFunction]

[Source]0..* <-+[SourceByLanguage]
[Compiler]0..* <-+[SourceByLanguage]
[CompilerOutput]0..* <-+[SourceByLanguage]
[Bytecode]<-[CompilerOutput]

[Compiler]0..* <-+[PClassInstance]
[CompilerOutput]0..* <-+[PClassInstance]



[Metadata]<-[PFunction]
[Metadata]<-[PClass]
[Metadata]<-[Graph]
[Metadata]<-[PClassInstance]
[Metadata]<-[Package]

[PFunction]0..* <-+[PClass]
[DType]0..* <-+[PFunction]




```
