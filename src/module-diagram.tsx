import React from 'react';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';

const ParentModuleNodeBoundary = (props: any) => {
	const { inputs } = props;
	return (
		<div style={{ height: "20em", width: "40em", border: '0.5em solid #48965d', borderRadius: '0.5em' }}>
			<div style={{ padding: '0.75em', color: 'grey' }}>
				<span>{props.content}</span>
			</div>
		</div>
	);
};

const ParentModuleNodeInput = ({ content, inputs, outputs }:any) => {
	return (
		<div style={{ height: "3em", width: "9em", backgroundColor: 'white', border: '0.125em solid #6b6b6b', borderRadius: '0.5em' }}>
			<div className='d-flex justify-content-center' style={{ height: '100%', textAlign:'center', color: 'grey' }}>
				<div className="d-flex align-self-center">{content}</div>
			</div>
			<div className="d-flex justify-content-end" style={{marginTop: '-1.5em'}}>
				{inputs.map((port:any) => React.cloneElement(port, {style: { width: '0.5em', height: '0.5em'}}))}
				{outputs.map((port:any) => React.cloneElement(port, {style: { width: '0.5em', height: '0.5em'}}))}
			</div>
		</div>
	);
};

const ParentModuleNodeOutput = ({ content, inputs, outputs }:any) => {
	return (
		<div style={{ height: "3em", width: "9em", backgroundColor: 'white', border: '0.125em solid #6b6b6b', borderRadius: '0.5em' }}>
			<div className='d-flex justify-content-center' style={{ height: '100%', textAlign:'center', color: 'grey' }}>
				<div className="d-flex align-self-center">{content}</div>
			</div>
			<div className="d-flex justify-content-start" style={{marginTop: '-1.5em'}}>
				{inputs.map((port:any) => React.cloneElement(port, {style: { width: '0.5em', height: '0.5em'}}))}
				{outputs.map((port:any) => React.cloneElement(port, {style: { width: '0.5em', height: '0.5em'}}))}
			</div>
		</div>
	);
};

const NestedModuleNodeBoundary = ({ content, inputs, outputs }:any) => {
	return (
		<div style={{ height: "4em", width: "15em", border: '0.25em dashed #309fff', borderRadius: '0.5em' }}>
			<div className='d-flex justify-content-center' style={{ height: '100%', textAlign:'center', color: 'grey' }}>
				<div className="d-flex align-self-center">{content}</div>
			</div>
			<div className="d-flex justify-content-between" style={{marginTop: '-2em'}}>
				{inputs.map((port:any) => React.cloneElement(port, {style: { width: '0.5em', height: '0.5em'}}))}
				{outputs.map((port:any) => React.cloneElement(port, {style: { width: '0.5em', height: '0.5em'}}))}
			</div>
		</div>
	);
};

const parentModuleXPos = 55
const parentModuleYPos = 15

const parentModuleInputXOffset = ((0)-(144*0.33))	// -50
const parentModuleInputYOffset = ((320/2)-(48/2))	// 120

const parentModuleOutputXOffset = ((640)-(144*0.66))		// 546
const parentModuleOutputYOffset = ((320/2)-(48/2))	// 120

// (half width of parent) subtract (half the width of nested)
// (half height of parent) subtract (half the height of nested)
const nestedModuleXOffset = ((640/2)-(240/2))
const nestedModuleYOffset = ((320/2)-(64/2))


// the diagram model
const initialSchema = createSchema({
	nodes: [
		{ 
			id: 'parent-module',
			content: 'Infrastructure Module',
			render: ParentModuleNodeBoundary,
			coordinates: [
				parentModuleXPos,
				parentModuleYPos
			],
		},
		{ 
			id: 'parent-module-input',
			content: 'Module Input',
			render: ParentModuleNodeInput,
			outputs: [
				{ id: 'port-1', alignment: 'right' },
			],
			coordinates: [
				(parentModuleXPos+parentModuleInputXOffset),
				(parentModuleYPos+parentModuleInputYOffset)
			],
		},
		{ 
			id: 'parent-module-output',
			content: 'Module Output',
			render: ParentModuleNodeOutput,
			inputs: [
				{ id: 'port-7', alignment: 'left' },
			],
			coordinates: [
				(parentModuleXPos+parentModuleOutputXOffset),
				(parentModuleYPos+parentModuleOutputYOffset)
			],
		},
		{
			id: 'nested-module-1',
			content: 'Resource Module',
			render: NestedModuleNodeBoundary,
			inputs: [
				{ id: 'port-3', alignment: 'left' },
			],
			outputs: [
				{ id: 'port-5', alignment: 'right' },
			],
			coordinates: [
				(parentModuleXPos+nestedModuleXOffset),
				(parentModuleYPos+nestedModuleYOffset)
			],
		}
	],
	links: [
		{ input: 'port-1',  output: 'port-3' },
		{ input: 'port-5',  output: 'port-7' }
	]
});


export const ModuleDiagram = () => {
	// create diagrams schema
	const [schema, { onChange }] = useSchema(initialSchema);

	return (
		<div style={{ height: '22.5rem' }}>
			<Diagram schema={schema} onChange={onChange} />
		</div>
	);
};