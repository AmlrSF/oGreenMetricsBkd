class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  // Get all users
  async getUsers(req, reply) {
    try {
      const users = await this.userService.getAllUsers();
      reply.send(users);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  // Get single user
  async getUser(req, reply) {
    const { id } = req.params;
    try {
      const user = await this.userService.getUserById(id);
      reply.send(user);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  }

  // Register a new user and return a JWT token
  async register(req, reply) {
    try {
      const { prenom, nom, email, mot_de_passe, role } = req.body;
      const user = await this.userService.registerUser(
        prenom,
        nom,
        email,
        mot_de_passe,
        role
      );

      reply.code(201).send({ user });
    } catch (error) {
      reply.code(400).send({ error: error.message });
    }
  }

  // Log in a user and return a JWT token
  async login(req, reply) {
    try {
      const { email, mot_de_passe } = req.body;
      const { user, token } = await this.userService.loginUser(
        email,
        mot_de_passe
      );

      reply.setCookie("auth_token", token, {
        httpOnly: true, // Prevents client-side JS access
        secure: process.env.NODE_ENV === "production", // Set to true in production
        sameSite: "Strict", // Prevents CSRF attacks
        path: "/", // Cookie will be available across the entire site
        maxAge: 3600, // Cookie expiration time (1 hour)
      });
      // Send response
      reply.code(200).send({ user });
    } catch (error) {
      reply.code(200).send({ error: error.message });
    }
  }

  // Update user details
  async update(req, reply) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const user = await this.userService.updateUser(id, updateData);
      reply.send(user);
    } catch (error) {
      reply.code(400).send({ error: error.message });
    }
  }

  // Delete a user by id
  async delete(req, reply) {
    try {
      const { id } = req.params;
      const success = await this.userService.deleteUser(id);
      reply.send({ success });
    } catch (error) {
      reply.code(400).send({ error: error.message });
    }
  }
}

module.exports = UserController;
