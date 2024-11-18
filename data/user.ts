import { verifySession } from '@/actions/sessions';
import db from '@/db';
import { user } from '@/db/schema';
import { User } from '@/types/user';
import { eq } from 'drizzle-orm';

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });
    if (!existingUser) {
      return null;
    }
    return existingUser;
  } catch (error) {
    console.error('error', error);
    throw new Error('error at getUserByEmail');
  }
};

export const getConversationByUser = async () => {
  const session = await verifySession();
  const response = await db.query.user.findFirst({
    where: eq(user.id, session.id),
    with: {
      conversation: {
        orderBy: (conversation, { desc }) => [desc(conversation.updatedAt)],
      },
    },
  });
  return response?.conversation || [];
};
