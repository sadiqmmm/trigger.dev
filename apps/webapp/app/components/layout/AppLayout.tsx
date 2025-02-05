import classNames from "classnames";
import { ImpersonationBanner } from "../ImpersonationBanner";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-[3rem_auto_2rem] w-full h-full">
      {children}
    </div>
    // <div className="grid grid-rows-[2rem_3rem_auto_2rem] w-full h-full">
    //   <ImpersonationBanner />
    //   {children}
    // </div>
  );
}

export function AppBody({
  children,
  className = "bg-slate-850",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={classNames("overflow-y-auto", className)}>{children}</div>
  );
}
