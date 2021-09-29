import React, { forwardRef, useEffect } from "react";
import { Textarea } from "@chakra-ui/react";

// Ref - https://css-tricks.com/auto-growing-inputs-textareas/
export const ResizableTextArea = forwardRef((props, ref) => {
  const adjustMe = (event) => {
    const textarea = document.querySelector(`#${props.id}`);
    if (textarea) {
      const numberOfLineBreaks = (textarea.value.match(/\n/g) || []).length;
      // min-height + lines x line-height + padding + border
      const newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;

      textarea.style.height = newHeight < 351 ? `${newHeight}px` : "350px";
    }

    if (props.onKeyUp) props.onKeyUp(event);
  };
  useEffect(() => {
    adjustMe();
  }, []);
  return <Textarea ref={ref} {...props} onKeyUp={adjustMe} />;
});
