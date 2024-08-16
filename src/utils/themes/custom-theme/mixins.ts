export const boxFullMixin = (props?: any) => ({
	content: '""',
	width: '100%',
	height: '100%',
	position: 'absolute',
	top: 0,
	left: 0,
	...props,
});

export class Mixins {
	static boxFullMixin = (props: any) => boxFullMixin(props);
}
