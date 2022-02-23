import { GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';
import { Button, Htag, P, Rating, Tag } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';


function Home({ menu }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(4);


	return (
		<>
			<Htag tag='h1'>Заголовок</Htag>
			<Button appearance='primary' arrow='right' className='aasdsa'>Кнопка</Button>
			<Button appearance='ghost' arrow='right'>Кнопка</Button>
			<P>Какой-то текст у параграфа</P>
			<Tag size='s'>Мал</Tag>
			<Tag size='m' color='red'>Red</Tag>
			<Tag size='s' color='green'>Green</Tag>
			<Tag size='s' color='primary'>Primary</Tag>
			<Rating rating={rating} isEditable={true} setRating={setRating} />
			<ul>
				{menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
			</ul>
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
		firstCategory
	});

	return {
		props: {
			menu,
			firstCategory
		}
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}