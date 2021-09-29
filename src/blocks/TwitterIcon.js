import { createIcon } from "@chakra-ui/icons";

// using `path`
export const TwitterIcon = createIcon({
  displayName: "TwitterIcon",
  viewBox: "0 0 24 24",
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M12 0C5.38303 0 3.05176e-05 5.383 3.05176e-05 12C3.05176e-05 18.617 5.38303 24 12 24C18.617 24 24 18.617 24 12C24 5.383 18.617 0 12 0ZM17.262 9.385C17.268 9.498 17.27 9.611 17.27 9.725C17.27 13.202 14.623 17.214 9.78203 17.214C8.29603 17.214 6.91203 16.777 5.74703 16.03C7.12103 16.191 8.51903 15.823 9.64403 14.941C8.49303 14.918 7.52103 14.158 7.18603 13.112C7.58303 13.187 7.98903 13.173 8.37403 13.066C7.17003 12.826 6.26303 11.761 6.26303 10.487C6.26303 10.476 6.26303 10.464 6.26303 10.452C6.61803 10.649 7.02503 10.767 7.45503 10.782C6.74903 10.309 6.28403 9.505 6.28403 8.592C6.28403 8.11 6.41403 7.658 6.64003 7.268C7.93803 8.861 9.87703 9.91 12.065 10.018C12.02 9.826 11.997 9.624 11.997 9.419C11.997 7.965 13.176 6.787 14.63 6.787C15.387 6.787 16.07 7.106 16.551 7.619C17.151 7.5 18.501 7.353 18.501 7.353C18.147 7.882 17.776 9.013 17.262 9.385Z"
      fill="white"
    />
  ),
});
