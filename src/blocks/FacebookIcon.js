import { createIcon } from "@chakra-ui/icons";

// using `path`
export const FacebookIcon = createIcon({
  displayName: "FacebookIcon",
  viewBox: "0 0 24 24",
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M12 0C5.38303 0 3.05176e-05 5.383 3.05176e-05 12C3.05176e-05 18.617 5.38303 24 12 24C18.617 24 24 18.617 24 12C24 5.383 18.617 0 12 0ZM15.595 11.5H13.5C13.5 14.513 13.5 18.5 13.5 18.5H10.5C10.5 18.5 10.5 14.549 10.5 11.5H8.50003V9.5H10.5V8.336C10.5 7.236 10.852 5.517 13.149 5.517L15.5 5.524V7.83C15.5 7.83 14.337 7.83 14.092 7.83C13.848 7.83 13.5 7.953 13.5 8.477V9.5H15.839L15.595 11.5Z"
      fill="white"
    />
  ),
});
