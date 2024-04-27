import { walk as estreeWalk } from "estree-walker";
import type { Ast, TemplateNode } from "svelte/types/compiler/interfaces";

type WalkerContext = {
	skip: () => void;
	remove: () => void;
	replace: (node: Node) => void;
};

type SyncHandler<Node extends TemplateNode> = (
	this: WalkerContext,
	node: Node,
	parent: Node | null,
	key: string | number | symbol | null | undefined,
	index: number | null | undefined,
) => void;

type WalkerArgs = {
	enter?: SyncHandler<TemplateNode>;
	leave?: SyncHandler<TemplateNode>;
};

export function walk(ast: Ast, args: WalkerArgs) {
	// @ts-expect-error estree-walker doesn't want Svelte Ast type
	return estreeWalk(ast, args);
}
