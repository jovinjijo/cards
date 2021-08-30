import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { getImageUrl } from "../../util/Util";

export interface ImageDialogProps {
  open: boolean;
  type: string;
  onClose: () => void;
}

export default function ImageDialog(props: ImageDialogProps) {
  const { onClose, type, open } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <img width="100%" src={getImageUrl(type, 768, 768)} alt={type} />
    </Dialog>
  );
}
