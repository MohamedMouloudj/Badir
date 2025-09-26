"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  listApprovedMembersAction,
  kickMemberAction,
} from "@/actions/participation";
import { ParticipantRole, ParticipationStatus } from "@prisma/client";
import { Loader2 } from "lucide-react";

type Member = {
  id: string;
  user: { id: string; name: string | null };
  participantRole: ParticipantRole;
  status: ParticipationStatus;
};

export default function MembersPanel({
  initiativeId,
}: {
  initiativeId: string;
}) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await listApprovedMembersAction(initiativeId);
    setMembers((res as any)?.members || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [initiativeId]);

  const kick = async (id: string) => {
    await kickMemberAction(id, initiativeId);
    load();
  };

  return loading ? (
    <div className="flex-center justify-center gap-2" dir="rtl">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>جاري التحميل...</span>
    </div>
  ) : members.length === 0 ? (
    <div className="flex-center justify-center gap-2" dir="rtl">
      <p className="text-neutrals-500">لا يوجد أعضاء</p>
    </div>
  ) : (
    <div className="space-y-3">
      {members.map((m) => (
        <div
          key={m.id}
          className="flex items-center justify-between p-3 border border-neutrals-300 rounded-lg bg-white"
        >
          <div>
            <p className="font-medium">{m.user.name}</p>
            <p className="text-sm text-neutrals-500">{m.participantRole}</p>
          </div>
          {m.participantRole !== "manager" && (
            <Button variant="destructive" onClick={() => kick(m.id)}>
              طرد
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
