export const Preview = () => {
  const isDev = process.env.NODE_ENV === "development";
  const baseUrl = isDev
    ? "http://localhost:3000"
    : "https://inncast.vercel.app";
  return (
    <div
      style={{
        gap: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "slategray",
        color: "snow",
        width: "100%",
        height: "100%",
      }}
    >
      <p style={{ fontSize: "5rem" }}>When is the next show?</p>
      <div style={{ display: "flex", gap: "2rem" }}>
        <img
          src={baseUrl + "/dcl.svg"}
          width="4rem"
          height="4rem"
          style={{
            width: "4rem",
            height: "4rem",
          }}
        />
        <img
          src={baseUrl + "/LOGO_white.svg"}
          width="4rem"
          height="4rem"
          style={{
            width: "4rem",
            height: "4rem",
          }}
        />
      </div>
    </div>
  );
};
