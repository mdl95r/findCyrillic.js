const fs = require("fs");
const glob = require("glob");
const chalk = require('chalk');

let counter = 0;

const opts = {
	dir: 'dir',
	verticalResult: true,
}

if (!opts.dir || !fs.existsSync(opts.dir)) {
	console.log('Введена несуществующая или не задана директория!');
} else {
	const getDirectories = function (dir, callback) {
		glob(`${opts.dir}/**/*`, callback);
	};
	getDirectories(opts.dir, function (err, files) {
		if (err) {
			console.log('Error', err);
		} else {
			for (let i = 0; i < files.length; i++) {
				const result = [];
				const symbols = files[i].split('');
				for (let j = 0; j < symbols.length; j++) {
					const element = symbols[j];
					if (/[а-яА-ЯЁё]/.test(element)) {
						const matchingIndexes = [];
						symbols.forEach((currentItem, index) => {
							currentItem === element ? matchingIndexes.push(index) : null
						})
						for (let j = matchingIndexes.length - 1; j >= 0; j--) {
							counter++
							symbols.splice(matchingIndexes[j], 1);
							const paintSymbol = chalk.redBright(element);
							const arr = [...files[i].split('').slice(0, matchingIndexes[j]), paintSymbol, ...files[i].split('').slice(matchingIndexes[j] + 1)].join('');
							result.push(arr);
						}
					}
				}
				if (result.length) {
					console.log(result.reverse().join(opts.verticalResult ? ' \n' : ', '));
				}
			}
		}
		console.log(`Найдено ${counter} кирилических символ(ов)а`);
	});
}