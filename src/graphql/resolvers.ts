import User from '../models/user';
import bcrypt from 'bcrypt';
import { fetchProductsFromVTEX } from '../services/productService';
import { generateToken, verifyToken } from '../utils/auth';

export const resolvers = {
  Query: {
    // Obtener usuario por ID
    async getUser(_: any, { id }: { id: string }) {
      return await User.findById(id);
    },

    // Login con retorno de token
    async login(_: any, { username, password }: { username: string; password: string }) {
      const user = await User.findOne({ username });
      if (!user) throw new Error('Usuario no encontrado');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Contraseña incorrecta');

      const token = generateToken({ id: user.id });

      return {
        token,
        user
      };
    },

    // Obtener productos desde VTEX
    async getVTEXProducts() {
      const rawProducts: any[] = await fetchProductsFromVTEX();

      return rawProducts.map((p: any) => ({
        productId: p.productId,
        productName: p.productName,
        brand: p.brand,
        items: p.items.map((item: any) => ({
          itemId: item.itemId,
          name: item.name,
          images: item.images.map((img: any) => ({
            imageUrl: img.imageUrl,
            imageText: img.imageText
          }))
        }))
      }));
    }
  },

  Mutation: {
    // Registro de usuario
    async registerUser(
      _: any,
      { username, password, name, lastName, email, userType }: any
    ) {
      const existing = await User.findOne({ username });
      if (existing) throw new Error('El usuario ya existe');

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        password: hashedPassword,
        name,
        lastName,
        email,
        userType
      });

      return await user.save();
    },

    // Actualización protegida
    async updateUser(_: any, { id, name, lastName, email }: any, context: any) {
      if (!context.user) throw new Error('No autorizado');
      return await User.findByIdAndUpdate(id, { name, lastName, email }, { new: true });
    },

    // Logout simple
    async logout(_: any, __: any, context: any) {
      if (!context.user) {
        return "No hay ninguna sesión activa para cerrar";
      }

      return `Sesión del usuario con ID ${context.user.id} cerrada correctamente`;
    }

  }
};
