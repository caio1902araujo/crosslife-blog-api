declare namespace Express{
	export interface Request{
    tokenSub: {
      id: string
    },
		student: {
			id: string,
		},
    author: {
      id: string,
    },
    trainer: {
      id: string,
    },
	}
}
