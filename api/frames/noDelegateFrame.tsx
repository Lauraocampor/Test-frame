import { Button, FrameContext } from "frog";

export async function noDelegateFrame( c : FrameContext) {
    return c.res({
        image: `/Frame_5_no_delegate.png`,
        imageAspectRatio: '1.91:1',
        intents: [
          <Button action='/exploreDelegates'>Explore delegates</Button>,
          <Button.Reset>Reset</Button.Reset>,
        ],
      })
  }