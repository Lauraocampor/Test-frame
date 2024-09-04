import * as dotenv from 'dotenv'
dotenv.config();

import { Button, Frog, TextInput } from 'frog'
import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
//import {getStats } from './service/statsService.js';
import { DelegatesResponseDTO } from './service/delegatesResponseDTO.js';

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  hub: neynar({ apiKey: 'NEYNAR_FROG_FM' }),
  title: 'Delegates Frame',
/*   verify: 'silent', */
  imageOptions: {
    fonts: [
      {
        name: 'Koulen',
        weight: 400,
        source: 'google',
      }
    ]
  }
})

app.frame('/', (c) => {
  return c.res({
    image: `/Frame_1_start.png`,
    imageAspectRatio: '1.91:1',
    intents: [
      <TextInput placeholder="Enter fid..." />,
      <Button action="/delegatesStats">View Stats</Button>
    ],
  })
})

app.frame('/delegatesStats', async (c) => {
  const {  frameData } = c;
 const { fid } = frameData || {}   

/*  if (fid === undefined){
  return c.res({
    image: `/Frame_6_error.png`,
    imageAspectRatio: '1.91:1',
    intents: [
      <Button.Reset>Try again</Button.Reset>,
    ],
  })
} */

let delegate: DelegatesResponseDTO;

try {

  const delegateApiURL = new URL(`${process.env.DELEGATE_API_URL}/get_stats`);

  if (fid === undefined) {
    throw new Error('FID is undefined');
  }

  delegateApiURL.searchParams.append('fid', fid.toString());

  const response = await fetch(delegateApiURL.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  delegate = await response.json();

} catch (e) {
  console.error('Error fetching delegate data:', e);

  return c.res({
    image: `/back2.png`,
    imageAspectRatio: '1.91:1',
    intents: [
      <Button.Reset>Try again</Button.Reset>,
    ],
  });
}

  if (!delegate.hasVerifiedAddress){
    return c.res({
      image: `/Frame_4_not_verified.png`,
      imageAspectRatio: '1.91:1',
      intents: [
          <Button.Reset>Try again</Button.Reset>,
      ],
  })
  }
  
  if(!delegate.hasDelegate) {
    return c.res({
      image: `/Frame_5_no_delegate.png`,
      imageAspectRatio: '1.91:1',
      intents: [
        <Button action='/exploreDelegates'>Explore delegates</Button>,
        <Button.Reset>Reset</Button.Reset>,
      ],
    })
  }
  const userDelegate = delegate.delegateInfo.warpcast
  const addressDelegate = delegate.delegateInfo.delegateAddress

  const delegateData = userDelegate? userDelegate : addressDelegate
  if(!delegate.isGoodDelegate) {

    return c.res({
        image: (          
          <div style={{
            display: 'flex',
            background: '#f6f6f6',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'relative'
            }}>
            <img width="1200" height="630" alt="background" src={`/Frame_2.1_bad_delegate_stats.png`}/>
            <div
              style={{
                position: 'absolute',
                color: '#E5383B',
                fontSize: '75px',
                lineHeight: '0.7',
                textTransform: 'uppercase',
                letterSpacing: '-0.030em',
                whiteSpace: 'wrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                with: '100%',
                maxWidth: '255px',
                height: '100%',
                maxHeight: '340px',
                left: '190px',
                bottom: '230px',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              {`${delegateData}`}
            </div>
          </div>
        ),
        intents: [
          <Button action='/exploreDelegates'>Explore delegates</Button>,
        ],
      })
  }


  if (typeof userDelegate !== 'string' || userDelegate === null) {
    throw new Error('Invalid type returned');
  }
    return c.res({
        image: (          
          <div style={{
            display: 'flex',
            background: '#f6f6f6',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'relative'
            }}>
            <img width="1200" height="630" alt="background" src={`/Frame_2_stats.png`} />
            <div
              style={{
                position: 'absolute',
                color: '#E5383B',
                fontSize: '75px',
                lineHeight: '0.7',
                textTransform: 'uppercase',
                letterSpacing: '-0.030em',
                whiteSpace: 'wrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                with: '100%',
                maxWidth: '240px',
                height: '100%',
                maxHeight: '340px',
                left: '195px',
                bottom: '230px',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              {`${delegateData}`}
            </div>
          </div>
        ),
        intents: [
          <Button.Link href='https://warpcast.com/lauraocampo'>Share</Button.Link>,
          <Button.Reset>Reset</Button.Reset>
        ],
      })

})

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
