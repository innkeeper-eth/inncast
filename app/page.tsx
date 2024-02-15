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
import { NextEvent } from "./NextEvent";

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
          {state.total_button_presses <= 0 && (
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
          )}

          {state.total_button_presses > 0 && (
            <NextEvent nextEvent={event} state={state} />
          )}
        </FrameImage>
        {/* <FrameInput text="put some text here" /> */}
        {state.total_button_presses === 0 ? (
          <FrameButton>Discover</FrameButton>
        ) : null}
        {state.total_button_presses !== 0 ? (
          <FrameButton
            action="link"
            target={`https://play.decentraland.org/?position=137%2C-2`}
          >
            Jump into Decentraland
          </FrameButton>
        ) : null}
      </FrameContainer>
    </div>
  );
}
