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
      <Loader2 className="w-4 h-4 animate-spin" />
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
          className="flex items-center justify-between p-3 border border-neutrals-300 rounded-lg bg-white"
        >
          <div>
            <p className="font-medium">{r.user.name}</p>
            <p className="text-sm text-neutrals-500">{r.participantRole}</p>
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
