import { Button, FrameContext } from "frog";

export function noVerifiedAddressFrame(c : FrameContext) {
    return c.res({
        image: `/Frame_4_not_verified.png`,
        imageAspectRatio: '1.91:1',
        intents: [
            <Button.Reset>Try again</Button.Reset>,
        ],
    })
  }