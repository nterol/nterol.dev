export function CustomCompo({ children }: { children: React.ReactNode }) {
  return <span className="text-red-800">{children}</span>;
}

export const I = () => (
  <iframe
    src="https://codesandbox.io/embed/dreamy-heyrovsky-57wx5d?fontsize=14&hidenavigation=1&theme=dark"
    style={{
      width: "100%",
      height: "500px",
      border: 0,
      borderRadius: 4,
      overflow: "hidden",
    }}
    title="dreamy-heyrovsky-57wx5d"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
);
