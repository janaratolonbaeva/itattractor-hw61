import React, {useState, useEffect} from 'react';

import Country from "../../components/Country/Country";
import ListCountry from "../../components/ListCountry/ListCountry";
import axios from "axios";

const Countries = () => {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState({});

	const getCountries = async () => {
		const randomPromise = Promise.resolve(200);
		try {
				await axios.all([
				await axios.get('/all'),
				await randomPromise
			])
				.then(response => {
					const listCountries = response[0].data.map(country => {
						return (
							country
						)
					});
					setCountries(listCountries);
				})
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getCountries();
	}, []);


	const printInfo = e => {
		const text = e.target.textContent;
		// console.log(text)
		countries.forEach(item => {
			if (text === item.name) {
					setCountry({
						name: item.name,
						capital: item.capital,
						population: item.population,
						region: item.region,
						flag: item.flag,
						borders: item.borders,
						cioc: item.cioc
					});
			}
		})
	};

	console.log(country.borders);

	return (
		<>
			<div className="container mt-3">
				<div className="row align-items-start">
					<div className="col-12 col-lg-4">
						<div className="ListCountries">
							<ul>
								{countries.map((country, index) => {
									return (
										<ListCountry key={index} country={country.name} printInfo={printInfo}/>
									)
								})}
							</ul>
						</div>
					</div>
					<div className="col-12 col-lg-8">
						<Country
							title={country.name}
							capital={country.capital}
							population={country.population}
							image={country.flag}
							cioc={country.cioc}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Countries;