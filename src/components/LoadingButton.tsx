import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";

interface Props extends ButtonProps {
  loading: boolean;
}

const LoadingButton = ({ loading, className, disabled, ...props }: Props) => {
  return (
    <Button
      {...props}
      disabled={loading || disabled}
      className={cn("flex items-center gap-2", className)}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}

      {props.children}
    </Button>
  );
};

export default LoadingButton;
