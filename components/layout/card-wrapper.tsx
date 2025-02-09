"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BackButton } from "./back-button";
import { HeaderText } from "./header-text";

interface CardWrapperProps {
  children?: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  socialsLabel?: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="w-full max-w-[500px] bg-transparent border-none mx-auto">
      <CardHeader>
        <HeaderText label={headerLabel} />
      </CardHeader>
      <BackButton href={backButtonHref} label={backButtonLabel} />
      <CardContent>{children}</CardContent>
    </Card>
  );
};
