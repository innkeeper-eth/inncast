import { formatRelative } from "date-fns";
import { InnEvent, State } from "../types";

export const NextEvent = (props: { nextEvent?: InnEvent; state: State }) => {
  const isDev = process.env.NODE_ENV === "development";
  const baseUrl = isDev
    ? "http://localhost:3000"
    : "https://inncast.vercel.app";
  const artist = props.nextEvent?.artists?.[0];
  const relativeTime = formatRelative(
    new Date(props.nextEvent?.date ?? "2020-01-01"),
    new Date(),
  );

  const background =
    artist?.images?.banner && props.state.total_button_presses > 0
      ? {
          backgroundImage: `url("${artist?.images?.banner}")`,
          backgroundSize: "100% 100%",
        }
      : {
          backgroundImage: `url("${baseUrl + "/stage.png"}")`,
        };

  return (
    <div
      style={{
        ...background,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundPosition: "cover",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            backgroundColor: "black",
            color: "antiquewhite",
            fontWeight: "bold",
            fontSize: "4rem",
            padding: "0.5rem 2rem",
            display: "flex",
            alignItems: "center",
            borderRadius: "0 0 1rem 0",
          }}
        >
          {artist?.name}
        </div>
        <div
          style={{
            borderRadius: "0 0 0 1rem",
            backgroundColor: "orange",
            padding: "0.5rem 2rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            fontSize: "3rem",
          }}
        >
          <img
            src={baseUrl + "/LOGO_white.svg"}
            width="3rem"
            height="3rem"
            style={{ width: "3rem", height: "3rem" }}
          />
          <p>The Inn (137,-2)</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "1rem",
            borderRadius: "0 2rem 2rem 0",
          }}
        >
          {relativeTime}
        </p>
        <img
          src={baseUrl + "/dcl.svg"}
          width="3rem"
          height="3rem"
          style={{ width: "5rem", height: "5rem", margin: "0 2rem" }}
        />
      </div>
    </div>
  );
};
