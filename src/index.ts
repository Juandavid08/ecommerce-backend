import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { verifyToken } from './utils/auth';

dotenv.config();

async function startServer() {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log('✅ MongoDB conectado');

  const app = express();
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  app.use(
    '/graphql',
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.replace('Bearer ', '');

        if (!token) return { user: null };

        try {
          const decoded = verifyToken(token);
          return { user: decoded };
        } catch {
          return { user: null };
        }
      }
    })
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor listo en http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) =>
  console.error('❌ Error al iniciar el servidor:', err)
);
