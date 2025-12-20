import { prisma } from "@/lib/db";

/**
 * Post Email Queue Service
 *
 * Handles queuing and processing of initiative post email notifications.
 * This is a transactional notification system (NOT marketing emails).
 */

export class PostEmailQueueService {
  /**
   * Enqueue emails for initiative participants when a post is published
   */
  static async enqueuePostEmails(params: {
    postId: string;
    initiativeId: string;
  }) {
    const { postId, initiativeId } = params;

    // Fetch all participants of the initiative who want email notifications
    const participants = await prisma.initiativeParticipant.findMany({
      where: {
        initiativeId,
        status: "registered",
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            emailVerified: true,
            isActive: true,
          },
        },
      },
    });

    // Filter for active, verified users
    const eligibleRecipients = participants.filter(
      (p) => p.user.isActive && p.user.emailVerified,
    );

    if (eligibleRecipients.length === 0) {
      console.log(`No eligible recipients for post ${postId}`);
      return 0;
    }

    // Create queue entries
    const queueEntries = eligibleRecipients.map((p) => ({
      userId: p.user.id,
      email: p.user.email,
      initiativeId,
      postId,
    }));

    // Bulk insert into queue
    await prisma.postEmailQueue.createMany({
      data: queueEntries,
      skipDuplicates: true,
    });

    console.log(
      `Enqueued ${queueEntries.length} emails for post ${postId} in initiative ${initiativeId}`,
    );

    return queueEntries.length;
  }

  /**
   * Fetch queued emails in batches for processing
   */
  static async fetchBatch(batchSize: number) {
    return await prisma.postEmailQueue.findMany({
      orderBy: {
        createdAt: "asc",
      },
      take: batchSize,
    });
  }

  /**
   * Delete queue entries after successful send
   */
  static async deleteQueueEntries(ids: string[]) {
    await prisma.postEmailQueue.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  /**
   * Get queue statistics (for monitoring)
   */
  static async getQueueStats() {
    const [total, oldest] = await Promise.all([
      prisma.postEmailQueue.count(),
      prisma.postEmailQueue.findFirst({
        orderBy: {
          createdAt: "asc",
        },
        select: {
          createdAt: true,
        },
      }),
    ]);

    return {
      queuedEmails: total,
      oldestQueuedAt: oldest?.createdAt,
    };
  }
}
