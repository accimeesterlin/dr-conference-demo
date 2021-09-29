import { createIcon } from "@chakra-ui/icons";

// using `path`
export const UploadIcon = createIcon({
  displayName: "UploadIcon",
  viewBox: "0 0 24 24",
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      fill="none"
      d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zM12 17.5v-11M12 6.5l-4.125 4.125M12 6.5l4.125 4.125"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
});

export const LogoIcon = createIcon({
  displayName: "LogoIcon",
  viewBox: "0 0 24 24",
  fillRule: "evenodd",
  clipRule: "evenodd",
  fill: "#86869F",

  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: [
    <path
      key="LogoIcon1"
      d="M12.61 15.3h-1.52l-3.04-3.12H6.53l-1.52 1.56 5.32 5.46h3.04l9.88-10.14-2.28-2.34-8.36 8.58z"
    />,
    <path
      key="LogoIcon2"
      d="M3.57 5.76L.21 9.215l2.24 2.304 2.24-2.304h4.48l2.24 2.305 2.24-2.304-3.36-3.456H3.57zM9.324 0L6.93 2.35l.65.637h4.785l3.803 3.733 2.282-2.24L13.886 0H9.324z"
    />,
  ],
});

export const FolderIcon = createIcon({
  displayName: "FolderIcon",
  viewBox: "0 0 20 17",
  fill: "#86869F",
  fillRule: "evenodd",
  clipRule: "evenodd",
  path: (
    <path d="M2.5 16.875h15a2.5 2.5 0 002.5-2.5v-8.75a2.5 2.5 0 00-2.5-2.5H9.061a.625.625 0 01-.5-.25l-.936-1.25a2.5 2.5 0 00-2-1H2.5a2.5 2.5 0 00-2.5 2.5v11.25a2.5 2.5 0 002.5 2.5zm0-3.125v-10c0-.345.28-.625.625-.625h2.188c.196 0 .381.093.5.25l.937 1.25a2.5 2.5 0 002 1h8.125c.345 0 .625.28.625.625v7.5c0 .345-.28.625-.625.625H3.125a.625.625 0 01-.625-.625z" />
  ),
});

export const CheckIcon = createIcon({
  displayName: "CheckIcon",
  fill: "none",
  viewBox: "0 0 26 27",
  path: [
    <path
      d="M23.857 12.648v1.116c-.003 5.314-3.334 9.993-8.188 11.5-4.854 1.506-10.073-.518-12.828-4.976C.086 15.83.452 10 3.741 5.96 7.029 1.92 12.457.634 17.08 2.796"
      key="CheckIcon1"
      stroke="#16D898"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />,
    <path
      d="M25 2.964l-12.571 13.2L9 12.564"
      key="CheckIcon2"
      stroke="#16D898"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />,
  ],
});
