/**
 * MailerLite Service
 * @module services/mailerlite
 */

interface MailerLiteSubscriber {
  email: string;
  fields?: {
    name?: string;
    last_name?: string;
  };
  groups?: string[];
  status?: "active" | "unsubscribed";
  // Custom fields for tracking
  userId?: string;
  source?: string;
}

interface MailerLiteResponse {
  data?: {
    id: string;
    email: string;
    status: string;
  };
  error?: {
    message: string;
  };
}

/**
 * MailerLite Service Class
 *
 * Handles all interactions with MailerLite API for newsletter management.
 * This is the ONLY place where MailerLite API calls should be made.

 */
export class MailerLiteService {
  private static readonly BASE_URL = "https://connect.mailerlite.com/api";
  private static readonly API_KEY = process.env.MAILERLITE_API_KEY;

  /**
   * Get headers for MailerLite API requests
   */
  private static getHeaders() {
    if (!this.API_KEY) {
      throw new Error("MAILERLITE_API_KEY is not configured");
    }

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.API_KEY}`,
      Accept: "application/json",
    };
  }

  /**
   * Subscribe a user to the newsletter
   *
   * @param email - User's email from database/session
   * @param userId - Internal user ID for tracking
   * @param firstName - User's first name (optional)
   * @param lastName - User's last name (optional)
   * @returns MailerLite subscriber ID or null on failure
   */
  static async subscribe(
    email: string,
    userId: string,
    firstName?: string,
    lastName?: string,
  ): Promise<string | null> {
    try {
      const payload: MailerLiteSubscriber = {
        email,
        fields: {
          name: firstName,
          last_name: lastName,
        },
        status: "active",
      };

      const response = await fetch(`${this.BASE_URL}/subscribers`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });

      const data: MailerLiteResponse = await response.json();

      if (!response.ok) {
        // Check if already subscribed (not an error)
        if (response.status === 422) {
          console.log(
            `User ${userId} already subscribed to MailerLite:`,
            email,
          );
          return await this.getSubscriberId(email);
        }

        console.error("MailerLite subscription error:", data.error);
        return null;
      }

      return data.data?.id || null;
    } catch (error) {
      console.error("Failed to subscribe to MailerLite:", error);
      return null;
    }
  }

  /**
   * Unsubscribe a user from the newsletter
   *
   * @param email - User's email from database/session
   * @param userId - Internal user ID for logging
   * @returns Success status
   */
  static async unsubscribe(email: string, userId: string): Promise<boolean> {
    try {
      const subscriberId = await this.getSubscriberId(email);

      if (!subscriberId) {
        console.log(`User ${userId} not found in MailerLite: ${email}`);
        return true; // Already unsubscribed
      }

      // Update subscriber status to unsubscribed
      const response = await fetch(
        `${this.BASE_URL}/subscribers/${subscriberId}`,
        {
          method: "PUT",
          headers: this.getHeaders(),
          body: JSON.stringify({ status: "unsubscribed" }),
        },
      );

      if (!response.ok) {
        const data = await response.json();
        console.error("MailerLite unsubscribe error:", data.error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Failed to unsubscribe from MailerLite:", error);
      return false;
    }
  }

  /**
   * Get MailerLite subscriber ID by email
   *
   * PRIVATE helper method
   */
  private static async getSubscriberId(email: string): Promise<string | null> {
    try {
      const response = await fetch(`${this.BASE_URL}/subscribers/${email}`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      if (data.data && data.data.length > 0) {
        return data.data[0].id;
      }

      return null;
    } catch (error) {
      console.error("Failed to get MailerLite subscriber ID:", error);
      return null;
    }
  }

  /**
   * Check if MailerLite is properly configured
   */
  static isConfigured(): boolean {
    return !!this.API_KEY;
  }
}
