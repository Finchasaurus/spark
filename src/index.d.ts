import { InputState } from "@rbxts/spark";

export type Button = Enum.KeyCode | Enum.UserInputType;
export type VirtualAxis = {
	kind: "VirtualAxis";
	positive?: Button;
	negative?: Button;
};
export type VirtualAxis2D = {
	kind: "VirtualAxis2D";
	up?: Button;
	down?: Button;
	left?: Button;
	right?: Button;
};
export type Input = Button | VirtualAxis | VirtualAxis2D;

export type Modifer = (
	pressed: boolean,
	axis: number,
	axis2d: Vector2,
) => LuaTuple<[boolean, number, Vector2]>;

export type Bind = {
	addModifiers(...modifiers: Array<Modifer>): Bind;
};

export type ActionConfig = {
	addModifiers(...modifiers: Array<Modifer>): ActionConfig;
};

export type Bindings<T extends string> = {
	bind(action: T, ...inputs: Array<Input | Bind>): ActionConfig;
};

export declare class Actions<T extends string> {
	setAssociatedGamepad(gamepad: Enum.UserInputType): void;
	removeAssociatedGamepad(): void;

	setRebuildBindings(rebuildBindings: (bindings: Bindings<T>) => void): Actions<T>;
	rebuildBindings(): void;

	update(inputState: InputState): void;

	pressed(action: T): boolean;
	released(action: T): boolean;
	justPressedSignal(action: T): Signal;
	press(action: T): void;

	axis(action: T): number;
	axis2d(action: T): Vector2;
	normalizedAxis2d(action: T): Vector2;
	clampedAxis2d(action: T): Vector2;
	moveAxis(action: T, value: number): void;
	moveAxis2d(action: T, value: Vector2): void;

	getInputsByDevices(action: T, devices: Array<Device>): Array<Input>;

	constructor(actions: Array<T>);
}

export type Device = "Gamepad" | "Keyboard" | "Mouse";

export type Signal = {
	connect(callback: () => void | thread): () => void;
};

export declare class InputState {
	clear(): void;
	constructor();
}

export type Rebind = {
	withDevices(devices: Array<Device>): Rebind;
	withoutInputs(inputs: Array<Input>): Rebind;
	setRetainInput(callback: (input: Button, sunk: boolean) => void): Rebind;
	start(): void;
};
