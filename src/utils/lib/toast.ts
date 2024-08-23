import { toast } from "sonner";

type Variant = "success" | "error" | "warning";

export const mainToast = (messages: string, variant: Variant) => {
  let bgcolor = "toast-success";

  switch (variant) {
    case "success":
      bgcolor = "toast-success";
      break;

    case "error":
      bgcolor = "toast-error";

      break;

    case "warning":
      bgcolor = "toast-warning";

      break;

    default:
      break;
  }

  return toast(messages, {
    classNames: {
      toast: bgcolor,
    },
  });
};
