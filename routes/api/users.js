const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const User = require('../../models/User');

// @route    GET api/users
// @desc     Retrieve All Users
// @access   Public
router.get('/', async (req, res) => {
	try {
		const users = await User.find().sort({ date: 1 }); // Most recent first
		res.json(users);
	} catch (err) {
		console.log(err);
	}
});

// @route    GET api/users
// @desc     Infinite Scroll
// @access   Public
// http://127.0.0.1:5000/api/users/scroll?offset=0&limit=2
router.get('/scroll?:offset?:limit', async (req, res) => {
	try {
		const offset = parseInt(req.query.offset);
		const limit = parseInt(req.query.limit);

		const results = {};
		results.users = await User.find()
			.sort({ date: -1 })
			.limit(limit)
			.skip(offset)
			.exec();

		if (offset >= limit) {
			results.prev = {
				offset: offset - limit,
				limit: limit,
			};
		}
		if (offset < (await User.countDocuments().exec()) - limit) {
			results.next = {
				offset: offset + limit,
				limit: limit,
			};
		}

		res.json(results);
	} catch (err) {
		console.log(err);
	}
});

// @route    GET api/users
// @desc     Pagination
// @access   Public
// http://127.0.0.1:5000/api/users/pagination?page=0&limit=2
router.get('/pagination?:page?:limit', async (req, res) => {
	try {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);
		const startIndex = (page - 1) * limit;
		const skipIndex = page * limit;

		const results = {};
		results.users = await User.find()
			.sort({ date: -1 })
			.limit(limit)
			.skip(skipIndex)
			.exec();

		if (startIndex >= 0) {
			results.prev = {
				page: page - 1,
				limit: limit,
			};
		}
		if (skipIndex < (await User.countDocuments().exec())) {
			results.next = {
				page: page + 1,
				limit: limit,
			};
		}

		res.json(results);
	} catch (err) {
		console.log(err);
	}
});

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
	'/',
	check('name', 'Name is required').notEmpty(),
	check('email', 'Please include a valid email').isEmail(),
	check(
		'password',
		'Please enter a password with 6 or more characters'
	).isLength({ min: 6 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}

			const avatar = normalize(
				gravatar.url(email, {
					s: '200',
					r: 'pg',
					d: 'mm',
				}),
				{ forceHttps: true }
			);

			user = new User({
				name,
				email,
				avatar,
				password,
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: '5 days' },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
