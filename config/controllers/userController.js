export const createUser = (userRepository) => async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    // Check if user exists
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create and save user
    const user = userRepository.create({ name, email, password, age, role: "user" });
    await userRepository.save(user);

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logoutUser = (userRepository) => async (req, res) => {
  try {
    // Assuming middleware puts user info in req.user
    const userId = req.user.id; 
    
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Clear refresh token in database
    user.refreshToken = null;
    await userRepository.save(user);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};