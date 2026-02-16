import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { Dialog, DialogContent,DialogTitle } from "@/components/ui/dialog";


type AuthFormProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  submitLabel: string;
  footerText: string;
  footerActionLabel: string;
  onFooterAction: () => void;
  onSubmit: (data: { email: string; password: string }) => void;
  isPending: boolean;
};

export default function AuthForm({
  open,
  onOpenChange,
  title,
  submitLabel,
  footerText,
  footerActionLabel,
  onFooterAction,
  onSubmit,
  isPending,
}: AuthFormProps) {
  const [data, setData] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex w-[300px] md:w-[400px] flex-col">
        <DialogTitle>{title}</DialogTitle>

        <form onSubmit={handleSubmit}>
          <FieldSet className="space-y-4 mt-4">
            <div className="flex justify-center mb-4">
              <img src="/image/ScarceLogo.PNG" className="w-20 rounded-md" />
            </div>

            <FieldGroup>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  placeholder="ScarcePH@gmail.com"
                  onChange={(e) =>
                    setData({ ...data, email: e.target.value })
                  }
                />
              </Field>

              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="************"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <div className="flex flex-col mt-10">
            <Button
              type="submit"
              size="lg"
              disabled={isPending || !data.email || !data.password}
            >
              {isPending ? <Spinner /> : submitLabel}
            </Button>
          </div>
        </form>

        <div className="flex justify-center items-center gap-1 text-sm">
          <span>{footerText}</span>
          <Button variant="link" size="sm" onClick={onFooterAction}>
            {footerActionLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
