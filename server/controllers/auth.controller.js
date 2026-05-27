import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./../models/user.js";

export const register = async (req, res) => {
	const { name, username, email, password } = req.body;
	if (!email || !password || !name || !username)
		return res.status(400).json({ message: "All fields are required" });
	const user = await User.findOne({ email });
	if (user) return res.status(400).json({ message: "User already exists" });
	const hashedPass = await bcrypt.hash(password, 10);
	const newUser = new User({
		name,
		username,
		email,
		password: hashedPass,
	});
	await newUser.save();

	const accessToken = jwt.sign(
		{
			id: newUser._id,
			email: newUser.email,
			name: newUser.name,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: "1d" },
	);

	const refreshToken = jwt.sign(
		{
			id: newUser._id,
			email: newUser.email,
			name: newUser.name,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: "1d" },
	);

	res.cookie("jwt", refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: "None",
		maxAge: 24 * 60 * 60 * 1000,
	});

	res.json({ accessToken });
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res.status(400).json({ message: "Email and password are required" });
	const user = await User.findOne({ email });
	if (!user) return res.status(400).json({ message: "User not found" });
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid)
		return res.status(400).json({ message: "Invalid password" });

	const accessToken = jwt.sign(
		{
			id: user._id,
			email: user.email,
			name: user.name,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: "1d" },
	);

	const refreshToken = jwt.sign(
		{
			id: user._id,
			email: user.email,
			name: user.name,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: "1d" },
	);

	res.cookie("jwt", refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: "None",
		maxAge: 24 * 60 * 60 * 1000,
	});

	return res.json({ accessToken });
};

export const refresh = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

	const refreshToken = cookies.jwt;

	try {
		const decoded = jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
		);
		const foundUser = await User.findOne({ email: decoded.email });
		if (!foundUser)
			return res.status(401).json({ message: "Unauthorized" });

		const accessToken = jwt.sign(
			{
				id: foundUser._id,
				email: foundUser.email,
				name: foundUser.name,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "1d" },
		);

		return res.json({ accessToken });
	} catch (err) {
		return res.status(403).json({ message: "Forbidden" });
	}
};

export const logout = async (req, res) => {
	if (!req.cookies?.jwt) return res.status(204).end();
	res.clearCookie("jwt", {
		httpOnly: true,
		secure: true,
		sameSite: "None",
	});
	return res.json({ message: "Logged out successfully" });
};

export const me = async (req, res) => {
	const user = await User.findById(req.user.id).select("-password");
	if (!user) return res.status(404).json({ message: "User not found" });
	return res.json(user);
};

export const search = async (req, res) => {
	const { query } = req.query;
	if (!query) {
		return res.json([]);
	}
	try {
		const users = await User.find({
			$or: [
				{ name: { $regex: query, $options: "i" } },
				{ username: { $regex: query, $options: "i" } },
				{ email: { $regex: query, $options: "i" } },
			],
			_id: { $ne: req.user.id },
		})
			.select("name username email _id")
			.limit(10);
		return res.json(users);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};
