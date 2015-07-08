declare module "@cycle/web" {
	import {VTree} from 'virtual-dom'
	import * as Rx from 'rx'

	export interface DOMDriverIn {
		DOM: {
			get: (selector: string, eventName: string) => Rx.Observable<CustomEvent>
			dispose: () => void
		}
	}

	export interface DOMDriverOut {
		DOM: Rx.Observable<VTree>
	}

	export interface PropsDriver<P> {
		props: {
			get: <T>(property: string) => Rx.Observable<T>
			getAll: () => Rx.Observable<P>
		}
	}

	interface DOMDriverFunction {
		(vtree$: Rx.Observable<any>, driverName: string): any
	}

	export function makeDOMDriver(container: string | Element, customElements?: any): DOMDriverFunction;

	export function h<P>(selector: any, text: string): VTree;
	export function h<P>(selector: any, children?: VTree[]): VTree;
	export function h<P>(selector: any, props: P, text?: string): VTree;
	export function h<P>(selector: any, props: P, children?: VTree[]): VTree;

	export function svg<P>(selector: any, text: string): VTree;
	export function svg<P>(selector: any, children?: VTree[]): VTree;
	export function svg<P>(selector: any, props: P, text?: string): VTree;
	export function svg<P>(selector: any, props: P, children?: VTree[]): VTree;
}
