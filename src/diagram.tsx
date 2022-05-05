import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';

const ServiceModuleNode = (props: any) => {
	const { inputs } = props;
	return (
		<div style={{ background: '#fcb103', borderRadius: '5px' }}>
			<div style={{ padding: '10px', color: 'white' }}>
				<span style={{display: "block"}}>Service</span>
				<span>Module</span>
			</div>
		</div>
	);
};

const InfrastructureModuleNode = (props: any) => {
	const { inputs } = props;
	return (
		<div style={{ background: '#48965d', borderRadius: '5px' }}>
			<div style={{ padding: '10px', color: 'white' }}>
				<span style={{display: "block"}}>Infrastructure</span>
				<span>Module</span>
			</div>
		</div>
	);
};

const ResourceModuleNode = (props: any) => {
	const { inputs } = props;
	return (
		<div style={{ background: '#309fff', borderRadius: '5px' }}>
			<div style={{ padding: '10px', color: 'white' }}>
				<span style={{display: "block"}}>Resource</span>
				<span>Module</span>
			</div>
		</div>
	);
};

const RawResourceNode = (props: any) => {
	const { inputs } = props;
	return (
		<div style={{ background: '#858585', borderRadius: '5px' }}>
			<div style={{ padding: '10px', color: 'white' }}>
				<span style={{display: "block"}}>Raw</span>
				<span>Resource</span>
			</div>
		</div>
	);
};

// the diagram model
const initialSchema = createSchema({
	nodes: [
		{ id: 'svc-mod', content: 'Service Module', render: ServiceModuleNode, coordinates: [252, 68], }, // style="left: 252px; top: 68px; cursor: move;"
		{ id: 'inf-mod', content: 'Infrastructure Module', render: InfrastructureModuleNode, coordinates: [115, 134], }, // left: 115px; top: 134px; cursor: move;
		{ id: 'res-mod', content: 'Resource Module', render: ResourceModuleNode, coordinates: [245, 218], }, // left: 245px; top: 218px; cursor: move;
		{ id: 'raw-res', content: 'Raw Resource', render: RawResourceNode, coordinates: [143, 283], }, //left: 143px; top: 283px; cursor: move;
	],
	links: [
		{ input: 'raw-res', output: 'res-mod' },
		{ input: 'raw-res', output: 'inf-mod' },

		{ input: 'res-mod', output: 'res-mod' },
		{ input: 'res-mod', output: 'inf-mod' },
		{ input: 'res-mod', output: 'svc-mod' },

		{ input: 'inf-mod', output: 'inf-mod' },
		{ input: 'inf-mod', output: 'svc-mod' },
	]
});


export const UncontrolledDiagram = () => {
	// create diagrams schema
	const [schema, { onChange }] = useSchema(initialSchema);

	return (
		<div style={{ height: '22.5rem' }}>
			<Diagram schema={schema} onChange={onChange} />
		</div>
	);
};