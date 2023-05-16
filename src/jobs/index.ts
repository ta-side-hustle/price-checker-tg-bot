import type { JobOptions } from 'bree';

const jobs: JobOptions[] = [
	{
		name: 'updatePrices',
		interval: 'every 1 min',
	},
	{
		name: 'comparePrices',
		interval: 'every 1 min',
	},
];

export default jobs;
