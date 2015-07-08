declare module 'cycle-react' {
  interface DOMDriverFunction {
		(vtree$: Rx.Observable<any>, driverName: string): any
	}
  export function makeDOMDriver(container: string | Element, customElements?: any): DOMDriverFunction;  
}
