export type SubscriberPayload = {
  subscriber: {
    id: string;
    email: string;
    status: string;
    fields?: {
      name?: string;
      last_name?: string;
    };
  };
};
