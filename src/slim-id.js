const crypto = require("crypto");

const alphabet = "0123456789abcdefghijkmpqrstuwxyz";
const mask = 0b11111000;
const regex = new RegExp("^[" + alphabet + "]{16}$");

// The main function
async function make() {
	let buf = await asyncRandom();
	return convert(buf);
}

// Nice validation
function validate(str) {
	return regex.test(str);
}

// Convert the `crypto.randomBytes()` function to a Promise
function asyncRandom() {
	return new Promise((resolve, reject) => {
		crypto.randomBytes(10, (err, buf) => {
			if (err) {
				reject(err);
			} else {
				resolve(buf);
			}
		});
	});
}

// Given a 10 byte array, convert it to 16 character string of base 32
function convert(buf) {
	let vals = new Array(16);

	for (let i = 0 ; i < 16 ; i++) {
		vals[i] = alphabet[process(buf, i)];
	}

	return vals.join("");
}

// Get the ith 5-bit sequence from the buffer bytes
function process(buf, i) {
	let pos = 5*i;
	let byte = 0 | (pos/8);
	let rel = pos%8;
	let off = rel-3;

	let val1 = shift(buf[byte] & (mask >> rel), off);

	let byte2 = byte+1;
	let off2 = 8-off;
	let val2 = (buf[byte2] & mask) >> off2;

	return val1 | val2;
}

// I wish this was doable in vanilla JS. Probably most CPUs don't support it though.
function shift(num, bits) {
	if (bits > 0) {
		return num << bits;
	} else if (bits < 0) {
		return num >> -bits;
	} else {
		return num;
	}
}

module.exports = {
	make,
	validate
}
