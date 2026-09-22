import data from '../../content/balance.json';
import type { PageLoad } from './$types';

export type TxStatus = 'PAID' | 'REFUNDED' | 'CANCELLED';
export interface Tx {
	date: string;
	title: string;
	amount: number;
	channel: 'wechat' | 'alipay';
	status: TxStatus;
	note?: string;
}

export const load: PageLoad = () => {
	const transactions = ([...data.transactions] as Tx[])
		.sort((a, b) => (a.date < b.date ? 1 : -1))
		.slice(0, 10);
	return {
		title: 'Balance',
		description: '账户余额与最近消费。',
		updated: data.updated,
		accounts: data.accounts,
		transactions
	};
};
