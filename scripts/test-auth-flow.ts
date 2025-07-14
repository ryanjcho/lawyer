import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const prisma = new PrismaClient();

// Simulate the auth options
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("이메일과 비밀번호를 입력해주세요.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image ?? undefined,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

async function testAuthFlow() {
  try {
    console.log('Testing complete authentication flow...');
    
    const email = 'admin@lawscan.com';
    const password = 'admin123';
    
    // Test the authorize function
    const credentialsProvider = authOptions.providers[0] as any;
    const authorize = credentialsProvider.authorize;
    
    console.log('Testing authorize function...');
    const user = await authorize({ email, password });
    
    if (user) {
      console.log('✅ Authorization successful:');
      console.log('  User ID:', user.id);
      console.log('  Email:', user.email);
      console.log('  Name:', user.name);
      console.log('  Role:', user.role);
      
      // Test JWT callback
      console.log('\nTesting JWT callback...');
      const token = await authOptions.callbacks?.jwt?.({ token: {}, user } as any);
      console.log('✅ JWT token created:', token);
      
      // Test session callback
      console.log('\nTesting session callback...');
      const session = await authOptions.callbacks?.session?.({ 
        session: { user: { email: user.email, name: user.name } }, 
        token 
      } as any);
      console.log('✅ Session created:', session);
      
    } else {
      console.log('❌ Authorization failed');
    }
    
  } catch (error) {
    console.error('❌ Error in auth flow:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuthFlow(); 