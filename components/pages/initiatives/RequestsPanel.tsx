"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  listPendingRequestsAction,
  approveParticipationAction,
  rejectParticipationAction,
} from "@/actions/participation";
import { ParticipantRole, ParticipationStatus } from "@prisma/client";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type Request = {
  id: string;
  user: { id: string; name: string | null };
  participantRole: Omit<ParticipantRole, "manager">;
  status: Omit<ParticipationStatus, "approved" | "rejected" | "cancelled">;
};

export default function RequestsPanel({
  initiativeId,
}: {
  initiativeId: string;
}) {
  const [items, setItems] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await listPendingRequestsAction(initiativeId);
    setItems((res as any)?.requests || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [initiativeId]);

  const approve = async (id: string) => {
    await approveParticipationAction(id, initiativeId);
    load();
  };
  const reject = async (id: string) => {
    await rejectParticipationAction(id, initiativeId);
    load();
  };

  return loading ? (
    <div className="flex-center justify-center gap-2" dir="rtl">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>جاري التحميل...</span>
    </div>
  ) : items.length === 0 ? (
    <div className="flex-center justify-center gap-2" dir="rtl">
      <p className="text-neutrals-500">لا توجد طلبات</p>
    </div>
  ) : (
    <div className="space-y-3">
      {items.map((r) => (
        <div
          key={r.id}
          className="border-neutrals-300 flex items-center justify-between rounded-lg border bg-white p-3"
        >
          <div>
            <Link href={`/profile/${r.user.id}`} className="hover:underline">
              <p className="font-medium">{r.user.name}</p>
            </Link>
            <p className="text-neutrals-500 text-sm">{r.participantRole}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => approve(r.id)}>
              قبول
            </Button>
            <Button variant="destructive" onClick={() => reject(r.id)}>
              رفض
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
