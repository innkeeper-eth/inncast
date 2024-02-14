import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameInput,
  FrameReducer,
  NextServerPageProps,
  getPreviousFrame,
  useFramesReducer,
  getFrameMessage,
} from "frames.js/next/server";
import Link from "next/link";
import { DEBUG_HUB_OPTIONS } from "./debug/constants";
import axios from "axios";
import { InnEvent, State } from "../types";

const initialState = { total_button_presses: 0 };

const reducer: FrameReducer<State> = (state, action) => {
  return {
    total_button_presses: state.total_button_presses + 1,
  };
};

// This is a react server component only
export default async function Home({
  params,
  searchParams,
}: NextServerPageProps) {
  const previousFrame = getPreviousFrame<State>(searchParams);

  const frameMessage = await getFrameMessage(previousFrame.postBody, {
    ...DEBUG_HUB_OPTIONS,
  });

  if (frameMessage && !frameMessage?.isValid) {
    throw new Error("Invalid frame payload");
  }

  const [state, dispatch] = useFramesReducer<State>(
    reducer,
    initialState,
    previousFrame,
  );

  console.log({ previousFrame, state });

  // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
  // example: load the users credentials & check they have an NFT
  const response = await axios.get<InnEvent[]>(
    "https://innkeeper.link/api/events/upcoming",
  );
  // const response = { data: [teya] };

  if (frameMessage) {
    const {
      isValid,
      buttonIndex,
      inputText,
      castId,
      requesterFid,
      casterFollowsRequester,
      requesterFollowsCaster,
      likedCast,
      recastedCast,
      requesterVerifiedAddresses,
      requesterUserData,
    } = frameMessage;
  }

  const baseUrl = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";

  const event = response?.data?.[0];

  // then, when done, return next frame
  return (
    <div className="p-4">
      frames.js starter kit. The Template Frame is on this page, it&apos;s in
      the html meta tags (inspect source).{" "}
      <Link href={`/debug?url=${baseUrl}`} className="underline">
        Debug
      </Link>
      <FrameContainer
        pathname="/"
        postUrl="/frames"
        state={state}
        previousFrame={previousFrame}
      >
        {/* <FrameImage src="https://framesjs.org/og.png" /> */}
        <FrameImage>
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
        </FrameImage>
        {/* <FrameInput text="put some text here" /> */}
        <FrameButton>Refresh</FrameButton>
        <FrameButton
          action="link"
          target={`https://play.decentraland.org/?position=137%2C-2`}
        >
          Jump into Decentraland
        </FrameButton>
      </FrameContainer>
    </div>
  );
}
