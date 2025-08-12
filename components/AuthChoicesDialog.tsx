import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogHeader } from "./ui/dialog";
import Link from "next/link";
import { ArrowUpLeft, Building, User } from "lucide-react";
import { authRoutes } from "@/data/routes";

export default function AuthChoicesDialog({ close }: { close: () => void }) {
  return (
    <DialogContent
      dir="rtl"
      className="px-6 md:px-12 min-w-2/3 py-10 bg-neutrals-100 space-y-6"
    >
      <DialogHeader className="w-full">
        <DialogTitle className="text-primary-sm md:text-primary-lg font-bold text-neutrals-700 text-center block w-full">
          سجل كـــ
        </DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 mt-4 w-full items-center justify-items-center"
        dir="ltr"
      >
        <Link
          href={authRoutes.signup.signupIndividual.url}
          className="flex-center-column items-center size-max"
          dir="rtl"
          onClick={close}
        >
          <div className="p-3 md:p-4 bg-primary-500 rounded-full">
            <User
              className="w-12 md:w-16 h-12 md:h-16 text-neutrals-100"
              strokeWidth={1}
            />
          </div>
          <div className="flex-center items-end gap-2">
            <span className="text-secondary-sm md:text-secondary-lg text-neutrals-700 font-bold underline">
              {authRoutes.signup.signupIndividual.label}
            </span>
            <ArrowUpLeft className="w-5 md:w-6 h-5 md:h-6" />
          </div>
        </Link>
        <Link
          href={authRoutes.signup.signupOrganization.url}
          className="flex-center-column items-center size-max"
          dir="rtl"
          onClick={close}
        >
          <div className="p-3 md:p-4 bg-primary-500 rounded-full">
            <Building
              className="w-12 md:w-16 h-12 md:h-16 text-neutrals-100"
              strokeWidth={1}
            />
          </div>
          <div className="flex-center items-end gap-2">
            <span className="text-secondary-sm md:text-secondary-lg text-neutrals-700 font-bold underline">
              {authRoutes.signup.signupOrganization.label}
            </span>
            <ArrowUpLeft className="w-5 md:w-6 h-5 md:h-6" />
          </div>
        </Link>
      </div>
    </DialogContent>
  );
}
